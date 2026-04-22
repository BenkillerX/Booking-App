import React from 'react'

const Overview = ({stats, bookings, setActiveTab}) => {
  return (
    <>
      <div className="admin-content">
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon purple">📅</div>
              <div className="stat-content">
                <h3>Total Bookings</h3>
                <p className="stat-number">{stats.totalBookings}</p>
                <span className="stat-label">All-time bookings</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon blue">💰</div>
              <div className="stat-content">
                <h3>Total Revenue</h3>
                <p className="stat-number">${stats.totalRevenue.toFixed(2)}</p>
                <span className="stat-label">From all bookings</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">👥</div>
              <div className="stat-content">
                <h3>Total Users</h3>
                <p className="stat-number">{stats.totalUsers}</p>
                <span className="stat-label">Registered users</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon orange">✓</div>
              <div className="stat-content">
                <h3>Active Bookings</h3>
                <p className="stat-number">{stats.activeBookings}</p>
                <span className="stat-label">Ongoing or upcoming</span>
              </div>
            </div>
          </div>

          {/* Recent Bookings Summary */}
          <div className="overview-card">
            <h2>Recent Bookings</h2>
            <div className="bookings-preview">
              {bookings.slice(0, 5).map((booking) => (
                <div key={booking.id} className="booking-item">
                  <div className="booking-info">
                    <p className="booking-name">{booking.name || "Guest"}</p>
                    <p className="booking-email">{booking.email}</p>
                  </div>
                  <div className="booking-meta">
                    <span className={`badge ${booking.status || "pending"}`}>
                      {booking.status || "Pending"}
                    </span>
                    <p className="booking-price">
                      ${booking.price || "0.00"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="btn-view-all"
              onClick={() => setActiveTab("bookings")}
            >
              View All Bookings →
            </button>
          </div>
        </div>
    </>
  )
}

export default Overview
