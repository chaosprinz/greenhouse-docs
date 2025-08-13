CREATE TABLE `genetics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`breeder` varchar(255) NOT NULL,
	`genus` varchar(255) NOT NULL,
	CONSTRAINT `genetics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `grows` ADD `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `grows` ADD `updated_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `grows` ADD `started_at` timestamp;--> statement-breakpoint
ALTER TABLE `grows` ADD `flowering_init_at` timestamp;--> statement-breakpoint
ALTER TABLE `grows` ADD `flowering_started_at` timestamp;--> statement-breakpoint
ALTER TABLE `grows` ADD `genetic_id` int;--> statement-breakpoint
ALTER TABLE `grows` ADD CONSTRAINT `grows_genetic_id_genetics_id_fk` FOREIGN KEY (`genetic_id`) REFERENCES `genetics`(`id`) ON DELETE set null ON UPDATE no action;