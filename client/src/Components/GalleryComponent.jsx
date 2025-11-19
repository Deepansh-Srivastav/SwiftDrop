
import "../Styles/Gallery.css"
import {
    projectImages
} from "../Assets/Assets.js"

const GalleryComponent = ({ preview }) => {
    return (
        <section className="mainContainer">

            <div className="layoutDivision pr1 ">
                <img src={preview?.[0]?.secondaryImage} className="largePortrait br4" alt="" />
            </div>

            <div className="layoutDivision pr1 flexColumn">

                <div className="layoutPortraitDivision pb1">

                    <div className="quarter pr1">
                        <img src={preview?.[1]?.secondaryImage} className="br4" alt="" />
                    </div>

                    <div className="quarter pl1">
                        <img src={preview?.[2]?.secondaryImage} className="br4" alt="" />
                    </div>

                </div>

                <div className="layoutLandscapeDivision border-shadow">
                    <img src={preview?.[3]?.secondaryImage} alt="" className="br4" />
                </div>

            </div>

            <div className="layoutDivision pr1 flexColumn">

                <div className="layoutLandscapeDivision pb1">
                    <img src={preview?.[4]?.secondaryImage} alt="" className="br4" />
                </div>

                <div className="layoutPortraitDivision">

                    <div className="quarter pr1">
                        <img src={preview?.[5]?.secondaryImage} alt="" className="br4" />
                    </div>

                    <div className="quarter pl1">
                        <img src={preview?.[6]?.secondaryImage} alt="" className="br4" />
                    </div>

                </div>

            </div>

            <div className="layoutDivision flexColumn">

                <div className="layoutPortraitDivision pb1">

                    <div className="quarter pr1">
                        <img src={preview?.[7]?.secondaryImage} alt="" className="br4" />
                    </div>

                    <div className="quarter">
                        <img src={preview?.[8]?.secondaryImage} alt="" className="br4" />
                    </div>

                </div>

                <div className="layoutLandscapeDivision">
                    <img src={preview?.[9]?.secondaryImage} alt="" className="br4" />
                </div>

            </div>

        </section>
    );
};

export default GalleryComponent;