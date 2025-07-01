CREATE TABLE "bookTable" (
	"bookId" serial PRIMARY KEY NOT NULL,
	"bookTitle" varchar(50),
	"bookAuthor" text,
	"bookYear" integer,
	"bookGenre" varchar(50)
);
