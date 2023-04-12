import React from 'react';

const TermsAndCondition = ({info = []}) => {
    return (
        <div className='small-container'>
        <h2>TERMS & CONDITIONS</h2>

        <ul style={{listStyle : 'none'}}> 
            {
                info?.map(term => (
                    <li style={{marginBottom :"15px"}}> 
                        {term}
                    </li>
                ))
            }
        </ul>
    </div>
    );
};

export default TermsAndCondition;