import React, { useEffect, useState, useRef } from "react";
import { Form, useNavigate } from "react-router-dom";
import { motion, useInView } from 'framer-motion';
import graph from "../styles/img/graph.png";
import book from "../styles/img/bok.png";
import sandClock from "../styles/img/sand-clock.png"
import "../styles/Home.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Home = () => {


    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [showMore, setShowMore] = useState(false);
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true });
    
    let i = 1;

    useEffect(() => {
        setTimeout(() => {
        setPage(page + 1)  
        if(page > 2) setPage(1)         
        console.log(page)
        

        }, 5000)
        
    }, [page])
    

    return (
        <>
            {/* Large Screen */}
            <div ref={ref} className="lg:flex hidden flex-col justify-center items-center m-20">

            
            <motion.div
                    className="flex p-14 justify-between w-full"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="p-4 flex flex-col text-center ">
                        <h1 className="font-secondary mb-5 text-4xl text-white hover:scale-105">Welcome to Goal-Tracker!</h1>
                        <button onClick={() => navigate("/register")} className="text-900 bg-gray-200 text-xl p-3 hover:scale-110 mt-4 font-secondary rounded-md  self-center">Join Us Today!</button>
                        <motion.div
                            className="flex justify-between w-full"
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1 }}
                        >

                            
                            <div className="flex flex-col justify-center">
                                <h2 className="font-secondary text-lg text-gray-200 hover:scale-105 mt-12">
                                    Goal Tracker is your ultimate tool for staying organized, motivated, and on track with all your personal and professional goals. Whether you’re aiming to improve your fitness, enhance your skills, manage your time better, or simply keep your reading list in order, GoalTracker has got you covered. Our web app offers a suite of features designed to help you set, monitor, and achieve your goals with ease.
                                </h2>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    ref={ref}
                    className="flex lg:flex-row p-14 flex-col justify-between w-full m-24"
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9 }}
                    variants={{
                        visible: { opacity: 1, x: 0 },
                        hidden: { opacity: 0, x: -100 }
                    }}
                >
                    <div className="flex lg:flex-row flex-col justify-between w-full">
                        <div className="p-8 flex flex-col">
                            <h1 className="font-secondary text-2xl text-white hover:scale-105">Monitor Your Progress</h1>
                            <motion.div
                                className="flex justify-between w-full"
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1 }}
                            >
                                <div className="flex flex-col justify-center">
                                    <h2 className="font-secondary text-md text-gray-400 hover:scale-105 mt-12">
                                        Stay on top of your goals with our "Monitor Your Progress" feature. Easily add your daily activities and log the time you spend on each. Visualize your progress with clear, detailed graphs that help you track your performance over time. Whether you're aiming to improve your fitness, learn a new skill, or manage your time better, our tool provides you with the insights you need to stay motivated and on track.
                                    </h2>
                                    <button onClick={() => navigate("/register")} className="text-white w-40 mt-4 hover:scale-105 bg-blue-900 p-2 rounded-lg text-xl font-secondary shadow-sm shadow-black">
                                        Sign Up
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                        <img src={graph} height={700} width={700} className="rounded-xl shadow-lg shadow-black text-white hover:scale-105" />
                    </div>
                </motion.div>

                    
                <motion.div
                initial="hidden"
                whileInView="visible"
                ref={ref}
                className="flex lg:flex-row flex-col p-14 justify-between w-full m-24"
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9 }}
                variants={{
                    visible: { opacity: 1, x: 0 },
                    hidden: { opacity: 0, x: 100 }
                }}
            >
                <img src={book} height={300} width={350} className="rounded-xl  hover:scale-105" />
                <div className="flex justify-between w-full">
                    <div className="p-8 flex flex-col">
                        <h1 className="font-secondary text-2xl text-white hover:scale-105">Manage Your Books</h1>
                        <motion.div
                            className="flex justify-between w-full"
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <div className="flex flex-col justify-center">
                                <h2 className="font-secondary text-md text-gray-400 hover:scale-105 mt-12">
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
                    initial="hidden"
                    whileInView="visible"
                    ref={ref}
                    className="flex lg:flex-row flex-col p-14 justify-between w-full m-24"
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9 }}
                    variants={{
                        visible: { opacity: 1, x: 0 },
                        hidden: { opacity: 0, x: -100 }
                    }}
                >
                    <div className="flex justify-between w-full">
                        <div className="p-8 flex flex-col">
                            <h1 className="font-secondary text-2xl text-white hover:scale-105">Track Your Deadlines</h1>
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
                                    <button onClick={() => navigate("/register")} className="text-white w-40 mt-4 hover:scale-105 bg-blue-900 p-2 rounded-lg text-xl font-secondary shadow-sm shadow-black">
                                        Sign Up
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                        <img src={sandClock} height={300} width={300} className="rounded-xl text-white hover:scale-105" />
                    </div>
                </motion.div>
            </div>

            {/* Mobile Screen */}
            <div className="flex justify-between">

            <div className="lg:hidden flex flex-col items-center m-4">

    
                    <motion.div
                    className="flex justify-between w-full"
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

                            {!showMore && (
                                <div className="flex flex-col justify-center">
                                <h2 className="font-secondary text-md text-gray-400 hover:scale-105 mt-12">
                                    Goal Tracker is your ultimate tool for staying organized, motivated, and on track with all your personal and professional goals <span onClick={() => setShowMore(true)} className="text-blue-100 text-lg font-bold animate-pulse">...</span>
                                </h2>
                            </div>
                            )}
                            
                            {showMore && (
                            <div className="flex flex-col justify-center">
                                 <h2 className="font-secondary text-md text-gray-400 hover:scale-105 mt-12">
                                     Goal Tracker is your ultimate tool for staying organized, motivated, and on track with all your personal and professional goals. Whether you’re aiming to improve your fitness, enhance your skills, manage your time better, or simply keep your reading list in order, GoalTracker has got you covered. Our web app offers a suite of features designed to help you set, monitor, and achieve your goals with ease.
                                 </h2>
                             </div>
                            )}
                           
                        </motion.div>
                    </div>
                </motion.div>
                            
                {/* <div className="text-white flex mt-9">
                    <IoIosArrowBack onClick={() => setPage(page - 1)} className="bg-slate-800 p-1 text-3xl m-1"/>
                    <IoIosArrowForward onClick={() => setPage(page + 1)} className="bg-slate-800 p-1 text-3xl m-1"/>
                </div> */}

                {page === 1 && (
  <motion.div
    variants={{
      visible: { y: 0 },
      hidden: { y: -100 },
    }}
    className="flex flex-col justify-between w-full"
    initial="hidden"
    whileInView="visible"
    transition={{ duration: 0.7 }}
  >
    <div className="p-4 flex flex-col">
      <h1 className="font-secondary text-2xl text-center text-white hover:scale-105">
        Monitor Your Progress
      </h1>

      <motion.div
        className="flex flex-col justify-between w-full"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="p-4 mt-2">
          <img
            src={graph}
            height={700}
            width={700}
            className="rounded-xl shadow-md shadow-black hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="font-secondary text-center text-md text-gray-400 hover:scale-105 mt-12">
            Stay on top of your goals with our "Monitor Your Progress" feature.
            Easily add your daily activities and log the time you spend on each.
            Visualize your progress with clear, detailed graphs that help you
            track your performance over time. Whether you're aiming to improve
            your fitness, learn a new skill, or manage your time better, our
            tool provides you with the insights you need to stay motivated and
            on track.
          </h2>
          <button
            onClick={() => navigate("/register")}
            className="text-white w-40 mt-4 hover:scale-105 bg-blue-900 self-center p-2 rounded-lg text-lg font-secondary shadow-sm shadow-black"
          >
            Sign Up
          </button>
        </div>
      </motion.div>
    </div>
  </motion.div>
)}

{page === 2 && (
  <motion.div
    className="flex flex-col justify-between w-full "
    initial={{ x: 100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.7 }}
  >
    <div className="p-4 flex items-middle flex-col">
      <h1 className="font-secondary text-2xl text-white text-center hover:scale-105">
        Manage Your Books
      </h1>
      <motion.div
        className="flex justify-between w-full"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col justify-center">
          <div className="p-4 flex justify-center">
            <img
              src={book}
              height={200}
              width={200}
              className="rounded-xl self-center hover:scale-105"
            />
          </div>
          <h2 className="font-secondary text-md text-center text-gray-400 hover:scale-105 mt-12">
            Stay organized and enhance your reading experience with our book
            management feature. Users can easily search for books and add them
            to their personal library. You can categorize your books by choosing
            their status: "To Read," "In Progress," or "Finished." This feature
            helps you keep track of what you plan to read, your current reads,
            and the books you've completed, providing a comprehensive overview
            of your reading journey. Whether you're an avid reader or just
            starting, our tool supports your literary adventures and keeps you
            motivated to reach your reading goals.
          </h2>
          <button
            onClick={() => navigate("/register")}
            className="text-white self-center w-40 mt-4 hover:scale-105 bg-blue-900 p-2 rounded-lg text-lg font-secondary shadow-sm shadow-black"
          >
            Sign Up
          </button>
        </div>
      </motion.div>
    </div>
  </motion.div>
)}

{page === 3 && (
  <motion.div
    className="flex flex-col justify-between w-full "
    initial={{ x: 100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.7 }}
  >
    <div className="p-4 flex flex-col items-center">
      <h1 className="font-secondary text-2xl text-center text-white hover:scale-105">
        Track Your Deadlines
      </h1>

      <motion.div
        className="flex flex-col justify-center w-full"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="p-4 flex justify-center">
          <img
            src={sandClock}
            height={200}
            width={200}
            className="rounded-xl hover:scale-105"
          />
        </div>
        <h2 className="font-secondary text-center text-md text-gray-400 hover:scale-105 mt-12">
          Keep track of your goals and manage your time effectively with our
          deadline tracking feature. Users can add their goals and set
          deadlines, and the web app will display the progress of time on a
          dynamic progress bar. This feature provides a visual representation of
          how much time you have left to achieve your goals, helping you stay
          focused and motivated. Whether you're working on a project, preparing
          for an exam, or setting personal milestones, our tool ensures you stay
          on track and make the most of your time.
        </h2>
        <button
          onClick={() => navigate("/register")}
          className="text-white w-40 mt-4 hover:scale-105 bg-blue-900 self-center p-2 rounded-lg text-lg font-secondary shadow-sm shadow-black"
        >
          Sign Up
        </button>
      </motion.div>
    </div>
  </motion.div>
)}


            </div>

            </div>
        </>
    );
};

export default Home;
