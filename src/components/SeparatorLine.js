import React from 'react';

const SeparatorLine = ({ thickness = '2px', color = '#808080', margin = '25px 0' }) => {
    return (
        <div
            style={{
                width: '100%',
                height: thickness,
                backgroundColor: color,
                margin: margin,
            }}
        ></div>
    );
};

export default SeparatorLine;
