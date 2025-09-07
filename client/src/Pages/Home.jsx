import "../Styles/Home.css"

const Home = () => {

    return (
        <section>
            <HomeNavbar />

            <div className="parallax1">

                <div className="text-container">
                    <p className="text-size-1">
                        Everything you need, delivered instantly.
                    </p>

                    <div className="sub-text text-size-3">
                        <span>FRESH FRUITS</span>
                        <span>SNACKS</span>
                        <span>ESSENTIALS</span>
                    </div>
                </div>

                <div className="landing-paragraph">
                    <p className="text-size-2"><span className="highlighter">SwiftDrop</span> makes everyday shopping effortless. From fresh groceries and essentials to snacks and drinks, everything arrives at your door in minutes. Fast, simple, and reliable — so you spend less time waiting and more time enjoying.</p>
                </div>

            </div>

            <div className="products-section">

            </div>

        </section>
    )
}

export default Home

export function HomeNavbar() {

    return (
        <>
            <nav className="home-nav">

                <div className="swiftdrop-logo">
                    {/* <img src={projectImages?.swiftDropLogo} alt="" /> */}
                    <h1><span className="highlighter">SW</span>iftDrop</h1>
                </div>

                <div>
                    <button className="nav-button">
                        <span className="button-text front">Menu</span>
                        <span className="button-text back">Menu</span>
                    </button>
                </div>
            </nav>
        </>
    );
}