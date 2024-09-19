import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './Components/Home/home'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
