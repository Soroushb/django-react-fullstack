import api from '../api';
import { useState } from 'react';
import LoadingIndicator from './LoadingIndicator';

const BookSearch = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    console.log(books)

    const handleBookClick = async (book) => {
        try {
            console.log(book)
            const { title, author, publicationYear, rating, ratings, smallImageURL, url } = book;
            const res = await api.post("/api/book/", { title, author, published_year: publicationYear, rating, ratings, smallImageURL, url  });

            if (res.status === 201) {
                alert("Book Created");

                // Add the book to the user's BookList
                const bookId = res.data.id;
                const bookListData = {
                    list_type: "read",
                    book: bookId, // Use the book ID, not the entire book object
                    user: 1 // Replace '6' with the current user's ID retrieved from token
                };

                const bookListRes = await api.post("/api/books/", bookListData);
                if (bookListRes.status === 201) {
                    alert("Book added to BookList");
                } else {
                    alert("Failed to add book to BookList");
                }
            } else {
                alert("Failed to create the book");
            }
        } catch (error) {
            console.error('Error creating or adding book:', error);
            alert('Failed to create or add the book. Check console for details.');
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();

        const params = new URLSearchParams({
            q: searchTerm,
            page: "1"
        });

        try {
            const response = await fetch(`https://goodreads-books.p.rapidapi.com/search?${params}`, {
                headers: {
                    'X-RapidAPI-Key': 'f72da7c950msh11ea433ca5651cbp1b213cjsn8deca4e8e5a6',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            
            const data = await response.json();
            !data ? setLoading(true) : setLoading(false)
            setBooks(data); // Update state with fetched books
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data. Check console for details.');
        }
    };

    return (
        <div>
            <form className="max-w-md mx-auto" onSubmit={handleSearch}>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Mockups, Logos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Search
                    </button>
                </div>
            </form>

            <div className='flex flex-wrap w-full justify-center'>
            {loading && <LoadingIndicator/>}
            {books.length > 0 ? (
            books?.map((book) => (
                <>
                <div className='m-8' onClick={() => handleBookClick(book)} key={book._id}>
                    <div className="flex flex-col justify-center items-center max-w-40 h-full rounded overflow-hidden shadow-lg">
                    <img className="" src={book?.smallImageURL} alt="Sunset in the mountains"/>
                    <div className="px-6 py-4">
                        <div className="font-bold mb-2">{book?.title}</div>
                        <p className="text-gray-700 text-base">
                        Rating: {book?.rating}
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                    </div>
                    </div>
                </div>
            </>
            ))
        ) : (<p>No books found.</p>)}
              </div>
        </div>
    );
};

export default BookSearch;