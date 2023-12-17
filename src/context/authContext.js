import { createContext, useContext, useState,useEffect } from 'react';

import {jwtDecode as jwt_decode} from 'jwt-decode';
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {
  //const navigate = useNavigate();
    const [username, setUser] = useState(() => {
      const storedUser = localStorage.getItem('currentUser');
      return storedUser ? JSON.parse(storedUser) : null;
    }); 

    

    useEffect(() => {
      const checkTokenExpiration = () => {
        if (username && username.token) {
          const decodedToken = jwt_decode(username.token);
    
          // Check if the token is expired
          if (decodedToken.exp * 1000 < Date.now()) {
            // Token is expired
            // Log out the user or handle the expiration accordingly
            setUser(null);
            localStorage.removeItem('currentUser');
           // Redirect to the login page or another route
          }
        }
      };
      // Call the checkTokenExpiration function when the component mounts
      checkTokenExpiration();
  
      // You might want to set up a periodic check to handle token expiration during the user's session
      // For example, check every 5 minutes
      const intervalId = setInterval(checkTokenExpiration, 0.5 * 60 * 1000);
  
      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    },[username]);
  

    const login = async (formData) => {
     const email= formData.email
     const password=formData.password
     const user={email,password}
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        const data = await response.json();
        console.log(data)
        if (response.status === 200) {
          setUser(data);
          localStorage.setItem('currentUser', JSON.stringify(data));
          console.log(username)
          // Set the user state
        } else {
          // Handle authentication error (e.g., show an error message)
          // You can also clear the user state if necessary
          console.log("error")
          window.alert("Something wnet wrong")
          setUser(null);
        }
      } catch (error) {
        // Handle network error or other exceptions
        // You can also clear the user state if necessary
        console.log(error)
        setUser(null);
      }
    };

  
    const logout = () => {
      setUser(null);
      localStorage.removeItem("currentUser");
      
    };
  
    return (
      <AuthContext.Provider value={{ username,login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };