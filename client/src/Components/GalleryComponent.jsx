import "../Styles/Gallery.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const GalleryComponent = ({ preview }) => {
    return (
        <section className="mainContainer">

            <div className="layoutDivision pr1 ">
                {preview?.[0]?.secondaryImage ? (
                    <img src={preview[0].secondaryImage} className="largePortrait br4" alt="" />
                ) : (
                    <Skeleton height={350} className="br4 largePortrait" />
                )}
            </div>

            <div className="layoutDivision pr1 flexColumn">

                <div className="layoutPortraitDivision pb1">

                    <div className="quarter pr1">
                        {preview?.[1]?.secondaryImage ? (
                            <img src={preview[1].secondaryImage} className="br4" alt="" />
                        ) : (
                            <Skeleton height={160} className="br4" />
                        )}
                    </div>

                    <div className="quarter pl1">
                        {preview?.[2]?.secondaryImage ? (
                            <img src={preview[2].secondaryImage} className="br4" alt="" />
                        ) : (
                            <Skeleton height={160} className="br4" />
                        )}
                    </div>

                </div>

                <div className="layoutLandscapeDivision border-shadow">
                    {preview?.[3]?.secondaryImage ? (
                        <img src={preview[3].secondaryImage} alt="" className="br4" />
                    ) : (
                        <Skeleton height={180} className="br4" />
                    )}
                </div>

            </div>

            <div className="layoutDivision pr1 flexColumn">

                <div className="layoutLandscapeDivision pb1">
                    {preview?.[4]?.secondaryImage ? (
                        <img src={preview[4].secondaryImage} alt="" className="br4" />
                    ) : (
                        <Skeleton height={180} className="br4" />
                    )}
                </div>

                <div className="layoutPortraitDivision">

                    <div className="quarter pr1">
                        {preview?.[5]?.secondaryImage ? (
                            <img src={preview[5].secondaryImage} alt="" className="br4" />
                        ) : (
                            <Skeleton height={160} className="br4" />
                        )}
                    </div>

                    <div className="quarter pl1">
                        {preview?.[6]?.secondaryImage ? (
                            <img src={preview[6].secondaryImage} alt="" className="br4" />
                        ) : (
                            <Skeleton height={160} className="br4" />
                        )}
                    </div>

                </div>

            </div>

            <div className="layoutDivision flexColumn">

                <div className="layoutPortraitDivision pb1">

                    <div className="quarter pr1">
                        {preview?.[7]?.secondaryImage ? (
                            <img src={preview[7].secondaryImage} alt="" className="br4" />
                        ) : (
                            <Skeleton height={160} className="br4" />
                        )}
                    </div>

                    <div className="quarter">
                        {preview?.[8]?.secondaryImage ? (
                            <img src={preview[8].secondaryImage} alt="" className="br4" />
                        ) : (
                            <Skeleton height={160} className="br4" />
                        )}
                    </div>

                </div>

                <div className="layoutLandscapeDivision">
                    {preview?.[9]?.secondaryImage ? (
                        <img src={preview[9].secondaryImage} alt="" className="br4" />
                    ) : (
                        <Skeleton height={180} className="br4" />
                    )}
                </div>

            </div>

        </section>
    );
};

export default GalleryComponent;
