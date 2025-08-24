import db from "@/db";
import { imageUploads } from "@/db/schema";
import prepareFilePaths from "@/lib/files/prepareFilePaths";
import { growExists } from "@/lib/grows";
import { eq } from "drizzle-orm";
import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";

/**
 * ## insertImageToDb
 * async insertImageToDb(values) => InsertImageResult
 *
 * @param values = {succeeded: bool, id: number, error?: unknown}
 */

export type InsertImageResult = {
  succeeded: boolean;
  id: number;
  error?: unknown;
};

export async function insertImageToDb(values: {
  growId: number;
  uniqueName: string;
  description?: string | null;
}): Promise<InsertImageResult> {
  try {
    const result = await db.insert(imageUploads).values(values).$returningId();
    return {
      succeeded: true,
      id: result[0].id,
    };
  } catch (error) {
    return {
      succeeded: false,
      id: -1,
      error,
    };
  }
}

/**
 * ## writeFileToDisk
 * async writeFileToDisk(file, path, dbResult) => WriteFileResult
 *
 * @param file:File Uploaded image-data
 * @param path:string full path to the stored image
 * @param dbResult:InsertImageResult the data-base entry for the stored image
 *
 * @returns WriteFileResult = {
 *  succeeeded: boolean, //if the file got succesfully written
 *  error?: unknown, //the catched error-details
 * }
 */
export type WriteFileResult = {
  succeeded: boolean;
  error?: unknown;
};

export async function writeFileToDisk(
  file: File,
  path: string,
  dbResult: InsertImageResult
): Promise<WriteFileResult> {
  try {
    const bytes = Buffer.from(await file.arrayBuffer());
    await writeFile(path, bytes);
    return {
      succeeded: true,
    };
  } catch (error) {
    await db.delete(imageUploads).where(eq(imageUploads.id, dbResult.id));
    return {
      succeeded: false,
      error,
    };
  }
}

/**
 * ## parseGrowId
 * parseGrowId(growId: string | null) => number
 *
 * @param growId :string // the id of the grow to parse
 * @returns number // the true nummeric value of the given growId or -1 if growId is null
 */
export function parseGrowId(growId: string | null): number {
  if (growId === null) {
    return -1;
  }
  return parseInt(growId, 10);
}

/**
 * ## createResponse
 * async createResponse(ResponseProps) => NextResponse
 *
 * creates the correct Response for creating an image with the given data
 *
 * @param {
 *  growId: number, //the id of the grow the image belongs to
 *  file?: File | null, //the actual image-file-data
 *  description?: string | null //an optional description
 * }
 *
 * @returns NextResponse for creating an image with the given data
 */

type ResponseProps = {
  growId: number;
  file?: File | null;
  description?: string | null;
};

export async function createResponse({
  growId,
  file,
  description,
}: ResponseProps): Promise<NextResponse> {
  // was a growId and file given?
  if (!growId || growId < 0) {
    return createErrorResponse({ error: "No growId given", status: 500 });
  }
  if (!file) {
    return createErrorResponse({ error: "No file given", status: 500 });
  }

  // is there an grow in the database for the given id?
  if (!(await growExists(growId))) {
    return createErrorResponse({
      error: `No grow for id ${growId} exists`,
      status: 500,
    });
  }

  const { uploadDir, fullPath, uniqueName } = prepareFilePaths(
    file.name,
    "images"
  );

  //create uploadDir if it doesnt exist
  await mkdir(uploadDir, { recursive: true });

  const dbResult = await insertImageToDb({
    growId,
    uniqueName,
    description,
  });

  //create an ErrorResponse when insertImageToDb didnt succeed
  if (!dbResult.succeeded) {
    return createErrorResponse({
      error: "Could not create db-entry",
      msg: dbResult.error,
      status: 500,
    });
  }

  const writeFileResult = await writeFileToDisk(file, fullPath, dbResult);

  return createWriteFileResponse(writeFileResult, {
    insertId: dbResult.id,
    imagePath: fullPath,
  });
}

/**
 *
 * @param writeFileResult WriteFileResult result of writting the file to disk
 * @param param1
 * @returns
 */
async function createWriteFileResponse(
  writeFileResult: WriteFileResult,
  { insertId, imagePath }: { insertId: number; imagePath: string }
): Promise<NextResponse> {
  if (!writeFileResult.succeeded) {
    return createErrorResponse({
      error: "Could not write file to disk",
      msg: writeFileResult.error,
      status: 500,
    });
  }
  return NextResponse.json({
    insertId,
    imagePath,
  });
}
function createErrorResponse({
  error,
  msg,
  status,
}: {
  error: string;
  msg?: unknown;
  status: number;
}): NextResponse {
  return NextResponse.json(
    {
      error,
      msg,
    },
    { status }
  );
}
