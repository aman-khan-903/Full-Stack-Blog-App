import React , { useState , useEffect} from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authservice from './appwrite/auth';
import {login, logout} from './store/authSlice'; 
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/themeContext';
import Loader from './components/Loader';


function App() {

  const [theme, setTheme]= useState("light"); 

  const lightTheme= () =>{
    setTheme("light"); 
  }
  const darkTheme= () =>{
    setTheme("dark"); 
  }

  useEffect(()=>{
    document.querySelector('html').classList.remove("light", "dark"); 
    document.querySelector('html').classList.add(theme); 
  }, [theme]); 
  
  const [loading, setLoading] = useState(true); 
  const dispatch = useDispatch(); 


  useEffect(()=>{
    setLoading(true); 
    authservice.getCurrentUser()
      .then((userData)=>{
        if(userData){
          dispatch(login(userData))
        }else{
          dispatch(logout()); 
        }
      })
      .finally(()=>setLoading(false)); 
  },[])

  

  if(loading) return <div><Loader/></div>

  return (
    <div className='min-h-screen flex flex-wrap content-between '>
    <ThemeProvider value= {{theme, lightTheme, darkTheme}}>

      <div className='w-screen block dark:bg-slate-900 dark:text-white  '>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </ThemeProvider>
    </div>
  )
}

export default App
