import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../shared/Loading/Loading';
import Navbar from '../../shared/Navbar/Navbar';
import PageTitle from '../../shared/PageTitle/PageTitle';
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from 'react-icons/fa';
import {addNewProduct} from "../../../utilites/addToCard";

const SingleProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [changeImg, setChangeImg] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(1);


    useEffect(() => {
        fetch(`http://localhost:5000/get-product/${id}`)
            .then(res => res.json())
            .then(res => {
                setProduct(res);
                setLoading(false);
            })

    }, [id]);


    const handleQuantity = btn => {
        if (btn === 'plus') {
            setSelectedQuantity(selectedQuantity + 1);
        }
        else {
            const rest = selectedQuantity > 1 ? selectedQuantity - 1 : selectedQuantity;

            setSelectedQuantity(rest);
        }
    }

    if (loading) {
        return <Loading />
    }

    const {_id, img, title, size, price, description, spacification, displayIMG } = product;

    // calculate product base on quantity
    const calPrice = selectedQuantity * price;

    const addToCardHandeler = () => {

        const info = {
            img,
            title,
            price,
            id : _id,
            size: selectedSize || size[0],
            quantity : selectedQuantity,
            totalPrice : calPrice,
        }

        
        addNewProduct(info);
    }

    return (
        <>
            <Navbar />
            <PageTitle title={title || ''} />

            <div className="container">
                <div className="smallContainer">
                    <div className="cartWrapper">
                        <div className="row">
                            <div className="cratRow">
                                <div className="imgWrapper">
                                    <h5 className="productName">{title}</h5>

                                    <img className="bigImg"
                                        src={changeImg ? changeImg : img} id="productImg" alt="product" />

                                    <div className="samollPic">
                                        {
                                            displayIMG?.map((dImg, i) => (
                                                <div className="small" onClick={() => setChangeImg(dImg)} key={i * Math.random()}>

                                                    <img src={dImg} width="100%" className="samllImg" alt="" />

                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                            </div>
                            <div className="cratRow cratRow1">
                                <div className="colorCart">
                                    <h6 className="productName right">{title}</h6>
                                    <p className="proInfo">{description}</p>
                                    <p>
                                        <strong>Detailed Specification:</strong>
                                    </p>
                                    <ul className="Specification">
                                        {
                                            spacification?.map((spa, i) => (
                                                <li key={i * Math.random()}>
                                                    {spa}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <p>
                                        <strong>Size chart - In inches</strong>
                                    </p>
                                    <table cellpadding="5">
                                        <thead>
                                            <tr>
                                                <th>Size</th>
                                                <th>Chest (Round)</th>
                                                <th>Length</th>
                                                <th>Sleeve</th>
                                            </tr>
                                        </thead>
                                        <tbody className="singleTable">
                                            <tr>
                                                <td>XS</td>
                                                <td>36</td>
                                                <td>26</td>
                                                <td>7.5</td>
                                            </tr>
                                            <tr>
                                                <td>S</td>
                                                <td>37</td>
                                                <td>26</td>
                                                <td>7.75</td>
                                            </tr>
                                            <tr>
                                                <td>M</td>
                                                <td>39</td>
                                                <td>27.5</td>
                                                <td>8.5</td>
                                            </tr>
                                            <tr>
                                                <td>L</td>
                                                <td>40.5</td>
                                                <td>28</td>
                                                <td>8.75</td>
                                            </tr>
                                            <tr>
                                                <td>XL</td>
                                                <td>43</td>
                                                <td>29</td>
                                                <td>9</td>
                                            </tr>
                                            <tr>
                                                <td>2XL</td>
                                                <td>45</td>
                                                <td>30</td>
                                                <td>9.25</td>
                                            </tr>
                                            <tr>
                                                <td>3XL</td>
                                                <td>47.5</td>
                                                <td>30.5</td>
                                                <td>9.5</td>
                                            </tr>
                                            <tr>
                                                <td>4XL</td>
                                                <td>50</td>
                                                <td>31</td>
                                                <td>10</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <strong>Choose Size : {selectedSize ? selectedSize : size[0]}</strong>
                                    <div className="sizeWrap">

                                        {
                                            size?.map((s, i) => (
                                                <div
                                                    className={`sizeSelector list-inline-item `}
                                                    onClick={() => setSelectedSize(s)}
                                                    key={i * Math.random()}>
                                                    {s}
                                                </div>
                                            ))
                                        }

                                    </div>


                                    <div className="quantiBtn">
                                        <span>Quantity : </span>
                                        <div className='updateAndLossQuantity'>
                                            <div onClick={() => handleQuantity('minus')}>
                                                <FaMinus className='bsPlusBtn' />
                                            </div>

                                            <div>{selectedQuantity}</div>

                                            <div onClick={() => handleQuantity('plus')}><BsPlusLg className='bsPlusBtn' /></div>
                                        </div>
                                    </div>

                                    <div className="filedWrap">
                                        <span className="pricesFiled"> <del>${calPrice + 98}</del> ${calPrice}</span>
                                    </div>
                                    <button className="buyNow" onClick={addToCardHandeler}>Add To Cart</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleProductDetails;