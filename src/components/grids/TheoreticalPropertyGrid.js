import React, { useState, useMemo, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../css/Grid.css';

const TheoreticalPropertyGrid = ({ jsonData, onGridUpdate }) => {
    const [rowData, setRowData] = useState([]);
    let columns = [];
    useEffect(() => {
        let propertyNames = ['POS', 'SAN', 'SANNEST', 'PIPA', 'HSPIPA', 'PHD', 'SOLIDS', 'Ohbase', 'Ohadj', 'EO', 'Totalweight', 'CFn', 'Cphc', 'Unsat', 'BlowEq', 'GelEq', 'BlowFactor'];
        let ingredientsData = jsonData?.ingredients || {};
        let data = [];
        for (let i in ingredientsData) {
            if (ingredientsData[i]?.theoretical) {
                let item = {
                    ingredient: i
                };
                for (let o in ingredientsData[i]) {
                    if (propertyNames.includes(o)) {
                        let cName = o.toLocaleLowerCase();
                        item[cName] = ingredientsData[i][o]
                    }
                }
                data.push(item)
            }
        }
        setRowData(data);
        columns.push({
            field: 'ingredient', editable: false, headerName: 'Ingredient', resizable: true, minWidth: 250, headerClass: 'header-left-align', cellClass: 'cell-left-align'
        })
    
        propertyNames.forEach((item) => {
            columns.push({
                field: item.toLocaleLowerCase(), editable: true, headerName: item, resizable: true, headerClass: 'header-left-align', cellClass: 'cell-left-align'
            })
        })
    }, [jsonData]);
    

    const columnDefs = useMemo(() => columns, []);

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
            <h3 style={{ textAlign: 'left' }}>Theoretical Polyol Property Inputs</h3>
            <div className="ag-theme-alpine" style={{ height: '350px', width: '100%' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    suppressRowClickSelection={true}
                    rowSelection="single"
                    onGridSizeChanged={(params) => params.api.sizeColumnsToFit()}
                    defaultColDef={{ filter: true, sortable: true, minWidth: 100 }}
                    onCellValueChanged={onCellValueChanged}
                    onGridReady={onGridReady}
                />
            </div>
        </>

    );
};

export default TheoreticalPropertyGrid;
