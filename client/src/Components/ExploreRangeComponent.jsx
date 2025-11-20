import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../Styles/ExploreRangeComponent.css";

const ExploreRangeComponent = ({ preview }) => {
    return (
        <section className="explore-range-container">

            {/* 0 portrait */}
            <div className="explore-item portrait-image" style={{ gridArea: "image-1" }}>
                {preview?.[0]?.secondaryImage ? (
                    <img src={preview[0].secondaryImage} className="largePortrait" alt="" />
                ) : (
                    <Skeleton height={"100%"} className="br4 largePortrait" />
                )}
            </div>

            {/* 1 small portrait */}
            <div className="explore-item small-portrait-image" style={{ gridArea: "image-2" }}>
                {preview?.[1]?.secondaryImage ? (
                    <img src={preview[9].secondaryImage} className="br4" alt="" />
                ) : (
                    <Skeleton height={"100%"} className="br4" />
                )}
            </div>

            {/* 2 small portrait */}
            <div className="explore-item small-portrait-image" style={{ gridArea: "image-3" }}>
                {preview?.[2]?.secondaryImage ? (
                    <img src={preview[2].secondaryImage} className="br4" alt="" />
                ) : (
                    <Skeleton height={"100%"} className="br4" />
                )}
            </div>

            {/* 3 landscape */}
            <div className="explore-item " style={{ gridArea: "image-4" }}>
                {preview?.[3]?.secondaryImage ? (
                    <img src={preview[3].secondaryImage} className="landscape-portrait-image" alt="" />
                ) : (
                    <Skeleton height={"100%"} className="br4" />
                )}
            </div>

            {/* 4 landscape */}
            <div className="explore-item" style={{ gridArea: "image-5" }}>
                {preview?.[4]?.secondaryImage ? (
                    <img src={preview[4].secondaryImage} className="br4" alt="" />
                ) : (
                    <Skeleton height={"100%"} className="br4" />
                )}
            </div>

            {/* 5 small portrait */}
            <div className="explore-item small-portrait-image" style={{ gridArea: "image-6" }}>
                {preview?.[5]?.secondaryImage ? (
                    <img src={preview[5].secondaryImage} className="br4" alt="" />
                ) : (
                    <Skeleton height={"100%"} className="br4" />
                )}
            </div>

            {/* 6 small portrait */}
            <div className="explore-item small-portrait-image" style={{ gridArea: "image-7" }}>
                {preview?.[6]?.secondaryImage ? (
                    <img src={preview[6].secondaryImage} className="br4" alt="" />
                ) : (
                    <Skeleton height={"100%"} className="br4" />
                )}
            </div>

            {/* 7 small portrait */}
            <div className="explore-item small-portrait-image" style={{ gridArea: "image-8" }}>
                {preview?.[7]?.secondaryImage ? (
                    <img src={preview[7].secondaryImage} className="br4" alt="" />
                ) : (
                    <Skeleton height={"100%"} className="br4" />
                )}
            </div>

            {/* 8 small portrait */}
            <div className="explore-item small-portrait-image" style={{ gridArea: "image-9" }}>
                {preview?.[8]?.secondaryImage ? (
                    <img src={preview[8].secondaryImage} className="br4" alt="" />
                ) : (
                    <Skeleton height={"100%"} className="br4" />
                )}
            </div>

            {/* 9 landscape */}
            <div className="explore-item landscape-portrait-image" style={{ gridArea: "image-10" }}>
                {preview?.[9]?.secondaryImage ? (
                    <img src={preview[1].secondaryImage} className="br4" alt="" />
                ) : (
                    <Skeleton height={"100%"} className="br4" />
                )}
            </div>

        </section>

    )
}

export default ExploreRangeComponent
