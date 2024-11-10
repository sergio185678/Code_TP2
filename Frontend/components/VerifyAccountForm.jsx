'use client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import { tokenValidation, resendVerificationCode } from '@utils/auth';

const VerifyAccountForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setEmail(localStorage.getItem('email') || '');
    }
  }, []);

  const handleInput = (event, index) => {
    if (event.target.value.length === event.target.maxLength) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const removeValues = (inputs) => {
    inputs.forEach(input => {
      input.value = '';
    });
  }

  const verify = async (event) => {
    event.preventDefault();
    setLoading(true); 
    const inputs = document.querySelectorAll('.input-v3');
    const codes = Array.from(inputs).map(input => input.value);

    if (codes.includes("")) {
      alert('Por favor, ingresa todos los dígitos del código.');
    } else {
      const response = await tokenValidation(codes.join("") );
      if (!response.success) { 
        alert(response.message);
        removeValues(inputs);
      } else {
        alert('Tu cuenta ha sido verificada con éxito.');
        router.push("/");
      }
    }
    setLoading(false);
  }

  const resendCode = async () => {
    setLoadingResend(true);
    const response = await resendVerificationCode(localStorage.getItem('email'));
    if (!response.success) {
      alert(response.message);
    } else {
      alert('Se ha reenviado el código de verificación a tu correo electrónico.')
    }
    setLoadingResend(false);
  }

  return (
    <form className="vaccountform">
      <img src="/assets/images/logo.png" alt="DietAsist Logo" className='login-logo'/>
      <div className='passr-content items-center'>
        <label className="passr-t1">Verifica tu cuenta</label>
        <label className="passr-t2 mt-[5px] text-center">Por favor, ingresa el código de 4 dígitos <br/> enviado a {email}</label>
        <div className='code-input flex flex-row mt-[30px] justify-between' >
          {Array(4).fill("").map((_, index) => (
            <input
              key={index}
              id={`code-input-${index}`}
              className='input-v3'
              maxLength="1"
              onInput={(e) => handleInput(e, index)}
            /> ))}
        </div> 
        {loadingResend ? 
        (<div className="spinner-border text-[#66CDEE] mt-[8px] mb-[8px]" role="status"><span className="visually-hidden">Loading...</span></div>)
        : (<p className="passr-t2 text-[#66CDEE] mt-[50px] cursor-pointer hover:underline underline-offset-2" onClick={resendCode}>Reenviar código</p>)}
        <button className="btn-verify mt-[15px]" onClick={verify} disabled={loading}> 
          {loading ? 
          (<div className="spinner-border text-[#fff]" role="status">
            <span className="visually-hidden">Loading...</span>
           </div> ) 
          : (<a className='passr-t3 no-underline'>CONFIRMAR</a>)}
        </button>
      </div>
      
    </form>
  )
}

export default VerifyAccountForm