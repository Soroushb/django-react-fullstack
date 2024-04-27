import React, {useState, useEffect} from 'react'
import api from "../api"
import Book from "../components/Book"
import { useNavigate } from 'react-router-dom'

const MyBooks = () => {

    const navigate = useNavigate()
    const [myBooks, setMyBooks] = useState([])
    console.log(myBooks)

    useEffect(() => {
        getMyBooks()
        
    },[])

    const setInProg = (book) => {

        api.patch(`api/booklist/${book.id}/update/`, {list_type: 'progress'})
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
       
      }


    const getMyBooks = () => {
        api.get('/api/books/')
        .then((res) => res.data)
        .then((data) => {setMyBooks(data); console.log(data) })
        .catch(() => {navigate("/login")});
    }

    const booksToRead = myBooks.filter(book => book.list_type === "read")
    const inProgress = myBooks.filter(book => book.list_type === "progress")


  return (
    <div className='flex flex-col items-center'>
        <p>Books in progress:</p>
        {inProgress.length > 0 ? (
            <div className="flex flex-wrap ">
            {myBooks.map((book) => (<Book key={book.id} id={book?.book} list_type={book?.list_type} type="progress"/>))}
            </div>
        ) : (<p> No books in progress</p>)}
        
        <p>Books to read:</p>
        {booksToRead.length > 0 ? (
            <div className="flex flex-wrap" >
            {myBooks.map((book) => (<div key={book.id} onClick={() => {setInProg(book);}}><Book key={book.id} id={book?.book} list_type={book?.list_type} type="to read" /></div>))}
            </div>
        ) : (<p>No books finished.</p>)}
        
    </div>
  )
}

export default MyBooks