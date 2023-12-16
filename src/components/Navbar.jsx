import React,{useEffect,useState} from 'react'
import { useWindowScroll } from 'react-use';
import { useAuth } from '../context/authContext';
const Navbar = () => {
  const { username, logout } = useAuth();
  const { y } = useWindowScroll();
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    setSticky(y > 0);
  }, [y]);
  
  return (
    <div className={`transition-all duration-300 ${isSticky ? 'bg-gradient-to-dim-blue' : 'gradient-to-dim-blue'} w-full fixed top-0 left-0 right-0 z-10`}>
        
        <header className="text-gray-500 body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href='/'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span className="ml-3 text-gray-400 text-xl">Foodie</span>
    </a>
    {username?<nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
      <a className="mr-5 hover:text-gray-100" href='/create'>Create New Reciepe</a>
     
    </nav>:<nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
      <a className="mr-5 hover:text-gray-100" href='/login'>Create New Reciepe</a>
     
    </nav>}
    
    {username?
    <button onClick={logout} className="inline-flex  text-gray-900 items-center bg-cyan-500 shadow-lg shadow-cyan-500/50 hover:bg-blue-500  hover:shadow-blue-500/50 border-0 py-1 px-3 focus:outline-none  rounded text-base mt-4 md:mt-0">logout
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
    :<a href="/login">
    <button className="inline-flex  text-gray-900 items-center bg-cyan-500 shadow-lg shadow-cyan-500/50 hover:bg-blue-500  hover:shadow-blue-500/50 border-0 py-1 px-3 focus:outline-none  rounded text-base mt-4 md:mt-0">Login
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
    </a>}
    
   
  </div>
</header>
    </div>
  )
}

export default Navbar