import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css";
import Charts from "../components/Charts";
import { useNavigate } from "react-router-dom";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import graph from "../styles/img/graph.png"
import book from "../styles/img/bok.png"

import { motion } from 'framer-motion';

const Home = () => {
    
    const navigate = useNavigate()

    return (
        <div className="flex flex-col justify-center items-center m-20">
            
            <motion.div 
            className="flex justify-between w-full"
            initial={{ y: -100, opacity: 0}}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            > 
                <div className="flex justify-between w-full"> 
                <div className=" p-8 flex flex-col">
                <h1 className="font-secondary text-4xl text-white hover:scale-105" >Monitor Your Progress</h1>
                <motion.div 
            className="flex justify-between w-full"
            initial={{ y: -100, opacity: 0}}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            > 
                <div className="flex flex-col justify-center">
                <h2 className="font-secondary text-lg text-gray-400 hover:scale-105 mt-12">Stay on top of your goals with our "Monitor Your Progress" feature. Easily add your daily activities and log the time you spend on each. Visualize your progress with clear, detailed graphs that help you track your performance over time. Whether you're aiming to improve your fitness, learn a new skill, or manage your time better, our tool provides you with the insights you need to stay motivated and on track.</h2>
                <button onClick={() => navigate("/register")} className="text-white w-40 mt-4 hover:scale-105 bg-blue-900 p-2 rounded-lg text-xl font-secondary shadow-sm shadow-black">Sign Up</button>
                </div>
                </motion.div>

                </div>
                <img src={graph} height={700} width={700} className="rounded-xl shadow-lg shadow-black hover:scale-105"/>
                </div>
                
            </motion.div>

            <motion.div 
            className="flex justify-between w-full m-24"
            initial={{ y: -100, opacity: 0}}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            > 
                 <img src={book} height={350} width={350} className="rounded-xl shadow-l hover:scale-105"/>

                <div className="flex justify-between w-full"> 
                <div className=" p-8 flex flex-col">
                <h1 className="font-secondary text-4xl text-white hover:scale-105" >Manage Your Books</h1>
                <motion.div 
            className="flex justify-between w-full"
            initial={{ y: -100, opacity: 0}}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            > 
                <div className="flex flex-col justify-center">
                <h2 className="font-secondary text-lg text-gray-400 hover:scale-105 mt-12">Stay organized and enhance your reading experience with our book management feature. Users can easily search for books and add them to their personal library. You can categorize your books by choosing their status: "To Read," "In Progress," or "Finished." This feature helps you keep track of what you plan to read, your current reads, and the books you've completed, providing a comprehensive overview of your reading journey. Whether you're an avid reader or just starting, our tool supports your literary adventures and keeps you motivated to reach your reading goals.</h2>
                <button onClick={() => navigate("/register")} className="text-white w-40 mt-4 hover:scale-105 bg-blue-900 p-2 rounded-lg text-xl font-secondary shadow-sm shadow-black">Sign Up</button>
                </div>
                </motion.div>

                </div>
                </div>
                
            </motion.div>

            <motion.div 
            className="flex justify-between w-full"
            initial={{ y: -100, opacity: 0}}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            > 
                <div className="flex justify-between w-full"> 
                <div className=" p-8 flex flex-col">
                <h1 className="font-secondary text-4xl text-white hover:scale-105" >Track Your Deadlines</h1>
                <motion.div 
            className="flex justify-between w-full"
            initial={{ y: -100, opacity: 0}}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            > 
                <div className="flex flex-col justify-center">
                <h2 className="font-secondary text-lg text-gray-400 hover:scale-105 mt-12">Keep track of your goals and manage your time effectively with our deadline tracking feature. Users can add their goals and set deadlines, and the web app will display the progress of time on a dynamic progress bar. This feature provides a visual representation of how much time you have left to achieve your goals, helping you stay focused and motivated. Whether you're working on a project, preparing for an exam, or setting personal milestones, our tool ensures you stay on track and make the most of your time.</h2>
                <button onClick={() => navigate("/register")} className="text-white w-40 mt-4 hover:scale-105 bg-blue-900 p-2 rounded-lg text-xl font-secondary shadow-sm shadow-black">Sign Up</button>
                </div>
                </motion.div>

                </div>
                <img src={graph} height={700} width={700} className="rounded-xl shadow-lg shadow-black hover:scale-105"/>
                </div>
                
            </motion.div>

        </div>
    );
};

export default Home;
