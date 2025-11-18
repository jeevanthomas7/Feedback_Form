import React from 'react'
import FeedbackForm from './components/FeedbackForm'
import FeedbackList from './components/FeedbackList'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {

  return (
  
    <div>
      <BrowserRouter>
      <Routes>
<Route path='/' element={<FeedbackForm/>}></Route>
<Route path='/admin' element={<FeedbackList/>}></Route>

      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
