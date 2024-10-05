import React from 'react'
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Dashbord = () => {

  const navigate = useNavigate()
   
  return (
    
    <>
    <motion.div
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.7 }} 
    className=' items-center justify-center  lg:flex hidden flex-col'>
    <div className='text-white font-primary text-3xl m-12'>Dashboard</div>
    
    <div className='grid grid-cols-2 w-full p-10'>
      <div onClick={() => navigate("/goals")} className='bg-gray-900 text-lg hover:cursor-pointer hover:scale-105 text-white text-center font-secondary rounded-md p-6 m-8'>
      Progress Monitor
      </div>
      <div onClick={() => navigate("/deadlines")} className='bg-gray-900  text-lg hover:cursor-pointer hover:scale-105 text-white text-center font-secondary rounded-md p-6 m-8'>
      Goals and Deadlines
      </div>
      <div onClick={() => navigate("/books")} className='bg-gray-900  text-lg hover:cursor-pointer hover:scale-105 text-white text-center font-secondary rounded-md p-6 m-8'> 
      Book Search
      </div>
      <div onClick={() => navigate("/notes")} className='bg-gray-900  text-lg hover:cursor-pointer hover:scale-105 text-white text-center font-secondary rounded-md p-6 m-8'>
       Notes 
      </div>
    </div>
    
    </motion.div>


    {/*Mobile Screen*/}
    <motion.div
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.7 }} 
    className='items-center justify-center  lg:hidden flex flex-col'>
    <div className='text-white font-primary text-3xl mt-10'>Dashboard</div>
    
    <div className='flex flex-col w-full p-10'>
      <div onClick={() => navigate("/goals")} className='bg-gray-900 text-lg hover:cursor-pointer hover:scale-105 text-white text-center font-secondary rounded-md p-6 m-2'>
      Progress Monitor
      </div>
      <div onClick={() => navigate("/deadlines")} className='bg-gray-900  text-lg hover:cursor-pointer hover:scale-105 text-white text-center font-secondary rounded-md p-6 m-2'>
      Goals and Deadlines
      </div>
      <div onClick={() => navigate("/books")} className='bg-gray-900  text-lg hover:cursor-pointer hover:scale-105 text-white text-center font-secondary rounded-md p-6 m-2'> 
      Book Search
      </div>
      <div onClick={() => navigate("/notes")} className='bg-gray-900  text-lg hover:cursor-pointer hover:scale-105 text-white text-center font-secondary rounded-md p-6 m-2'>
       Notes 
      </div>
    </div>
    
    </motion.div>
    </>
    )
}

export default Dashbord