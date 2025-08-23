import { NextRequest, NextResponse } from "next/server";
import { mkdir } from "fs/promises";
import db from "@/db";
import { imageUploads } from "@/db/schema";
import { eq } from "drizzle-orm";
import prepareFilePaths from "@/lib/files/prepareFilePaths";
import { insertImageToDb, writeFileToDisk } from "./_helper";

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
