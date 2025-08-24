ALTER TABLE `image_uploads` ADD `uniqueName` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `image_uploads` ADD CONSTRAINT `image_uploads_uniqueName_unique` UNIQUE(`uniqueName`);