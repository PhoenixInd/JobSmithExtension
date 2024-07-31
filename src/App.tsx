import smith from './assets/Smith.png'
import './App.css'
import { Header } from './components/Header'

function App() {

  return (
    <>
      <Header />
      <div className='img-container'>
          <img src={smith} className="smith" alt="Smith" />
        </div>
      <div className='p-6'>
        <h1 className='text-base font-bold'>
          Welcome to JobSmith!
        </h1>
        <p className='text-[#979797]'>
          Centralize all aspects of your professional career, enhance your skills, and boost your decisions.
        </p>
        <button >
          Get Started
        </button>
      </div>
    </>
  )
}

export default App
