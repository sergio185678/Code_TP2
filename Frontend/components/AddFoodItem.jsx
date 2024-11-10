'use client';
import { useState, useEffect } from "react";
import DropdownButtonSearchBar from "./DropdownButtonSearchBar";
import { useRouter } from "next/router";
import { get_ingredients_dropdown, add_ingredients } from "@utils/user";

const AddFoodItem = ({onAddFood, handleCloseAddFood}) => {

  const [options1, setOptions1] = useState([]);
  const [selectedOption1, setSelectedOption1] = useState('');
  const [loading, setLoading] = useState(false);
  const [elements, setElements] = useState([]);
  const router = useRouter();

  const addElement = (ingredient) => {
    // Evita duplicados al añadir solo si el ingrediente no está ya en la lista
    if (!elements.includes(ingredient)) {
      setElements([...elements, ingredient]);
    } else {
      console.log(`${ingredient} ya fue añadido.`);
    }
  };

  const deleteElement = (name) => {
    const updatedElements = elements.filter(element => element !== name);
    setElements(updatedElements);
  };
  

  const emptyElements = () => {
    setElements([]);
  }

  const handleClick = async () => {
    setLoading(true);
    if (elements.length > 0) {
      const response = await add_ingredients(elements, localStorage.getItem('token'));
      console.log(elements); 
      if (response.success) {
        alert("Se han añadido los ingredientes correctamente.");
        router.reload();
      } else {
        alert(response.message);
      }
    } else {
      alert("No has seleccionado ningún ingrediente.");
    }
    setLoading(false);
  };

  const handleClickCancel = () => {
    console.log("cancel"); 
    emptyElements();
    handleCloseAddFood();
    setSelectedOption1('');
  };

  useEffect(() => {
    if (onAddFood) {
      const fetchUserInfo = async () => { 
        const ing_dropdown = await get_ingredients_dropdown(localStorage.getItem('token'));
        setOptions1(p => [...p, ...ing_dropdown.map(i => i.name)]);
        //console.log(ing_dropdown);
      };
      fetchUserInfo();
    }
    
  }, [onAddFood]);

  if (!onAddFood) {return null;}

  return (
    <div className="edit-info-bg fixed z-30 flex justify-center items-center w-full h-full">
      <div className="add-ing-tab">
        <div className="flex flex-col items-center">
          <div className="flex flex-row justify-start w-[85%]"><label className="edit-text">Añadir nuevos ingredientes</label></div>
          <div className="flex flex-row justify-start w-[85%]"><p className="edit-text2">Escriba una palabra para buscar ingredientes y añadir los que son alergicos para usted. Ejemplo: Tomate</p></div>
        </div>
        <hr className="border-0 w-full h-px bg-[#999999] mt-[5%] mb-[5%]"></hr>
        <div className="flex flex-col w-[85%] edit-text3">
          <label>Ingrediente de comida</label>
          <DropdownButtonSearchBar options={options1} initialText={selectedOption1} onOptionSelect={setSelectedOption1} addElement={addElement}/>
        </div>
        <div className="added-ing-2 flex flex-wrap justify-start pt-1">
          {elements.map((element) => (
          <div key={element} className="flex flex-row items-center justify-evenly bg-[#66CDEE] w-auto rounded-[50px] px-2 my-1 mr-[5px]">
              <label className="pf-info-t1 font-regular text-white px-2">{element}</label>
              <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 10 10" fill="none" onClick={() => deleteElement(element)}>
                  <path d="M8.14437 7.48074C8.23243 7.5688 8.2819 7.68824 8.2819 7.81278C8.2819 7.93731 8.23243 8.05675 8.14437 8.14481C8.05631 8.23287 7.93687 8.28234 7.81234 8.28234C7.6878 8.28234 7.56836 8.23287 7.4803 8.14481L5.00023 5.66395L2.51937 8.14403C2.43131 8.23209 2.31187 8.28156 2.18734 8.28156C2.0628 8.28156 1.94337 8.23209 1.85531 8.14403C1.76725 8.05597 1.71777 7.93653 1.71777 7.812C1.71777 7.68746 1.76725 7.56802 1.85531 7.47996L4.33616 4.99989L1.85609 2.51903C1.76803 2.43097 1.71855 2.31153 1.71855 2.18699C1.71855 2.06246 1.76803 1.94302 1.85609 1.85496C1.94415 1.7669 2.06358 1.71743 2.18812 1.71743C2.31265 1.71743 2.43209 1.7669 2.52015 1.85496L5.00023 4.33582L7.48109 1.85457C7.56915 1.76651 7.68858 1.71704 7.81312 1.71704C7.93765 1.71704 8.05709 1.76651 8.14515 1.85457C8.23321 1.94263 8.28268 2.06207 8.28268 2.1866C8.28268 2.31114 8.23321 2.43058 8.14515 2.51864L5.66429 4.99989L8.14437 7.48074Z" fill="white"/>
              </svg>
            </div>
          ))}
        </div>
        <div className="flex flex-row w-[85%] mt-[20px]">
          <div className="flex flex-col items-end w-[50%]">
            <button className="btn-editinfo bg-[#fff] mr-[20px]" onClick={handleClickCancel} disabled={loading}>
              <label className="text-[#66EE6B] font-normal edit-text3 cursor-pointer">Cancelar</label>
            </button>
          </div>
          <div className="flex flex-col items-start w-[50%]">
            <button className="btn-editinfo bg-[#66EE6B] hover:bg-[#40AF45] ml-[20px]" onClick={handleClick} disabled={loading}>
              {loading ? 
              (<div className="loading-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              </div>) : (<label className="text-[#fff] font-normal edit-text3 cursor-pointer">Guardar</label>)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddFoodItem