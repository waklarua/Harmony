ALTER TABLE "booking" ADD COLUMN "paymentStatus" text DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "booking" ADD COLUMN "paymentReference" text;--> statement-breakpoint
ALTER TABLE "booking" ADD COLUMN "paymentMethod" text;