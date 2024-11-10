import axios from 'axios'

export const validate_token = async(token) => {
  try {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+'auth/validar_token', 
                                      {headers: {Authorization:`Bearer ${token}`}});
      return response.data;
  } catch (error) {
      return false;
  }
}

export const login = async(email, password) => {
  try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'auth/login', {email, password});
      const token  = response.data.object;
      localStorage.setItem('token', token);
      return {success: true};
        
  } catch (error) {
      return { success: false, message: error.response?.data?.mensaje };
  }
}

export const register = async(email, password, fullname) => {
  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'auth/register', {email, password, fullname});
    return {success: true}; 
  } catch (error) {
    return { success: false, message: error.response?.data?.mensaje};
  }
}

export const logout = () => {
  localStorage.removeItem('token');
};

export const tokenValidation = async(token) => { //verificar cuenta
  try {
    const response = await axios.put(process.env.NEXT_PUBLIC_API_URL+'auth/validate?token='+token);
    return {success: true}; 
  } catch (error) {
    return { success: false, message: error.response?.data?.mensaje};
  }
}

export const resendVerificationCode = async(email) => { //reenviar código de verificación
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+'auth/resendvalidate?email='+email);
    return {success: true}; 
  } catch (error) {
    return { success: false, message: error.response?.data?.mensaje};
  }
}

export const requestPassword = async(email) => {
  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'auth/requestrecover?email='+email);
    return {success: true}; 
  } catch (error) {
    return { success: false, message: error.response?.data?.mensaje};
  }
}

export const resetPassword = async(token, password) => {
  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'auth/recoverpassword', {token, password});
    return {success: true}; 
  } catch (error) {
    console.log(error);
    return { success: false, message: error.response?.data?.mensaje};
  }
}