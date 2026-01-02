import React from 'react';

export const Slot = ({ ch, y, x }) => {
    const getSlotColor = () => {
        if (ch === 'red') return 'red';
        if (ch === 'blue') return 'blue';
        return 'lightgray';
    };

    return (
        <div 
            className='slot' 
            x={x} 
            y={y}
            style={{ 
                background: getSlotColor(),
                border: ch ? '3px solid #333' : 'none'
            }}
        >
        </div>
    );
};