import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebase'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const usersQuery = collection(db, "users")
      const usersSnap = await getDocs(usersQuery)
      const usersData = usersSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setUsers(usersData)
    } catch (error) {
      console.error("Error fetching users:", error)
      setError("Error fetching users")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="admin-content">
        <h2>Users Management</h2>
        <div className="loading-spinner">Loading users...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="admin-content">
        <h2>Users Management</h2>
        <p className="error-message">{error}</p>
      </div>
    )
  }

  return (
    <>
      <div className="admin-content">
          <h2>Users Management</h2>
          <div className="users-grid">
            {users.length === 0 ? (
              <p>No users found.</p>
            ) : (
              users.map((user) => (
                <div key={user.id} className="user-card">
                  <h3>{user.displayName || 'Unknown User'}</h3>
                  <p>{user.email}</p>
                  <div className="user-stats">
                    <div className="user-stat">
                      <span className="stat-label">Provider</span>
                      <span className="stat-value">{user.provider || 'email'}</span>
                    </div>
                    <div className="user-stat">
                      <span className="stat-label">Joined</span>
                      <span className="stat-value">
                        {user.createdAt ? new Date(user.createdAt.toDate()).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
    </>
  )
}

export default Users
