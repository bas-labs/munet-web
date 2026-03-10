import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* 404 Number */}
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className="text-[120px] sm:text-[160px] font-bold text-munet-red leading-none"
        >
          404
        </motion.h1>

        {/* Message */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-stone-800 mt-4 mb-2">
          Página no encontrada
        </h2>
        <p className="text-stone-600 mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="bg-munet-red hover:bg-munet-red/90">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Ir al inicio
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/exposiciones">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ver exposiciones
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
