CREATE TABLE IF NOT EXISTS "earnings" (
	"id" text PRIMARY KEY NOT NULL,
	"counselorId" text NOT NULL,
	"bookingId" text NOT NULL,
	"amount" integer DEFAULT 1500 NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "earnings" ADD CONSTRAINT "earnings_counselorId_user_id_fk" FOREIGN KEY ("counselorId") REFERENCES "public"."user"("id") ON DELETE CASCADE;
--> statement-breakpoint
ALTER TABLE "earnings" ADD CONSTRAINT "earnings_bookingId_booking_id_fk" FOREIGN KEY ("bookingId") REFERENCES "public"."booking"("id") ON DELETE CASCADE;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_earnings_counselorId" ON "earnings" ("counselorId");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_earnings_bookingId" ON "earnings" ("bookingId");
