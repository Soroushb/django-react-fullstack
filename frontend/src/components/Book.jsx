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
    .then((data) => {setBook(data);})
    .catch((err) => alert(err))
  }

  return (
    <div>{book?.title} by {book?.author}</div>
  )
}

export default Book