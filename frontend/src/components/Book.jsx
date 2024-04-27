import React, { useState, useEffect } from 'react';
import api from '../api';

const Book = ({ id, list_type, type, setInProg, setToFinished }) => {
  const [book, setBook] = useState(null);

  console.log(book)

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
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {list_type}
              </span>
              <span onClick={() => {setInProg(book);}} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2">
                Add to in progress
              </span>
              <span onClick={() => {setToFinished(book);}} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2">
                Add to finished
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Book;