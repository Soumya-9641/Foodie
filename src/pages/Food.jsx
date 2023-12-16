import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
const Food = () => {
  const {username}= useAuth();
  const navigate=useNavigate();
  let token
  console.log(username)
  if(username){
    token= username.token;
  }else{
    token=null;
  }
  const { recipeId } = useParams();
  
  const [response, setResponse] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/recipe/get/${recipeId}`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
       
        setResponse(data);
        
        
        setLoading(false);
        
        
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    

    fetchTestDetails();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleDelete=async (recipeId)=>{
    if(username){
      let token= username.token
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/recipe/${recipeId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `${token}`, // Add your authentication token
          },
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        navigate("/")
        // Remove the deleted test from the questions state
        
      } catch (error) {
        console.error(error);
      }
    }

  }

  const handleUpdate=(recipeId)=>{
      navigate(`/update/${recipeId}`)
  }

  return (
    <>
    
        <div  className='bg-gradient-to-r from-black to-gray-600'>
                
                <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col ">
        
            <img className="lg:w-4/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded " alt="hero" src={response.imageUrl}/>
            
          
            
            <div className="text-center lg:w-2/3 w-full">
              <h1 className="title-font flex items-start sm:text-4xl text-3xl mb-4 font-medium text-white"><span className='font-Poppins text-cyan-600 mr-2'>Recipe Title:</span>{response.title}</h1>
              <h6 className="title-font flex items-start mb-4 font-medium text-white"><span className='font-Poppins text-cyan-600 mr-2'>Creator:</span>{response.createdBy}</h6>
              <p className="mb-8 flex items-start leading-relaxed text-gray-400"><span className='font-Poppins text-cyan-600 mr-2'>Description:</span>{response.description}</p>
              <div className='flex flex-wrap mb-10'>
              <p className="mb-8 flex items-start leading-relaxed text-gray-400"><span className='font-Poppins text-cyan-600 mr-2'>Ingredients:</span></p>
              {response.ingredients.map((ingredient,index)=>(
                 <div key={index} className="mb-2 mr-2">
                   <button className="font-poppins text-gray-200 bg-gradient-to-r from-gray-800 to-gray-600 border-0 py-2 px-2 mr-2 focus:outline-none hover:bg-indigo-600 rounded-tl-2xl rounded-tr-2xl rounded-br-xl rounded-bl-none text-lg">{ingredient}</button>
                   
               </div>
               ))}
              </div>
              <div className='flex justify-center items-center'>
              <p className="mb-8 flex items-start text-2xl leading-relaxed text-gray-400"><span className='font-Poppins text-cyan-600 mr-2'>Steps to make it</span></p>
              </div>
              
              {response.steps.map((step,index)=>(
                       <div key={index} className='flex mb-10 justify-start flex-col items-start'>
                       <p className="leading-relaxed text-gray-400"><span className='font-Poppins text-cyan-600 mr-2'>Step {index+1}:</span>{step}</p>
                       
                       </div>
              ))}
             
             {username.user.username===response.createdBy ?<div className='mt-10'>
              <button  onClick={() => handleDelete(recipeId)} className="inline-flex text-white bg-red-500 shadow-lg shadow-cyan-500/50 border-0 py-2 px-6 focus:outline-none hover:bg-red-800  hover:shadow-blue-500/50 rounded text-lg">Delete</button>
              <button onClick={() => handleUpdate(recipeId)} className="inline-flex text-white bg-green-500 shadow-lg shadow-cyan-500/50 border-0 py-2 px-6 focus:outline-none hover:bg-green-800  hover:shadow-blue-500/50 rounded text-lg ml-4">Update</button>
              </div> :""}
              
            </div>
          </div>
        </section>

            </div>
   
    </>
  )
}

export default Food