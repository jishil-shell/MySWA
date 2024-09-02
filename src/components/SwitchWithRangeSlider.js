import React, { useState, useEffect } from 'react';
import { Switch, Box, Slider, Typography } from '@mui/material';

const SwitchWithRangeSlider = ({ id, switchOn, label, min, max, range, onUpdate }) => {
    const [sliderId, setSliderId] = useState(id);
    const [isSwitchOn, setIsSwitchOn] = useState(switchOn);
    const [sliderValue, setSliderValue] = useState(range);

    useEffect(() => {
        onUpdate(sliderId, isSwitchOn, sliderValue);
    }, []);

    const handleSwitchChange = () => {
        setIsSwitchOn(!isSwitchOn);
        onUpdate(sliderId, !isSwitchOn, sliderValue);
    };

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
        onUpdate(sliderId, isSwitchOn, newValue);
    };

    return (
        <Box sx={{ width: '100%', marginBottom: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="body1">{label}:</Typography>

                <Switch
                    checked={isSwitchOn}
                    onChange={handleSwitchChange}
                    sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#282c34',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#282c34',
                        },
                    }}
                />
            </Box>
            {isSwitchOn && (
                <Box>

                    <Slider
                        value={sliderValue}
                        onChange={handleSliderChange}
                        valueLabelDisplay="on"
                        min={min}
                        max={max}
                        sx={{
                            mt: 2,
                            '& .MuiSlider-thumb': {
                                bgcolor: '#282c34',
                            },
                            '& .MuiSlider-track': {
                                bgcolor: '#282c34',
                            },
                            '& .MuiSlider-rail': {
                                bgcolor: '#282c34',
                            },
                        }}
                    />
                    <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Min: {min.toFixed(2)}</span>
                        <span>Max: {max.toFixed(2)}</span>
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default SwitchWithRangeSlider;
