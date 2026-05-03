CREATE TABLE "ai_generated_image" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "ai_generated_image_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"roomType" varchar NOT NULL,
	"designType" varchar NOT NULL,
	"originalImage" varchar NOT NULL,
	"aiImage" varchar NOT NULL,
	"userEmail" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"imageUrl" varchar NOT NULL,
	"credit" integer DEFAULT 3,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"lastVisitTime" timestamp DEFAULT now() NOT NULL,
	"userId" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
