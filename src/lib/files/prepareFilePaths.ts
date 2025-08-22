import path from "path";
import generateSafeFilename from "./generateSafeFilename";

export type PreparedFilePaths = {
  uploadDir: string;
  uniqueName: string;
  dbPath: string;
  fullPath: string;
};

export default function prepareFilePaths(
  originalName: string,
  uploadDirName: string
): PreparedFilePaths {
  const uploadDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    uploadDirName
  );
  const uniqueName = generateSafeFilename(originalName);
  return {
    uploadDir,
    uniqueName,
    dbPath: `/${uploadDirName}/${uniqueName}`,
    fullPath: path.join(uploadDir, uniqueName),
  };
}
