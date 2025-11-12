import { useState } from "react";

const CommonSelect = ({
    heading = "Option",
    options,
    setData,
    selectedOption,
}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState(`Select ${heading}`);

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
                        <span className="dropdown__label">{selectedLabel}</span>
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
                                            setData((prev) => {
                                                return {
                                                    ...prev,
                                                    category: [option?._id]
                                                };
                                            });
                                            setSelectedLabel(option?.name);
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

export default CommonSelect;