CREATE TABLE `genetics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`breeder` varchar(255) NOT NULL,
	`genus` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`product_page` varchar(255),
	CONSTRAINT `genetics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `grows` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`started_at` timestamp,
	`flowering_init_at` timestamp,
	`flowering_started_at` timestamp,
	`genetic_id` int,
	CONSTRAINT `grows_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `measurings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`temperature` int NOT NULL,
	`humidity` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`grow_id` int NOT NULL,
	CONSTRAINT `measurings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `grows` ADD CONSTRAINT `grows_genetic_id_genetics_id_fk` FOREIGN KEY (`genetic_id`) REFERENCES `genetics`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `measurings` ADD CONSTRAINT `measurings_grow_id_grows_id_fk` FOREIGN KEY (`grow_id`) REFERENCES `grows`(`id`) ON DELETE cascade ON UPDATE no action;