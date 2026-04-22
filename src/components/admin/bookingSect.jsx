import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, doc, updateDoc, } from 'firebase/firestore';
import { db } from '../../config/firebase';
const BookingSect = ({
  bookings,
  searchTerm,
  onSearchChange,
  onStatusChange,
  onDeleteBooking,
}) => {

  const [request, setRequest] = useState([])
  
  useEffect(()=>{
 getBooking()
  },[])
  const getBooking = ()=>{
    const bookingsRef = collection(db, "bookings");
    const unsubscribe = onSnapshot(bookingsRef, (snapshot) => {
      const bookings = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRequest(bookings);
    });
    return unsubscribe;
  }
  const approveBooking = async (id) => {
  const bookingRef = doc(db, "bookings", id);
  await updateDoc(bookingRef, { status: "approved" });
};
  return (
    <div className="admin-content">
      <div className="bookings-header">
        <h2>All Bookings</h2>
        <input
          type="text"
          placeholder="Search by name or email..."
          className="search-input"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Room Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {request.length > 0 ? (
              request.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <code className="booking-id">{booking.id.slice(0, 8)}</code>
                  </td>
                  <td>{booking.roomTitle || "—"}</td>
                  <td>{booking.costomerEmail}</td>
                  <td>
                      {booking.bookedAt?.seconds 
                        ? new Date(booking.bookedAt.seconds * 1000).toLocaleDateString() : "—"
                        }
                  </td>
                  <td>₦{booking.roomPrice?.toFixed(2) || "0.00"}</td>
                  <td>
                    <select
                      className={`status-select ${booking.status || "pending"}`}
                      value={booking.status || "pending"}
                      onChange={(e) =>
                        onStatusChange(booking.id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-delete"
                        type="button"
                        onClick={() => onDeleteBooking(booking.id)}
                        title="Delete booking"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="empty-state">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <p>
          Showing {request.length} of {bookings.length} bookings
        </p>
      </div>
    </div>
  )
}

export default BookingSect
