import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  role: text("role", { enum: ["teacher", "student"] }).notNull(),
  displayName: text("display_name").notNull(),
  email: text("email"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [uniqueIndex("idx_users_email").on(table.email)]);

export const classes = sqliteTable("classes", {
  id: text("id").primaryKey(),
  teacherId: text("teacher_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  grade: text("grade").notNull(),
  joinCode: text("join_code").notNull(),
  archived: integer("archived", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [uniqueIndex("idx_classes_join_code").on(table.joinCode)]);

export const classMembers = sqliteTable("class_members", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  classId: text("class_id").notNull().references(() => classes.id),
  studentId: text("student_id").notNull().references(() => users.id),
  joinedAt: text("joined_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [uniqueIndex("idx_class_members_unique").on(table.classId, table.studentId)]);

export const courses = sqliteTable("courses", {
  id: text("id").primaryKey(),
  classId: text("class_id").notNull().references(() => classes.id),
  title: text("title").notNull(),
  textbook: text("textbook").notNull().default(""),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const lessons = sqliteTable("lessons", {
  id: text("id").primaryKey(),
  courseId: text("course_id").notNull().references(() => courses.id),
  title: text("title").notNull(),
  sequence: integer("sequence").notNull(),
  status: text("status", { enum: ["draft", "active", "reviewed"] }).notNull().default("draft"),
});

export const learningObjectives = sqliteTable("learning_objectives", {
  id: text("id").primaryKey(),
  lessonId: text("lesson_id").notNull().references(() => lessons.id),
  level: text("level", { enum: ["required", "consolidation", "transfer"] }).notNull(),
  description: text("description").notNull(),
  teacherConfirmed: integer("teacher_confirmed", { mode: "boolean" }).notNull().default(false),
});

export const assignments = sqliteTable("assignments", {
  id: text("id").primaryKey(),
  lessonId: text("lesson_id").notNull().references(() => lessons.id),
  title: text("title").notNull(),
  status: text("status", { enum: ["draft", "published", "closed"] }).notNull().default("draft"),
  publishedAt: text("published_at"),
});

export const submissions = sqliteTable("submissions", {
  id: text("id").primaryKey(),
  assignmentId: text("assignment_id").notNull().references(() => assignments.id),
  studentId: text("student_id").notNull().references(() => users.id),
  status: text("status", { enum: ["started", "submitted", "reviewed"] }).notNull().default("started"),
  submittedAt: text("submitted_at"),
}, (table) => [uniqueIndex("idx_submissions_unique").on(table.assignmentId, table.studentId)]);
