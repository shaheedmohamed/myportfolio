import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Home from './pages/Home'
import SectionSkeleton from './components/SectionSkeleton'

const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="*"
            element={
              <Suspense fallback={<SectionSkeleton minHeight="100vh" />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
