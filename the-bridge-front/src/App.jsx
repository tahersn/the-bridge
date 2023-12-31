import { useState } from 'react'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Main from './views/Main'
import Home from './views/Home'
import Admin from './views/Admin'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />}>
            <Route path='' element={<Home />} />
            <Route path='/admin' element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
