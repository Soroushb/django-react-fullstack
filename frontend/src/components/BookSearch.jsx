import api from '../api';
import { useEffect, useState } from 'react';
import LoadingIndicator from './LoadingIndicator';
import { useNavigate } from 'react-router-dom';
import { getYear } from 'date-fns';

const BookSearch = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [myBooks, setMyBooks] = useState([])
    const [bookIds, setBookIds] = useState([])
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate()
    const [submitClicked, setSubmitClicked] = useState(false)
    let bookType = ""


    
    useEffect(() => {
        const getMyBooks = async () => {
            try {
                const res = await api.get('/api/books/');
                const data = res.data;
                setMyBooks(data);
    
                const ids = data.map((book) => book.orgId);
                setBookIds(ids);
            } catch (error) {
                navigate("/login");
            }
        };
    
        getMyBooks();
    }, []);


    console.log(myBooks)

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



    const handleBookClick = async (book, bookType) => {


        if (bookIds.includes(book?.id)){
            setShowError(true)
            alert("This book already exists in your library")

        }else{

            try {

                const { id, title, author, publicationYear, rating, ratings, smallImageURL, url } = book;
                console.log(book)
    
                const res = await api.post("/api/book/", { orgId: id, title, author, published_year: publicationYear, rating, ratings, smallImageURL, url  });
                console.log(res)
                if (res.status === 201) {
    
                    const bookId = res.data.id;
                    const bookListData = {
                        list_type: bookType,
                        book: bookId,
                        user: 1, 
                        orgId: id
                    };
    
                    const bookListRes = await api.post("/api/books/", bookListData);
                    console.log(bookListRes)
                    if (bookListRes.status === 201) {
                        alert("Book added to your library");
                        setShowError(false)
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
        }
        
        
    };

    

    return (
        <div className="min-h-screen">
        <div className='m-12 overflow-x-hidden h-full'>
            <div className='flex flex-col  justify-center items-center'>
            <h1 className="text-3xl font-bold mb-4 font-primary text-white">Search For Books:</h1>
            <h2 className="flex flex-col items-center text-2xl font-bold mb-4 font-secondary text-gray-200">Add them to your 
            <h1 onClick={() => navigate("/mybooks")} className="text-3xl font-primary mb-4 font-bold text-white bg-slate-800 p-2 rounded-md mt-2 hover:scale-105 hover:cursor-pointer">  Library</h1></h2>
            </div>
   
            <form className="max-w-md mx-auto bg-transparent relative" onSubmit={handleSearch}>
    <label htmlFor="default-search" className="sr-only font-secondary">Search</label>
    <div className="relative">
        <input
            type="search"
            id="default-search"
            className="block font-secondary w-full md:w-96 p-4 text-sm text-gray-200 rounded-lg bg-transparent focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 focus:placeholder-opacity-75"
            placeholder="Search Books and Authors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
        />
        <button
            type="submit"
            onClick={() => setSubmitClicked(true)}
            className="text-white font-secondary absolute top-1/2 transform -translate-y-1/2 right-8 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
            Search
        </button>
    </div>
</form>
        
        {showError && (
                    <div className='flex justify-center text-center text-red-600 text-xl'>The book already exists in your library</div>
        )}

            <div className='flex flex-wrap w-full justify-center'>
            {loading && <LoadingIndicator/>}
            {books.length > 0 ? (
            books?.map((book) => (
                <>
            <div className="m-8 group">
          <span className="absolute top-0 left-full w-max bg-white shadow-lg p-2 rounded-md invisible group-hover:visible">{book?.title}</span>
          <div className="flex flex-col justify-center items-center max-w-40 h-full rounded overflow-hidden shadow-lg">
            <img className="" src={book.smallImageURL} alt={book.title} />
            <div className="px-6 py-4 flex items-center flex-col justify-center">
              <div className='relative group'>
              <div className="font-bold text-white mb-2 flex justify-center items-center">{book.title?.substring(0, 12)}.. 
          </div>
              </div>
              <p className="text-gray-300 text-base">Rating: {book.rating}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <div onClick={() => handleBookClick(book,  bookType = "to read")} className='bg-blue-200 p-2 text-gray-700 hover:scale-110 hover:cursor-pointer rounded-lg'>Add to library</div>
            </div>
          </div>
        </div>
            </>
            ))
        ) : ( <p className='text-gray-300 mt-8 font-bold'>  </p>)}
              </div>
        </div>
        </div>
    );
};

export default BookSearch;