import axios from "axios";

export const get_all_info = async(token) => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+'user/get_all_info', 
                                        {headers: {Authorization:`Bearer ${token}`}});
        return response.data.object;
          
    } catch (error) {
        console.log(error);
        //return error;
    }
}

export const update_basic_info = async(basicInfo, token) => {
    try {
        await axios.put(process.env.NEXT_PUBLIC_API_URL+'user/basicdata',
                        {
                            "gender": basicInfo.sexo,
                            "size": basicInfo.estatura,
                            "age": basicInfo.edad,
                            "weight": basicInfo.peso,
                            "physical_activity": basicInfo.actividadfisica,
                            "meal_frequency": basicInfo.comidasxdia
                        },
                        {headers: {Authorization:`Bearer ${token}`}});
        return {success: true}; 
    } catch (error) {
        return { success: false, message: error.response?.data?.mensaje};
    }
}

export const update_med_parameters = async(medParameters, token) => {
    try {
        await axios.put(process.env.NEXT_PUBLIC_API_URL+'user/medical_parameters',
                        {
                            "hypertension": medParameters.hypertension === "Sí" ? 1 : 0,
                            "glycosylated_hemoglobin": medParameters.glycosylated_hemoglobin,
                            "triglyceride": medParameters.triglyceride,
                            "cholesterol_total": medParameters.cholesterol_total,
                            "cholesterol_LDL": medParameters.cholesterol_LDL,
                            "urid_acid": medParameters.urid_acid
                        },
                        {headers: {Authorization:`Bearer ${token}`}});
        return {success: true}; 
    } catch (error) {
        return { success: false, message: error.response?.data?.mensaje};
    }
}

export const get_ingredients_allergy = async(token) => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+'allergicingredient/get_all_for_user', 
                                        {headers: {Authorization:`Bearer ${token}`}});
        return response.data.object;
    } catch (error) {
        console.log(error);
        //return error;
    }
}

export const get_ingredients_dropdown = async(token) => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+'allergicingredient/getallfordropdown', 
                                        {headers: {Authorization:`Bearer ${token}`}});
        return response.data.object;
    } catch (error) {
        console.log(error);
        //return error;
    }
}

export const add_ingredients = async(ingredients, token) => {
    try {
        await axios.post(process.env.NEXT_PUBLIC_API_URL+'allergicingredient/add', ingredients,
                        {headers: {Authorization:`Bearer ${token}`}});
        return {success: true}; 
    } catch (error) {
        return { success: false, message: erro?.response?.data?.mensaje};
    }
}

export const delete_ingredient = async(id, token) => {
    try {
        const response = await axios.delete(process.env.NEXT_PUBLIC_API_URL+'allergicingredient/delete/'+id,
                        {headers: {Authorization:`Bearer ${token}`}});
        return {success: true, message: response.data.mensaje}; 
    } catch (error) {
        //console.log(error);
        return { success: false, message: error.response?.data?.mensaje};
    }
}

export const upload_pfp = async(file, token) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'user/upload', formData,
                                          {headers: {Authorization:`Bearer ${token}`, 'Content-Type': 'multipart/form-data'}});
        //console.log(response);
        return {success: true}; 
    } catch (error) {
        //console.log(error);
        return { success: false, message: error.response?.data?.mensaje || "Error de actualización de foto de perfil."};
    }
}