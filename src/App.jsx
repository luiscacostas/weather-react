import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components//Header/Header'
import Footer from './components/Footer/Footer'
import Main from './components/Main/Main'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/> 
      <Main />
      <Footer />
    </>
  )
}

export default App
