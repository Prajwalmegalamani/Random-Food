import React,{useEffect,useState} from 'react'
import Foodcard from './Foodcard';
import toast, { Toaster } from 'react-hot-toast';

export default function Food() {
    const apiUrl = 
    `https://www.themealdb.com/api/json/v1/1/random.php`
    // const apiSearchUrl = 
    // `https://www.themealdb.com/api/json/v1/1/search.php?s=`

    let [textInput, setTextInput] = React.useState('');
    let [meals,setMeals] = useState([]);

    const handleChange = (event) => {
        setTextInput(event.target.value);
    }
    
    
    useEffect(() => {
        fetch(apiUrl).then((response)=> response.json().then((actualData)=>setMeals(actualData.meals)).catch((err)=>{
        console.log(err.message)
      }))
    }, [apiUrl])
    
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        searchrecipice();
      }
    }
    
    const searchrecipice = async () => {
      console.log(textInput);
      try{
        const response = await fetch( `https://www.themealdb.com/api/json/v1/1/search.php?s=${textInput}` );
        if( !response.ok ) {
          throw new Error( response.statusText );
        }
        let SearchRecipe = await response.json();
        console.log(SearchRecipe);
        setTextInput('');
        if(SearchRecipe.meals === null){
          toast.error("We are working on that recipe, Try others",{
            style: {
              border: '5px solid white',
              padding: '16px',
              backgroundColor: 'black',
              color: 'white',
            },
          });
        }
        else{
        setMeals(SearchRecipe.meals)
        }
      }
      catch(error){
        console.log('error');
      }
    }
    
    // useEffect(() => {
    //     fetch(apiSearchUrl).then((response)=> response.json().then((actualData)=>setMeals(actualData.meals)).setTextInput('').catch((err)=>{
    //     console.log(err.message)
    //   }))
    // }, [apiSearchUrl])

  return (
    <>
    <main id="Todays-meal">
    <div><Toaster/></div>
    <label htmlFor="searchdish">Search Dish</label>
    <input onChange={handleChange}  value= {textInput} onKeyDown={handleKeyDown} id="searchdish" type="text"/>
    <button className="searchbtn" onClick={searchrecipice}>🔍</button>
    </main>
    <div>
         {meals && meals.map((meal) => {
          return <Foodcard key={meal.idMeal} meal={meal} />;
    })}
  </div>
  </>
  )
}
