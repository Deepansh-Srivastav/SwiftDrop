
const CustomButtons = ({ buttonText, color = "var(--white-theme)", className, onClick = null }) => {
    return (
        <button className='custom-button' style={{
            color: `${color}`,
        }}
            onClick={onClick}
        >
            <span className={`custom-button-upper-text ${className}`}>{buttonText}</span>
            <span className={`custom-button-lower-text ${className}`}>{buttonText}</span>
        </button>
    )
}

export default CustomButtons;
