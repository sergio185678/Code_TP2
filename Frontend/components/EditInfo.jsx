'use client';
import { useState, useEffect } from "react";
import DropdownButton from "./DropdownButton";
import { update_basic_info } from "@utils/user";
import { useRouter } from "next/router";

const EditInfo = ({onEdit, handleCloseEdit, userInfo}) => {
  const router = useRouter();
  //Dropdown info botones
  const options1 = ['Ninguno', 'Poco', 'Ligero', 'Moderado', 'Fuerte', 'Muy fuerte'];
  const options2 = [3, 5];
  const options3 = ['F', 'M'];
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [selectedOption3, setSelectedOption3] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputValues, setInputValues] = useState({edad: null, sexo: "", estatura: null, peso: null, actividadfisica: "", comidasxdia: null});

  useEffect(() => {
    if (userInfo) {
      setSelectedOption1(userInfo.physical_activity);
      setSelectedOption2(userInfo.meal_frequency);
      setSelectedOption3(userInfo.gender);
      setInputValues({
        ...inputValues,
        edad: userInfo.age,
        estatura: userInfo.size,
        peso: userInfo.weight
      });
    }
  }, [userInfo]);

  const handleChange = (event, inputName) => {
    setInputValues({
      ...inputValues,
      [inputName]: event.target.value
    });
  };

  const handleButtonClick = async() => {
    setLoading(true);
    inputValues['actividadfisica'] = selectedOption1;
    inputValues['comidasxdia'] = selectedOption2;
    inputValues['sexo'] = selectedOption3;
    const valuesArray = Object.values(inputValues);

    if (valuesArray.every(value => value !== null && value !== "") ) {
      const response = await update_basic_info(inputValues,  localStorage.getItem('token'));
      if (response.success) {
        alert('Tu información básica ha sido actualizada.');
        router.reload();
      } else {
        alert(response.message);
      }
    } else { 
      alert("Por favor, completa todos los campos de tu información básica.");
    }
    setLoading(false);
  };

  const handleCancel = () => {
    // Resetear todos los campos
    setSelectedOption1(userInfo.physical_activity);
    setSelectedOption2(userInfo.meal_frequency);
    setSelectedOption3(userInfo.gender);
    setInputValues({
      edad: userInfo.age,
      sexo: userInfo.gender,
      estatura: userInfo.size,
      peso: userInfo.weight,
      actividadfisica: userInfo.physical_activity,
      comidasxdia: userInfo.meal_frequency
    });
    handleCloseEdit(); // Cerrar el modo de edición
  };

  if (!onEdit) return null;

  return (
    <div className="edit-info-bg fixed z-30 flex justify-center items-center w-full h-full">
      <div className="edit-info-tab">
        <div className="flex flex-col items-center">
          <div className="flex flex-row justify-start w-[85%]"><label className="edit-text">Editar información básica</label></div>
          <div className="flex flex-row justify-start w-[85%]"><p className="edit-text2">Aquí puede editar su información personal básica. Al finalizar, haga clic en el botón "Guardar" para registrar los cambios.</p></div>
        </div>
        <hr className="border-0 w-full h-px bg-[#999999] mt-[5%] mb-[5%]"></hr>
        <div className="flex flex-row w-[85%] edit-text3">
          <div className="flex flex-col items-start w-[50%]">
            <div className="flex flex-col w-[80%] mt-[10px]">
              <label>Edad</label>
              <input type="number" className="edit-input" value={inputValues.edad || ""} onChange={(e) => handleChange(e,"edad")}/>
            </div>
            <div className="flex flex-col w-[80%] mt-[10px]">
              <label>Actividad física</label>
              <DropdownButton options={options1} initialText={selectedOption1} onOptionSelect={setSelectedOption1}/>
            </div>
            <div className="flex flex-col w-[80%] mt-[10px]">
              <label>Estatura (cm)</label>
              <input type="number" className="edit-input" value={inputValues.estatura || ""} onChange={(e) => handleChange(e,"estatura")}/>
            </div>
          </div>
          <div className="flex flex-col items-end w-[50%]">
            <div className="flex flex-col w-[80%] mt-[10px]">
              <label>Sexo</label>
              <DropdownButton options={options3} initialText={selectedOption3} onOptionSelect={setSelectedOption3}/>
            </div>
            <div className="flex flex-col w-[80%] mt-[10px]">
              <label>Comidas al día</label>
              <DropdownButton options={options2} initialText={selectedOption2} onOptionSelect={setSelectedOption2}/>
            </div>
            <div className="flex flex-col w-[80%] mt-[10px]">
              <label>Peso (kg)</label>
              <input type="number" className="edit-input" value={inputValues.peso || ""} onChange={(e) => handleChange(e,"peso")}/>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-[85%] mt-[20px]">
          <div className="flex flex-col items-end w-[50%]">
            <button className="btn-editinfo bg-[#fff] mr-[20px]" onClick={handleCancel} disabled={loading}>
              <label className="text-[#66EE6B] font-normal edit-text3 cursor-pointer">Cancelar</label>            
            </button>
          </div>
          <div className="flex flex-col items-start w-[50%]">
            <button className="btn-editinfo bg-[#66EE6B] hover:bg-[#40AF45] ml-[20px]" onClick={handleButtonClick} disabled={loading}>
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
  );
}

export default EditInfo

