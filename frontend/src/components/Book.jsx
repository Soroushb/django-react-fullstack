import React, { useState, useEffect } from 'react';
import api from '../api';

const Book = ({ id, list_type, type, setInProg, setToFinished, setToRead, inLibrary }) => {

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
    const confirmMessage = `Do you want to add "${book.title}" to ${type == "to read" ? "in progress" : "Finished"}?`;
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
    <div>
    {type === list_type && book && ( // Check if 'type' matches 'list_type' and 'book' is not null
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
              
              {list_type == "to read" && 
              (
                <button onClick={handleAddToLibrary} className="inline-block bg-gray-200 rounded-md p-2 text-sm font-semibold text-green-700 mr-2 mb-2">
                Add to In Progress
              </button>
              )
              }

              {list_type == "progress" && 
              (
                <button onClick={handleAddToLibrary} className="inline-block bg-gray-200 rounded-md  p-2 text-sm font-semibold text-green-700 mr-2 mb-2">
                  Mark as Finished
              </button>
              )
              }

              {inLibrary && (
                <button onClick={handleAddToLibrary} className="inline-block bg-gray-200 px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2">
                Add to library
              </button>
              )}

              
            </div>
          </div>
        </div>
      )}
    </div>
      
    </>
  );
};

export default Book;