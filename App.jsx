import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import About from "./pages/About"
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import Locations from './components/Locations';
import AllVehicles from './pages/Vehicles/AllVehicles';
import CityLocation from './components/CityLocation';
import Booking from './pages/Booking';


function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="about" element={<About />} />
          <Route path="location" element={<Locations />} />
          <Route path='AllVehicles' element={<AllVehicles />}/>
          <Route path='location/:city' element={<CityLocation />}/>
          <Route path='booking/:id' element={<Booking />}/>
          <Route path="login" element={<Login />}/>
          <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);