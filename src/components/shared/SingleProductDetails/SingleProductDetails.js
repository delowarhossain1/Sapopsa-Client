import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import Navbar from '../Navbar/Navbar';
import PageTitle from '../PageTitle/PageTitle';

const SingleProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [changeImg, setChangeImg] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const quantityRef = useRef();

    useEffect(() => {
        fetch(`http://localhost:5000/get-product/${id}`)
            .then(res => res.json())
            .then(res => {
                setProduct(res);
                setLoading(false);
            })

    }, [id]);

    if (loading) {
        return <Loading />
    }

    const { img, title, size, price, description, spacification, displayIMG } = product;

    const addToCardHandeler = () => {
        const quantity = quantityRef.current.value;

        const info = {
            img,
            title,
            size: selectedSize,
            quantity,
        }
        
    }

    return (
        <>
            <Navbar />
            <PageTitle title={title || ''} />

            <div class="container">
                <div class="smallContainer">
                    <div class="cartWrapper">
                        <div class="row">
                            <div class="cratRow">
                                <div class="imgWrapper">
                                    <h5 class="productName">{title}</h5>

                                    <img class="bigImg"
                                        src={changeImg ? changeImg : img} id="productImg" alt="product" />

                                    <div class="samollPic">
                                        {
                                            displayIMG?.map((dImg, i) => (
                                                <div class="small" onClick={() => setChangeImg(dImg)} key={i * Math.random()}>

                                                    <img src={dImg} width="100%" class="samllImg" alt="" />

                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                            </div>
                            <div class="cratRow cratRow1">
                                <div class="colorCart">
                                    <h6 class="productName right">{title}</h6>
                                    <p class="proInfo">{description}</p>
                                    <p>
                                        <strong>Detailed Specification:</strong>
                                    </p>
                                    <ul class="Specification">
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
                                        <tbody class="singleTable">
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
                                    <div class="sizeWrap">

                                        {
                                            size?.map((s, i) => (
                                                <div
                                                    class={`sizeSelector list-inline-item `}
                                                    onClick={() => setSelectedSize(s)}
                                                    key={i * Math.random()}>
                                                    {s}
                                                </div>
                                            ))
                                        }

                                    </div>


                                    <div class="quantiBtn">
                                        Quantity
                                        <input type="number" name="quantity" min='1' ref={quantityRef} />
                                    </div>
                                    <div class="filedWrap">
                                        <span class="pricesFiled"> <del>${price + 98}</del> ${price}</span>
                                    </div>
                                    <button class="buyNow" onClick={addToCardHandeler}>Add To Cart</button>

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