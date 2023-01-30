import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrimaryProductCard = ({ product = {} }) => {
    const navigate = useNavigate();
    const { img, title, price, _id } = product;

    return (
        <div className="colTow" onClick={() => navigate(`/product-details/${_id}`)}>
            <div>
                <img src={img} alt="product" />
            </div>
            <div className="roDucTitle">
                {title?.length > 30 ? title.slice(0, 30) + '...' : title}
                <div className="Pricess"> <del className="discount"><span>$</span>{price + 56}</del> <span>$</span>{price}</div>
            </div>
            <div className="addCartBtn">
                <p id="cartBtn">View details</p>
            </div>
        </div>
    );
};

export default PrimaryProductCard;