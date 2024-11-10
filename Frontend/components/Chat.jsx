'use client';
import { useState, useEffect, useRef } from "react";
import SideNavBar from './SideNavBar';
import { get_all_info } from "@utils/user";
import { useRouter } from "next/router";
import { logout } from "@utils/auth";
import { get_all_dishes, get_dish_id_by_name } from "@utils/peruvian-dishes";
import DropdownButton from "./DropdownButton";
import DropdownButtonSearchBar from "./DropdownButtonSearchBar";
import * as chatAPI from "@utils/chat";
import ModelEvaluation from "./ModelEvaluation";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessages, setNewMessages] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [name, setName] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const [openTab, setOpenTab] = useState(false);
    const [pfp, setPfp] = useState('');
    const peruvianDishes = get_all_dishes();
    const [selectedOption, setSelectedOption] = useState('')
    const options = [...peruvianDishes.map(d => d.name)];
    const endOfMessagesRef = useRef(null);
    const [firstMessage, setFirstMessage] = useState(0);
    const [lastMessage, setLastMessage] = useState(0);
    const [newChatId, setNewChatId] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [selectedRec, setSelectedRec] = useState('')
    const [sideOver, setSideOver] = useState(false);
    const sideNavRef = useRef(null);
    const toggleBtnRef = useRef(null);
    const router = useRouter();
    //recipe 
    const [showRecipe, setShowRecipe] = useState(false);
    const [dishId, setDishId] = useState(null);
    const [recipe, setRecipe] = useState([]);
    const [loadingRecipe, setLoadingRecipe] = useState(false);

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

    // verificar si toma en cuenta que alguien no puede ser alérgico a ningún ingrediente
    const isValid = (obj) => {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key] === null || obj[key] === '') {
              return false;
            }
          }
        }
        return true;
      };      
    
    const addMessage = (message, callback) => {
        setMessages(prevMessages => {
            const newMessages = [...prevMessages, message];
            if (callback) callback(newMessages);
            return newMessages;
        });
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

    const removeMessage = (index) => {
        setMessages(m => m.filter((_, i) => i !== index));
    };

    const updateMessage = (index, newMessage) => {
        setMessages(m => m.map((msg, i) => (i === index ? newMessage : msg)));
    };

    const handleMessageClickOp1 = (index, buttonMsg) => {
        const newMessage = {
            ...messages[index],
            msg: buttonMsg,
            type: 'text'
        };
        updateMessage(index, newMessage);
        setTimeout(botResponse1Op1, 1000);
    };

    const handleMessageClickOp2 = (index, buttonMsg) => {
        const newMessage = {
            ...messages[index],
            msg: buttonMsg,
            type: 'text'
        };
        updateMessage(index, newMessage);
        setTimeout(botResponse1Op2, 1000);
    };

    const handleMessageClickOp3 = (index, buttonMsg) => {
        const newMessage = {
            ...messages[index],
            msg: buttonMsg,
            type: 'text'
        };
        updateMessage(index, newMessage);
        setTimeout(botResponse4, 1000);
    };

    const handleClickExtraOp1 = (index, buttonMsg) => {
        const newMessage = {
            ...messages[index],
            msg: buttonMsg,
            type: 'text'
        };
        updateMessage(index, newMessage);
        load_recomendations();
    };

    const handleClickExtraOp2 = (index, buttonMsg) => {
        const newMessage = {
            ...messages[index],
            msg: buttonMsg,
            type: 'text'
        };
        updateMessage(index, newMessage);
        setTimeout(botResponse3, 1000);
    };

    const botResponse1Op1 = () => {
        if (isValid(userInfo)) {
            const bot_msg = {
                chat_id: 0, 
                is_bot: 1, 
                msg: 'Muy bien, ¿qué plato de comida peruano tienes en mente para almorzar?',
                color: 'gris',
                list_result: null,
                peruviandisheid: null,
                type: 'text',
                f_Porcion: null,
                f_Calorias: null,
                f_Carbohidratos: null,
                f_Proteinas: null,
                f_Grasas: null,
            };
            addMessage(bot_msg);
            setTimeout(userResponse1, 1000);
        } else {
            alert("Completa tu información básica y parámetros médicos antes de comenzar. Serás redireccionado a tu perfil.");
            router.push('/perfil');
        }    
    }

    const botResponse1Op2 = () => {
        alert("Serás redirigido a tu perfil para actualizar tus datos.");
        router.push('/perfil');
    }

    const userResponse1 = () => {
        const user_msg = {
            chat_id: 0, 
            is_bot: 0, 
            msg: '',
            color: 'celeste',
            list_result: null,
            peruviandisheid: null,
            type: 'dropdown',
            f_Porcion: null,
            f_Calorias: null,
            f_Carbohidratos: null,
            f_Proteinas: null,
            f_Grasas: null,
        };
        addMessage(user_msg);
    }
    
    const predict = async() => {
        const evalMsgIndex = messages.length;
        setTimeout(botResponse2, 100);

        try {
            const ing_list = await chatAPI.get_al_ingredients_by_dish(get_dish_id_by_name(selectedOption), localStorage.getItem('token'));
            const ob = await chatAPI.get_obesity(get_dish_id_by_name(selectedOption), localStorage.getItem('token'));
            const ch = await chatAPI.get_cholesterol(get_dish_id_by_name(selectedOption), localStorage.getItem('token'));
            const ua = await chatAPI.get_uric_acid_lvl(get_dish_id_by_name(selectedOption), localStorage.getItem('token'));
            const vhy = await chatAPI.verify_hypertension(localStorage.getItem('token'));  
            let conditionMet = false
            removeMessage(evalMsgIndex);

            if (ing_list.length > 0) {
                conditionMet = true;
                let msg_text = '';

                if (ing_list.length === 1) {
                    msg_text = "Resultado: Lamentablemente, el plato de comida que elegiste contiene un ingrediente al que eres alérgico el cual es " + ing_list[0]+ ".";
                } else {
                    msg_text = `Resultado: Lamentablemente, el plato de comida que elegiste contiene un ingredientes a los que eres alérgico. Estos son ${ing_list.join(', ')}.`
                }

                const bot_msg = {
                    chat_id: 0, 
                    is_bot: 1, 
                    msg: msg_text,
                    color: 'rojo',
                    list_result: null,
                    peruviandisheid: null,
                    type: 'text',
                    f_Porcion: null,
                    f_Calorias: null,
                    f_Carbohidratos: null,
                    f_Proteinas: null,
                    f_Grasas: null,
                };
                addMessage(bot_msg, (newMessages) => {
                    setLastMessage(newMessages.length);
                    setTimeout(botResponseExtra, 1000);
                });
            } else {
                if (!ob) {
                    conditionMet = true;
                        const msg_text = `Resultado: Dado su nivel de obesidad, le recomendamos evitar alimentos ricos en colesterol y purinas, que pueden elevar el ácido úrico. Una dieta equilibrada y baja en grasas saturadas será beneficiosa para su salud.`;
                        const bot_msg = {
                            chat_id: 0, 
                            is_bot: 1, 
                            msg: msg_text,
                            color: 'rojo',
                            list_result: null,
                            peruviandisheid: null,
                            type: 'text',
                            f_Porcion: null,
                            f_Calorias: null,
                            f_Carbohidratos: null,
                            f_Proteinas: null,
                            f_Grasas: null,
                        };
                        addMessage(bot_msg, (newMessages) => {
                            setLastMessage(newMessages.length);
                            setTimeout(botResponseExtra, 1000);
                        });
                }
                else {
                    if (!ch) {
                        conditionMet = true;
                        const msg_text = `Resultado: Tú tienes la posibilidad de comer ${selectedOption}, pero no debes consumir grandes cantidades de este plato, ya que presenta un alto nivel en colesterol. Consulte con un especialista para conocer cuál es una cantidad apropiada que puedes comer sin afectar tus niveles actuales de colesterol.`;
                        const bot_msg = {
                            chat_id: 0, 
                            is_bot: 1, 
                            msg: msg_text,
                            color: 'rojo',
                            list_result: null,
                            peruviandisheid: null,
                            type: 'text',
                            f_Porcion: null,
                            f_Calorias: null,
                            f_Carbohidratos: null,
                            f_Proteinas: null,
                            f_Grasas: null,
                        };
                        addMessage(bot_msg, (newMessages) => {
                            setLastMessage(newMessages.length);
                            setTimeout(botResponseExtra, 1000);
                        });
                    } else {
                        if (!ua) {
                            conditionMet = true;
                            const msg_text = `Resultado: Tienes la posibilidad de comer ${selectedOption}, pero no debes consumir grandes cantidades de este plato, ya que contiene ingredientes con altos niveles de purina.`
                            const bot_msg = {
                                chat_id: 0, 
                                is_bot: 1, 
                                msg: msg_text,
                                color: 'rojo',
                                list_result: null,
                                peruviandisheid: null,
                                type: 'text',
                                f_Porcion: null,
                                f_Calorias: null,
                                f_Carbohidratos: null,
                                f_Proteinas: null,
                                f_Grasas: null,
                            };
                            addMessage(bot_msg, (newMessages) => {
                                setLastMessage(newMessages.length);
                                setTimeout(botResponseExtra, 1000);
                            });
                        } else if (vhy) {
                            const bot_msg = {
                                chat_id: 0, 
                                is_bot: 1, 
                                msg: 'Advertencia: Debido a tu hipertensión, es importante que limites el consumo de sal en tus comidas.',
                                color: 'amarillo',
                                list_result: null,
                                peruviandisheid: null,
                                type: 'text',
                                f_Porcion: null,
                                f_Calorias: null,
                                f_Carbohidratos: null,
                                f_Proteinas: null,
                                f_Grasas: null,
                            };
                            addMessage(bot_msg);
                        }
                    }
                }
            }

            if (!conditionMet) {
                await predict_response();
            } 

        } catch (error) {
            removeMessage(evalMsgIndex);
            console.log(error);
            addMessage({
                chat_id: 0, 
                is_bot: 1, 
                msg: 'Ocurrió un error durante la evaluación. Por favor intenta nuevamente más tarde.',
                color: 'rojo',
                list_result: null,
                peruviandisheid: null,
                type: 'text',
                f_Porcion: null,
                f_Calorias: null,
                f_Carbohidratos: null,
                f_Proteinas: null,
                f_Grasas: null,
            });
        }
    }

    const predict_response = async() => {
        const response = await chatAPI.predict(get_dish_id_by_name(selectedOption), localStorage.getItem('token')); 
        if (response.success) {
            const bot_msg = {
                chat_id: 0, 
                is_bot: 1, 
                msg: selectedOption,
                color: 'verde',
                list_result: Object.entries(response.data.ingredientes_resultado).map(([key, value]) => `${key}: ${value}`).join(', '),
                peruviandisheid: get_dish_id_by_name(selectedOption),
                type: 'result',
                f_Porcion: response.data.f_Porcion,
                f_Calorias: response.data.f_Calorias,
                f_Carbohidratos: response.data.f_Carbohidratos,
                f_Proteinas: response.data.f_Proteinas,
                f_Grasas: response.data.f_Grasas,
            };

            addMessage(bot_msg, (newMessages) => {
                setLastMessage(newMessages.length);
                setTimeout(botResponseExtra, 1000);
            });
        } else {
            addMessage({
                chat_id: 0, 
                is_bot: 1, 
                msg: 'Ocurrió un error durante la evaluación. Por favor intenta nuevamente más tarde.',
                color: 'rojo',
                list_result: null,
                peruviandisheid: null,
                type: 'text',
                f_Porcion: null,
                f_Calorias: null,
                f_Carbohidratos: null,
                f_Proteinas: null,
                f_Grasas: null,
            });
        }
    }

    const predict_response_extra = async() => {
        const response = await chatAPI.predict(get_dish_id_by_name(selectedRec), localStorage.getItem('token')); 
        if (response.success) {
            const bot_msg = {
                chat_id: 0, 
                is_bot: 1, 
                msg: selectedRec,
                color: 'verde',
                list_result: Object.entries(response.data.ingredientes_resultado).map(([key, value]) => `${key}: ${value}`).join(', '),
                peruviandisheid: get_dish_id_by_name(selectedRec),
                type: 'result',
                f_Porcion: response.data.f_Porcion,
                f_Calorias: response.data.f_Calorias,
                f_Carbohidratos: response.data.f_Carbohidratos,
                f_Proteinas: response.data.f_Proteinas,
                f_Grasas: response.data.f_Grasas,
            };

            addMessage(bot_msg, (newMessages) => {
                setLastMessage(newMessages.length);
                setTimeout(botResponse3, 1000);
            });
        } else {
            addMessage({
                chat_id: 0, 
                is_bot: 1, 
                msg: 'Ocurrió un error durante la evaluación. Por favor intenta nuevamente más tarde.',
                color: 'rojo',
                list_result: null,
                peruviandisheid: null,
                type: 'text',
                f_Porcion: null,
                f_Calorias: null,
                f_Carbohidratos: null,
                f_Proteinas: null,
                f_Grasas: null,
            });
        }
    }

    const botResponse2 = () => {
        const bot_msg = {
            chat_id: 0, 
            is_bot: 1, 
            msg: 'Evaluando...',
            color: 'gris',
            list_result: null,
            peruviandisheid: null,
            type: 'text',
            f_Porcion: null,
            f_Calorias: null,
            f_Carbohidratos: null,
            f_Proteinas: null,
            f_Grasas: null,
        };
        addMessage(bot_msg);
    }

    const create_chat_messages = async() => {
        if (!newChatId) {
            const response = await chatAPI.create_chat(localStorage.getItem('token'));
            setNewChatId(response);
            //console.log(response);
            for (const message of newMessages) {
                await chatAPI.register_message({ ...message, chat_id: response }, localStorage.getItem('token'));
            }
            setFirstMessage(lastMessage);

        } else {
            for (const message of newMessages) {
                await chatAPI.register_message({ ...message, chat_id: newChatId }, localStorage.getItem('token'));
            }
            setFirstMessage(lastMessage);
        }

    }

    const load_recomendations = async() => {
        const response = await chatAPI.get_recommendations(get_dish_id_by_name(selectedOption), localStorage.getItem('token'));
        console.log(response);
        if (response.success) {
            setRecommendations(response.data.map(item => item.peruvian_dish));
            setTimeout(botResponseExtra2, 1000);
        }
    }

    const botResponseExtra = () => {
        addMessage({
            chat_id: 0, 
            is_bot: 1, 
            msg: '¿Te gustaría que te recomendemos opciones de comidas similares al plato que elegiste y que puedas consumir sin problemas?',
            color: 'gris',
            list_result: null,
            peruviandisheid: null,
            type: 'text',
            f_Porcion: null,
            f_Calorias: null,
            f_Carbohidratos: null,
            f_Proteinas: null,
            f_Grasas: null,
        });
        setTimeout(userResponseExtra, 1000);
    }

    const userResponseExtra = () => {
        const user_msg = {
            chat_id: 0, 
            is_bot: 0, 
            msg: '',
            color: 'celeste',
            list_result: null,
            peruviandisheid: null,
            type: 'buttons3',
            f_Porcion: null,
            f_Calorias: null,
            f_Carbohidratos: null,
            f_Proteinas: null,
            f_Grasas: null,
        };
        addMessage(user_msg);
    }

    const botResponseExtra2 = () => {
        addMessage({
            chat_id: 0, 
            is_bot: 1, 
            msg: 'Selecciona uno de los platos de comida que te recomendamos.',
            color: 'gris',
            list_result: null,
            peruviandisheid: null,
            type: 'text',
            f_Porcion: null,
            f_Calorias: null,
            f_Carbohidratos: null,
            f_Proteinas: null,
            f_Grasas: null,
        });
        setTimeout(userResponseExtra2, 1000);
    }

    const userResponseExtra2 = () => {
        const user_msg = {
            chat_id: 0, 
            is_bot: 0, 
            msg: '',
            color: 'celeste',
            list_result: null,
            peruviandisheid: null,
            type: 'dropdown2',
            f_Porcion: null,
            f_Calorias: null,
            f_Carbohidratos: null,
            f_Proteinas: null,
            f_Grasas: null,
        };
        addMessage(user_msg);
    }

    const botResponse3 = () => {
        const bot_msg = {
            chat_id: 0, 
            is_bot: 1, 
            msg: '¿Te gustaría evaluar otro plato de comida?',
            color: 'gris',
            list_result: null,
            peruviandisheid: null,
            type: 'text',
            f_Porcion: null,
            f_Calorias: null,
            f_Carbohidratos: null,
            f_Proteinas: null,
            f_Grasas: null,
        };
        addMessage(bot_msg);
        setTimeout(userResponse2, 1000);
    }

    const userResponse2 = () => {
        const user_msg = {
            chat_id: 0, 
            is_bot: 0, 
            msg: '',
            color: 'celeste',
            list_result: null,
            peruviandisheid: null,
            type: 'buttons2',
            f_Porcion: null,
            f_Calorias: null,
            f_Carbohidratos: null,
            f_Proteinas: null,
            f_Grasas: null,
        };
        addMessage(user_msg);
    }

    const botResponse4 = () => {
        const bot_msg = {
            chat_id: 0, 
            is_bot: 1, 
            msg: '¡De nada! Espero que la información sobre la evaluación te haya sido útil. Si necesitas evaluar otro plato de comida, simplemente haz clic en "Nueva conversación" en el menú lateral',
            color: 'gris',
            list_result: null,
            peruviandisheid: null,
            type: 'text',
            f_Porcion: null,
            f_Calorias: null,
            f_Carbohidratos: null,
            f_Proteinas: null,
            f_Grasas: null,
        };
        addMessage(bot_msg);
    }

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
            setName(info.fullname);
            setUserInfo(info);
            //console.log(info);
        };
        fetchUserInfo();
    }, []);

    useEffect(() => {
        if (name) {
            const bot_msg = {
                chat_id: 0, 
                is_bot: 1, 
                msg: `¡Hola, ${name}! Estamos aquí para orientarte sobre tus platos de comidas y las porciones adecuadas. No olvides mantener actualizados tus datos en tu perfil. Recuerda que esta orientación no reemplaza la consulta con un nutricionista.`,
                color: 'gris',
                list_result: null,
                peruviandisheid: null,
                type: 'text',
                f_Porcion: null,
                f_Calorias: null,
                f_Carbohidratos: null,
                f_Proteinas: null,
                f_Grasas: null,
            };
            addMessage(bot_msg);
            const user_msg = {
                chat_id: 0, 
                is_bot: 0, 
                msg: '',
                color: 'celeste',
                list_result: null,
                peruviandisheid: null,
                type: 'buttons',
                f_Porcion: null,
                f_Calorias: null,
                f_Carbohidratos: null,
                f_Proteinas: null,
                f_Grasas: null,
            };
            addMessage(user_msg);
        }
    }, [name]);

    useEffect(() => {
        const dropdownIndex = messages.findIndex(msg => msg.type === 'dropdown');
        if (dropdownIndex !== -1) {
            const updatedMessage = {
                ...messages[dropdownIndex],
                type: 'text',
                msg: selectedOption
            };
            updateMessage(dropdownIndex, updatedMessage);
            predict();
        }
    }, [selectedOption]);

    useEffect(() => {
        const dropdownIndex = messages.findIndex(msg => msg.type === 'dropdown2');
        if (dropdownIndex !== -1) {
            const updatedMessage = {
                ...messages[dropdownIndex],
                type: 'text',
                msg: selectedRec
            };
            updateMessage(dropdownIndex, updatedMessage);
            predict_response_extra();
        }
    }, [selectedRec]);

    useEffect(() => {
        console.log('messages: ', messages);
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        setNewMessages(messages.slice(firstMessage, lastMessage).map(message => {
            const { type, ...rest } = message;
            return { ...rest, chat_id: newChatId };
        }));
    }, [lastMessage]);
    
    useEffect(() => {
        //console.log('new messages: ', newMessages);
        if (newMessages.length > 0) {
            create_chat_messages();
        }
    }, [newMessages]);

    useEffect(() => {
        setLoadingRecipe(true); 
        const fetchRecipe = async () => { 
            const res2 = await chatAPI.get_recipe(dishId, localStorage.getItem('token'));
            if (res2.success) { 
                setRecipe(res2.data.split('\n'));
                setLoadingRecipe(false);
            }
        };
        if (dishId) {
            fetchRecipe();
        }   
    }, [dishId]);
    
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

    // useEffect(() => {
    //     console.log('firstMessage: ', firstMessage);
    //     console.log('lastMessage: ', lastMessage);
    // }, [firstMessage, lastMessage]);
    
    return (
    <div className="relative bg-white w-full h-full top-0 left-0">
    
        <div ref={toggleBtnRef} className={`fixed z-20 top-2/4 left-[300px] cursor-pointer transform ${isOpen ? 'translate-x-0' : 'translate-x-[-300px]'} transition-transform duration-500 ease-in-out`} onClick={() => setIsOpen(!isOpen)}>
            <img src="/assets/icons/arrow.png" className={`w-[25px] h-[25px] transition-transform duration-500 ease-in-out ${isOpen ? 'transform rotate-0' : 'transform rotate-180'}`} alt="arrow"/>
        </div>
        <div ref={sideNavRef}>
            <SideNavBar isOpen={isOpen}/>
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
                        <button className="block px-4 py-2 chat-text text-gray-700 hover:bg-gray-100 w-full text-right" onClick={handlePerfilClick}>
                            Perfil
                        </button>
                    
                        <button className="block px-4 py-2 chat-text text-gray-700 hover:bg-gray-100 w-full text-right" onClick={handleCerrarSesionClick}>
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
                        {message.type === 'text' && (<div className={`chat-bubble chat-text ${getBubbleColor(message.color)}`}>{message.msg}</div>)}
                        {message.type === 'result' && 
                        (<div className={`chat-bubble-3 chat-text ${getBubbleColor(message.color)}`}>
                            <ModelEvaluation name={message.msg} listResult={message.list_result} toggleRecipe={toggleRecipe} setDishId={setDishId} porcion={message.f_Porcion} calorias={message.f_Calorias} carbohidratos={message.f_Carbohidratos} grasas={message.f_Grasas} proteinas={message.f_Proteinas}/>
                        </div>)}
                    </div>
                </div> : 
                <div key={index} className="w-full flex flex-row justify-end h-auto pt-[10px]">   
                    <div className="chat-container-2">
                        <label className="chat-name font-bold">Tú</label>
                        {message.type === 'buttons' && (
                        <div className={`chat-bubble-2 chat-text response-area ${getBubbleColor(message.color)}`}>
                            <button id='yes-res' className="message-btn" onClick={()=>handleMessageClickOp1(index, 'Sí los he actualizado. Continuemos.')}>Sí los he actualizado. Continuemos.</button>
                            <button id='no-res' className="message-btn" onClick={()=>handleMessageClickOp2(index, 'No he actualizado mi perfil aún.')}>No he actualizado mi perfil aún.</button>
                        </div>)}
                        {message.type === 'buttons2' && (
                        <div className={`chat-bubble-2 chat-text response-area ${getBubbleColor(message.color)}`}>
                            <button id='yes-res' className="message-btn" onClick={()=>handleMessageClickOp1(index, 'Sí, por favor.')}>Sí, por favor.</button>
                            <button id='no-res' className="message-btn" onClick={()=>handleMessageClickOp3(index, 'No, gracias.')}>No, gracias.</button>
                        </div>)}
                        {message.type === 'buttons3' && (
                        <div className={`chat-bubble-2 chat-text response-area ${getBubbleColor(message.color)}`}>
                            <button id='yes-res' className="message-btn" onClick={()=>handleClickExtraOp1(index, 'Sí, me gustaría.')}>Sí, me gustaría.</button>
                            <button id='no-res' className="message-btn" onClick={()=>handleClickExtraOp2(index, 'No, gracias.')}>No, gracias.</button>
                        </div>)}
                        {message.type === 'text' && (
                        <div className={`chat-bubble-2 chat-text ${getBubbleColor(message.color)}`}>{message.msg}</div>)}
                        {message.type === 'dropdown' && (
                        <div className={`chat-bubble-2-dropdown chat-text ${getBubbleColor(message.color)}`}>
                            <div className="response-area-2">
                                <DropdownButtonSearchBar options={options} initialText={'Elige un plato de comida'} onOptionSelect={setSelectedOption}/>
                            </div>
                        </div>)}
                        {message.type === 'dropdown2' && (
                        <div className={`chat-bubble-2-dropdown chat-text ${getBubbleColor(message.color)}`}>
                            <div className="response-area-2">
                                <DropdownButton options={recommendations} initialText={'Elige un plato de comida'} onOptionSelect={setSelectedRec}/>
                            </div>
                        </div>)}
                    </div>
                    {pfp ? (<img className="user-pic rounded-[100%]" src={pfp} alt="Profile pic"/>)
                    : (<img className="user-pic" src="/assets/icons/pfp.png" alt="Profile pic"/>)}
                </div>))}
                <div ref={endOfMessagesRef} />
            </div>
        </div>
    </div>
    )
}

export default Chat