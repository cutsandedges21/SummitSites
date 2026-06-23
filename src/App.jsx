import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import LaptopZoom from './components/LaptopZoom'
import Demos from './components/Demos'
import Services from './components/Services'
import Pricing from './components/Pricing'
import Process from './components/Process'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'

function WithLayout({ children }) {
  return <Layout>{children}</Layout>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LaptopZoom />} />
        <Route path="/demos"      element={<WithLayout><Demos /></WithLayout>} />
        <Route path="/services"   element={<WithLayout><Services /></WithLayout>} />
        <Route path="/pricing"    element={<WithLayout><Pricing /></WithLayout>} />
        <Route path="/process"    element={<WithLayout><Process /></WithLayout>} />
        <Route path="/faq"        element={<WithLayout><FAQ /></WithLayout>} />
        <Route path="/contact"         element={<WithLayout><Contact /></WithLayout>} />
        <Route path="/privacy-policy"  element={<WithLayout><PrivacyPolicy /></WithLayout>} />
        <Route path="/terms-of-service" element={<WithLayout><TermsOfService /></WithLayout>} />
      </Routes>
    </BrowserRouter>
  )
}
