CREATE TABLE "waitlist_entry" (
	"id" text PRIMARY KEY NOT NULL,
	"seekerId" text NOT NULL,
	"counselorId" text NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "waitlist_entry" ADD CONSTRAINT "waitlist_entry_seekerId_user_id_fk" FOREIGN KEY ("seekerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "waitlist_entry" ADD CONSTRAINT "waitlist_entry_counselorId_user_id_fk" FOREIGN KEY ("counselorId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "idx_waitlist_seeker_counselor" ON "waitlist_entry" USING btree ("seekerId","counselorId");--> statement-breakpoint
CREATE INDEX "idx_waitlist_counselorId" ON "waitlist_entry" USING btree ("counselorId");