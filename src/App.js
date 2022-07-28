import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from 'react-router-dom'
// import pages
import Home from './pages/Home'
import About from './pages/About'
import SingleCocktail from './pages/SingleCocktail'
import Error from './pages/Error'
import SharedLayout from './pages/SharedLayout'
// import components
import Navbar from './components/Navbar'
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='cocktail/:cocktailId' element={<SingleCocktail />} />
          <Route path='about' element={<About />} />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
