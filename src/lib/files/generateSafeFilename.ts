import path from "path";
import crypto from "crypto";

/**
 * Sanitize and generate a unique, human-readable filename.
 * Keeps part of the original  namne, ensures uniqueness, and prevents path issues
 */
export default function generateSafeFilename(input: string | File): string {
  // Extract filename is input is a File
  const original = isFile(input) ? input.name : input;

  // Sanitize filename
  const safe = original
    .replace(/[^a-zA-Z0-9-_\.]/g, "_") // allow only a-z, 0-9, -, _, .
    .replace(/\.+/g, ".") // collapse multiple dots
    .replace(/^\.*/, ""); // strip leading dots

  const ext = path.extname(safe);
  const base = path.basename(safe, ext);

  return `${Date.now()}-${base}-${crypto.randomUUID()}${ext}`;
}

// Type guard to check if input is a file
function isFile(value: unknown): value is File {
  return typeof value === "object" && value !== null && "name" in value;
}
