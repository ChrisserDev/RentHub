import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login/Login"
import NotFound from "./components/NotFound"
import About from "./pages/About/About"
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import Locations from './pages/Locations/Locations';
import AllVehicles from './pages/Vehicles/AllVehicles';
import CityLocation from './pages/CityLocation/CityLocation';
import Booking from './pages/Booking/Booking';


function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="about" element={<About />} />
          <Route path="locations" element={<Locations />} />
          <Route path='AllVehicles' element={<AllVehicles />}/>
          <Route path='locations/:city' element={<CityLocation />}/>
          <Route path='booking/:id' element={<Booking />}/>
          <Route path="login" element={<Login />}/>
          <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);