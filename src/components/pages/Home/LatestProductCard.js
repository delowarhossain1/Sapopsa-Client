import React from 'react';
import { useNavigate } from 'react-router-dom';
import textCrope from '../../../utilites/textCrope';
import EuroSign from '../../shared/EuroSign/EuroSign';

const LatestProductCard = ({ product = {} }) => {
    const { img, title, price, description, _id} = product;
    const navigate = useNavigate();
    
    return (
        <div className="col2" onClick={()=> navigate(`/product-details/${_id}`)}>
            <div className="CartImg">
                <img src={img} alt="" />
                <div className="prices">
                    <EuroSign price={price} />
                </div>
            </div>
            <div className="ProDatils">
                <p className="productName">{textCrope(title, 35)}</p>
                <p className="productStatus">{textCrope(description, 55)}</p>
            </div>
        </div>
    );
};

export default LatestProductCard;