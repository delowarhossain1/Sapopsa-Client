import React from 'react';

const Payment = () => {

    const handleCheckoutInfo = () => {
        const date = new Date();

        const info = {

            placed: {
                date: date.toDateString(),
                time: date.toLocaleTimeString()
            },

            productInfo: {
                img: '',
                title: ''
            },

            orderInfo: {
                status: 'Pending',
                quantity: 0,
                price: 0,
            },

            deliveryInfo: {
                name: '',
                email: '',
                house: '',
                zip: '',
                country: '',
                city: '',
                state: ''
            }

        }
    }

    return (
        <div>

        </div>
    );
};

export default Payment;