import React from 'react'
import {Home, CreatePost} from './pages'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

function App() {
  

  return (
    <div>
      <Router>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>

      <Link to='/' className='font-bold text-[grey] text-[25px]'>
        <h1>MemesForCommunity</h1>
      </Link>
      <Link to="/create-post" className
      ='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>Post</Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)] flex justify-center items-center '>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </main>

      </Router>
   
    </div>
  )
}

export default App
