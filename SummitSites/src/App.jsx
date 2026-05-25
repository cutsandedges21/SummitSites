import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LaptopZoom from './components/LaptopZoom'
import Demos from './components/Demos'
import Services from './components/Services'
import Process from './components/Process'
import Industries from './components/Industries'
import FAQ from './components/FAQ'
import Contact from './components/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LaptopZoom />} />
        <Route path="/demos" element={<Demos />} />
        <Route path="/services" element={<Services />} />
        <Route path="/process" element={<Process />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}
