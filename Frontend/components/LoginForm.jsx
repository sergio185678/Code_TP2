'use client';
import Link from 'next/link';
import { useState } from 'react';
import { login, validate_token } from '@utils/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFlag(false);
    if (!email || !password) {
      setFlag(true);
      setError('Por favor, completa todos los campos.');
      return;
    } else {
      setLoading(true);
      const response = await login(email.trim(), password.trim());
      if(!response.success) {
        setFlag(true);
        setError(response.message);
      } else {
        router.push('/inicio');
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      const response = await validate_token(token);
      if (response) {
        router.replace('/inicio');
      }
    };

    checkToken();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <form className="loginform" onSubmit={handleSubmit}>
        <img src="/assets/images/logo.png" alt="DietAsist Logo" className='login-logo'/>
        <div className="login-content">
            <label className="login-t1 font-semibold">Iniciar sesión</label>
            <div className='login-input1'>
                <label className="login-t2 font-normal">Correo electrónico</label>
                <input type='text' className='input-v1-ce'value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className='login-input2' >
                <label className="login-t2 font-normal">Contraseña</label>
                <input type='password' className='input-v1-c' value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            {flag && (
              <div className="login-alert">
                <label className="login-t3 font-normal">{error}</label>
              </div>
            )}
            <div className='flex flex-row justify-center'> <Link href='/recuperar-contrasena' className="custom-link"><p className="login-t5">¿Olvidaste tu contraseña?</p></Link> </div>
            <button className="btn-login" type='submit' disabled={loading}>
              {loading ? 
              (<div className="spinner-border text-[#fff]" role="status">
                <span className="visually-hidden">Loading...</span>
               </div> ) 
              : (<a className='login-t2 font-semibold text-[#fff] no-underline'>Entrar</a>)}
            </button>
            <div className='flex flex-row justify-center'> <label className="login-t4"> ¿No tienes cuenta?&nbsp;</label> <Link href='/registrarse' className="custom-link"><p className='login-t4 text-[#66CDEE] cursor-pointer hover:underline underline-offset-2'>Regístrate</p></Link> </div>
        </div>  
    </form>
  )
}

export default LoginForm