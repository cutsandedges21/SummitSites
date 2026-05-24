import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LaptopZoom from './components/LaptopZoom'
import Demos from './components/Demos'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LaptopZoom />} />
        <Route path="/demos" element={<Demos />} />
      </Routes>
    </BrowserRouter>
  )
}
