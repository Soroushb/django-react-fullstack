import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css";
import Charts from "../components/Charts";
import { useNavigate } from "react-router-dom";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const Home = () => {
    

    return (
        <div className="flex justify-center items-center ">
            
            <div>
            <Charts/>
            </div>
        </div>
    );
};

export default Home;
