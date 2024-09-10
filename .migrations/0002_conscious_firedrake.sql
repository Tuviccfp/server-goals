CREATE TABLE IF NOT EXISTS "user_table" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_table_username_unique" UNIQUE("username"),
	CONSTRAINT "user_table_email_unique" UNIQUE("email")
);
