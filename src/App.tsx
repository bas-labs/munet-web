import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  HomePage,
  QuienesSomosPage,
  ExposicionesPage,
  PlanificaPage,
  BoletosPage,
  ActividadesPage,
  ServiciosPage,
  FotogaleriaPage,
  RentaEspaciosPage,
  InvolucratePage,
  ContactoPage,
  AvisoPrivacidadPage,
  OrderLookupPage,
  CheckoutSuccessPage,
  CheckoutCancelPage,
} from '@/pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quienes-somos" element={<QuienesSomosPage />} />
        <Route path="/exposiciones" element={<ExposicionesPage />} />
        <Route path="/planifica-tu-visita" element={<PlanificaPage />} />
        <Route path="/boletos" element={<BoletosPage />} />
        <Route path="/mis-boletos" element={<OrderLookupPage />} />
        <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
        <Route path="/checkout/cancel" element={<CheckoutCancelPage />} />
        <Route path="/actividades" element={<ActividadesPage />} />
        <Route path="/servicios" element={<ServiciosPage />} />
        <Route path="/fotogaleria" element={<FotogaleriaPage />} />
        <Route path="/renta-de-espacios" element={<RentaEspaciosPage />} />
        <Route path="/involucrate" element={<InvolucratePage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/aviso-de-privacidad" element={<AvisoPrivacidadPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
