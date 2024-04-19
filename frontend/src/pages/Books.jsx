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
        .then((data) => {setMyBooks(data);})
        .catch((err) => alert(err));
    }

    return(

        <>
        <BookSearch/>
        <p>Books</p>
        {myBooks.map((book) => (<Book key={book.id} id={book?.id}/>))}
        </>
    )

}

export default Books