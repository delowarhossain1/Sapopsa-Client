import React, { useEffect, useState } from 'react';
import ToggleButton from 'react-toggle-button'

const SwitchBtn = ({ setStatus, currentStatus }) => {
    const [isOn, setOn] = useState(currentStatus);
    // console.log(currentStatus, isOn)

    useEffect(() => setStatus(isOn), [isOn, setStatus, currentStatus]);

    return (
        <div>
            <ToggleButton
                value={isOn === undefined ? currentStatus : isOn}
                onToggle={() => setOn(!isOn)} />
        </div>
    );
};

export default SwitchBtn;