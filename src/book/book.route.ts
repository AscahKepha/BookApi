import { Router } from "express";
import { createbook, deletebook, getbookById, getbooks, updatebook } from "./book.controllers";

export const bookRouter = Router();

// User routes definition


// Get all users
bookRouter.get('/book',getbooks);

// Get user by ID
bookRouter.get('/book/:id', getbookById);

// Create a new user
bookRouter.post('/book', createbook);

// Update an existing user
bookRouter.put('/book/:id',updatebook);

// Update an existing user with partial fields
// userRouter.patch('/users/:id', updateUserPartial);

// Delete an existing user
bookRouter.delete('/book/:id',deletebook);