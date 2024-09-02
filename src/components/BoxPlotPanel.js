import React from 'react';
import { Chart } from 'react-chartjs-2';
import 'chartjs-chart-box-and-violin-plot';
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Registering the necessary components with Chart.js
ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend);

const BoxPlotPanel = () => {
    const data = {
        labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 7'],
        datasets: [
            {
                label: 'Cost Distribution',
                backgroundColor: '#007bff',
                borderColor: '#0056b3',
                borderWidth: 1,
                outlierColor: '#999999',
                padding: 10,
                itemRadius: 2,
                data: [
                    { min: 5, q1: 10, median: 15, q3: 20, max: 25 },
                    { min: 10, q1: 20, median: 30, q3: 40, max: 50 },
                    { min: 20, q1: 30, median: 40, q3: 50, max: 60 },
                    { min: 30, q1: 40, median: 50, q3: 60, max: 70 },
                    { min: 40, q1: 50, median: 60, q3: 70, max: 80 },
                    { min: 50, q1: 60, median: 70, q3: 80, max: 90 },
                ],
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const value = tooltipItem.raw;
                        return `Min: ${value.min}, Q1: ${value.q1}, Median: ${value.median}, Q3: ${value.q3}, Max: ${value.max}`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h3>Cost Distribution Box Plot</h3>
            <Chart type="boxplot" data={data} options={options} />
        </div>
    );
};

export default BoxPlotPanel;
