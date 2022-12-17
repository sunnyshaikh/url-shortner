import React, { useEffect, useState } from 'react'
import axios from "axios"
import Card from './Card'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
  const [urlInput, setUrlInput] = useState("")
  const [error, setError] = useState("")
  const [urls, setUrls] = useState([])

  const handleChange = (e) => {
    setUrlInput(e.target.value)
  }

  // fetch all
  const fetchAllUrls = async () => {
    try {
      const res = await axios.get("https://url-shortner-jet.vercel.app/api/shortner")
      setUrls(res.data)
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("https://url-shortner-jet.vercel.app/api/shortner", { urlInput })
      setError(res.data)
      setUrlInput("")

      toast.success(res.data)

      fetchAllUrls()
    }
    catch (err) {
      const data = err.response.data
      setError(data);
      toast.error(data)
    }
  }

  useEffect(() => {
    fetchAllUrls()
  }, [])

  return (
    <div className="container">
      {error && <ToastContainer />}
      <div className="page-header">
        <h1 className="page-title">Url Shortner</h1>
        <p className="page-desc">Get you url's short, crisp and smarter.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="urlInput"
          className="form-control"
          placeholder="Enter url here..."
          autoComplete="off"
          required
          value={urlInput}
          onChange={handleChange}
        />
        <button className="btn btn-primary">Shorten</button>
      </form>

      {/* show cards */}
      <Card urlData={urls} />
    </div>
  )
}

export default Main