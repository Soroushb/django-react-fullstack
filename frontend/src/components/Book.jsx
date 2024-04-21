import {useState, useEffect} from 'react'
import api from '../api'

const Book = ({id}) => {

  const [book, setBook] = useState(null)



  useEffect(() => {
    getBook()
  }, [])

  
  

  const getBook = () => {
    api.get(`api/books/${id}/`)
    .then((res) => res.data)
    .then((data) => {setBook(data); console.log(data)})
    .catch((err) => alert(err))
  }

  return (
    <>

<div className='m-8'>
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
  )
}

export default Book