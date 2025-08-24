import path from "path";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/w4ebp",
  ".pdf": "application/pdf",
  ".zip": "application/zip",
};

function lookupMime(filename: string): string {
  const ext = path.extname(filename);
  return MIME_TYPES[ext] ?? "application/octet-stream";
}

export default lookupMime;
