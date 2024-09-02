import React, { useState, useMemo, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../css/Grid.css';

const ConditionsGrid = ({ jsonData, onGridUpdate }) => {
    
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        let conditionsData = jsonData?.conditions || {};
        let initialConditions = ['TCELCIUS', 'TPOLCELCIUS', 'TTDICELCIUS', 'HUMIDITY', 'PMBAR'];
        let data = [];
        for (var c in conditionsData) {
            if (initialConditions.includes(c)) {
                data.push({
                    key: c,
                    condition: conditionsData[c].description || "",
                    value: conditionsData[c].value || ""
                })
            }
        }
        setRowData(data);        
    }, [jsonData]);

    const columnDefs = useMemo(() => [
        { field: 'condition', editable: false, headerName: 'Conditions', resizable: true, headerClass: 'header-left-align', cellClass: 'cell-left-align' },
        { field: 'value', editable: true, headerName: 'Value', resizable: true, headerClass: 'header-left-align', cellClass: 'cell-left-align' }
    ], []);

    const onCellValueChanged = (params) => {
        const updatedData = [...rowData];
        updatedData[params.node.rowIndex][params.colDef.field] = params.value;
        setRowData(updatedData);
        onGridUpdate(updatedData);
    };

    const onGridReady = () => {
        onGridUpdate(rowData);
    };

    return (
        <>
            <h3 style={{ textAlign: 'left' }}>Conditions Inputs</h3>
            <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    suppressRowClickSelection={true}
                    rowSelection="single"
                    onGridSizeChanged={(params) => params.api.sizeColumnsToFit()}
                    defaultColDef={{ filter: true, sortable: true }}
                    onCellValueChanged={onCellValueChanged}
                    onGridReady={onGridReady}
                />
            </div>
        </>

    );
};

export default ConditionsGrid;
