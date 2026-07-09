CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" timestamp,
	"refreshTokenExpiresAt" timestamp,
	"scope" text,
	"password" text,
	"expiresAt" timestamp,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "booking" (
	"id" text PRIMARY KEY NOT NULL,
	"seekerId" text NOT NULL,
	"counselorId" text NOT NULL,
	"sessionType" text NOT NULL,
	"status" text DEFAULT 'pending',
	"scheduledAt" timestamp NOT NULL,
	"duration" integer,
	"notes" text,
	"amount" numeric(10, 2),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "counselor_profile" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"bio" text,
	"specializations" text[],
	"certifications" text[],
	"hourlyRate" numeric(10, 2),
	"rating" numeric(3, 2),
	"availability" text,
	"status" text DEFAULT 'pending',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "counselor_profile_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "message" (
	"id" text PRIMARY KEY NOT NULL,
	"bookingId" text NOT NULL,
	"senderId" text NOT NULL,
	"content" text NOT NULL,
	"iv" text,
	"attachments" text[],
	"isRead" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "mood_entry" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"mood" text NOT NULL,
	"intensity" integer,
	"notes" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "resource" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"category" text,
	"url" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "review" (
	"id" text PRIMARY KEY NOT NULL,
	"counselorId" text NOT NULL,
	"seekerId" text NOT NULL,
	"rating" integer NOT NULL,
	"comment" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"token" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "support_ticket" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"subject" text NOT NULL,
	"description" text,
	"status" text DEFAULT 'open',
	"priority" text DEFAULT 'medium',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean DEFAULT false NOT NULL,
	"name" text,
	"image" text,
	"role" text DEFAULT 'seeker',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_seekerId_user_id_fk" FOREIGN KEY ("seekerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_counselorId_user_id_fk" FOREIGN KEY ("counselorId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "counselor_profile" ADD CONSTRAINT "counselor_profile_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message" ADD CONSTRAINT "message_bookingId_booking_id_fk" FOREIGN KEY ("bookingId") REFERENCES "public"."booking"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message" ADD CONSTRAINT "message_senderId_user_id_fk" FOREIGN KEY ("senderId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mood_entry" ADD CONSTRAINT "mood_entry_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_counselorId_user_id_fk" FOREIGN KEY ("counselorId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_seekerId_user_id_fk" FOREIGN KEY ("seekerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "support_ticket" ADD CONSTRAINT "support_ticket_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_account_userId" ON "account" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "idx_booking_seekerId" ON "booking" USING btree ("seekerId");--> statement-breakpoint
CREATE INDEX "idx_booking_counselorId" ON "booking" USING btree ("counselorId");--> statement-breakpoint
CREATE INDEX "idx_booking_status" ON "booking" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_counselor_profile_userId" ON "counselor_profile" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "idx_message_bookingId" ON "message" USING btree ("bookingId");--> statement-breakpoint
CREATE INDEX "idx_message_senderId" ON "message" USING btree ("senderId");--> statement-breakpoint
CREATE INDEX "idx_mood_entry_userId" ON "mood_entry" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "idx_review_counselorId" ON "review" USING btree ("counselorId");--> statement-breakpoint
CREATE INDEX "idx_session_userId" ON "session" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_session_token" ON "session" USING btree ("token");--> statement-breakpoint
CREATE INDEX "idx_support_ticket_userId" ON "support_ticket" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "idx_support_ticket_status" ON "support_ticket" USING btree ("status");