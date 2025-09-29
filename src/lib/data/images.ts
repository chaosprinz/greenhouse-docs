import db from "@/db";
import { grows, ImageUpload, imageUploads } from "@/db/schema";
import { eq } from "drizzle-orm";
import { DbResult } from "./types";
import { dbResultFactory } from "./dbResult";
import { DbError, NotFoundError, toDbError, UnknownDbError } from "./errors";

const dbResultImages = dbResultFactory<ImageUpload[]>();
const dbResultImage = dbResultFactory<ImageUpload>();

export async function getImagesForGrow(
  growId: number
): Promise<DbResult<ImageUpload[]>> {
  try {
    const growWithImages = await db.query.grows.findFirst({
      where: eq(grows.id, growId),
      with: {
        imageUploads: true,
      },
    });

    if (!growWithImages) {
      return dbResultImages(
        false,
        new NotFoundError({ entity: "Image", id: growId })
      );
    }

    const growImages: ImageUpload[] = growWithImages.imageUploads;

    return dbResultImages(true, growImages);
  } catch (err) {
    const error =
      err instanceof DbError
        ? err
        : new UnknownDbError(err instanceof Error ? err.message : undefined);
    return dbResultImages(false, toDbError(error));
  }
}

export async function getImage(id: number): Promise<DbResult<ImageUpload>> {
  try {
    const image = await db.query.imageUploads.findFirst({
      where: eq(imageUploads.id, id),
    });

    if (!image) {
      return dbResultImage(false, new NotFoundError({ entity: "Image", id }));
    }

    return dbResultImage(true, image);
  } catch (err) {
    const error: DbError =
      err instanceof DbError
        ? err
        : new UnknownDbError(err instanceof Error ? err.message : undefined);
    return dbResultImage(false, error);
  }
}
