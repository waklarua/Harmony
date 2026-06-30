CREATE TABLE "assessment_result" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"assessmentType" text NOT NULL,
	"score" integer NOT NULL,
	"interpretation" text NOT NULL,
	"answers" integer[] NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "notification" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"message" text NOT NULL,
	"type" text DEFAULT 'system' NOT NULL,
	"isRead" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "schedule_slot" (
	"id" text PRIMARY KEY NOT NULL,
	"counselorId" text NOT NULL,
	"dayOfWeek" integer NOT NULL,
	"startTime" text NOT NULL,
	"endTime" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "session_note" (
	"id" text PRIMARY KEY NOT NULL,
	"bookingId" text NOT NULL,
	"counselorId" text NOT NULL,
	"encryptedContent" text NOT NULL,
	"iv" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "session_note_bookingId_unique" UNIQUE("bookingId")
);
--> statement-breakpoint
ALTER TABLE "booking" ADD COLUMN "startedAt" timestamp;--> statement-breakpoint
ALTER TABLE "assessment_result" ADD CONSTRAINT "assessment_result_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification" ADD CONSTRAINT "notification_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule_slot" ADD CONSTRAINT "schedule_slot_counselorId_user_id_fk" FOREIGN KEY ("counselorId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session_note" ADD CONSTRAINT "session_note_bookingId_booking_id_fk" FOREIGN KEY ("bookingId") REFERENCES "public"."booking"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session_note" ADD CONSTRAINT "session_note_counselorId_user_id_fk" FOREIGN KEY ("counselorId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_assessment_userId" ON "assessment_result" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "idx_notification_userId" ON "notification" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "idx_schedule_slot_counselorId" ON "schedule_slot" USING btree ("counselorId");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_session_note_bookingId" ON "session_note" USING btree ("bookingId");