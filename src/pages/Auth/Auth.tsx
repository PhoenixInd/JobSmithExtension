import { Header } from "../../components/Header";
import "./Auth.css"
import logo from '@assets/logo.svg'

function Auth() {
    return(
        <>
            <Header/>
            <div className='logo-container'>
                <img src={logo} className="logo" alt="logo" />
            </div>
            <div className='pr-6 pl-6'>
                <h1 className='text-xl font-semibold'>
                Create an account
                </h1>
                <form>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                </form>
                <button className="mt-9">
                Sign Up
                </button>
            </div>
        </>
        
    )
}

export default Auth;