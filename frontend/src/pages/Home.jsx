import {useState, useEffect} from "react"
import api from "../api"
import "../styles/Home.css"
import Note from "../components/Note"
import { useNavigate } from "react-router-dom"
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants"


const Home = () => {

  const navigate = useNavigate()

  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")

  useEffect(() => {
    getNotes();
  }, [])

  const getNotes = () => {
    api.get("/api/notes/")
    .then((res) => res.data)
    .then((data) => {setNotes(data); console.log(data)})
    .catch((err) => alert(err));
  }

  const deleteNote = (id) => {
    api.delete(`/api/notes/delete/${id}`)
    .then((res) => {
        if(res.status === 204) alert("Note was deleted.")
        else alert("Failed to delete the note")
        getNotes()

    }).catch((error) => alert(error))
  }

  const createNote = (e) => {

    e.preventDefault()
    api.post("/api/notes/", {content, title})
    .then((res) => {
        if(res.status === 201) alert("Note Created")
        else alert("Failed to make the note")
        getNotes();

    }).catch((error) => alert(error));
  }

  return (
    <div>
      <div className="container mx-auto p-4">
  <h1 className="text-2xl font-bold text-center text-gray-800">Hello, Tailwind!</h1>
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Button
  </button>
</div>
      <div>
            <button onClick={() => {
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(REFRESH_TOKEN);
                navigate("/login")}}>Logout</button>
                <button onClick={() => {
                navigate("/register")}}>Register</button>
        </div>
        <div>
            <h2>Notes</h2>
            {notes.map((note) => (
                <Note note={note} onDelete={deleteNote} key={note.id} />
            ))}
        </div>
        <h2>Create a Note</h2>
        <form onSubmit={createNote}>
            <label htmlFor="title">Title:</label>
            <br />
            <input
                type="text"
                id="title"
                name="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label htmlFor="content">Content:</label>
            <br />
            <textarea
                id="content"
                name="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <br />
            <input type="submit" value="Submit"></input>
        </form>
    </div>
);
}

export default Home