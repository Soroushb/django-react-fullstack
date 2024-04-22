import {useState, useEffect} from "react"
import api from "../api"
import "../styles/Home.css"
import Book from "../components/Book"
import BookSearch from "../components/BookSearch"
import { useNavigate } from "react-router-dom"
import axios from "axios"


const Books = () => {

    const navigate = useNavigate()
    const [myBooks, setMyBooks] = useState([])
    console.log(myBooks)

    useEffect(() => {
        getMyBooks()
        
    }, [])


    const getMyBooks = () => {
        api.get('/api/books/')
        .then((res) => res.data)
        .then((data) => {setMyBooks(data); console.log(data) })
        .catch(() => {navigate("/login")});
    }

    

    return(

        <>
        <div className="m-16">
        <BookSearch/>
        <p>Books in progress:</p>
        <div className="flex flex-wrap ">
        {myBooks.map((book) => (<Book key={book.id} id={book?.book} list_type={book?.list_type} type="progress"/>))}
        </div>
        <p>Books to read:</p>
        <div className="flex flex-wrap ">
        {myBooks.map((book) => (<Book key={book.id} id={book?.book} list_type={book?.list_type} type="read"/>))}
        </div>

        </div>
        </>
    )

}

export default Books