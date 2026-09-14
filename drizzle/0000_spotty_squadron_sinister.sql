CREATE TABLE `test_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_id` text NOT NULL,
	`run_id` text DEFAULT 'interactive' NOT NULL,
	`source_kind` text DEFAULT 'interactive' NOT NULL,
	`actor` text NOT NULL,
	`event_type` text NOT NULL,
	`topic` text DEFAULT '' NOT NULL,
	`mode` text DEFAULT '' NOT NULL,
	`correct` integer,
	`success` integer DEFAULT 1 NOT NULL,
	`latency_ms` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
