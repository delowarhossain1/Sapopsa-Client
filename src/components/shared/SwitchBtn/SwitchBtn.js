import React, { useEffect, useState } from 'react';
import ToggleButton from 'react-toggle-button'

const SwitchBtn = ({ isOn }) => {
    const [on, setOn] = useState(true);

    useEffect(() => { isOn(on) } , [on, isOn]);

    return (
        <div>
            <ToggleButton
                value={on || false}
                onToggle={() => setOn(!on)} />
        </div>
    );
};

export default SwitchBtn;