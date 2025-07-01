import {eq} from "drizzle-orm";
import db from "../drizzle/db";
import { bookTable, TBookInsert, TBookSelect } from "../drizzle/schema";

//CRUD operations

//get all books
export const getbookServices = async():Promise<TBookSelect[] | null> =>{
    return await db.query.bookTable.findMany({});
}

//get book by id
export const getbookByIdServices = async(bookId:number):Promise<TBookSelect | undefined> => {
    return await db.query.bookTable.findFirst({
        where: eq(bookTable.bookId, bookId)
    })
}

//create book
export const createbookServices = async(book:TBookInsert):Promise<string> =>{
     await db.insert(bookTable).values(book).returning();
    return "Book created successfully 🎉";
} 

//update book
export const updatebookServices = async(bookId: number, book: Partial<TBookInsert>):Promise<string> => {
    await db.update(bookTable).set(book).where(eq(bookTable.bookId, bookId));
    return "User updated successfully 😎";
}
// Delete a book

export const deletebookServices = async(bookId: number):Promise<string> => {
  await db.delete(bookTable).where(eq(bookTable.bookId, bookId));
  return "Book deleted successfully 🎉"
}