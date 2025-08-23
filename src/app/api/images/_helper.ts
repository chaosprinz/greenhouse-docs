import db from "@/db";
import { imageUploads } from "@/db/schema";
import { eq } from "drizzle-orm";
import { writeFile } from "fs/promises";

type InsertImageResult = {
  succeeded: boolean;
  id: number;
  error?: unknown;
};

export async function insertImageToDb(values: {
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
