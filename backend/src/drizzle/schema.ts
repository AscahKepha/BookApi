import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core"

export const bookTable = pgTable('bookTable',{
    bookId: serial('bookId').primaryKey(),
    bookTitle: varchar('bookTitle',{ length: 50 }),
    bookAuthor: text('bookAuthor'),
    bookYear: integer('bookYear'),
    bookGenre: varchar('bookGenre',{ length: 50 }),
});

//infer types
export type TBookInsert = typeof bookTable.$inferInsert;
export type TBookSelect = typeof bookTable.$inferSelect;