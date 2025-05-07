import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Notes from './pages/Notes'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="flex-grow">
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/notes' element={<Notes />} />
    </Routes>
    </div>
    <Footer />
    </div>
  )
}

export default App
