CREATE TABLE `image_uploads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`description` varchar(255) NOT NULL,
	`path` varchar(255) NOT NULL,
	`grow_id` int NOT NULL,
	CONSTRAINT `image_uploads_id` PRIMARY KEY(`id`),
	CONSTRAINT `image_uploads_path_unique` UNIQUE(`path`)
);
--> statement-breakpoint
ALTER TABLE `image_uploads` ADD CONSTRAINT `image_uploads_grow_id_grows_id_fk` FOREIGN KEY (`grow_id`) REFERENCES `grows`(`id`) ON DELETE no action ON UPDATE no action;