import { useParams, Link } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import './Bookings.css';
import { useEffect, useState } from 'react';

const Bookings = () => {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [userBooking, setUserBooking] = useState(null); // To store existing booking
  const [loading, setLoading] = useState(false);


 
  
  useEffect(() => {
   if (roomId) getRoom();
  }, [roomId]);

  // Listen for the user's booking status for this specific room
  useEffect(() => {
    const user = auth.currentUser;
    if (user && roomId) {
      const q = query(
        collection(db, "bookings"),
        where("roomId", "==", roomId),
        where("userId", "==", user.uid) // Best to use UID for matching
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          // Get the most recent booking status
          setUserBooking(snapshot.docs[0].data());
        }
      });

      return () => unsubscribe();
    }
  }, [roomId]);

  
  const getRoom = async () => {
    try {
      setLoading(true);
      const roomRef = doc(db, "rooms", roomId);
      const roomSnap = await getDoc(roomRef);
      if (roomSnap.exists()) {
        setRoomDetails({ id: roomSnap.id, ...roomSnap.data() });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const bookRoom = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return alert('Please login first');

      await addDoc(collection(db, "bookings"), {
        roomId: roomDetails.id,
        userId: user.uid, // Always save the UID
        roomTitle: roomDetails.roomTitle,
        roomPrice: roomDetails.roomPrice,
        costomerEmail: user.email,
        status: "pending",
        bookedAt: new Date()
      });
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  // Function to render the status UI
  const renderStatusUI = () => {
    if (!userBooking) {
      return <button className="book-btn" onClick={bookRoom}>Book Room</button>;
    }

    switch (userBooking.status) {
      case 'pending':
        return <div className="status-msg pending">⏳ Waiting for admin approval...</div>;
      case 'confirmed':
        return <div className="status-msg success">✅ Room confirmed! See you soon.</div>;
      case 'cancelled':
        return <div className="status-msg error">❌ Your booking was declined.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="booking-container">
      {loading ? (
        <div className="spinner"></div>
      ) : roomDetails ? (
        <div className="booking-card">
          <h1 className="room-title">{roomDetails.roomTitle}</h1>
          <p className="room-price">₦{roomDetails.roomPrice}</p>
          <img src={roomDetails.image} alt={roomDetails.roomTitle} />
          
          {/* Status Message replaces the button if a booking exists */}
          <div className="booking-actions">
            {renderStatusUI()}
          </div>
        </div>
      ) : <p>No rooms found</p>}
    </div>
  );
};

export default Bookings;