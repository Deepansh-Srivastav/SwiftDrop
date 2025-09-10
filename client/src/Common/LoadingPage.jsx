import { PropagateLoader } from 'react-spinners';
import { projectImages } from '../Assets/Assets';

const LoadingPage = () => {
    return (
        <section className="loading-page">
            <div className="loading-container">
                <div className="loading-page-logo">
                    <img src={projectImages?.swiftDropLogo} alt="" />
                </div>
                <PropagateLoader color="var(--purple-theme)" size={20} />
            </div>
        </section>
    );
};

export default LoadingPage;
