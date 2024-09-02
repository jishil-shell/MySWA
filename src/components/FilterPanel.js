import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import './css/Common.css';
import './css/Filter.css';
import NumberInputWithButton from './NumberInputWithButton';

const FilterPanel = ({  onFilterChange, onAction }) => {

    const { jsonData } = useData();

    const runTypeOptions = [
        { value: 'optimization', text: 'Optimization' },
        { value: 'static', text: 'Static' }
    ];

    const foamTypeOptions = [
        { value: 'HRSlab', text: 'High Resilience' },
        { value: 'ConvSlab', text: 'Conventional' }
    ];

    const objectiveOptions = [
        { value: 'cost', text: 'Cost' },
        { value: 'carbon', text: 'Carbon Footprint' },
        { value: 'response_center_distance', text: 'Response Distance from Center' }
    ];

    const objectiveSenseOptions = [
        { value: 'min', text: 'Minimize' },
        { value: 'max', text: 'Maximize' }
    ];

    const polyolTypeOptions = [
        { value: 'multiple', text: 'Multiple' },
        { value: 'single', text: 'Single' }
    ];

    const theoreticalPropertyOptions = [
        { value: 'fixed', text: 'Fixed' },
        { value: 'variable', text: 'Variable' }
    ];

    const [runTypes, setRunTypes] = useState(runTypeOptions);
    const [selectedRunType, setSelectedRunType] = useState('optimization');   

    const [foamTypes, setFoamTypes] = useState(foamTypeOptions);
    const [selectedFoamType, setSelectedFoamType] = useState('HRSlab');

    const [objectiveType, setObjectiveType] = useState(objectiveOptions);
    const [selectedObjectiveType, setSelectedObjectiveType] = useState('cost');

    const [objectiveSense, setObjectiveSense] = useState(objectiveSenseOptions);
    const [selectedObjectiveSense, setSelectedObjectiveSense] = useState('min');

    const [polyolType, setPolyolType] = useState(polyolTypeOptions);
    const [selectedPolyolType, setSelectedPolyolType] = useState('multiple');

    const [theoreticalProperty, setTheoreticalProperty] = useState(theoreticalPropertyOptions);
    const [selectedTheoreticalProperty, setSelectedTheoreticalProperty] = useState('fixed');

    const [paretoPlot, setParetoPlot] = useState(false);
    const [paretoPoints, setParetoPoints] = useState(10);

    useEffect(() => {

        if(selectedRunType) {
            onFilterChange('run_type', selectedRunType);
            onFilterChange('theoretical_property', 'fixed');
            onFilterChange('objective_type', 'cost');
            onFilterChange('objective_sense', 'min');
        }

        if (jsonData?.conditions?.FOAM_TYPE?.value) {
            setSelectedFoamType(jsonData.conditions.FOAM_TYPE.value);
            onFilterChange('foam_type', jsonData.conditions.FOAM_TYPE.value);
        }

    }, [jsonData]);

    const handleDropdownChange = (e, filterType) => {
        switch (filterType) {
            case 'run_type':
                setSelectedRunType(e.target.value)
                break;
            case 'foam_type':
                setSelectedFoamType(e.target.value)
                break;
            case 'objective_type':
                setSelectedObjectiveType(e.target.value)
                break;
            case 'objective_sense':
                setSelectedObjectiveSense(e.target.value)
                break;
            case 'polyol_type':
                setSelectedPolyolType(e.target.value)
                break;
            case 'theoretical_property':
                setSelectedTheoreticalProperty(e.target.value)
                break;
            default:
                break;
        }
        onFilterChange(filterType, e.target.value);
    };

    const handleCheckboxChange = (value, boxName) => {
        switch (boxName) {
            case 'pareto_plot':
                setParetoPlot(value)
                break;
            default:
                break;
        }
    };

    const handleButtonClick = (event, action) => {

        if (!jsonData || jsonData.length === 0) {
            alert("Please select the JSON file!")
        } else {
            onFilterChange('action', action);
            if(selectedRunType === 'optimization' && paretoPlot) {
                onFilterChange('pareto_points', paretoPoints);
            }
            onAction(action)
        }
    };


    return (
        <div>
            <h2 className='leftHeader'>Filters</h2>

            <div className="filter-group">
                <label htmlFor="runFilter">Run Type : </label>
                <select id="runFilter" value={selectedRunType} onChange={(e) => handleDropdownChange(e, 'run_type')}>
                    {runTypes.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="foamFilter">Foam Type : </label>
                <select id="foamFilter" defaultValue="" value={selectedFoamType} onChange={(e) => handleDropdownChange(e, 'foam_type')}>
                    <option value="">

                    </option>
                    {foamTypes.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>
            </div>
            {
                selectedRunType === 'optimization' &&

                <div className="filter-group">
                    <label htmlFor="objectiveFilter">Objective : </label>
                    <select id="objectiveFilter" defaultValue="" value={selectedObjectiveType} onChange={(e) => handleDropdownChange(e, 'objective_type')}>
                        <option value="">

                        </option>
                        {objectiveOptions.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                </div>
            }

            {
                selectedRunType === 'optimization' &&
                <div className="filter-group">
                    <label htmlFor="objectiveSenseFilter">Objective Sense : </label>
                    <select id="objectiveSenseFilter" defaultValue="" value={selectedObjectiveSense} onChange={(e) => handleDropdownChange(e, 'objective_sense')}>
                        <option value="">

                        </option>
                        {objectiveSenseOptions.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                </div>
            }

            {
                selectedRunType === 'optimization' &&
                <div className="filter-group">
                    <label htmlFor="polyolTypeFilter">Possible Use of Different Polyols from Each Category : </label>
                    <select id="polyolTypeFilter" defaultValue="" value={selectedPolyolType} onChange={(e) => handleDropdownChange(e, 'polyol_type')}>
                        <option value="">

                        </option>
                        {polyolTypeOptions.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                </div>
            }

            {
                selectedRunType === 'optimization' &&
                <div className="filter-group">
                    <label htmlFor="polyolTypeFilter">Theoretical Polyol Properties : </label>
                    <select id="polyolTypeFilter" defaultValue="" value={selectedTheoreticalProperty} onChange={(e) => handleDropdownChange(e, 'theoretical_property')}>
                        <option value="">

                        </option>
                        {theoreticalPropertyOptions.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                </div>
            }

            {
                selectedRunType === 'optimization' &&
                <div className="filter-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={paretoPlot}
                            onChange={(e) => handleCheckboxChange(e.target.checked, 'pareto_plot')}
                        />
                        Cost vs. Carbon Plot
                    </label>
                </div>
            }

            {
                selectedRunType === 'optimization' && paretoPlot &&
                <div className="filter-group">
                    <NumberInputWithButton
                        value={paretoPoints}
                        onChange={setParetoPoints}
                        min={2}
                        max={100}
                        step={1}
                        disabled={false} // Set to true to disable the input and buttons
                    />
                </div>
            }

            {
                selectedRunType === 'optimization' && paretoPlot &&
                <button className="filter-button" onClick={(e) => handleButtonClick(e, 'generate_cost_vs_carbon_plot')}>Generate Cost vs. Carbon Plot</button>
            }
            {
                selectedRunType === 'optimization' && !paretoPlot &&
                <button className="filter-button" onClick={(e) => handleButtonClick(e, 'optimal_formulation')}>Find Optimal Formulation</button>
            }

            {
                selectedRunType === 'static' &&
                <button className="filter-button" onClick={(e) => handleButtonClick(e, 'calculate_properties')}>Calculate Properties</button>
            }
        </div>
    );
};

export default FilterPanel;
