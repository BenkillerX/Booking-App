import React, { useState, useEffect } from 'react'
import './UpdateRoom.css'
import { db } from '../../config/firebase'
import { collection, getDocs, doc, updateDoc } from "firebase/firestore"

const UpdateRoom = () => {
  const [rooms, setRooms] = useState([])
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  // Form states
  const [roomSubtitle, setRoomSubtitle] = useState('')
  const [roomTitle, setRoomTitle] = useState('')
  const [isBooked, setIsBooked] = useState(false)
  const [roomImage, setRoomImage] = useState(null)
  const [description, setDescription] = useState('')
  const [roomPrice, setRoomPrice] = useState('')
  const [isReserved, setIsReserved] = useState(false)

  // Fetch rooms on component mount
  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      setFetching(true)
      const roomsQuery = collection(db, "rooms")
      const roomsSnap = await getDocs(roomsQuery)
      const roomsData = roomsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setRooms(roomsData)
    } catch (error) {
      console.error("Error fetching rooms:", error)
      alert("Error fetching rooms ")
    } finally {
      setFetching(false)
    }
  }

  // Upload image to Cloudinary
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

  // Handle selecting a room to edit
  const handleEditRoom = (room) => {
    setSelectedRoom(room)
    setRoomSubtitle(room.roomSubtitle || '')
    setRoomTitle(room.roomTitle || '')
    setIsBooked(room.isBooked || false)
    setDescription(room.description || '')
    setRoomPrice(room.roomPrice || '')
    setIsReserved(room.isReserved || false)
    setRoomImage(null) // Reset image input
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedRoom) return

    try {
      setLoading(true)

      // Upload new image if provided
      let imageUrl = selectedRoom.image
      if (roomImage) {
        imageUrl = await uploadImage()
      }

      // Update room in Firestore
      const roomRef = doc(db, "rooms", selectedRoom.id)
      await updateDoc(roomRef, {
        roomSubtitle,
        roomTitle,
        isBooked,
        description,
        roomPrice: Number(roomPrice),
        isReserved,
        image: imageUrl,
        updatedAt: new Date()
      })

      alert("Room updated successfully ✅")

      // Refresh rooms list
      await fetchRooms()

      // Reset form
      setSelectedRoom(null)
      setRoomSubtitle('')
      setRoomTitle('')
      setIsBooked(false)
      setRoomImage(null)
      setDescription('')
      setRoomPrice('')
      setIsReserved(false)

    } catch (error) {
      console.error("Error updating room:", error)
      alert("Error updating room ❌")
    } finally {
      setLoading(false)
    }
  }

  // Handle cancel edit
  const handleCancel = () => {
    setSelectedRoom(null)
    setRoomSubtitle('')
    setRoomTitle('')
    setIsBooked(false)
    setRoomImage(null)
    setDescription('')
    setRoomPrice('')
    setIsReserved(false)
  }

  if (fetching) {
    return (
      <div className="update-room-container">
        <div className="loading-spinner">Loading rooms...</div>
      </div>
    )
  }

  return (
    <div className="update-room-container">
      <h2 className="update-room-title">Update Room</h2>

      {!selectedRoom ? (
        <div className="rooms-list">
          <h3>Select a room to update:</h3>
          {rooms.length === 0 ? (
            <p>No rooms found. Add some rooms first.</p>
          ) : (
            rooms.map((room) => (
              <div key={room.id} className="room-item">
                <div>
                  <h4>{room.roomTitle}</h4>
                  <p>{room.roomSubtitle}</p>
                  <p>Price: ${room.roomPrice}</p>
                  <p>Status: {room.isBooked ? 'Booked' : 'Available'}</p>
                </div>
                <button
                  className="btn-edit"
                  onClick={() => handleEditRoom(room)}
                >
                  Edit
                </button>
              </div>
            ))
          )}
        </div>
      ) : (
        <form className="update-room-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Room Subtitle:</label>
            <input
              className="form-input"
              type="text"
              value={roomSubtitle}
              onChange={(e) => setRoomSubtitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Title:</label>
            <input
              className="form-input"
              type="text"
              value={roomTitle}
              onChange={(e) => setRoomTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                className="form-checkbox"
                type="checkbox"
                checked={isBooked}
                onChange={(e) => setIsBooked(e.target.checked)}
              />
              Is Booked
            </label>
          </div>

          <div className="form-group">
            <label className="form-label">Room Image (leave empty to keep current):</label>
            <input
              className="form-file"
              type="file"
              accept="image/*"
              onChange={(e) => setRoomImage(e.target.files[0])}
            />
            {selectedRoom.image && (
              <p>Current image: <a href={selectedRoom.image} target="_blank" rel="noopener noreferrer">View</a></p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Description:</label>
            <textarea
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Room Price:</label>
            <input
              className="form-input"
              type="number"
              value={roomPrice}
              onChange={(e) => setRoomPrice(e.target.value)}
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                className="form-checkbox"
                type="checkbox"
                checked={isReserved}
                onChange={(e) => setIsReserved(e.target.checked)}
              />
              Reserved
            </label>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Updating..." : "Update Room"}
            </button>
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default UpdateRoom
