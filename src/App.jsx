import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Vehicles from './pages/Vehicles'
import Models from './pages/Models'
import Sales from './pages/Sales'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/vehicles' element={<Vehicles />} />
        <Route path='/models' element={<Models />} />
        <Route path='/sales' element={<Sales />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
