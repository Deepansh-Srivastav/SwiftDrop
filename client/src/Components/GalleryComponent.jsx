
import "../Styles/Gallery.css"

const GalleryComponent = () => {
    return (
        <section className="mainContainer">

            <div className="layoutDivision pr1">
                <video src=" https://d1tf573zhz3zzy.cloudfront.net/data/content/videos/CantoTranscoded/720p/YOUR+PASSPORT/2hklt3vcbt0pvcgeo093i0ps6f.mp4 " className="largePortrait br4" autoPlay muted playsInline loop controls={false} />
            </div>

            <div className="layoutDivision pr1 flexColumn">

                <div className="layoutPortraitDivision pb1">

                    <div className="quarter pr1">
                        <img src="https://d1tf573zhz3zzy.cloudfront.net/data/content/images/itemImages/HOTEL/portrait/7095934f-61d6-40fd-93a2-89993605a8ae_twox_256x368.jpg" alt="" className="br4" />
                    </div>

                    <div className="quarter pl1">
                        <img src="https://images.unsplash.com/photo-1757151380289-a7e0a1f2a39d?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="br4" />
                    </div>

                </div>

                <div className="layoutLandscapeDivision">
                    <img src="https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?q=80&w=1444&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="br4" />
                </div>

            </div>

            <div className="layoutDivision pr1 flexColumn">

                <div className="layoutLandscapeDivision pb1">
                    <img src="https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?q=80&w=1444&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="br4" />
                </div>

                <div className="layoutPortraitDivision">

                    <div className="quarter pr1">
                        <img src="https://images.unsplash.com/photo-1617118069801-08850f78ad96?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="br4" />
                    </div>

                    <div className="quarter pl1">
                        <img src="https://images.unsplash.com/photo-1659743724651-00e46aa6f805?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8" alt="" className="br4" />
                    </div>

                </div>

            </div>

            <div className="layoutDivision  flexColumn">

                <div className="layoutPortraitDivision pb1">

                    <div className="quarter pr1">
                        <img src="https://images.unsplash.com/photo-1659743724651-00e46aa6f805?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8" alt="" className="br4" />
                    </div>

                    <div className="quarter">
                        <img src="https://images.unsplash.com/photo-1617118069801-08850f78ad96?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="br4" />
                    </div>

                </div>

                <div className="layoutLandscapeDivision">
                    <img src="https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?q=80&w=1444&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="br4" />
                </div>

            </div>

        </section>
    )
}

export default GalleryComponent
