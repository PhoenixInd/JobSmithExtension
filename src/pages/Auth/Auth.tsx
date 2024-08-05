import { Header } from "../../components/Header";
import "./Auth.css"
import { authService } from "@services/authService";
import logo from '@assets/logo.svg'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserActions } from "@hooks/user/UserActions";

interface SignInData {
    email: string;
    password: string;
}

interface SignUpData {
    name: string;
    email: string;
    password: string;
}

function Auth() {
    const [isSignUp, setIsSignUp] = useState(true);
    const [fade, setFade] = useState(true);
    const navigate = useNavigate();

    const { handleSetUser } = UserActions()

    const formSwitch = () => {
        setFade(false);
        setTimeout(() => {
            setIsSignUp(!isSignUp);
            setFade(true);
        }, 300);
    };

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if (isSignUp) {
            const data: SignUpData = {
                name: "",
                email: "",
                password: ""
            };
            formData.forEach((value, key) => {
                data[key as keyof SignUpData] = value as string;
            });

            try {
                await authService.register(data);
                alert('Registration successful');
            } catch (error: unknown) {
                handleError(error);
            }
        } else {
            const data: SignInData = {
                email: "",
                password: ""
            };
            formData.forEach((value, key) => {
                data[key as keyof SignInData] = value as string;
            });

            try {
                await authService.login(data);
                const { isValid, user } = await authService.validateToken();
                if (isValid) {
                    handleSetUser(user);
                    navigate('/home');
                    alert('Login successful');
                }else{
                    alert('Login failed');
                }
            } catch (error: unknown) {
                handleError(error);
            }
        }
    };

    const handleError = (error: unknown) => {
        if (error instanceof Error) {
            alert(error.message);
        } else {
            alert('An unknown error occurred');
        }
    };
    return(
        <>
            <Header/>
            <div className='logo-container'>
                <img src={logo} className="logo" alt="logo" />
            </div>
            <div className='pr-6 pl-6'>
                <h1 className={`text-xl font-semibold ${fade ? "fade-in" : "fade-out"}`}>
                    {isSignUp ? "Create an account" : "Log in to your account"}
                </h1>
                <form onSubmit={submit}>
                    <input className={`signup-fields ${isSignUp ? 'show' : 'hide'}`} type="text" name="name" placeholder="Name" required={isSignUp} disabled={!isSignUp}/>
                    <input type="email" name="email" placeholder="Email" />
                    <input type="password" name="password" placeholder="Password" />
                    <button className="mt-9" type="submit">
                        <span className={fade ? "fade-in" : "fade-out"}>
                            {isSignUp ? "Sign Up" : "Sign In"}
                        </span>
                    </button>
                </form>
                <div className="switch-form">
                    <p className={fade ? "fade-in" : "fade-out"}>
                        {isSignUp ? "Already have an account?" : "Don't have an account?"}
                    </p>
                    <a className="secondary-action" onClick={formSwitch}>
                        <span className={fade ? "fade-in" : "fade-out"}>
                            {isSignUp ? "Sign In" : "Sign Up"}
                        </span>
                    </a>
                </div>
            </div>
        </>
        
    )
}

export default Auth;