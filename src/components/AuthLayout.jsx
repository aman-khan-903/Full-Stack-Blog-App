

import React , {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// main  function of that component is to protect the private Routes like without login user can't access the blogs and other features

// there is no problem in keeping file name and function name different
export default function Protected({children, authentication=true}) {

    const navigate = useNavigate(); 
    const [loader, setLoader] = useState(true); 
    const authStatus= useSelector(state => state.auth.status); 
    
    useEffect(()=>{

        // if(authStatus===true){
        //     navigate('/'); 
        // }else{
        //     navigate('/login'); 
        // }

        if(authentication && authStatus!==authentication){
            navigate('/login'); 
        }else if(!authentication && authStatus !==authentication){
            navigate('/'); 
        }
        setLoader(false); 

    }, [authStatus, navigate, authentication])
    // above useEffect will run when there is any change occur in authStatus, navigate -> changes when path(url) changes, authentication

  return loader ? <h1>Loading...</h1> : <>{children}</>
}
