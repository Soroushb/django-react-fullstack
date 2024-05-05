import React, { useState, useEffect } from 'react';
import api from "../api";
import Book from "../components/Book";
import { useNavigate } from 'react-router-dom';

const MyBooks = () => {
    const navigate = useNavigate();
    const [myBooks, setMyBooks] = useState([]);

    useEffect(() => {
        getMyBooks();
    }, []);

    const setInProg = (book) => {
        api.patch(`api/booklist/${book.id}/update/`, { list_type: 'progress' })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const setToRead = (book) => {
        api.patch(`api/booklist/${book.id}/update/`, { list_type: 'to read' })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getMyBooks = () => {
        api.get('/api/books/')
            .then((res) => res.data)
            .then((data) => {
                setMyBooks(data);
            })
            .catch(() => {
                navigate("/login");
            });
    };

    const booksToRead = myBooks.filter(book => book.list_type === "to read");
    const inProgress = myBooks.filter(book => book.list_type === "progress");

    return (
        <div className='flex flex-col items-center'>
            <div className='flex'>
            <div className="max-w-screen-lg mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-4 text-gray-800 invisible">My Books</h1>
                
                <div className="m-10 rounded-lg p-6=">
                        <h2 className="text-xl text-white font-semibold mb-4">Books in progress:</h2>
                        {inProgress?.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {inProgress?.map((book) => (
                                    <div key={book.id} className=" rounded-lg shadow-md p-4 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105" onClick={() => setInProg(book)}>
                                        <Book id={book.book} list_type={book.list_type} type="progress" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600">No books in progress</p>
                        )}
                    </div>
                   
                    <div>
                    <div className="m-10 rounded-lg p-6=">
                        <h2 className="text-xl text-white font-semibold mb-4">Books to Read:</h2>
                        {booksToRead.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {booksToRead.map((book) => (
                                    <div key={book.id} className=" rounded-lg shadow-md p-4 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105" onClick={() => setInProg(book)}>
                                        <Book id={book.book} list_type={book.list_type} type="to read" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600">No books to read</p>
                        )}
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default MyBooks;