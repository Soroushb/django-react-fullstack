import { useState, useEffect } from 'react';
import api from "../api";
import Book from "../components/Book";
import { useNavigate } from 'react-router-dom';
import BookSearch from '../components/BookSearch';

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

    const LoadingIndicator = () => {
        return (
            <div className="loading-container h-full flex items-center justify-center">
                <div className="loader"></div>
            </div>
        );
    };

    const setToFinished = (book) => {
        api.patch(`api/booklist/${book.id}/update/`, { list_type: 'finished' })
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
    const finished = myBooks.filter(book => book.list_type === "finished");

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row justify-between">
                <div className="flex flex-col items-center lg:w-2/3">
                    {booksToRead.length > 0 ? (
                        <div className="max-w-screen-lg mx-auto mt-8">
                            <div className="flex flex-col items-center m-10 rounded-lg p-6 ">
                                <h1 className="text-3xl font-bold mb-4 text-white">Books In Progress:</h1>
                                {inProgress.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {inProgress.map((book) => (
                                            <div
                                                key={book.id}
                                                className="rounded-lg shadow-md p-4 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                                                onClick={() => setInProg(book)}
                                            >
                                                <Book id={book.book} list_type={book.list_type} type="progress" />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600">No books in progress</p>
                                )}
                            </div>
                            <div className="flex flex-col items-center m-10 rounded-lg p-6 ">
                                <h1 className="text-3xl font-bold mb-4 text-white">Books To Read:</h1>
                                {booksToRead.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {booksToRead.map((book) => (
                                            <div
                                                key={book.id}
                                                className="rounded-lg shadow-md p-4 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                                                onClick={() => setInProg(book)}
                                            >
                                                <Book id={book.book} list_type={book.list_type} type="to read" />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600">No books to read</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <LoadingIndicator />
                    )}
                </div>
                <div className="flex flex-col items-center lg:w-1/3 mt-8 lg:mt-0 bg-gray-800 p-4 rounded-md">
                    <h1 className="text-white text-xl mb-4">Books Finished:</h1>
                    {finished.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {finished.map((book) => (
                                <div
                                    key={book.id}
                                    className="rounded-lg shadow-md p-4 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                                    onClick={() => setToFinished(book)}
                                >
                                    <Book id={book.book} list_type={book.list_type} type="finished" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No books finished</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyBooks;
