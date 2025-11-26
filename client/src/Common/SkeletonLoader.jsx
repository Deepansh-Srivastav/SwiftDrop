import React from 'react'

const SkeletonLoader = ({ className = "", style = {} }) => {
    return (
        <div className={`skeleton-full ${className}`} style={style} >

        </div>
    )
}

export default SkeletonLoader
