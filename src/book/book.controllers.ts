import {Request, Response} from "express";
import {createbookServices, deletebookServices, getbookByIdServices, getbookServices, updatebookServices } from "./book.services";

export const getbooks = async(req: Request, res: Response) => {
    try{
        const allbooks = await getbookServices();
        if (allbooks == null || allbooks.length == 0) {
            res.status(404).json({ message: "No books found" });
        }else{
            res.status(200).json(allbooks);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch books" });
    }
}

export const getbookById = async (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id);
    if (isNaN(bookId)) {
        res.status(400).json({ error: "Invalid book ID" });
        return; // Prevent further execution
    }
    try {
        const book = await getbookByIdServices(bookId);
        if (book == null) {
            res.status(404).json({ message: "book not found" });
        } else {
            res.status(200).json(book);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch book" });
    }
}

export const createbook = async (req: Request, res: Response) => {
    // Assuming the incoming request body still uses 'title', 'year', 'genre'
    const { title, year, genre } = req.body;

    if (!title || !year || !genre) {
        res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    }
    try {
        // Corrected: Map incoming 'title', 'year', 'genre' to 'bookTitle', 'bookYear', 'bookGenre'
        const newbook = await createbookServices({ bookTitle: title, bookYear: year, bookGenre: genre });
        if (newbook == null) {
            res.status(500).json({ message: "Failed to create book" });
        } else {
            res.status(201).json(newbook);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to create book" });
    }
}

export const updatebook = async (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id);
    if (isNaN(bookId)) {
        res.status(400).json({ error: "Invalid book ID" });
        return; // Prevent further execution
    }
    // Assuming the incoming request body still uses 'title', 'year', 'genre'
    const { title, year, genre} = req.body;

    // It's good practice to allow partial updates.
    // If you always require all fields for an update, keep this validation.
    // If partial updates are allowed, remove or modify this check.
    if (!title || !year || !genre) {
        res.status(400).json({ error: "All fields are required for update" });
        return; // Prevent further execution
    }
    try {
        // Corrected: Map incoming 'title', 'year', 'genre' to 'bookTitle', 'bookYear', 'bookGenre'
        const updatedbook = await updatebookServices(bookId, { bookTitle: title, bookYear: year, bookGenre: genre });
        if (updatedbook == null) {
            res.status(404).json({ message: "book not found or failed to update" });
        } else {
            res.status(200).json(updatedbook);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to update book" });
    }
}

export const deletebook = async (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id);
    if (isNaN(bookId)) {
        res.status(400).json({ error: "Invalid book ID" });
        return; // Prevent further execution
    }
    try {
        const deletedbook = await deletebookServices(bookId);
        if (deletedbook) {
            res.status(200).json({ message: "book deleted successfully" });
        } else {
            res.status(404).json({ message: "book not found" });
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to delete book" });
    }
}