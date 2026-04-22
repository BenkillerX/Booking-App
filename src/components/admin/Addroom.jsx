import React, { useState } from 'react'
import './Addroom.css'
import { db } from '../../config/firebase'
import { collection, addDoc } from "firebase/firestore"

const Addroom = () => {
  const [roomSubtitle, setRoomSubtitle] = useState('')
  const [roomTitle, setRoomTitle] = useState('')
  const [isBooked, setIsBooked] = useState(false)
  const [roomImage, setRoomImage] = useState(null)
  const [description, setDescription] = useState('')
  const [roomPrice, setRoomPrice] = useState('')
  const [isReserved, setIsReserved] = useState(false)
  const [loading, setLoading] = useState(false)

  // 🔹 Upload image to Cloudinary
  const uploadImage = async () => {
    if (!roomImage) return null

    const formData = new FormData()
    formData.append("file", roomImage)
    formData.append("upload_preset", "booking_app_upload")
    formData.append("cloud_name", "den1tzo9b")

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/den1tzo9b/image/upload",
      {
        method: "POST",
        body: formData,
      }
    )

    const data = await res.json()
    return data.secure_url
  }

  // 🔹 Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      // 1. Upload image
      const imageUrl = await uploadImage()

      // 2. Save to Firestore
      await addDoc(collection(db, "rooms"), {
        roomSubtitle,
        roomTitle,
        isBooked,
        description,
        roomPrice: Number(roomPrice),
        isReserved,
        image: imageUrl,
        createdAt: new Date()
      })

      alert("Room added successfully ✅")

      // 🔹 Reset form
      setRoomSubtitle('')
      setRoomTitle('')
      setIsBooked(false)
      setRoomImage(null)
      setDescription('')
      setRoomPrice('')
      setIsReserved(false)

    } catch (error) {
      console.error(error)
      alert("Error adding room ❌")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-room-container">
      <h2 className="add-room-title">Add New Room</h2>

      <form className="add-room-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Room Subtitle:</label>
          <input
            type="text"
            value={roomSubtitle}
            onChange={(e)=>setRoomSubtitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={roomTitle}
            onChange={(e)=>setRoomTitle(e.target.value)}
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={isBooked}
              onChange={(e)=>setIsBooked(e.target.checked)}
            />
            Is Booked
          </label>
        </div>

        <div className="form-group">
          <label>Room Image</label>
          <input
            type="file"
            onChange={(e)=>setRoomImage(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Room Price:</label>
          <input
            type="number"
            value={roomPrice}
            onChange={(e)=>setRoomPrice(e.target.value)}
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={isReserved}
              onChange={(e)=>setIsReserved(e.target.checked)}
            />
            Reserved
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Room"}
        </button>
      </form>
    </div>
  )
}

export default Addroom