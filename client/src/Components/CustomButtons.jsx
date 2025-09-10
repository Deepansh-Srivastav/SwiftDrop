
const CustomButtons = ({ buttonText, color = "var(--white-theme)", className }) => {
    return (
        <button className='custom-button' style={{
            color: `${color}`,
        }}>
            <span className={`custom-button-upper-text ${className}`}>{buttonText}</span>
            <span className={`custom-button-lower-text ${className}`}>{buttonText}</span>
        </button>
    )
}

export default CustomButtons;
