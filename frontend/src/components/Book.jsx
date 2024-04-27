import React, { useState, useEffect } from 'react';
import api from '../api';

const Book = ({ id, list_type, type, setInProg, setToFinished, setToRead }) => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    getBook();
  }, [id]); // Re-fetch book data whenever 'id' changes

  const getBook = () => {
    api.get(`api/books/${id}/`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.error('Error fetching book:', err);
        // Handle error (e.g., show error message)
      });
  };

  const handleAddToLibrary = () => {
    const confirmMessage = `Do you want to add "${book.title}" to ${type}?`;
    if (window.confirm(confirmMessage)) {
      switch (type) {
        case 'progress':
          setInProg(book);
          break;
        case 'to read':
          setToRead(book);
          break;
        case 'finished':
          setToFinished(book);
          break;
        default:
          break;
      }
    }
  };

  // Render the Book component conditionally based on 'type' and 'list_type'
  return (
    <>
      {type === list_type && book && ( // Check if 'type' matches 'list_type' and 'book' is not null
        <div className="m-8">
          <div className="flex flex-col justify-center items-center max-w-40 h-full rounded overflow-hidden shadow-lg">
            <img className="" src={book.smallImageURL} alt={book.title} />
            <div className="px-6 py-4">
              <div className="font-bold mb-2">{book.title}</div>
              <p className="text-gray-700 text-base">Rating: {book.rating}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {list_type}
              </span>
              <button onClick={handleAddToLibrary} className="inline-block bg-gray-200 px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2">
                Add to library
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Book;