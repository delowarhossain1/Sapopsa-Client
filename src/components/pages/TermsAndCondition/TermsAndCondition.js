import React from 'react';

const TermsAndCondition = ({info = []}) => {
    return (
        <div className='small-container'>
        <h2>TERMS & CONDITIONS</h2>

        <ul style={{listStyle : 'none'}}> 
            {
                info?.map((term, index) => (
                    <li style={{marginBottom :"15px"}} key={Math.random() * index}> 
                        {term}
                    </li>
                ))
            }
        </ul>
    </div>
    );
};

export default TermsAndCondition;