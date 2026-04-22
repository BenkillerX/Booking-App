import './App.css'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'
import Header from './components/header/Header'
import About from './components/about/About'
import Bookings from './components/bookings/Bookings'
import Login from './components/login/Login'
import SIgnUp from './components/signup/SIgnUp'
import Home from './components/Home'
import Admin from './components/admin/Admin'
import Footer from './components/footer/Footer'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      console.log(currentUser);
      
    })
    return unsubscribe
  }, [])

  return (
    <div className="app">
  <Header user={user} setUser={setUser} />

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/bookings/:roomId?' element={<Bookings />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SIgnUp setUser={setUser} />} />
      <Route path='/admin/' element={<Admin />} />
    </Routes>
    <Footer/>
</div>
  )
}

export default App