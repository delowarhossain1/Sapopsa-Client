import React from 'react';
import { useNavigate } from 'react-router-dom';
import EuroSign from '../EuroSign/EuroSign';

const PrimaryProductCard = ({ product = {} }) => {
    const navigate = useNavigate();
    const { img, title, price, _id, regularPrice } = product;

    return (
        <div className="colTow" onClick={() => navigate(`/product-details/${_id}`)}>
            <div>
                <img src={img} alt="product" />
            </div>
            <div className="roDucTitle">
                {title?.length > 30 ? title.slice(0, 30) + '...' : title}
                <div className="Pricess">
                    <del className="discount">
                        <EuroSign price={regularPrice} />
                    </del>
                    <EuroSign price={price} />
                </div>
            </div>
            <div className="addCartBtn">
                <p id="cartBtn">View details</p>
            </div>
        </div>
    );
};

export default PrimaryProductCard;