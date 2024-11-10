'use client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { resetPassword } from '@utils/auth';

const ResetPassword = ({recovertoken}) => {
  const router = useRouter();
  const [nomatch, setNomatch] = useState(false);
  const [message, setMessage] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  //console.log(recovertoken);

  const resetPass = async (e) => {
    e.preventDefault();
    setNomatch(false);
    const whitespaceRegex = /\s/; 
  
    if (pass === "" || pass2 === ""){
      alert('Por favor, ingresa tu nueva contraseña dos veces.')
    } else if (whitespaceRegex.test(pass) || whitespaceRegex.test(pass2)) {
      setNomatch(true);
      setMessage('La contraseña no puede contener espacios en blanco.');
    } else if (pass !== pass2) {
      setNomatch(true);
      setMessage('Las contraseñas no coinciden.');
    } else {
      setLoading(true);
      const response = await resetPassword(recovertoken, pass);
      if (!response.success){
        alert(response.message);
      } else {
        setNomatch(false);
        alert("Tu contraseña ha sido cambiada exitosamente. Ahora puedes acceder a tu cuenta utilizando tu nueva contraseña.");
        router.push('/');
      }
      setLoading(false);
    }
  }

  return (
    <form className="vaccountform">
        <img src="/assets/images/logo.png" alt="DietAsist Logo" className='login-logo'/>
        <div className='flex flex-col w-[80%]'>
          <label className="passr-t1">Restablece tu contraseña</label>
          <div className='flex flex-col mt-[20px]' >
            <label className="passr-t2">Nueva contraseña</label>
            <input id='pass' type='password' className='input-v1-c' onChange={(e) => setPass(e.target.value)} required/>
            <label className="passr-t2 mt-[10px]">Confirmar nueva contraseña</label>
            <input id='pass2' type='password' className='input-v1-c' onChange={(e) => setPass2(e.target.value)} required/>
          </div>
          {nomatch && (
              <div className="mt-2 px-2 py-2 bg-red-100 border border-red-400 text-red-700 rounded flex flex-row justify-center items-center">
                <label className="passr-t4">{message}</label>
              </div>
            )}
          <button className="btn-passrcy mt-[50px]" onClick={resetPass} disabled={loading}> 
            {loading ? (
            <div className="spinner-border text-[#fff]" role="status">
              <span className="visually-hidden">Loading...</span>
            </div> ) : (<a className='passr-t3'>RESTABLECER CONTRASEÑA</a>)} 
          </button>
        </div>
    </form>
  )
}

export default ResetPassword