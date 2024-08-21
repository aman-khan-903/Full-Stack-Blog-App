import React from 'react'
import {Container, Logo, LogoutBtn, MdOutlineDarkMode, MdOutlineLightMode} from '../index'; 
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useTheme from '../../context/themeContext';

const Header = () => {

  const authStatus= useSelector((state)=>state.auth.status); 
  const {theme, lightTheme, darkTheme } = useTheme();

  const themeHandler= () =>{
    if(theme === 'light'){
      darkTheme();
    }else{
      lightTheme();
    }
  }

  const navigate = useNavigate(); 

  // it do futureproofing of code means make code easily updateable
  const navItems = [
    {
      name: 'Home', 
      slug: '/', 
      active: true
    }, 
    {
      name: "Login", 
      slug:'/login',
      active: !authStatus,
    },
    {
      name: "SignUp", 
      slug: "/signup",
      active: !authStatus, 
    },
    {
      name: "All Posts",
      slug: "/all-posts", 
      active: authStatus, 
    }, 
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus, 
    }
  ]
  return (
    <header className='py-3 shadow font-semibold dark:bg-slate-900 dark:text-white rounded-md'>
      <Container>
        <nav className='flex justify-between'>

          {/* Logo */}
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'/>
            </Link>
          </div>

          {/* navlinks */}
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button onClick={() => navigate(item.slug)} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>{item.name}</button>
                </li>
              ) : null
            )}
          </ul>

          {/* themeButton */}
          <div className='ml-4 flex items-center'>
            <button onClick={themeHandler} className='p-2 bg-slate-300 rounded-full'>{theme==="light" ? <MdOutlineDarkMode/> : <MdOutlineLightMode/>} </button>
          </div>
          
          {/* login/logout button */}
          <div>
            {authStatus && (
                <LogoutBtn/>
            )}
          </div>

        </nav>
      </Container>
    </header>
  )
}

export default Header; 