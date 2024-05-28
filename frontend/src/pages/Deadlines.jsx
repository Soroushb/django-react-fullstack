import {useEffect, useState} from 'react'
import api from '../api'


const Deadlines = () => {

  const [goals, setGoals] = useState([])

  useEffect(() => {
    getGoals()
  }, [])

  const getGoals = () => {
    api.get("api/goals/")
    .then((res) => res.data)
    .then((data) => setGoals(data))
    .catch((err) => console.log(err))
  }

  return (
    <div>
        {goals?.map((goal) => (
            <>
            {goal?.name}
            </>
            
        ))}
    </div>
  )
}

export default Deadlines