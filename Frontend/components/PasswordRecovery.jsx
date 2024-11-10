'use client';
import Link from "next/link";
import { useRouter } from 'next/router';
import { requestPassword } from '@utils/auth';
import { useState } from 'react';

const PasswordRecovery = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  
  const recoverPassword = async (e) => {
    //console.log(email);
    e.preventDefault();
    setLoading(true);
    if (email === "") {
      alert('Por favor, ingresa tu correo electrónico.');  
    } else {
      const response = await requestPassword(email);

      if(!response.success){
        alert(response.message);
      } else {
          alert("Se envió el proceso de cambio de contraseña a tu correo electrónico.")
          router.push("/");
      }
    }
    setLoading(false);
  }

  return (
    <form className="vaccountform">
        <img src="/assets/images/logo.png" alt="DietAsist Logo" className='login-logo'/>
        <div className='passr-content'>
          <label className="passr-t1">Recupera tu contraseña</label>
          <label className="passr-t2 mt-[5px]">Te enviaremos los pasos para restablecer <br/> tu contraseña a tu correo electrónico. </label>
          <div className='flex flex-col mt-[30px]' >
            <label className="passr-t2">Correo electrónico</label>
            <input id='email' className='input-v1-ce' onChange={handleEmailChange} required/>
          </div>
          <button className="btn-passrcy mt-[50px]" onClick={recoverPassword} disabled={loading}> 
            {loading ? 
            (<div className="spinner-border text-[#fff]" role="status">
              <span className="visually-hidden">Loading...</span>
            </div> ) : (<a className='passr-t3'>RECUPERAR CONTRASEÑA</a>)} 
          </button>
        </div>
        <Link href="/" className="custom-link"><p className="passr-t2 text-[#66CDEE] mt-[15px] cursor-pointer hover:underline underline-offset-2" >Regresar a iniciar sesión</p></Link>
    </form>
  )
}

export default PasswordRecovery