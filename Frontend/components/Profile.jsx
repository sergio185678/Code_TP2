'use client';
import { useState, useEffect, useRef } from "react";
import SideNavBar from "./SideNavBar";
import EditInfo from "./EditInfo";
import EditParam from "./EditParam";
import AddFoodItem from "./AddFoodItem";
import { useRouter } from "next/router";
import { logout } from "@utils/auth";
import { get_all_info, get_ingredients_allergy, delete_ingredient, upload_pfp } from "@utils/user";

const Profile = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [userBasicInfo, setUserBasicInfo] = useState({});
    const [u_info, setU_info] = useState({});                           
    const [medParameters, setMedParameters] = useState({});
    const [ingredients, setIngredients] = useState([{}]);
    const [visibleIngredients, setVisibleIngredients] = useState({});
    const [pfp, setPfp] = useState('');
    const [loading, setLoading] = useState(false);
    const [sideOver, setSideOver] = useState(false);
    const sideNavRef = useRef(null);
    const toggleBtnRef = useRef(null);
    const router = useRouter('');

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

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setLoading(true);
            //console.log("Imagen seleccionada:", file);
            const response = await upload_pfp(file, localStorage.getItem('token'));  
            if (response.success) {
                alert("Foto de perfil actualizada correctamente");
                router.reload();
            } else {
                alert(response.message);
            }
            setLoading(false); 
        }
    };

    const handlePhotoButton = () => {
        document.getElementById('fileInput').click();
    };

    const deleteElement = async (id, name) => {
        const c = confirm(`¿Deseas eliminar ${name} de tu lista de ingredientes alérgenos?`)
        if (c) {
            setVisibleIngredients(s => ({...s, [id]: false}));
            const response = await delete_ingredient(id, localStorage.getItem('token'));
            if (response.success) {
                console.log(response.message);
            } else {
                setVisibleIngredients(s => ({...s, [id]: false}));
                alert(response.message);
            }
        }
    };

    const [onEdit, setOnEdit] = useState(false);

    const handleOpenEdit = () => {
        setOnEdit(true);
    }

    const handleCloseEdit = () => {
        setOnEdit(false);
    }  

    const [onEditParam, setOnEditParam] = useState(false);

    const handleOpenEditParam = () => {
        setOnEditParam(true);
    }

    const handleCloseEditParam = () => {
        setOnEditParam(false);
    } 
    
    const [onAddFood, setOnAddFood] = useState(false);

    const handleOpenAddFood = () => {
        setOnAddFood(true);
    }

    const handleCloseAddFood= () => {
        setOnAddFood(false);
    }

    //tab
    const [openTab, setOpenTab] = useState(false);

    const toggleTab = () => {
        setOpenTab(!openTab);
    };

    const handlePerfilClick = () => {
        router.push('/perfil')
    };

    const handleCerrarSesionClick = () => {
        let confirmlo = confirm("¿Deseas cerrar sesión?");
        if (confirmlo) {
            logout();
            router.push('/');
        }
    };

    //conseguir info de usuario
    useEffect(() => {
        const fetchUserInfo = async () => { 
            const info = await get_all_info(localStorage.getItem('token'));
            const ing = await get_ingredients_allergy(localStorage.getItem('token'));
            //console.log(info, ing);
            setPfp(process.env.NEXT_PUBLIC_API_UPLOADS + info.profile_photo);
            setU_info(info);
            setUserBasicInfo({
                fullname: info.fullname || '-',
                gender: info.gender || '-',
                age: info.age !== null ? `${info.age} años` : '-',
                size: info.size !== null ? `${info.size} cm` : '-',
                weight: info.weight !== null ? `${info.weight} kg` : '-',
                physical_activity: info.physical_activity || '-',
                meal_frequency: info.meal_frequency !== null ?`${info.meal_frequency} comidas`: '-'
            });
            setMedParameters({
                hypertension: info.hypertension !== null ? (info.hypertension === 1 ? 'Sí' : 'No') : '-',
                glycosylated_hemoglobin: info.glycosylated_hemoglobin !== null ? `${info.glycosylated_hemoglobin}%` : '-',
                triglyceride: info.triglyceride !== null ? `${info.triglyceride} mg/dL` : '-',
                cholesterol_total: info.cholesterol_total !== null ? `${info.cholesterol_total} mg/dL` : '-',
                cholesterol_LDL: info.cholesterol_LDL !== null ? `${info.cholesterol_LDL} mg/dL` : '-',
                urid_acid: info.urid_acid !== null ? `${info.urid_acid} mg/dL` : '-'
            });
            setIngredients(ing);
            const visibility = {};
            ing.forEach(ingredient => { visibility[ingredient.id] = true; });
            setVisibleIngredients(visibility);
        };
        fetchUserInfo();
    }, []);

    //responsive sidenavbar
    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth <= 1600) {
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
        if (window.innerWidth <= 1600) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative bg-[#E4E4E4] w-full h-full top-0 left-0">
            <div ref={toggleBtnRef} className={`fixed z-20 top-2/4 left-[300px] cursor-pointer transform ${isOpen ? 'translate-x-0' : 'translate-x-[-300px]'} transition-transform duration-500 ease-in-out`} onClick={() => setIsOpen(!isOpen)}>
                <img src="/assets/icons/arrow.png" className={`w-[25px] h-[25px] transition-transform duration-500 ease-in-out ${isOpen ? 'transform rotate-0' : 'transform rotate-180'}`} alt="arrow"/>
            </div>
            <div ref={sideNavRef}>
                <SideNavBar isOpen={isOpen}/>
            </div>
            <EditInfo onEdit={onEdit} handleCloseEdit={handleCloseEdit} userInfo={u_info}/>
            <EditParam onEditParam={onEditParam} handleCloseEditParam={handleCloseEditParam} medParam={u_info}/>
            <AddFoodItem onAddFood={onAddFood} handleCloseAddFood={handleCloseAddFood}/>
            <div className={`top-bar absolute z-10 ${!sideOver ? (isOpen ? 'translate-x-[300px] top-bar-collapsed' : 'w-[100%]') : 'w-[100%]'} duration-500 ease-in-out`}>
                <div className="flex justify-center items-center w-9/12"><label className="title-profile">Mi perfil</label></div>
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
            {/* <div className="profile-tab w-full h-full flex flex-row justify-evenly items-center"> */}
            <div className="w-full h-[100px]"></div>
            <div className={`profile-tab extra-data-2 ${!sideOver ? (isOpen ? 'translate-x-[300px] top-bar-collapsed' : 'w-[100%]') : 'w-[100%]'} duration-500 ease-in-out`}>
                <div className="p-section">
                    <div className="p-info">
                        <div className="p-info-row flex flex-row items-center justify-evenly">
                            <div className="relative mt-[-40px] bg-white w-[80px] h-[80px] rounded-[80px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                            {loading ? (<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50">
                                <div className="animate-spin loading-pfp"></div> </div>)
                            : (pfp ? (<img className="w-[80px] h-[80px] rounded-[80px]" src={pfp} alt="Profile pic"/>) : (<img className="w-[80px] h-[80px]" src="/assets/icons/pfp.png" alt="Profile pic"/>))}
                                <button className="photo-btn absolute bottom-0 right-0 fill-[#66CDEE] hover:fill-[#1BC0F4]" onClick={handlePhotoButton}>
                                    <svg className="fill-inherit edit-button" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                        <circle cx="15" cy="15" r="15"/>
                                        <svg className="fill-inherit" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" x="5" y="5">
                                            <path d="M16.25 4.375H14.0844L13.0195 2.77813C12.9625 2.69262 12.8852 2.6225 12.7946 2.57399C12.704 2.52548 12.6028 2.50006 12.5 2.5H7.5C7.39721 2.50006 7.29602 2.52548 7.2054 2.57399C7.11478 2.6225 7.03752 2.69262 6.98047 2.77813L5.91484 4.375H3.75C3.25272 4.375 2.77581 4.57254 2.42417 4.92417C2.07254 5.27581 1.875 5.75272 1.875 6.25V15C1.875 15.4973 2.07254 15.9742 2.42417 16.3258C2.77581 16.6775 3.25272 16.875 3.75 16.875H16.25C16.7473 16.875 17.2242 16.6775 17.5758 16.3258C17.9275 15.9742 18.125 15.4973 18.125 15V6.25C18.125 5.75272 17.9275 5.27581 17.5758 4.92417C17.2242 4.57254 16.7473 4.375 16.25 4.375ZM16.875 15C16.875 15.1658 16.8092 15.3247 16.6919 15.4419C16.5747 15.5592 16.4158 15.625 16.25 15.625H3.75C3.58424 15.625 3.42527 15.5592 3.30806 15.4419C3.19085 15.3247 3.125 15.1658 3.125 15V6.25C3.125 6.08424 3.19085 5.92527 3.30806 5.80806C3.42527 5.69085 3.58424 5.625 3.75 5.625H6.25C6.35292 5.62507 6.45427 5.59971 6.54504 5.5512C6.63581 5.50268 6.71319 5.43249 6.77031 5.34688L7.83437 3.75H12.1648L13.2297 5.34688C13.2868 5.43249 13.3642 5.50268 13.455 5.5512C13.5457 5.59971 13.6471 5.62507 13.75 5.625H16.25C16.4158 5.625 16.5747 5.69085 16.6919 5.80806C16.8092 5.92527 16.875 6.08424 16.875 6.25V15ZM10 6.875C9.32013 6.875 8.65552 7.07661 8.09023 7.45432C7.52493 7.83204 7.08434 8.3689 6.82416 8.99703C6.56399 9.62515 6.49591 10.3163 6.62855 10.9831C6.76119 11.6499 7.08858 12.2624 7.56932 12.7432C8.05006 13.2239 8.66257 13.5513 9.32938 13.6839C9.99619 13.8166 10.6874 13.7485 11.3155 13.4883C11.9436 13.2282 12.4805 12.7876 12.8582 12.2223C13.2359 11.657 13.4375 10.9924 13.4375 10.3125C13.4365 9.40114 13.074 8.52739 12.4295 7.88296C11.7851 7.23853 10.9114 6.87603 10 6.875ZM10 12.5C9.56735 12.5 9.14442 12.3717 8.78469 12.1313C8.42496 11.891 8.14458 11.5493 7.97901 11.1496C7.81345 10.7499 7.77013 10.3101 7.85453 9.88574C7.93894 9.46141 8.14728 9.07163 8.4532 8.7657C8.75913 8.45978 9.14891 8.25144 9.57324 8.16703C9.99757 8.08263 10.4374 8.12595 10.8371 8.29151C11.2368 8.45708 11.5785 8.73746 11.8188 9.09719C12.0592 9.45692 12.1875 9.87985 12.1875 10.3125C12.1875 10.8927 11.957 11.4491 11.5468 11.8593C11.1366 12.2695 10.5802 12.5 10 12.5Z" fill="white"/>
                                        </svg>
                                    </svg>
                                </button>
                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} id="fileInput"/>
                            </div>
                        </div>
                        <div className="p-info-row flex flex-row items-center justify-evenly">
                            <div className="h-[40px] flex flex-col items-center justify-center"><label className="pf-info-t1 font-semibold">{userBasicInfo.fullname}</label><label id="age" className="pf-info-t1 font-light">{userBasicInfo.age}</label></div>
                        </div>
                        <div className="p-info-row flex flex-row items-center justify-evenly">
                            <div className="w-[50%] h-[40px] flex flex-col items-center justify-center"><label className="pf-info-t1 font-semibold text-[#66CDEE]">Sexo</label><label id="sex" className="pf-info-t1 font-light">{userBasicInfo.gender}</label></div>
                            <div className="w-[50%] h-[40px] flex flex-col items-center justify-center"><label className="pf-info-t1 font-semibold text-[#66CDEE]">Estatura</label><label id="height" className="pf-info-t1 font-light">{userBasicInfo.size}</label></div>
                        </div>
                        <div className="p-info-row flex flex-row items-center justify-evenly">
                            <div className="w-[50%] h-[40px] flex flex-col items-center justify-center"><label className="pf-info-t1 font-semibold text-[#66CDEE]">Peso</label><label id="weight" className="pf-info-t1 font-light">{userBasicInfo.weight}</label></div>
                            <div className="w-[50%] h-[40px] flex flex-col items-center justify-center"><label className="pf-info-t1 font-semibold text-[#66CDEE]">Actividad física</label><label id="physact" className="pf-info-t1 font-light">{userBasicInfo.physical_activity}</label></div>
                        </div>
                        <div className="p-info-row flex flex-row items-center justify-evenly">
                            <div className="w-[50%] h-[40px] flex flex-col items-center justify-center"><label className="pf-info-t1 font-semibold text-[#66CDEE]">Comidas al día</label><label id="meals" className="pf-info-t1 font-light">{userBasicInfo.meal_frequency}</label></div>
                        </div>
                        <div className="relative p-info-row flex flex-row items-center justify-evenly">
                            <button className="cursor-pointer fill-[#66EE6B] hover:fill-[#40AF45]" onClick={handleOpenEdit}>
                                <svg className="fill-inherit edit-button" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                    <circle className="fill-inherit" cx="15" cy="15" r="15"/>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" x="6" y="6">
                                        <path d="M10.295 6.5L11 7.205L4.19 14H3.5V13.31L10.295 6.5ZM12.995 2C12.8075 2 12.6125 2.075 12.47 2.2175L11.0975 3.59L13.91 6.4025L15.2825 5.03C15.575 4.7375 15.575 4.25 15.2825 3.9725L13.5275 2.2175C13.3775 2.0675 13.19 2 12.995 2ZM10.295 4.3925L2 12.6875V15.5H4.8125L13.1075 7.205L10.295 4.3925Z" fill="white"/>
                                    </svg>
                                </svg>
                            </button>
                        </div>
                    </div>                
                    <div className="i-list">
                        <label className="pf-info-t1 font-semibold underline underline-offset-2">Lista de ingredientes alérgenos</label>
                        <button onClick={() => { handleOpenAddFood() }} className="flex flex-row items-center justify-evenly bg-[#66EE6B] cursor-pointer w-[90px] rounded-[50px] my-2 shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] hover:bg-[#40AF45]">  
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 10 10" fill="none">
                                <g clipPath="url(#clip0_35_38)">
                                    <path d="M5 0.9375C2.76 0.9375 0.9375 2.76 0.9375 5C0.9375 7.24 2.76 9.0625 5 9.0625C7.24 9.0625 9.0625 7.24 9.0625 5C9.0625 2.76 7.24 0.9375 5 0.9375ZM5 1.5625C6.90219 1.5625 8.4375 3.09781 8.4375 5C8.4375 6.90219 6.90219 8.4375 5 8.4375C3.09781 8.4375 1.5625 6.90219 1.5625 5C1.5625 3.09781 3.09781 1.5625 5 1.5625ZM4.6875 3.125V4.6875H3.125V5.3125H4.6875V6.875H5.3125V5.3125H6.875V4.6875H5.3125V3.125H4.6875Z" fill="white"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_35_38">
                                        <rect width="10" height="10" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            <label className="pf-info-t1 font-regular text-white cursor-pointer">Añadir</label>
                        </button>
                        <div className="added-ing flex flex-wrap justify-evenly pt-1">
                            {ingredients.map((ingredient) => ( visibleIngredients[ingredient.id] && (
                            <div key={ingredient.id} className="flex flex-row items-center justify-evenly bg-[#66CDEE] w-auto rounded-[50px] px-2 my-1">
                                <label className="pf-info-t1 font-regular text-white px-2">{ingredient.name}</label>
                                <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 10 10" fill="none" onClick={() => deleteElement(ingredient.id, ingredient.name)}>
                                    <path d="M8.14437 7.48074C8.23243 7.5688 8.2819 7.68824 8.2819 7.81278C8.2819 7.93731 8.23243 8.05675 8.14437 8.14481C8.05631 8.23287 7.93687 8.28234 7.81234 8.28234C7.6878 8.28234 7.56836 8.23287 7.4803 8.14481L5.00023 5.66395L2.51937 8.14403C2.43131 8.23209 2.31187 8.28156 2.18734 8.28156C2.0628 8.28156 1.94337 8.23209 1.85531 8.14403C1.76725 8.05597 1.71777 7.93653 1.71777 7.812C1.71777 7.68746 1.76725 7.56802 1.85531 7.47996L4.33616 4.99989L1.85609 2.51903C1.76803 2.43097 1.71855 2.31153 1.71855 2.18699C1.71855 2.06246 1.76803 1.94302 1.85609 1.85496C1.94415 1.7669 2.06358 1.71743 2.18812 1.71743C2.31265 1.71743 2.43209 1.7669 2.52015 1.85496L5.00023 4.33582L7.48109 1.85457C7.56915 1.76651 7.68858 1.71704 7.81312 1.71704C7.93765 1.71704 8.05709 1.76651 8.14515 1.85457C8.23321 1.94263 8.28268 2.06207 8.28268 2.1866C8.28268 2.31114 8.23321 2.43058 8.14515 2.51864L5.66429 4.99989L8.14437 7.48074Z" fill="white"/>
                                </svg>
                            </div>)))}
                        </div>
                    </div> 
                </div>

                <div className="m-parameters">
                    <div className=" mp-tittle flex flex-row justify-between ">
                        <label className=" text-[#66CDEE] font-semibold">Parámetros médicos</label>
                        {/* <div className="cursor-pointer"><Image src="/assets/icons/edit.png" alt="Profile pic" width={40} height={25}/></div> */}
                        <button className="cursor-pointer fill-[#66EE6B] hover:fill-[#40AF45]" onClick={handleOpenEditParam}>
                            <svg className="fill-inherit edit-button" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                <circle className="fill-inherit" cx="15" cy="15" r="15"/>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" x="6" y="6">
                                    <path d="M10.295 6.5L11 7.205L4.19 14H3.5V13.31L10.295 6.5ZM12.995 2C12.8075 2 12.6125 2.075 12.47 2.2175L11.0975 3.59L13.91 6.4025L15.2825 5.03C15.575 4.7375 15.575 4.25 15.2825 3.9725L13.5275 2.2175C13.3775 2.0675 13.19 2 12.995 2ZM10.295 4.3925L2 12.6875V15.5H4.8125L13.1075 7.205L10.295 4.3925Z" fill="white"/>
                                </svg>
                            </svg>
                        </button>
                    </div>
                    <div className="parameter">
                        <div className="parsection1"><label className="pf-title1">Hipertensión</label></div> 
                        <div className="parsection2"><label className="pf-title2" id="ht">{medParameters.hypertension}</label></div>
                    </div>
                    <div className="parameter">
                        <div className="parsection1"><label className="pf-title1">Hemoglobina glicosilada</label></div> 
                        <div className="parsection2"><label className="pf-title2" id="hg">{medParameters.glycosylated_hemoglobin}</label></div>
                    </div>
                    <div className="parameter">
                        <div className="parsection1"><label className="pf-title1">Triglicéridos</label></div> 
                        <div className="parsection2"><label className="pf-title2" id="tri">{medParameters.triglyceride}</label></div>
                    </div>
                    <div className="parameter">
                        <div className="parsection1"><label className="pf-title1">Colesterol total</label></div> 
                        <div className="parsection2"><label className="pf-title2" id="ctot">{medParameters.cholesterol_total}</label></div>
                    </div>
                    <div className="parameter">
                        <div className="parsection1"><label className="pf-title1">Colesterol LDL</label></div> 
                        <div className="parsection2"><label className="pf-title2" id="cldl">{medParameters.cholesterol_LDL}</label></div>
                    </div>
                    <div className="parameter last-parameter">
                        <div className="parsection1"><label className="pf-title1">Ácido úrico</label></div> 
                        <div className="parsection2"><label className="pf-title2" id="acu">{medParameters.urid_acid}</label></div>
                    </div>  
                </div>
            </div>
            
        </div> 
    )
}

export default Profile