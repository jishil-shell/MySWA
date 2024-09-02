import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valueText(value) {
  return `${value.toFixed(2)}`;
}

export default function RangeSlider({ label, range, min, max, onChange }) 
{
  const [value, setValue] = React.useState(range);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
        {label && <label className="text-input-label leftAlign">{label}</label>}
        <Box sx={{ width: "100%" }}>
        <Slider
            getAriaLabel={() => label}
            value={value}
            min={min}
            max={max}
            onChange={handleChange}
            valueLabelDisplay="on"
            getAriaValueText={valueText}
            color="#282c34"
        />
        </Box>
    </>
    
  );
}
