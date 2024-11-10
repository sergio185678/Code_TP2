'use client';
import { useState, useEffect, useRef } from "react";

const DropdownButtonSearchBar = ({options, initialText, onOptionSelect, addElement = undefined}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(initialText);
    const dropdownRef = useRef(null);
    const endOfMessagesRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");

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
      if (addElement) {
        addElement(option);
      }
    };

    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    useEffect(() => {
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [isOpen]);

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
          <div className={`dropdown-menu w-full ${isOpen ? "show" : ""}`} aria-labelledby="dropdownMenuButton">
            <input
              type="text"
              className="form-control dropdown-text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="options-container dropdown-text">
              {filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className="dropdown-item cursor-pointer"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))}
            </div>
            <div ref={endOfMessagesRef} /> 
          </div>
        </div>
    );
}

export default DropdownButtonSearchBar;