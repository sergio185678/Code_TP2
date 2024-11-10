'use client';
import "@styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import SideNavBar from '../../components/SideNavBar';
import ProtectedRoute from "@components/ProtectedRoute";
import { logout } from "@utils/auth";
import { get_all_info } from "@utils/user";


const Chat = () => {
    const router = useRouter();
    const { id } = router.query; // Obtener el ID dinámico desde la URL

    const botResponse = "¡Hola, Pablo! Estamos aquí para orientarte sobre tus platos de comidas y las porciones adecuadas. No olvides mantener actualizados tus datos en tu perfil. Recuerda que esta orientación no reemplaza la consulta con un nutricionista.";
    const userResponse = "Cállate " + id;

    const [isOpen, setIsOpen] = useState(true);
    const [pfp, setPfp] = useState('');
    const [openTab, setOpenTab] = useState(false);

    const toggleTab = () => {
        setOpenTab(!openTab);
    };

    const handlePerfilClick = () => {
        router.push('/perfil')
    };

    const handleCerrarSesionClick = () => {
        //console.log('Cerrar sesión clicked');
        let confirmlo = confirm("¿Deseas cerrar sesión?");
        if (confirmlo) {
            logout();
            router.push('/');
        }
    };

    useEffect(() => {
        const fetchUserInfo = async () => { 
            const info = await get_all_info(localStorage.getItem('token'));
            setPfp(process.env.NEXT_PUBLIC_API_UPLOADS + info.profile_photo);
        };
        fetchUserInfo();
    }, []);

    return (
        <div className="home-bg">
            <div className="relative bg-white w-full h-full top-0 left-0">

                <div className={`fixed z-20 top-2/4 left-[300px] cursor-pointer transform ${isOpen ? 'translate-x-0' : 'translate-x-[-300px]'} transition-transform duration-500 ease-in-out`} onClick={() => setIsOpen(!isOpen)}>
                    <img src="/assets/icons/arrow.png" className={`w-[25px] h-[25px] transition-transform duration-500 ease-in-out ${isOpen ? 'transform rotate-0' : 'transform rotate-180'}`} alt="arrow"/>
                </div>
                <SideNavBar isOpen={isOpen}/>
                <div className={`top-bar fixed z-10 ${isOpen ? 'translate-x-[300px] top-bar-collapsed' : 'w-[100%]'} duration-500 ease-in-out`}>
                    <div className="flex justify-center items-center w-9/12"><label className="title-profile">DIETBOT v1.0</label></div>
                    <div className="relative mt-[20px] mb-[20px] flex flex-col items-center justify-center" onClick={toggleTab}>
                        <div className={`${openTab ? 'img-wrapper':'img-wrapper-scaled'}`}>
                            {pfp ? (<img className="pfp-icon rounded-[100%]" src={pfp} alt="Profile pic"/>)
                            : (<img className="pfp-icon" src="/assets/icons/pfp.png" alt="Profile pic"/>)}
                        </div>
                        {openTab && (
                                <div className="absolute top-tab bg-white shadow-lg outline-none rounded-lg rounded-tr-none py-1">
                                    <button className="block px-4 py-2 chat-text text-gray-700 hover:bg-gray-100 w-full text-right" onClick={handlePerfilClick}>
                                            Perfil
                                    </button>

                                    <button className="block px-4 py-2 chat-text text-gray-700 hover:bg-gray-100 w-full text-right" onClick={handleCerrarSesionClick}>
                                        Cerrar sesión
                                    </button>
                                </div> )}
                    </div>
                </div>
                <div className={`profile-tab h-full flex flex-col justify-evenly items-center ${isOpen ? 'translate-x-[300px] top-bar-collapsed' : 'w-[100%]'} duration-500 ease-in-out`}>
                    <div className="w-full h-[140px]"></div>
                    <div className="chat-area extra-data">
                        <div className="w-full flex flex-row justify-start h-auto pt-[10px]">
                            <img className="bot-pic" src="/assets/images/bot.png" alt="Profile pic"/>
                            <div className="chat-container">
                                <label className="chat-name font-bold">DIETBOT</label>
                                <div className="chat-bubble chat-text">{botResponse}</div>
                            </div>
                        </div>
                        <div className="w-full flex flex-row justify-end h-auto pt-[10px]">   
                            <div className="chat-container-2">
                                <label className="chat-name font-bold">Tú</label>
                                <div className="chat-bubble-2 chat-text">{userResponse}</div>
                            </div>
                            <img className="user-pic" src="/assets/icons/pfp.png" alt="Profile pic"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProtectedRoute(Chat);
