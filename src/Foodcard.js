import React from 'react';
import "./Foodcard.css";

export default function Foodcard ({meal}) {
    const onClickUrl = (url) => {
        return () => window.open(url, "_blank");
      }
      
    return(
        <>

        <div className="card">
            <img id="meal-img" className="hover-zoom" src={meal.strMealThumb} alt='mealimage'/>
        <div className="content">
            <h1>Todays Meal For You</h1>
            <h2 id="meal-name">Name of the Dish: {meal.strMeal}</h2>
            <h4 id="meal-category">Category of the Dish: {meal.strCategory}</h4>
            <h4 id="meal-area">Place where the Dish is from: {meal.strArea}</h4>
            <h4>Instructions for the Dish:</h4>
            <p id="meal-instructions"> {meal.strInstructions}</p>
            <h6 id="meal-link"  onClick={onClickUrl(meal.strYoutube)}>Youtube</h6>
            <h6 id="meal-source" onClick={onClickUrl(meal.strSource)}>Source</h6>
        </div>
        </div>
        </>
        )
}
