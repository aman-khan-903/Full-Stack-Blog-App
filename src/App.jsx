import React , { useState , useEffect} from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authservice from './appwrite/auth';
import {login, logout} from './store/authSlice'; 
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';


function App() {
  // console.log(config.appwriteBucketId);
  // console.log(config.appwriteCollectionId);
  // console.log(config.appwriteDatabaseId);
  // console.log(config.appwriteProjectId);
  // console.log(config.appwriteUrl);
  
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

  

  if(loading) return <div>Loading...</div>

  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          Todo : {/* <Outlet/> */}
        </main>
        <Footer/>
      </div>
    </div>
  )
}

export default App
