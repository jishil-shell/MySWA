import React from 'react';
import '../css/Grid.css';

const ReportGrid = ({ data }) => {
    data = [
        { "name": "Item 1", "cost": 10, "carbonFootprint": 200 },
        { "name": "Item 2", "cost": 20, "carbonFootprint": 140 },
        { "name": "Item 3", "cost": 40, "carbonFootprint": 100 },
        { "name": "Item 4", "cost": 60, "carbonFootprint": 60 },
        { "name": "Item 5", "cost": 80, "carbonFootprint": 30 },
        { "name": "Item 7", "cost": 100, "carbonFootprint": 20 }
      ]
      
    return (
        <div className="report-grid">
            <h2>Cost vs. Carbon Footprint Report</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Cost ($)</th>
                        <th>Carbon Footprint (kg CO2)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.cost}</td>
                            <td>{item.carbonFootprint}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportGrid;