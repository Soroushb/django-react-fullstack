import {useState, useEffect} from "react"
import api from "../api"
import "../styles/Home.css"
import BookSearch from "../components/BookSearch"
import { useNavigate } from "react-router-dom"
import axios from "axios"


const Books = () => {


  
    
    return(

        <>
        <div className="h-full">
        <BookSearch/>
        </div>
        </>
    )

}

export default Books