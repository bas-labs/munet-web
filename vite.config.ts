import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  // =============================================================================
  // BUILD OPTIMIZATIONS
  // =============================================================================
  build: {
    // Target modern browsers for smaller bundles
    target: 'es2020',
    
    // Enable source maps for production debugging (optional)
    sourcemap: false,
    
    // Minification settings
    minify: 'esbuild',
    
    // CSS code splitting
    cssCodeSplit: true,
    
    // Chunk size warning limit (500kb)
    chunkSizeWarningLimit: 500,
    
    // Rollup options for code splitting
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // React core - changes rarely, cache separately
          'react-vendor': ['react', 'react-dom'],
          
          // Router - separate chunk
          'router': ['react-router-dom'],
          
          // Form handling
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          
          // Animation library
          'motion': ['framer-motion'],
          
          // UI utilities
          'ui-utils': ['clsx', 'tailwind-merge', 'class-variance-authority'],
        },
        
        // Asset file naming with content hash for cache busting
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || []
          const ext = info[info.length - 1]
          
          // Keep fonts in fonts folder
          if (/woff|woff2|ttf|eot/.test(ext)) {
            return 'assets/fonts/[name]-[hash][extname]'
          }
          
          // Keep images in images folder
          if (/png|jpe?g|svg|gif|webp|ico/.test(ext)) {
            return 'assets/images/[name]-[hash][extname]'
          }
          
          return 'assets/[name]-[hash][extname]'
        },
        
        // Chunk file naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        
        // Entry file naming
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
  
  // =============================================================================
  // DEV SERVER OPTIMIZATIONS
  // =============================================================================
  server: {
    // Pre-bundle dependencies for faster dev startup
    warmup: {
      clientFiles: [
        './src/App.tsx',
        './src/pages/HomePage.tsx',
        './src/components/layout/Header.tsx',
        './src/components/layout/Footer.tsx',
      ],
    },
  },
  
  // =============================================================================
  // DEPENDENCY OPTIMIZATION
  // =============================================================================
  optimizeDeps: {
    // Include dependencies that need pre-bundling
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
    ],
  },
})
