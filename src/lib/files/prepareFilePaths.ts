import path from "path";
import generateSafeFilename from "./generateSafeFilename";
import CONFIG from "@/lib/config";

export type PreparedFilePaths = {
  uploadDir: string;
  uniqueName: string;
  fullPath: string;
};

export default function prepareFilePaths(
  originalName: string,
  uploadDirName: string
): PreparedFilePaths {
  const uploadDir = path.join(CONFIG.files.uploadPath, uploadDirName);
  const uniqueName = generateSafeFilename(originalName);
  return {
    uploadDir,
    uniqueName,
    fullPath: path.join(uploadDir, uniqueName),
  };
}
