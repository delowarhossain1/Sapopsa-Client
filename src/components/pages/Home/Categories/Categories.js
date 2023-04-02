import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

const Categories = ({setLoading}) => {
    const navigate = useNavigate();

    const {data:categories, isLoading} = useQuery('homepage-categories', ()=>(
        axios.get('/api/categories')
        .then(res => res?.data) 
    ));

    // Set loading
    if(isLoading) setLoading(true);

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
                                onClick={() => navigate(`/category/${category?.route}`)}
                                key={category?._id}
                            >

                                <img src={category?.img} alt="category" />
                                <div className="productBtn">
                                    <span>{category?.title}</span>
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