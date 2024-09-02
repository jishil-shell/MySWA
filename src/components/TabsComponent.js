import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material'; // If using Material-UI

const TabsComponent = ({ tabs, children, preferredTab}) => {
    const [activeTab, setActiveTab] = useState(preferredTab || 0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <div>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="simple tabs example">
                {tabs.map((tab, index) => (
                    <Tab key={index} label={tab} />
                ))}
            </Tabs>
            <Box sx={{ padding: '20px', border: '1px solid #ccc', borderRadius: '4px', marginTop: '15px' }}>
                {children[activeTab]}
            </Box>
        </div>
    );
};

export default TabsComponent;
