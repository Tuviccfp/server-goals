ALTER TABLE "user_table" ADD COLUMN "goals" text;--> statement-breakpoint
ALTER TABLE "user_table" ADD COLUMN "goals_completions" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_table" ADD CONSTRAINT "user_table_goals_goals_id_fk" FOREIGN KEY ("goals") REFERENCES "public"."goals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_table" ADD CONSTRAINT "user_table_goals_completions_goals_completions_id_fk" FOREIGN KEY ("goals_completions") REFERENCES "public"."goals_completions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
