import { get_dish_id_by_name, get_values, get_main_ingredients } from "@utils/peruvian-dishes";

const ModelEvaluation = ({name, listResult, toggleRecipe, setDishId, porcion, calorias, carbohidratos, grasas, proteinas}) => {
  const conversionData = get_values();
  const main_ingredients = get_main_ingredients();
  
  const convertIngredients = (ingredients, conversionData) => {
    return ingredients.map(item => {
      const [name, grams] = item.split(': ').map(str => str.trim());
      const ingredient = conversionData.find(entry =>
        name.toLowerCase().includes(entry.name.toLowerCase())
      );

      // Verificar si el ingrediente está en la lista de main_ingredients
      const isMainIngredient = main_ingredients.some(mainIng =>
        name.toLowerCase().includes(mainIng.toLowerCase())
      );

      let formattedIngredient = `${name} (${grams}g)`;

      if (ingredient) {
        const { ratio, keyword } = ingredient;
        const convertedValue = (parseFloat(grams) / ratio).toFixed(2);
        formattedIngredient = `${name} (${convertedValue} ${keyword})`;
      }

      // Envolver en negrita si es ingrediente principal
      if (isMainIngredient) {
        formattedIngredient = `<strong>${formattedIngredient}</strong>`;
      }

      return formattedIngredient;
    });
  };

  const dish_ingredients = convertIngredients(listResult.split(','), conversionData);

  const mid = Math.ceil(dish_ingredients.length / 2);
  const firstHalf = dish_ingredients.slice(0, mid);
  const secondHalf = dish_ingredients.slice(mid);

  const handleClick = (name) => {
    setDishId(get_dish_id_by_name(name));
    toggleRecipe();
  };

  return (
    <div className='flex flex-col items-center w-full'>
      <label className='font-bold'>{name}</label>
      <img className='w-[75%] h-[40%] border border-black my-[5%]' src={'/assets/dishes/'+name+'.jpg'} alt='Plato_seleccionado'/>
      <div className="nut-info">
        <div className="res-cont-ext">
          <div className="res-cont">
            <div className='res-name font-bold'>{parseFloat(calorias).toFixed(1)} kcal</div>
            <div className='flex flex-row items-center justify-evenly'><img className="res-img" src='/assets/icons/cal.png'/><div className="res-name-2">calorías</div></div>
          </div>
          <div className="res-cont">
            <div className='res-name font-bold'>{parseFloat(proteinas).toFixed(1)} g</div>
            <div className='flex flex-row items-center justify-evenly'><img className="res-img" src='/assets/icons/prot.png'/><div className="res-name-2">proteínas</div></div>
          </div>
        </div>
        <div className="res-cont-ext">
          <div className="res-cont">
            <div className='res-name font-bold'>{parseFloat(grasas).toFixed(1)} g</div>
            <div className='flex flex-row items-center justify-evenly'><img className="res-img" src='/assets/icons/fat.png'/><div className="res-name-2">grasas</div></div>
          </div>
          <div className="res-cont">
            <div className='res-name font-bold'>{parseFloat(carbohidratos).toFixed(1)} g</div>
            <div className='flex flex-row items-center justify-evenly'><img className="res-img" src='/assets/icons/carb.png'/><div className="res-name-2">carbohidratos</div></div>
          </div>
        </div>
      </div>
      <p className="mx-[2%]">Resultado: Puedes disfrutar de este plato. Aquí te sugerimos las porciones adecuadas de los ingredientes para tu porción ({parseFloat(porcion).toFixed(1)} g):</p>
      <label className='font-bold'>Ingredientes:</label>
      <div className='ingredient-container'>
        <div className='list-container'>
          <ul className='list-disc custom-list'>
            {firstHalf.map((ingredient, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: ingredient }} />
            ))}
          </ul>
        </div>
        <div className='list-container'>
          <ul className='list-disc custom-list'>
            {secondHalf.map((ingredient, index) => (
              <li key={index+mid} dangerouslySetInnerHTML={{ __html: ingredient }} />
            ))}
          </ul>
        </div>
      </div>
      <button className='result-btn' onClick={() => {handleClick(name)}}>Ver receta</button>
    </div>
  );
};

export default ModelEvaluation;
