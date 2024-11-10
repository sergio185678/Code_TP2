'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DropdownButton from "./DropdownButton";
import { update_med_parameters } from "@utils/user";

const EditParam = ({onEditParam, handleCloseEditParam, medParam}) => {
  const router = useRouter();
  const options1 = ['Sí', 'No'];
  const [selectedOption1, setSelectedOption1] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputValues, setInputValues] = useState({hypertension: '', glycosylated_hemoglobin: null, triglyceride: null, 
                                                  cholesterol_total: null, cholesterol_LDL: null, urid_acid: null});
  
  useEffect(() => {
    if (medParam) {
      setSelectedOption1(medParam.hypertension === 1 ? 'Sí' : 'No');
      setInputValues({
        ...inputValues,
        glycosylated_hemoglobin: medParam.glycosylated_hemoglobin,
        triglyceride: medParam.triglyceride,
        cholesterol_total: medParam.cholesterol_total,
        cholesterol_LDL: medParam.cholesterol_LDL,
        urid_acid: medParam.urid_acid
      });
    }
  }, [medParam]);

  const handleChange = (event, inputName) => {
    setInputValues({
      ...inputValues,
      [inputName]: event.target.value
    });
  };

  const handleButtonClick = async () => {
    setLoading(true);
    inputValues['hypertension'] = selectedOption1;
    const valuesArray = Object.values(inputValues);

    if (valuesArray.length > 0 && valuesArray.every(value => value !== null && value !== "") ) {
      const response = await update_med_parameters(inputValues,  localStorage.getItem('token'));
      if (response.success) {
        alert('Tus parámetros médicos han sido actualizados.');
        router.reload();
      } else {
        alert(response.message);
      }
    } else {
      alert("Por favor, completa todos los campos de tu parámetros médicos.");
    }
    setLoading(false);
  };

  const handleCancel = () => {
    // Resetear todos los campos
    setSelectedOption1(medParam.hypertension === 1 ? 'Sí' : 'No');
    setInputValues({
      hypertension: medParam.hypertension,
      glycosylated_hemoglobin: medParam.glycosylated_hemoglobin,
      triglyceride: medParam.triglyceride,
      cholesterol_total: medParam.cholesterol_total,
      cholesterol_LDL: medParam.cholesterol_LDL,
      urid_acid: medParam.urid_acid
    });
    handleCloseEditParam(); // Cerrar el modo de edición
  };

  if (!onEditParam) return null;

  return (
    <div className="edit-info-bg fixed z-30 flex justify-center items-center w-full h-full">
      <div className="edit-param-tab">
        <div className="flex flex-col items-center">
          <div className="flex flex-row justify-start w-[85%]"><label className="edit-text">Ajustar parámetros médicos</label></div>
          <div className="flex flex-row justify-start w-[85%]"><p className="edit-text2">Aquí puede ajustar sus parámetros médicos para la evaluación de comida. Haga clic en el botón "Guardar" para confirmar cambios.</p></div>
        </div>
        <hr className="border-0 w-full h-px bg-[#999999] mt-[5%] mb-[5%]"></hr>
        <div className="flex flex-row w-[85%] edit-text3">
          <div className="flex flex-col items-start w-[50%]">
            <div className="flex flex-col w-[80%] mt-[10px]">
              <label>¿Te han diagnosticado <br/> Hipertensión?</label>
              <DropdownButton options={options1} initialText={selectedOption1} onOptionSelect={setSelectedOption1}/>
            </div>
            <div className="flex flex-col w-[80%] mt-[10px]">
              <label>Hemoglobina glicosilada (%)</label>
              <input type="number" className="edit-input" value={inputValues.glycosylated_hemoglobin || ""} onChange={(e) => handleChange(e,"glycosylated_hemoglobin")}/>
            </div>
            <div className="flex flex-col w-[80%] mt-[10px]">
              <label>Triglicéridos (mg/dL)</label>
              <input type="number" className="edit-input" value={inputValues.triglyceride || ""} onChange={(e) => handleChange(e,"triglyceride")}/>
            </div>
          </div>
          <div className="flex flex-col items-end w-[50%]">
            <div className="flex flex-col w-[80%] mt-[10px]">
              <label> <br/> Colesterol total (mg/dL)</label>
              <input type="number" className="edit-input" value={inputValues.cholesterol_total || ""} onChange={(e) => handleChange(e,"cholesterol_total")}/>
            </div>
            <div className="flex flex-col w-[80%] mt-[10px]">
              <label>Colesterol LDL (mg/dL)</label>
              <input type="number" className="edit-input" value={inputValues.cholesterol_LDL || ""} onChange={(e) => handleChange(e,"cholesterol_LDL")}/>
            </div>
            <div className="flex flex-col w-[80%] mt-[10px]">
              <label>Ácido úrico (mg/dL)</label>
              <input type="number" className="edit-input" value={inputValues.urid_acid || ""} onChange={(e) => handleChange(e,"urid_acid")}/>
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

export default EditParam