import { PropagateLoader } from 'react-spinners'

const LoadingPage = () => {
    return (
        <section className="loading-page">
            <div className="loading-container">
                <div className="swiftdrop-logo">
                    <h1><span className="highlighter">SW</span>IFTDROP</h1>
                </div>
                <PropagateLoader color="var(--color-one)" size={10} />
            </div>
        </section>
    )
}

export default LoadingPage
