import React,{useState,useEffect} from 'react'
import { useAuth } from '../context/authContext';
import "./bg.css"

import { useNavigate } from 'react-router-dom';
const Home = () => {
  console.log(process.env.REACT_APP_API_ENDPOINT)
  const navigate=useNavigate();
  const { username } = useAuth();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null);
  useEffect(() => {
    // Use a try-catch block to handle errors
    
      const fetchData = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/recipe/getall`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          setImages(data);
          console.log(data)
          setLoading(false); // Set loading to false
        } catch (error) {
          setError(error.message);
          setLoading(false); // Set loading to false
        }
      };
      fetchData();
  }, [username]);

  if (loading) {
    return <p className='font-Poppins flex justify-center items-center text-cyan-600 mr-2 text-2xl'>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleTakeTest = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };
  
  return (
    <>
    
    <div className='shadow-lg shadow-cyan-500/50'>
    
    <div className='home-bg'>
     
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="  text-cyan-500 tracking-widest font-medium title-font mb-1">Foodie</h1>
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-indigo-100">Where Every Meal Tells a Story</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-slate-300">Spilling the beans and the pasta - welcome to our food recipe site where the recipes are hot, and the jokes are cheesy. We believe in adding a dash of humor to every dish, because a good laugh makes everything taste better. So, grab your apron and let's turn your kitchen into a comedy show where the only thing burnt is the punchline!.</p>
        </div>
    </div>
    </div>
   
    <div>
<section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">
      {images.map((image)=>(
          <div key={image._id} className="p-4 md:w-1/3 shadow-2xl shadow-red-950	 mb-6  rounded-md ">
     

          <div className="h-full shadow-yellow-950 bg-gradient-to-r from-slate-800 to-gray-500 border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={image.imageUrl} alt="blog"/>
            <div className="p-6 ">
             <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{image.createdBy}</h2>
              <h1 className="title-font text-lg font-medium text-indigo-300 mb-3">{image.title}</h1>
              <p className="leading-relaxed mb-3 text-gray-200">{image.description}</p>
              <div className="flex items-center flex-wrap ">
                {username?<button onClick={() => handleTakeTest(image._id)} className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </button>:<a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0" href='/login'>Learn More
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>}
                
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
    </div>
    </>
  )
}

export default Home