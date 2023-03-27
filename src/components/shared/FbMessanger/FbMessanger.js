import React from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';

export default function FbMessanger() {
    return (
        <MessengerCustomerChat
            pageId={`${process.env.REACT_APP_FB_PAGE_ID}`}
            appId={`${process.env.REACT_APP_FB_APP_ID}`}
        />
    );
}   