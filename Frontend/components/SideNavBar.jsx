'use client';
import { Disclosure } from "@headlessui/react"
import { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/router';
import { get_all_chats, update_chat_name, delete_chat } from "@utils/chat";

const SideNavBar = ({isOpen, chat_id = false}) => {
  const [chats, setChats] = useState([]);
  const [editValues, setEditValues] = useState({});
  const inputRef = useRef(null);
  const router = useRouter();

  // const handleLinkClick = (href) => (e) => {
  //   e.preventDefault(); 
  //   if (router.asPath === href) {
  //     router.reload(); 
  //   } else {
  //     router.push(href); 
  //   }
  // };

  const toggleChatEdit = (id) => {
    setChats(chats.map(chat =>
      chat.id === id ? { ...chat, edit: !chat.edit } : chat
    ));
    if (!editValues[id]) {
      setEditValues(prev => ({ ...prev, [id]: chats.find(chat => chat.id === id).name }));
    }
    // Focus the input field
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleInputChange = (id, event) => {
    setEditValues(prev => ({ ...prev, [id]: event.target.value }));
  };

  const handleInputKeyDown = async (id, event) => {
    if (event.key === 'Enter') {
      setChats(chats.map(chat =>
        chat.id === id ? { ...chat, name: editValues[id], edit: false } : chat
      ));
      await update_chat_name(editValues[id], id, localStorage.getItem('token'));
      setEditValues(prev => ({ ...prev, [id]: '' }));
    }
  };

  const deleteChat = async(chatId) => {
    let confirmDelete = confirm("¿Quieres eliminar el chat de forma permanente?");
    if (confirmDelete) {
      setChats(chats.filter(chat => chat.id !== chatId)); 
      const res = await delete_chat(chatId, localStorage.getItem('token'));
      //console.log("Chat eliminado");
      if (chat_id && chat_id == chatId) {
        router.push('/inicio');
      }
    } else {
      console.log("Cancelado");
    }
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const truncateName = (name, maxLength) => {
    if (name.length <= maxLength) {
      return name;
    } else {
      return name.substring(0, maxLength) + "...";
    }
  };

  useEffect(() => {
    const get_messages = async () => {
      const response = await get_all_chats(localStorage.getItem('token'));
      if (response.success) {
        setChats(response.data);
      }
    }
    get_messages();
    
  }, []);


  return (
    <div>
      <Disclosure as="nav" className={`fixed z-20 top-0 left-0 w-[300px] h-full bg-[#66CDEE] transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500 ease-in-out`}>
        <div className="p-4">
        <a href="/inicio">
          <img src="/assets/images/logo-v2.png" alt="DietAsist Logo" className='navbar-logo'/>
        </a>
        <hr className="border-0 w-full h-px bg-white mb-[20px]"></hr>
        <a href='/inicio' className="custom-link">
          <div className="rounded-md mb-3 flex flex-row justify-start items-center cursor-pointer">
            <div><img src="/assets/icons/plus.png" className="w-5 h-5" /></div>
            <label className="newchat-text hover:translate-x-[15px] transition-transform duration-500 ease-in-out">Nueva conversación</label>
          </div>
        </a>
        <div className="mb-1 flex flex-row justify-start items-center"><label className="history-text">Historial</label></div>
          <ul className="p-0">
            {chats.map(chat => (
              <li key={chat.id} className="mb-0.5">
                <div className="flex flex-row items-center justify-between w-full">
                  {chat.edit ? (
                      <div className="w-[65%] h-[22px] rounded-md py-[18px] flex flex-row justify-start items-center">
                        <img src="/assets/icons/chat.png" alt="Chat Icon" className="w-5 h-5 mr-[10px]" />
                        <input
                          ref={inputRef}
                          type='text'
                          defaultValue={chat.name}
                          className='w-full chatsinput-text bg-[#66CDEE]'
                          onChange={(event) => handleInputChange(chat.id, event)}
                          onKeyDown={(event) => handleInputKeyDown(chat.id, event)}
                        />
                      </div>
                    ) : (
                      <a href={`/chat/${chat.id}`} className="custom-link chath-section">
                        <div className="chath-section2"> 
                          <div className="flex flex-row items-center">
                            <img src="/assets/icons/chat.png" alt="Chat Icon" className="w-5 h-5" />
                            <label className="chats-text">{`${truncateName(chat.name, 6)}`}</label>
                          </div>
                          <label className="chats-text">{`(${formatDate(chat.created_at)})`}</label>
                        </div>
                        <span class="name-tag">{chat.name}</span>
                      </a>
                    )}
                  <div className="flex flex-row items-center">
                    <div className="rounded-md py-[8px] px-[8px] cursor-pointer hover:bg-[#A5E2F5]" onClick={() => toggleChatEdit(chat.id)}>
                      <img src="/assets/icons/pencil.png" alt="Pencil Icon" className="w-5 h-5" />
                    </div>
                    <div className="h-[20px] bg-black w-[1px]"></div>
                    <div className="rounded-md py-[8px] px-[8px] cursor-pointer hover:bg-[#A5E2F5]" onClick={() => deleteChat(chat.id)}>
                      <img src="/assets/icons/trash.png" alt="Trash Icon" className="w-5 h-5" />
                    </div>
                  </div>
                  
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Disclosure>
    </div>
  )
}

export default SideNavBar