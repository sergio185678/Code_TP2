'use client';
import "@styles/globals.css";
import "@styles/responsive.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import SideNavBar from '../../components/SideNavBar';
import ProtectedRoute from "@components/ProtectedRoute";
import { logout } from "@utils/auth";
import { get_all_info } from "@utils/user";
import { get_messages_by_chat, get_recipe } from "@utils/chat";
import ModelEvaluation from "@components/ModelEvaluation";


const Chat = () => {
    const router = useRouter();
    const { id } = router.query; // Obtener el ID dinámico desde la URL
    const endOfMessagesRef = useRef(null);
    const [isOpen, setIsOpen] = useState(true);
    const [pfp, setPfp] = useState('');
    const [openTab, setOpenTab] = useState(false);
    const [messages, setMessages] = useState([]);
    const [showRecipe, setShowRecipe] = useState(false);
    const [dishId, setDishId] = useState(null);
    const [recipe, setRecipe] = useState([]);
    const [loadingRecipe, setLoadingRecipe] = useState(false);
    const [sideOver, setSideOver] = useState(false);
    const sideNavRef = useRef(null);
    const toggleBtnRef = useRef(null);

    const toggleRecipe = () => {
        setShowRecipe(prevState => !prevState);
    };

    const handleClickOutside = (event) => {
        if (
            sideNavRef.current && 
            !sideNavRef.current.contains(event.target) && 
            toggleBtnRef.current && 
            !toggleBtnRef.current.contains(event.target)
        ) {
            setIsOpen(false); // Cierra el SideNavBar
        }  
    };

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

    const getBubbleColor = (color) => {
        switch (color) {
            case 'gris':
                return 'bg-message-gris';
            case 'celeste':
                return 'bg-message-celeste';
            case 'amarillo':
                return 'bg-message-amarillo';
            case 'rojo':
                return 'bg-message-rojo';
            case 'verde':
                return 'bg-message-verde';
        }
    };

    useEffect(() => {
        const fetchUserInfo = async () => { 
            const info = await get_all_info(localStorage.getItem('token'));
            setPfp(process.env.NEXT_PUBLIC_API_UPLOADS + info.profile_photo);
        };
        fetchUserInfo();
    }, []);

    useEffect(() => {
        const fetchMessages = async () => { 
            const res = await get_messages_by_chat(id, localStorage.getItem('token'));
            console.log(res);
            if (res.success) { setMessages(res.data); }
        };
        if (id) {
            fetchMessages();
        }
        
    }, [id]);

    useEffect(() => {
        setLoadingRecipe(true); 
        const fetchRecipe = async () => { 
            const res2 = await get_recipe(dishId, localStorage.getItem('token'));
            if (res2.success) { 
                setRecipe(res2.data.split('\n'));
                setLoadingRecipe(false);
                //console.log(res2.data); 
            }
        };
        if (dishId) {
            fetchRecipe();
            //console.log(dishId);
        }   
    }, [dishId]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Retraso de 100 ms
    
        return () => clearTimeout(timeout); // Limpieza del timeout
    }, [messages]);
    
    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth <= 1024) {
            setIsOpen(false);
            setSideOver(true);
          } else {
            setIsOpen(true);
            setSideOver(false);
          }
        };
        handleResize();
        
        window.addEventListener('resize', handleResize);
        // Clean up the event listener on component unmount
        return () => {window.removeEventListener('resize', handleResize);};
    }, []);

    useEffect(() => {
        if (window.innerWidth <= 1024) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="home-bg">
            <div className="relative bg-white w-full h-full top-0 left-0">
                <div ref={toggleBtnRef} className={`fixed z-20 top-2/4 left-[300px] cursor-pointer transform ${isOpen ? 'translate-x-0' : 'translate-x-[-300px]'} transition-transform duration-500 ease-in-out`} onClick={() => setIsOpen(!isOpen)}>
                    <img src="/assets/icons/arrow.png" className={`w-[25px] h-[25px] transition-transform duration-500 ease-in-out ${isOpen ? 'transform rotate-0' : 'transform rotate-180'}`} alt="arrow"/>
                </div>
                <div ref={sideNavRef}>
                    <SideNavBar isOpen={isOpen} chat_id={id}/>
                </div>
                {showRecipe && 
                (<div className="w-full h-full edit-info-bg fixed z-30 flex justify-center items-center">
                    <div className="recipe-popup">
                      <div className="recipe-top">
                          <label className="recipe-title font-semibold">Receta del plato</label>
                          <button onClick={toggleRecipe}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 51 47" fill="none">
                              <path d="M13.125 34.7915L10.625 32.2915L20.625 22.2915L10.625 12.2915L13.125 9.7915L23.125 19.7915L33.125 9.7915L35.625 12.2915L25.625 22.2915L35.625 32.2915L33.125 34.7915L23.125 24.7915L13.125 34.7915Z" fill="white"/>
                          </svg>
                          </button>
                      </div>
                      <div className="recipe-content text-white">
                          {loadingRecipe ? (
                          <div className="animate-spin loading-recipe"></div>) : (
                          <div className="flex flex-col items-start">
                              {recipe.map((line, index) => (<p key={'line'+index}>{line}</p>))}
                          </div>)}
                      </div>
                    </div>
                </div>)}
                <div className={`top-bar fixed z-10 ${!sideOver ? (isOpen ? 'translate-x-[300px] top-bar-collapsed' : 'w-[100%]') : 'w-[100%]'} duration-500 ease-in-out`}>
                    <div className="flex justify-center items-center w-9/12"><label className="title-profile">DIETBOT v1.0</label></div>
                    <div className="relative mt-[20px] mb-[20px] flex flex-col items-center justify-center" onClick={toggleTab}>
                        <div className={`${openTab ? 'img-wrapper':'img-wrapper-scaled'}`}>
                            {pfp ? (<img className="pfp-icon rounded-[100%]" src={pfp} alt="Profile pic"/>)
                            : (<img className="pfp-icon" src="/assets/icons/pfp.png" alt="Profile pic"/>)}
                        </div>
                        {openTab && (
                                <div className="absolute top-tab bg-white shadow-lg outline-none rounded-lg rounded-tr-none py-1">
                                    <button className="block text-right pr-3 py-2 chat-text text-gray-700 hover:bg-gray-100 w-full" onClick={handlePerfilClick}>
                                        Perfil
                                    </button>

                                    <button className="block text-right pr-3 py-2 chat-text text-gray-700 hover:bg-gray-100 w-full" onClick={handleCerrarSesionClick}>
                                        Cerrar sesión
                                    </button>
                                </div> )}
                    </div>
                </div>
                <div className={`chat-tab ${!sideOver ? (isOpen ? 'translate-x-[300px] top-bar-collapsed' : 'w-[100%]') : 'w-[100%]'} duration-500 ease-in-out`}>
                    <div className="w-full h-[100px]"></div>
                    <div className="chat-area extra-data">
                        {messages.map((message, index) => (message.is_bot ? 
                        <div key={index} className="w-full flex flex-row justify-start h-auto pt-[10px]">
                            <img className="bot-pic" src="/assets/images/bot.png" alt="Profile pic"/>
                            <div className="chat-container">
                                <label className="chat-name font-bold">DIETBOT</label>
                                {message.color === 'verde' ? 
                                (<div className={`chat-bubble-3 chat-text ${getBubbleColor(message.color)}`}>
                                    <ModelEvaluation name={message.msg} listResult={message.list_result} toggleRecipe={toggleRecipe} setDishId={setDishId} porcion={message.f_Porcion} calorias={message.f_Calorias} carbohidratos={message.f_Carbohidratos} grasas={message.f_Grasas} proteinas={message.f_Proteinas}/>
                                </div>) :
                                (<div className={`chat-bubble chat-text ${getBubbleColor(message.color)}`}>{message.msg}</div>)}
                            </div>
                        </div> : 
                        <div key={index} className="w-full flex flex-row justify-end h-auto pt-[10px]">   
                            <div className="chat-container-2">
                                <label className="chat-name font-bold">Tú</label>
                                <div className={`chat-bubble-2 chat-text ${getBubbleColor(message.color)}`}>{message.msg}</div>
                            </div>
                            {pfp ? (<img className="user-pic rounded-[100%]" src={pfp} alt="Profile pic"/>)
                            : (<img className="user-pic" src="/assets/icons/pfp.png" alt="Profile pic"/>)}
                        </div>))}
                        <div ref={endOfMessagesRef} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProtectedRoute(Chat);
