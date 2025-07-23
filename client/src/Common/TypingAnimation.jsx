
import { TypeAnimation } from 'react-type-animation';

const TypingAnimation = ({ messages = [], pause = 1000, }) => {

    

    const sequence = [];
    messages.forEach(msg => {
        sequence.push(msg, pause);
    });

    return (
        <TypeAnimation
            sequence={sequence}
            speed={60}
            style={{ fontSize: '1em', display: 'inline-block' }}
            repeat={Infinity}
        />
    );
};

export default TypingAnimation;