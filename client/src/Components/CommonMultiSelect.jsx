import { useState } from "react";

const CommonMultiSelect = ({
    heading = "Option",
    options,
    setData,
    selectedOption,
}) => {

    const [isOpen, setIsOpen] = useState(false);

    function handleSelectedOption(option) {
        setData((prev) => {
            const alreadyExists = prev.subCategory?.some(
                item => item.id === option._id
            );
            
            return {
                ...prev,
                subCategory: alreadyExists
                    ? prev.subCategory
                    : [
                        ...prev.subCategory,
                        {
                            id: option._id,
                            name: option.name
                        }
                    ]
            };
        })
    };

    return (
        <>
            <div className="dropdown-wrapper">
                <div
                    className={`dropdown ${isOpen ? "dropdown--open" : ""}`}
                    tabIndex={0}
                    onBlur={() => setIsOpen(false)}
                >
                    <button
                        type="button"
                        className="dropdown__toggle"
                        onClick={() => setIsOpen((s) => !s)}
                        aria-haspopup="menu"
                        aria-expanded={isOpen}
                    >
                        <span className="dropdown__label">{`Select ${heading}`}</span>
                        <svg className="dropdown__chevron" width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                            <path fill="currentColor" d="M7 10l5 5 5-5H7z" />
                        </svg>
                    </button>

                    <ul className="dropdown__menu" role="menu" aria-hidden={!isOpen}>

                        {options?.map((option, index) => {
                            return (
                                <>
                                    <li
                                        className="dropdown__item"
                                        role="menuitem"
                                        onMouseDown={() => {
                                            handleSelectedOption(option)
                                            setIsOpen(false);
                                        }}
                                    >
                                        {option?.name}
                                    </li>
                                </>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default CommonMultiSelect;