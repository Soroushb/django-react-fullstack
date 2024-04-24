import {useState, useEffect} from "react"
import api from "../api"
import "../styles/Home.css"
import BookSearch from "../components/BookSearch"
import { useNavigate } from "react-router-dom"
import axios from "axios"


const Books = () => {

    const navigate = useNavigate()
    
    return(

        <>
        <div>
            <h1 onClick={() => navigate("/mybooks")}>My books</h1>
        </div>
        <div className="m-16">
        <BookSearch/>
        </div>
        </>
    )

}

export default Books