import smith from './assets/Smith.png'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { authService } from "@services/authService";
import { Header } from './components/Header'
import { useEffect, useState } from 'react'

function App() {
  const navigate = useNavigate()
  const [, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const { isValid, user } = await authService.validateToken();
        if (isValid) {
          setUser(user);
          navigate('/home', { state: { user } });
        }
      }
  };

    checkAuth();
  }, [navigate]);

  const getStarted = () => {
    navigate('/auth');
  }

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
        <button onClick={getStarted}>
          Get Started
        </button>
      </div>
    </>
  )
}

export default App
