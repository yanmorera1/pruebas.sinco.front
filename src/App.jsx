import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateVehicle from './pages/CreateVehicle'
import Models from './pages/Models'
import Sales from './pages/Sales'
import Home from './pages/Home'
import Vehicles from './pages/Vehicles'
import UpdateVehicle from './pages/UpdateVehicle'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/vehicles/create' element={<CreateVehicle />} />
        <Route path='/vehicles/update/:vehicleId' element={<UpdateVehicle />} />
        <Route path='/vehicles' element={<Vehicles />} />
        <Route path='/models' element={<Models />} />
        <Route path='/sales' element={<Sales />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
