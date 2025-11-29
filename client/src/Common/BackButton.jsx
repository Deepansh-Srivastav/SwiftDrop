import { KeyboardBackspaceSharpIcon } from "../Assets/Icons"
import { useNavigate } from "react-router-dom";

const BackButton = ({path = "/"}) => {
    const navigate = useNavigate();
    return (
        <button className="back-button" onClick={() => {
            navigate(path);
        }}>
            <KeyboardBackspaceSharpIcon />
        </button>

    )
}

export default BackButton
