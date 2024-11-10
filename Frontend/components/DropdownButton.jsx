'use client';
import { useState, useEffect, useRef } from "react";

const DropdownButton = ({options, initialText, onOptionSelect}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(initialText);
    const dropdownRef = useRef(null);
    const endOfMessagesRef = useRef(null);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleOptionClick = (option) => {
      setSelectedOption(option);
      setIsOpen(false);
      onOptionSelect(option);
    };

    useEffect(() => {
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [isOpen]);


    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return(
        <div className="dropdown" ref={dropdownRef}>
          <button
            className="btn btn-secondary dropdown-toggle custom-border text-black dropdown-text"
            type="button"
            id="dropdownMenuButton"
            aria-expanded={isOpen}
            onClick={toggleDropdown}>
            {selectedOption}
          </button>
          <ul className={`dropdown-menu options-container2 dropdown-text w-full ${isOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
            {options.map((option, index) => (
              <li key={index}>
                <div
                  className="dropdown-item cursor-pointer drop-option"
                  onClick={() => handleOptionClick(option)}>
                  {option}
                </div>
              </li>
            ))}
            <div ref={endOfMessagesRef} />   
          </ul>
        </div>
    );
}

export default DropdownButton;