import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import db from "@/db";
import { imageUploads } from "@/db/schema";
import { eq } from "drizzle-orm";
import prepareFilePaths from "@/lib/files/prepareFilePaths";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const growId = formData.get("growId") as string | null;
    const description = formData.get("description") as string | null;

    if (!file) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    if (!growId) {
      return NextResponse.json({ error: "Missing growId" }, { status: 400 });
    }

    const { uploadDir, dbPath, fullPath } = prepareFilePaths(
      file.name,
      "images"
    );

    //create uploads folder
    await mkdir(uploadDir, { recursive: true });

    //Try instering DB entry and get its id first
    const dbResult = await insertImageToDb({
      growId: parseInt(growId, 10),
      path: dbPath,
      description,
    });

    if (!dbResult.succeeded) {
      return NextResponse.json({
        error: "Database insert failed",
        msg: dbResult.error,
      });
    }

    // db-insert succeeded -> write file
    const writeFileResult = await writeFileToDisk(file, fullPath, dbResult);

    if (!writeFileResult.succeeded) {
      return NextResponse.json({
        error: "File upload failed",
        msg: writeFileResult.error,
      });
    }

    // writing file succeeded -> get the new db-entry response with it
    const inserted = await db
      .select()
      .from(imageUploads)
      .where(eq(imageUploads.id, dbResult.id));
    return NextResponse.json(inserted);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Uploaded failed" }, { status: 500 });
  }
}

type InsertImageResult = {
  succeeded: boolean;
  id: number;
  error?: unknown;
};

async function insertImageToDb(values: {
  growId: number;
  path: string;
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

type WriteFileResult = {
  succeeded: boolean;
  error?: unknown;
};

async function writeFileToDisk(
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
