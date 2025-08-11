CREATE TABLE `grows` (
	`id` int AUTO_INCREMENT NOT NULL,
	`genetic` varchar(255) NOT NULL,
	CONSTRAINT `grows_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `measurerings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`temperature` int NOT NULL,
	`humidity` int NOT NULL,
	`image` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	`grow_id` int NOT NULL,
	CONSTRAINT `measurerings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `measurerings` ADD CONSTRAINT `measurerings_grow_id_grows_id_fk` FOREIGN KEY (`grow_id`) REFERENCES `grows`(`id`) ON DELETE cascade ON UPDATE no action;