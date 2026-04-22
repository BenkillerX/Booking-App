import { useState, useEffect } from "react";
import { collection, query, getDocs, doc, updateDoc} from "firebase/firestore";
import { db } from "../../config/firebase";
import "./Admin.css";
import BookingSect from "./bookingSect";
import Overview from "./overview";
import Users from "./Users";
import Addroom from "./Addroom";
import UpdateRoom from "./UpdateRoom";

function Admin() {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    totalUsers: 0,
    activeBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const bookingsQuery = query(
        collection(db, "rooms"),

      );
      const bookingsSnap = await getDocs(bookingsQuery);
      const bookingsData = bookingsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBookings(bookingsData);

      // Calculate stats
      const totalBookings = bookingsData.length;
      const totalRevenue = bookingsData.reduce((acc, booking) => {
        return acc + (booking.price || 0);
      }, 0);

      const activeCount = bookingsData.filter(
        (b) =>
          b.status === "confirmed" ||
          new Date(b.date) > new Date()
      ).length;

      setStats({
        totalBookings,
        totalRevenue,
        totalUsers: Math.ceil(totalBookings * 0.6), // Sample calculation
        activeBookings: activeCount,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      setBookings(bookings.filter((b) => b.id !== id));
    }
  };

  const handleStatusChange = async (id, newStatus) => {
   try {
    const bookingRef = doc(db, "bookings", id);
    await updateDoc(bookingRef, { status: newStatus });
    
   } catch (error) {
    console.error("Error updating booking status:", error);
   }
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading-spinner">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>Admin Dashboard</h1>
          <p>Manage bookings, users, and view analytics</p>
        </div>
        <button className="btn-refresh" onClick={fetchDashboardData}>
          ↻ Refresh
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="admin-tabs">
        <button
          className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === "bookings" ? "active" : ""}`}
          onClick={() => setActiveTab("bookings")}
        >
          Bookings
        </button>
        <button
          className={`tab-button ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={`tab-button ${activeTab === "addRoom" ? "active" : ""}`}
          onClick={() => setActiveTab("addroom")}
        >
          Add Room
        </button>
        <button
          className={`tab-button ${activeTab === "updateRoom" ? "active" : ""}`}
          onClick={() => setActiveTab("updateroom")}
        >
          Update Room
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <Overview 
        stats={stats}
        bookings={bookings}
        setActiveTab={setActiveTab}
        />
      )}

      {/* Bookings Tab */}
      {activeTab === "bookings" && (
        <BookingSect
          bookings={bookings}
          filteredBookings={filteredBookings}
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onStatusChange={handleStatusChange}
          onDeleteBooking={handleDeleteBooking}
        />
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <Users/>
      )}
      {/* Users Tab */}
      {activeTab === "addroom" && (
        <Addroom/>
      )}
      {/* Update Room Tab */}
      {activeTab === "updateroom" && (
        <UpdateRoom/>
      )}
    </div>
  );
}

export default Admin;
