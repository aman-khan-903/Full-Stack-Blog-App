import React, {useState} from 'react'
import authservice from '../appwrite/auth'
import { useForm } from 'react-hook-form'; 
import { useDispatch } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'; 
import { login} from '../store/authSlice';
import {Button, Input, Logo} from './index'; 

function SignUp() {

    const navigate = useNavigate(); 
    const dispatch= useDispatch(); 
    const {register , handleSubmit}= useForm(); 
    const [error, setError] = useState(); 

    const create = async (data)=>{
        
        setError(""); 
        try {
            const userData = await authservice.createAccount(data); 
            if(userData){
                const userData= await authservice.getCurrentUser(); 
                if(userData) dispatch(login(userData)); 
                navigate('/'); 
            }
        } catch (error) {
            setError(error.message); 
        }
    }

  return (
    <div className='flex items-center justify-center'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%'/>
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to your account</h2>
            <p className='mt-2 text-center text-base text-black/60'>
                Already have an account?&nbsp;
                <Link 
                    to="/login  "
                    className='font-medium text-primary transition-all duration-200 hover:underline'
                >
                    Sign In
                </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

            {/* here handleSubmit is a event and because of useForm it is now a keyword , so it is suggested to not make function with the handleSubmit name */}

            {/* is handleSubmit function k andar se hum create function call kar rhe hain */}
            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5'>
                    <Input
                    label= "Name: "
                    placeholder= "Enter Your Full Name"
                    type="text"
                    {...register("name", {
                        required:true, 
                    })}
                    />

                    <Input
                    label="Email: "
                    placeholder= "Enter your Email"
                    type="email"
                    {...register("email", {
                        required:true, 
                        // Regex
                        validate:{
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                        }
                    })}
                    />

                    <Input
                    label="Password: "
                    placeholder= "Please Enter your password"
                    type="password"
                    {...register("password", {
                        required: true,
                    })}
                    />

                    <Button
                    type="submit"
                    >Create Account</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp