import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChatPage from './pages/ChatPage'
function App() {
  return (
    <BrowserRouter>
      <div className='h-screen'>
        <Routes>
          <Route path='/' element={<ChatPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
