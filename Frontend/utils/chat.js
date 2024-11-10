import axios from 'axios'

export const register_message = async(message, token) => {
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'chat/create_message', message,
            {headers: {Authorization:`Bearer ${token}`}});
        //console.log(response);
    } catch (error) {
        console.log(error);
    }
} 

export const predict = async(food_id, token) => {
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'chat/prediction/'+food_id, {},
            {headers: {Authorization:`Bearer ${token}`}});

        return {data:response.data.object, success:true};
    } catch (error) {
        console.log(error);
        return {success:false};
    }
} 

export const verify_hypertension = async(token) => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+'chat/hipertension',
                                        {headers: {Authorization:`Bearer ${token}`}});
        return response.data.object;
    } catch (error) {
        console.log(error);
        return error;
    }
}

//lista de ingredientes alérgenos en comida
export const get_al_ingredients_by_dish = async(food_id, token) => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+'chat/alergicosporcomida/'+food_id,
                                        {headers: {Authorization:`Bearer ${token}`}});
        return response.data.object;
    } catch (error) {
        console.log(error);
        return error;
    }
}

//obesidad filtro
export const get_obesity = async(food_id, token) => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+'chat/obesidad_apto/'+food_id,
                                        {headers: {Authorization:`Bearer ${token}`}});
        return response.data.object;
    } catch (error) {
        console.log(error);
        return error;
    }
}

//nivel de colesterol apto en comida
export const get_cholesterol = async(food_id, token) => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+'chat/colesterol_apto/'+food_id,
                                        {headers: {Authorization:`Bearer ${token}`}});
        return response.data.object;
    } catch (error) {
        console.log(error);
        return error;
    }
}

//nivel de ácido úrico apto en comida
export const get_uric_acid_lvl = async(food_id, token) => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+'chat/acidourico_apto/'+food_id,
                                        {headers: {Authorization:`Bearer ${token}`}});
        return response.data.object;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const create_chat = async(token) => {
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'chat/register', {},
            {headers: {Authorization:`Bearer ${token}`}});
        return response.data.object;
    } catch (error) {
        console.log(error);
    }
}

export const get_messages_by_chat = async(chat_id, token) => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+'chat/getonechat/'+chat_id, 
            {headers: {Authorization:`Bearer ${token}`}});
        return {data:response.data.object, success:true};
    } catch (error) {
        console.log(error);
        return {success:false};
    }
}

export const get_all_chats = async(token) => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+'chat/get_all_by_user',
            {headers: {Authorization:`Bearer ${token}`}});
        return {data:response.data.object, success:true};
    } catch (error) {
        return {success:false};
    }
}

export const update_chat_name = async(name, chat_id, token) => {
    try {
        const response = await axios.put(process.env.NEXT_PUBLIC_API_URL+'chat/update_name/'+chat_id+'?newname='+name, {},
            {headers: {Authorization:`Bearer ${token}`}});
        
        return {data:response.data.mensaje, success:true};
    } catch (error) {
        return {success:false};
    }
}

export const delete_chat = async(chat_id, token) => {
    try {
        const response = await axios.delete(process.env.NEXT_PUBLIC_API_URL+'chat/delete/'+chat_id,
            {headers: {Authorization:`Bearer ${token}`}});
        
        return {data:response.data.mensaje, success:true};
    } catch (error) {
        return {success:false};
    }
}

export const get_recipe = async(id, token) => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+'peruvianDishes/receta/'+id,
            {headers: {Authorization:`Bearer ${token}`}});
        
        return {data:response.data.object, success:true};
    } catch (error) {
        return {success:false};
    }
}

export const get_recommendations = async(id, token) => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+'chat/recomendation/'+id,
            {headers: {Authorization:`Bearer ${token}`}});
        return {data:response.data.object, success:true};
    } catch (error) {
        return {success:false};
    }
}
