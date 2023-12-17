
import './App.css';
import Navbar from './components/Navbar';
import styles from "./style"
import Signup from './pages/Signup';
import Login from './pages/Login';
import Food from './pages/Food';
import Home from './pages/Home';

import UpdateFood from './pages/UpdateFood';
import CreateFood from './pages/CreateFood';

import {  Routes, Route } from "react-router-dom"
function App() {
 
 
  return (
    <div className="">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Navbar/>
            </div>
          </div>
          <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Routes>
                      <Route path='/' element={<><Home/></>}/>
                      <Route  path='/login' element={<><Login/></>}/>
                      <Route path='/signup' element={<><Signup/></>}/>
                      <Route  path='/create' element={<><CreateFood/></>}/>
                      <Route  path='/recipe/:recipeId' element={<><Food/></>}/>
                      <Route  path='/update/:recipeId' element={<><UpdateFood/></>}/>
                    </Routes>
                </div>
          </div>
    </div>
  );
}

export default App;
