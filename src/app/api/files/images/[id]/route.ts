import CONFIG from "@/lib/config";

import path from "path";
import { stat } from "fs/promises";
import { createReadStream } from "fs";
import lookupMime from "@/lib/files/lookupMime";

import { NextRequest, NextResponse } from "next/server";
import { getImage } from "@/lib/data";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: number } }
) {
  const image = await getImage((await params).id);

  if (image.success) {
    const filePath = path.join(
      CONFIG.files.uploadPath,
      "images",
      image.success ? image.data.uniqueName : ""
    );

    try {
      await stat(filePath);
    } catch (error) {
      return NextResponse.json(
        { error: "File not found", msg: error },
        { status: 404 }
      );
    }

    const stream = createReadStream(filePath);
    const filename = path.basename(filePath);
    const mimeType = lookupMime(filename) || "application/octet-stream";

    return new NextResponse(stream as any, {
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `inline; filename="${filename}`,
      },
    });
  } else {
    return NextResponse.json(image.error, { status: 404 });
  }
}
