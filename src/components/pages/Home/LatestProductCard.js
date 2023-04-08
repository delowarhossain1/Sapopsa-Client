import React from 'react';
import { useNavigate } from 'react-router-dom';
import textCrope from '../../../utilites/textCrope';

const LatestProductCard = ({ product = {} }) => {
    const { img, title, price, description, _id} = product;
    const navigate = useNavigate();
    
    return (
        <div className="col2" onClick={()=> navigate(`/product-details/${_id}`)}>
            <div className="CartImg">
                <img src={img} alt="" />
                <div className="prices">${price}</div>
            </div>
            <div className="ProDatils">
                <p className="productName">{textCrope(title, 35)}</p>
                <p className="productStatus">{textCrope(description, 55)}</p>
            </div>
        </div>
    );
};

export default LatestProductCard;