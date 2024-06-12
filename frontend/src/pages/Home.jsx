import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import graph from "../styles/img/graph.png";
import book from "../styles/img/bok.png";
import "../styles/Home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* Large Screen */}
            <div className="lg:flex hidden flex-col justify-center items-center m-20">
                <motion.div
                    className="flex lg:flex-row flex-col justify-between w-full"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="flex lg:flex-row flex-col justify-between w-full">
                        <div className="p-8 flex flex-col">
                            <h1 className="font-secondary text-4xl text-white hover:scale-105">Welcome to GoalTracker!</h1>
                            <motion.div
                                className="flex justify-between w-full"
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1 }}
                            >
                                <div className="flex flex-col justify-center">
                                    <h2 className="font-secondary text-lg text-gray-400 hover:scale-105 mt-12">
                                        GoalTracker is your ultimate tool for staying organized, motivated, and on track with all your personal and professional goals. Whether you’re aiming to improve your fitness, enhance your skills, manage your time better, or simply keep your reading list in order, GoalTracker has got you covered. Our web app offers a suite of features designed to help you set, monitor, and achieve your goals with ease.
                                    </h2>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="flex lg:flex-row flex-col justify-between w-full m-24"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="flex lg:flex-row flex-col justify-between w-full">
                        <div className="p-8 flex flex-col">
                            <h1 className="font-secondary text-4xl text-white hover:scale-105">Monitor Your Progress</h1>
                            <motion.div
                                className="flex justify-between w-full"
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1 }}
                            >
                                <div className="flex flex-col justify-center">
                                    <h2 className="font-secondary text-lg text-gray-400 hover:scale-105 mt-12">
                                        Stay on top of your goals with our "Monitor Your Progress" feature. Easily add your daily activities and log the time you spend on each. Visualize your progress with clear, detailed graphs that help you track your performance over time. Whether you're aiming to improve your fitness, learn a new skill, or manage your time better, our tool provides you with the insights you need to stay motivated and on track.
                                    </h2>
                                    <button onClick={() => navigate("/register")} className="text-white w-40 mt-4 hover:scale-105 bg-blue-900 p-2 rounded-lg text-xl font-secondary shadow-sm shadow-black">
                                        Sign Up
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                        <img src={graph} height={700} width={700} className="rounded-xl shadow-lg shadow-black hover:scale-105" />
                    </div>
                </motion.div>

                <motion.div
                    className="flex lg:flex-row flex-col justify-between w-full m-24"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    <img src={book} height={350} width={350} className="rounded-xl shadow-lg shadow-black hover:scale-105" />
                    <div className="flex justify-between w-full">
                        <div className="p-8 flex flex-col">
                            <h1 className="font-secondary text-4xl text-white hover:scale-105">Manage Your Books</h1>
                            <motion.div
                                className="flex justify-between w-full"
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1 }}
                            >
                                <div className="flex flex-col justify-center">
                                    <h2 className="font-secondary text-lg text-gray-400 hover:scale-105 mt-12">
                                        Stay organized and enhance your reading experience with our book management feature. Users can easily search for books and add them to their personal library. You can categorize your books by choosing their status: "To Read," "In Progress," or "Finished." This feature helps you keep track of what you plan to read, your current reads, and the books you've completed, providing a comprehensive overview of your reading journey. Whether you're an avid reader or just starting, our tool supports your literary adventures and keeps you motivated to reach your reading goals.
                                    </h2>
                                    <button onClick={() => navigate("/register")} className="text-white w-40 mt-4 hover:scale-105 bg-blue-900 p-2 rounded-lg text-xl font-secondary shadow-sm shadow-black">
                                        Sign Up
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="flex justify-between w-full"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="flex justify-between w-full">
                        <div className="p-8 flex flex-col">
                            <h1 className="font-secondary text-4xl text-white hover:scale-105">Track Your Deadlines</h1>
                            <motion.div
                                className="flex justify-between w-full"
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1 }}
                            >
                                <div className="flex flex-col justify-center">
                                    <h2 className="font-secondary text-lg text-gray-400 hover:scale-105 mt-12">
                                        Keep track of your goals and manage your time effectively with our deadline tracking feature. Users can add their goals and set deadlines, and the web app will display the progress of time on a dynamic progress bar. This feature provides a visual representation of how much time you have left to achieve your goals, helping you stay focused and motivated. Whether you're working on a project, preparing for an exam, or setting personal milestones, our tool ensures you stay on track and make the most of your time.
                                    </h2>
                                    <button onClick={() => navigate("/register")} className="text-white w-40 mt-4 hover:scale-105 bg-blue-900 p-2 rounded-lg text-xl font-secondary shadow-sm shadow-black">
                                        Sign Up
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                        <img src={graph} height={700} width={700} className="rounded-xl shadow-lg shadow-black hover:scale-105" />
                    </div>
                </motion.div>
            </div>

            {/* Mobile Screen */}
            <div className="lg:hidden flex flex-col items-center m-4">
                <motion.div
                    className="flex flex-col justify-between w-full"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="p-4 flex flex-col text-center ">
                        <h1 className="font-secondary text-2xl text-white hover:scale-105">Welcome to GoalTracker!</h1>
                        <button onClick={() => navigate("/register")} className="text-900 bg-gray-200 text-xl p-1 mt-4 font-secondary rounded-md w-1/2 self-center">Join Us Today!</button>
                        <motion.div
                            className="flex justify-between w-full"
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <div className="flex flex-col justify-center">
                                <h2 className="font-secondary text-md text-gray-400 hover:scale-105 mt-12">
                                    Goal Tracker is your ultimate tool for staying organized, motivated, and on track with all your personal and professional goals. Whether you’re aiming to improve your fitness, enhance your skills, manage your time better, or simply keep your reading list in order, GoalTracker has got you covered. Our web app offers a suite of features designed to help you set, monitor, and achieve your goals with ease.
                                </h2>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    className="flex flex-col justify-between w-full mt-4"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="p-4 flex flex-col">
                        <h1 className="font-secondary text-2xl text-center text-white hover:scale-105">Monitor Your Progress</h1>
                        
                        <motion.div
                            className="flex flex-col justify-between w-full"
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <div className="p-4 mt-2">
                                <img src={graph} height={700} width={700} className="rounded-xl shadow-md shadow-black hover:scale-105" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h2 className="font-secondary text-center text-md text-gray-400 hover:scale-105 mt-12">
                                    Stay on top of your goals with our "Monitor Your Progress" feature. Easily add your daily activities and log the time you spend on each. Visualize your progress with clear, detailed graphs that help you track your performance over time. Whether you're aiming to improve your fitness, learn a new skill, or manage your time better, our tool provides you with the insights you need to stay motivated and on track.
                                </h2>
                                <button onClick={() => navigate("/register")} className="text-white w-40 mt-4 hover:scale-105 bg-blue-900 self-center p-2 rounded-lg text-lg font-secondary shadow-sm shadow-black">
                                    Sign Up
                                </button>
                            </div>
                        </motion.div>
                    </div>
                    
                </motion.div>

                <motion.div
                    className="flex flex-col justify-between w-full mt-4"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="p-4 flex items-middle flex-col">
                        <h1 className="font-secondary text-2xl text-white text-center hover:scale-105">Manage Your Books</h1>
                        <motion.div
                            className="flex justify-between w-full"
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <div className="flex flex-col justify-center">
                            <div className="p-4 flex justify-center">
                        <img src={book} height={200} width={200} className="rounded-xl self-center hover:scale-105" />
                    </div>
                                <h2 className="font-secondary text-md text-gray-400 hover:scale-105 mt-12">
                                    Stay organized and enhance your reading experience with our book management feature. Users can easily search for books and add them to their personal library. You can categorize your books by choosing their status: "To Read," "In Progress," or "Finished." This feature helps you keep track of what you plan to read, your current reads, and the books you've completed, providing a comprehensive overview of your reading journey. Whether you're an avid reader or just starting, our tool supports your literary adventures and keeps you motivated to reach your reading goals.
                                </h2>
                                <button onClick={() => navigate("/register")} className="text-white self-center w-40 mt-4 hover:scale-105 bg-blue-900 p-2 rounded-lg text-lg font-secondary shadow-sm shadow-black">
                                    Sign Up
                                </button>
                            </div>
                        </motion.div>
                    </div>
                    
                </motion.div>

                <motion.div
                    className="flex flex-col justify-between w-full mt-4"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="p-4 flex flex-col">
                        <h1 className="font-secondary text-2xl text-center text-white hover:scale-105">Track Your Deadlines</h1>
                        <motion.div
                            className="flex justify-between w-full"
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <div className="flex flex-col justify-center">
                                <h2 className="font-secondary text-md text-gray-400 hover:scale-105 mt-12">
                                    Keep track of your goals and manage your time effectively with our deadline tracking feature. Users can add their goals and set deadlines, and the web app will display the progress of time on a dynamic progress bar. This feature provides a visual representation of how much time you have left to achieve your goals, helping you stay focused and motivated. Whether you're working on a project, preparing for an exam, or setting personal milestones, our tool ensures you stay on track and make the most of your time.
                                </h2>
                                <button onClick={() => navigate("/register")} className="text-white w-40 mt-4 hover:scale-105 bg-blue-900 p-2 rounded-lg text-lg font-secondary shadow-sm shadow-black">
                                    Sign Up
                                </button>
                            </div>
                        </motion.div>
                    </div>
                    <div className="p-4">
                        <img src={graph} height={700} width={700} className="rounded-xl shadow-md shadow-black hover:scale-105" />
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Home;
