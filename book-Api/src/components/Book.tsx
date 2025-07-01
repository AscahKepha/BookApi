import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { bookApi } from './features/bookApi';
import { type TBooks } from '../types/types';
import { toast, Toaster } from 'sonner';



interface BookFormInput {
    bookName: string;
    bookYear: string;
}
interface TBook{
    bookId:number;
    bookName: string;
    bookYear:number
}

export const Books: React.FC = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<BookFormInput>();
    const [editingBook, setEditingBook] = useState<TBooks | null>(null);

    // const { data: bookData, error, isLoading } = bookApi.endpoints.getAllBooks.useQuery()
    // or 
    const { data: bookData = [], error, isLoading: isBookDataLoading } = bookApi.useGetAllBooksQuery({})
    const [deleteBook] = bookApi.useDeleteBookByIdMutation();
    const [addBook] = bookApi.useAddBookMutation();
    const [updateBook] = bookApi.useUpdateBookMutation()

    const onSubmit = async (data: BookFormInput) => {
        try {
            
            if (editingBook) {
                let updateBookData = {
                    bookId: editingBook.bookId,
                    bookName: data.bookName,
                    bookYear: data.bookYear
                }
                // Update book
                await updateBook(updateBookData).unwrap();
                toast.success("Book updated successfully 😎")
                setEditingBook(null);
                reset({ bookName: '', bookYear: '' });
            } else {
                // Add book
                const response = await addBook(data).unwrap();
                console.log("🚀 ~ onSubmit ~ response:", response)
                toast.success(response?.message)
                reset();
            }
        } catch (err: any) {
            console.error('Error adding:', error);
            toast.error('Failed to add or Update : ' + (err.data.message));
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await deleteBook(id)
            toast.success(response?.data.message)
        } catch (err: any) {
            console.error('Error adding:', error);
            toast.error('Failed to add or Update : ' + (err.data?.message || err.message || err.error || err));
        }
    }

    const handleEdit = (book: TBooks) => {
        setEditingBook(book);
        reset({
            bookName: book.bookName,
            bookYear: book.bookYear
        });
    };






    return (
        <div className="app">
            <Toaster
                richColors
                position="top-right"
            />
            <h3>Book Repository</h3>
            <form className="book-form" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Book Name"
                    {...register('bookName', { required: true })}
                />
                {errors.bookName && <span className="error" style={{ color: 'red' }}>Title is required</span>}
                <input
                    type="number"
                    placeholder="Book Year"
                    {...register('bookYear', { required: true })}
                />
                {errors.bookYear && <span className="error" style={{ color: 'red' }}>Author is required</span>}

                <button type="submit">{editingBook ? 'Update Book' : 'Add Book'}</button>
            </form>



            {
                isBookDataLoading ? (
                    <div className="loading">
                        Loading...
                    </div>
                ) : bookData?.length === 0 ? (
                    <div className="no-records" style={{ color: 'red' }}>
                        No Books Availabe 😓
                    </div>
                ) : (
                    <table className="book-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Book</th>
                                <th>Year</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookData?.map((book: TBooks) => (
                                    <tr key={book.bookId}>
                                        <td>{book.bookId}</td>
                                        <td>{book.bookName}</td>
                                        <td>{book.bookYear}</td>
                                        <td>
                                            <button onClick={() => handleDelete(book.bookId)}>Delete</button>
                                            <button style={{ background: "blue", marginLeft: '4px' }} onClick={() => handleEdit(book)}>Update</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )}
        </div>
    )
}