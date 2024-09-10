ALTER TABLE "user_table" DROP CONSTRAINT "user_table_goals_goals_id_fk";
--> statement-breakpoint
ALTER TABLE "user_table" DROP CONSTRAINT "user_table_goals_completions_goals_completions_id_fk";
--> statement-breakpoint
ALTER TABLE "goals" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "goals" ADD CONSTRAINT "goals_user_id_user_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user_table" DROP COLUMN IF EXISTS "goals";--> statement-breakpoint
ALTER TABLE "user_table" DROP COLUMN IF EXISTS "goals_completions";