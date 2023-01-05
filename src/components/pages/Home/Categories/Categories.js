import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(res => setCategories(res));
    }, []);

    return (
        <div>
            {/* <!-- home section end --> */}
            <div className="noImageTitle">
                <h1>FIND YOUR COICE</h1>
            </div>

            <div className="container conTainer">
                <div className="row">

                    {
                        categories?.map(category => (
                            <div
                                className="col"
                                style={{ border: '1px solid #ddd', borderRadius: "2px", cursor: 'pointer' }}
                                onClick={() => navigate(`/category/${category.title}`)}
                                key={category?._id}
                            >

                                <img src={category?.img} alt="category" />
                                <div className="productBtn">
                                    <span>Men Polo Shirt</span>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    );
};

export default Categories;