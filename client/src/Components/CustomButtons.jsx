
const CustomButtons = ({ buttonText, size = "14px", color = "var(--white-theme)", fontWeight = 100 }) => {
    return (
        <button className='custom-button' style={{
            color: `${color}`,
            fontSize: `${size}`,
            fontWeight: `${fontWeight}`,
        }}>
            <span className="custom-button-upper-text">{buttonText}</span>
            <span className="custom-button-lower-text ">{buttonText}</span>
        </button>
    )
}

export default CustomButtons;
