import { useState, useEffect } from 'react';
import api from "../api";
import Book from "../components/Book";
import { useNavigate } from 'react-router-dom';
import BookSearch from '../components/BookSearch';

const MyBooks = () => {
    const navigate = useNavigate();

    const [myBooks, setMyBooks] = useState([]);
    const [type, setType] = useState("to read")
    

    useEffect(() => {
        getMyBooks();
    }, []);

    const setInProg = (book) => {
        api.patch(`api/booklist/${book.id}/update/`, { list_type: 'progress' })
            .then((res) => {
                console.log(res);
                getMyBooks();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const setToFinished = (book) => {
        api.patch(`api/booklist/${book.id}/update/`, { list_type: 'finished' })
            .then((res) => {
                console.log(res);
                getMyBooks()
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

    console.log(myBooks)
    const booksToRead = myBooks.filter(book => book.list_type === "to read");
    const inProgress = myBooks.filter(book => book.list_type === "progress");
    const finished = myBooks.filter(book => book.list_type === "finished");

    return (
        <div>
        <div className="flex w-full justify-center p-4 overflow-x-hidden">
            <div className="flex flex-col lg:flex-row justify-between">
                <div className="flex flex-col items-center ">
                    {(booksToRead.length > 0 || inProgress.length > 0 || finished.length > 0 ) ? (
                        <div className="max-w-screen-lg mx-auto lg:mt-8 mb-8">
                            <div className='flex justify-center items-center text-center text-white font-primary text-3xl mt-3'>My Books</div>
                            <div className="flex flex-col items-center m-10 rounded-lg lg:p-6">
                                <div className='flex hover:cursor-pointer  text-center items-center bg-slate-900 lg:rounded-full border-2 border-gray-200'>
                                <h1 onClick={() => setType("to read")} className={`${type == "to read" ? "text-blue-500" : "text-white"} font-primary lg:text-2xl font-bold mb-4 m-5  hover:scale-110`}>To Read</h1>
                                <div className='border-gray-200 border-r-2'>.</div>
                                <h1 onClick={() => setType("in progress")} className={`${type == "in progress" ? "text-blue-500" : "text-white"} font-primary lg:text-2xl font-bold mb-4 m-5  hover:scale-110`}>In Progress </h1>
                                <div className='border-gray-200 border-r-2'>.</div>
                                <h1 onClick={() => setType("finished")} className={`${type == "finished" ? "text-blue-500" : "text-white"} font-primary lg:text-2xl font-bold mb-4 m-5  hover:scale-110`}>Finished</h1>
                                </div>
                                {type == "to read" && (
                                    <>
                                    {booksToRead.length > 0 ? (
                                        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                                        <p className="text-white text-2xl mt-16 h-screen font-secondary">No books to read...</p>
                                    )}
                                    </>  
                                )}
                                {type == "in progress" && (
                                    <>
                                    {inProgress.length > 0 ? (
                                        <div className="grid mt-14 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {inProgress.map((book) => (
                                                <div
                                                    key={book.id}
                                                    className="rounded-lg shadow-md p-4 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                                                    onClick={() => setToFinished(book)}
                                                >
                                                    <Book id={book.book} list_type={book.list_type} type="progress" />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-white text-2xl mt-16 h-screen font-secondary">No books in progress...</p>
                                    )}
                                    </>  
                                )}
                                {type == "finished" && (
                                    <>
                                    {finished.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {finished.map((book) => (
                                                <div
                                                    key={book.id}
                                                    className="rounded-lg shadow-md p-4 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                                                >
                                                    <Book id={book.book} list_type={book.list_type} type="finished" />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-white text-2xl mt-16 h-screen font-secondary">No books finished...</p>
                                    )}
                                    </>  
                                )}
                      
                            </div>
            
                        </div>
                    ) : (
                        <div>
                            <div className='font-secondary m-20 h-screen text-3xl text-white'>No Books in Your Library</div>
                        </div>
                    )}
                </div>
                {/* <div className="flex flex-col items-center lg:w-1/3 mt-8 lg:mt-0 bg-gray-800 p-4 rounded-md">
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
                </div> */}
            </div>
        </div>
        </div>
    );
};

export default MyBooks;
