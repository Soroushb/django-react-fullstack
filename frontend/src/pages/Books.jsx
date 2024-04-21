import {useState, useEffect} from "react"
import api from "../api"
import "../styles/Home.css"
import Book from "../components/Book"
import BookSearch from "../components/BookSearch"
import { useNavigate } from "react-router-dom"
import axios from "axios"


const Books = () => {


    const [myBooks, setMyBooks] = useState([])

    useEffect(() => {
        getMyBooks()
    }, [])


    const getMyBooks = () => {
        api.get('/api/books/')
        .then((res) => res.data)
        .then((data) => {setMyBooks(data); console.log(data) })
        .catch((err) => alert(err));
    }

    

    return(

        <>
        <div className="m-16">
        <BookSearch/>
        <p>Books</p>
        <div className="flex">
        {myBooks.map((book) => (<Book key={book.id} id={book?.book}/>))}
        </div>
        </div>
        </>
    )

}

export default Books