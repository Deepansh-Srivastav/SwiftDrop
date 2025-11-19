
import "../Styles/Gallery.css"
import {
    projectImages
} from "../Assets/Assets.js"

const GalleryComponent = () => {
    return (
        <section className="mainContainer">

            <div className="layoutDivision pr1">
                <img src={projectImages?.AttaDalRiceImage} className="largePortrait br4" alt="" />
            </div>

            <div className="layoutDivision pr1 flexColumn">

                <div className="layoutPortraitDivision pb1">

                    <div className="quarter pr1">
                        <img src={projectImages?.babyCareImage} className="br4" />
                    </div>

                    <div className="quarter pl1">
                        <img src="" alt="" className="br4" />
                    </div>

                </div>

                <div className="layoutLandscapeDivision">
                    <img src={projectImages?.healthyFoodImage} alt="" className="br4" />
                </div>

            </div>

            <div className="layoutDivision pr1 flexColumn">

                <div className="layoutLandscapeDivision pb1">
                    <img src={projectImages?.FreshMeat} alt="" className="br4" />
                </div>

                <div className="layoutPortraitDivision">

                    <div className="quarter pr1">
                        <img src="" alt="" className="br4" />
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
                    <img src={projectImages?.drinksImage} alt="" className="br4" />
                </div>

            </div>

        </section>
    )
}

export default GalleryComponent
