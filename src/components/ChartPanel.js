import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer } from 'recharts';
import { useData } from '../context/DataContext';

const ChartPanel = () => {
    let { jsonData } = useData();
   
    jsonData = [
        { "name": "Item 1", "cost": 10, "carbonFootprint": 200 },
        { "name": "Item 2", "cost": 20, "carbonFootprint": 140 },
        { "name": "Item 3", "cost": 40, "carbonFootprint": 100 },
        { "name": "Item 4", "cost": 60, "carbonFootprint": 60 },
        { "name": "Item 5", "cost": 80, "carbonFootprint": 30 },
        { "name": "Item 7", "cost": 100, "carbonFootprint": 20 }
      ]
      
      

    const plotData = jsonData.map((item) => ({
        cost: item.cost,
        carbonFootprint: item.carbonFootprint,
    }));

    return (
        <div className="chart-panel">
            <h2>Cost vs. Carbon Footprint</h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={plotData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" dataKey="carbonFootprint" name="Carbon Footprint" unit="kg CO2" />
                    <YAxis type="number" dataKey="cost" name="Cost" unit="$" />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="cost"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.3}
                    />
                    <Line
                        type="monotone"
                        dataKey="cost"
                        stroke="#8884d8"
                        strokeWidth={4} 
                        dot={{ r: 8 }} 
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartPanel;
