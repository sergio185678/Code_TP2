import React from 'react'
import { get_main_ingredients, get_ingredients_by_name } from '@utils/peruvian-dishes'

const ModelEvaluation = ({name, listResult}) => {

  const main_ingredients = get_main_ingredients();
  const dish_main_ingredients = [];
  let dish_ingredients = get_ingredients_by_name(name);

  main_ingredients.forEach((ingredient, index) => {
    if (listResult[index] > 0) {
      dish_main_ingredients.push([ingredient, Math.round(listResult[index])]);
    }
  });

  dish_ingredients.forEach((dish) => {
    dish_main_ingredients.forEach((dish2) => {
      if (dish[0] === dish2[0]) {
        dish[1] = dish2[1];
      }
    });
  });

  
  const mid = Math.ceil(dish_ingredients.length / 2);
  const firstHalf = dish_ingredients.slice(0, mid);
  const secondHalf = dish_ingredients.slice(mid);

  return (
    <div className='flex flex-col items-center w-full'>
        <label className='font-bold'>{name}</label>
        <img className='' src='' alt='Plato_seleccionado'/>
        <p>Resultado: Puedes disfrutar de este plato. Aquí te sugerimos las porciones adecuadas de los ingredientes para tu porción:</p>
        <label className='font-bold'>Ingredientes:</label>
        <div className='ingredient-container'>
          <div className='list-container'>
            <ul className='list-disc custom-list'>
              {firstHalf.map((ingredient, index) => (
                <li key={index}>{`${ingredient[0]} : ${ingredient[1]}g`}</li>
              ))}
            </ul>
          </div>
          <div className='list-container'>
            <ul className='list-disc custom-list'>
              {secondHalf.map((ingredient, index) => (
                <li key={index+mid}>{`${ingredient[0]} : ${ingredient[1]}g`}</li>
              ))}
            </ul>
          </div>
        </div>
        <button className='result-btn'>Ver receta</button>
    </div>
  )
}

export default ModelEvaluation