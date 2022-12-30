import React from 'react';
import img1 from "../../../../images/1.jpg";
import img2 from "../../../../images/2.jpg";
import img3 from "../../../../images/3.jpg";

const Categories = () => {
    return (
        <div>
            {/* <!-- home section end --> */}
            <div className="noImageTitle">
                <h1>FIND YOUR COICE</h1>
            </div>

            <div className="container conTainer">
                <div className="row">
                    <div className="col">
                        <a href="manst t-shirt.html"> <img src={img1} alt=""/>
                        </a>
                        <div className="productBtn">
                            <a href="manst t-shirt.html">Men Polo Shirt</a>
                        </div>
                    </div>

                    <div className="col">
                        <a href="manst t-shirt.html"> <img src={img2} alt=""/>
                        </a>
                        <div className="productBtn">
                            <a href="#">Men t-Shirt</a>
                        </div>
                    </div>

                    <div className="col">
                        <a href="manst t-shirt.html"> <img src={img3} alt=""/>
                        </a>
                        <div className="productBtn">
                            <a href="#">hoodie</a>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Categories;