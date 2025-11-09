import React from 'react';

const CategoryCard = ({ _id, name, image }) => {
    return (
        <div className="category-card">
            <div className="category-image">
                <img src={image} alt={image} />
            </div>
            <div className="category-details">
                <h3 className="category-name">{name}</h3>
            </div>
            <div className="category-actions">
                <button className="btn edit-btn" >Edit</button>
                <button className="btn delete-btn" >Delete</button>
            </div>
        </div>
    );
};

export default CategoryCard;
