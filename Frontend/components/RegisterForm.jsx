'use client';
import Link from "next/link";
import { useState } from "react";
import TermsOfService from './TermsOfService';
import { register } from "@utils/auth";
import { useRouter } from "next/router";

const RegisterForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState(false);
  const [message, setMessage] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false); 
  const router = useRouter();

  const handleOpen = () => {
    setIsOpen(true);
  }

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked); // Actualiza el estado del checkbox
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPassError(false);
    if (!name || !email || !password) {
      setMessage('Por favor, completa todos los campos.');
      setPassError(true);
    } else if (!isChecked) {
      setMessage('Debes aceptar los términos y condiciones.');
      setPassError(true);
    } else {
      const whitespaceRegex = /\s/; 
      if (whitespaceRegex.test(password)) {
        setPassError(true);
        setMessage('La contraseña no puede contener espacios en blanco.');
      } else {
        setLoading(true);
        const response = await register(email.trim(), password.trim(), name.trim());
        if(!response.success) {
          alert(response.message);
        } else {
          localStorage.setItem('email', email);
          alert('Gracias por registrarte. Por favor, verifica tu correo electrónico a continuación.'); 
          router.push('/verificar-cuenta');
        }
        setLoading(false);
      }
    }
  }

  return (
    <div className='relative w-full h-full flex items-center justify-center top-0 left-0'>
      <form className="registerform" onSubmit={handleSubmit}>
      <img src="/assets/images/logo-v2.png" alt="DietAsist Logo" className='register-logo'/>
        <div className="register-content">
            <label className="register-t1 text-[#fff]">Regístrate</label>
            <div className='flex flex-col mt-[5px]'>
                <label className="register-t2 text-[#fff]">Nombre completo</label>
                <input type='text' className='input-v2-nc' onChange={(e) => setName(e.target.value)} required/>
            </div>
            <div className='flex flex-col mt-[15px]' >
                <label className="register-t2 text-[#fff]">Correo electrónico</label>
                <input type='text' className='input-v2-ce' onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className='flex flex-col mt-[15px]' >
                <label className="register-t2 font-normal text-[#fff]">Contraseña</label>
                <input type='password' className='input-v2-c' onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            {passError && (
              <div className="mt-2 px-2 py-2 bg-red-100 border border-red-400 text-red-700 rounded flex flex-row justify-center items-center">
                <label className="login-t3 font-normal">{message}</label>
              </div>
            )}
            <div className='flex flex-row justify-start items-center mt-[15px]'>
              <input type="checkbox" id="agree" className='chbox-register cursor-pointer'checked={isChecked} onChange={handleCheckboxChange}/>
              <div className="register-t3"> <p className="inline">&nbsp; Acepto los</p> <p onClick={handleOpen} className='inline text-[#000] cursor-pointer hover:underline underline-offset-2'>términos y condiciones</p> </div>
              <TermsOfService isOpen={isOpen} handleClose={handleClose}/>
            </div>
            <button className="btn-register mt-[15px]" type='submit' disabled={loading}>
              {loading ? (
                <div className="spinner-border text-[#66CDEE]" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <a className='register-t4 text-[#66CDEE] no-underline'>REGISTRARSE</a>
              )}
            </button>
        </div>  
        <div className="mt-[15px]"> <label className="register-t5">¿Ya estás registrado?</label> <Link href="/" className="custom-link"><p className='register-t5 cursor-pointer hover:underline underline-offset-2'>Inicia sesión</p></Link> </div>
      </form>
    </div>
    
  )
}

export default RegisterForm