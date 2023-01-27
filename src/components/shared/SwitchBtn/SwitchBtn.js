import React, { useEffect, useState } from 'react';
import ToggleButton from 'react-toggle-button'
import Loading from '../Loading/Loading';

const SwitchBtn = ({ isOn }) => {
    const [loading, setLoading] = useState(true);
    const [isAlreadyOpen, setIsAlreadyOpen] = useState(true);
    const [on, setOn] = useState(isAlreadyOpen);

    useEffect(() => { isOn(on) }, [on, isOn]);


    useEffect(() => {
        fetch('http://localhost:5000/web-heading')
            .then(res => res.json())
            .then(res => {
                setIsAlreadyOpen(res?.isDisplay)
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <ToggleButton
                value={on}
                onToggle={() => setOn(!on)} />
        </div>
    );
};

export default SwitchBtn;