import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const testEvents = sqliteTable("test_events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: text("session_id").notNull(),
  runId: text("run_id").notNull().default("interactive"),
  sourceKind: text("source_kind").notNull().default("interactive"),
  actor: text("actor").notNull(),
  eventType: text("event_type").notNull(),
  topic: text("topic").notNull().default(""),
  mode: text("mode").notNull().default(""),
  correct: integer("correct"),
  success: integer("success").notNull().default(1),
  latencyMs: integer("latency_ms"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
