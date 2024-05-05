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


  const StarRating = ({ rating }) => {
    // Calculate the number of filled and empty stars
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const totalStars = 5;
    const emptyStars = totalStars - filledStars - (hasHalfStar ? 1 : 0);
  
    // Create an array of stars to render
    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<i key={i} className="text-yellow-400 fas fa-star"></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="text-yellow-400 fas fa-star-half-alt"></i>);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={i + filledStars + (hasHalfStar ? 1 : 0)} className="text-gray-300 far fa-star"></i>);
    }
  
    return <div className="flex items-center">{stars}</div>;
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
              
              {inLibrary && (
                <button onClick={handleAddToLibrary} className="inline-block bg-gray-200 px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2">
                Add to library
              </button>
              )}
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Book;