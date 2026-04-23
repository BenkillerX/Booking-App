import React, { useEffect, useState } from 'react'
import './Home.css'
import {getDocs, collection} from 'firebase/firestore'
import { db } from '../config/firebase';
import { Link } from 'react-router-dom';

const Rooms = () => {
  const roomsCollectionsRef = collection(db, "rooms")
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    getRooms()
  }, [])
  const getRooms = async () => {
    try {
      setLoading(true)
      const data = await getDocs(roomsCollectionsRef)
      setRooms(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    } catch (error) {
      console.error("Error fetching rooms:", error)
    }
    finally {   
      setLoading(false)
    }
  }
  
  return (
    <>
    <main className="home-page">
      <section className="home-hero">
        <div>
          <p className="eyebrow">Available Rooms</p>
          <h1>Room status and booking details</h1>
          <p className="intro">
            Browse every room in the hotel. See which rooms are already booked and reserve any
            available room with one click.
          </p>
        </div>
      </section>

      <section className="room-grid">
        {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading rooms...</p>
        </div>
        ) : (rooms.map((room) => (
          <article key={room.id} className={`room-card ${room.booked ? 'booked' : 'available'}`}>
            <div className="room-head">
              <div>
                <p className="room-type">{room.roomSubtitle}</p>
                <h2>{room.roomTitle}</h2>
              </div>
              <span className={`room-status ${room.booked ? 'status-booked' : 'status-available'}`}>
                {room.booked ? 'Booked' : 'Available'}
              </span>
            </div>

            {room.image && (
              <div className="room-image">
                <img src={room.image} alt={room.name} />
              </div>
            )}

            <p className="room-description">{room.description}</p>
            <div className="room-meta">
              <span>₦{room.roomPrice}/night</span>
              <span>{room.booked ? 'Reserved' : 'Ready to book'}</span>
            </div>

            {room.booked ? (
              <div className="booking-info">
                <p>
                  <strong>Guest:</strong> {room.guestName}
                </p>
                <p>
                  <strong>Stay:</strong> {room.checkIn} → {room.checkOut}
                </p>
              </div>
            ) : (
              <Link to={`/bookings/${room.id}`}>
                <button className="room-action">
                  Book this room
                </button>
              </Link>
            )}
          </article>
        ))
        )}
        
      
      </section>
      
    </main>
    
    </>
  )
}

export default Rooms
