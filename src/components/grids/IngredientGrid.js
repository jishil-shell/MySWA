import React, { useState, useMemo, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../css/Grid.css';

const IngredientGrid = ({ runType, jsonData, onGridUpdate }) => {
    const gridRef = useRef();
    let [rowData, setRowData] = useState([]);

    useEffect(() => {
        let ingredientsData = jsonData?.ingredients || {};
        let data = [];
        let id = 0;
        for (var i in ingredientsData) {
            ++id;
            data.push({
                id: id,
                ingredient: i,
                type: ingredientsData[i].type,
                category: ingredientsData[i].category,
                quantity: ingredientsData[i].quantity,
                price: ingredientsData[i].price,
                carbonFootprint: ingredientsData[i].carbon_footprint,
                selected: ingredientsData[i].available
            })
        }
        setRowData(data);
    }, [jsonData]);

    // Function to determine if a row should be selected based on JSON data
    const isRowSelected = (params) => {
        return params.data.selected || false; // Assuming JSON data has an isSelected property
    };

    // Get row ID (useful for handling selection state)
    const getRowNodeId = (data) => data.id; // Assuming each item has a unique `id` field

    const columnDefs = useMemo(() => {
        const columns = [
            {
                headerCheckboxSelection: true,
                checkboxSelection: true,
                field: 'select',
                headerName: '',
                width: 50,
                cellStyle: { textAlign: 'center' },
                headerCheckboxSelectionFilteredOnly: true,
            },
            { field: 'ingredient', editable: false, headerName: 'Ingredient', resizable: true, flex: 1, headerClass: 'header-left-align', cellClass: 'cell-left-align' },
            { field: 'type', editable: false, headerName: 'Type', resizable: true, flex: 1, headerClass: 'header-left-align', cellClass: 'cell-left-align' },
            { field: 'category', editable: false, headerName: 'Category', resizable: true, flex: 1, headerClass: 'header-left-align', cellClass: 'cell-left-align' },
            { field: 'price', editable: true, headerName: 'Price ($/kg)', resizable: true, flex: 1, headerClass: 'header-left-align', cellClass: 'cell-left-align' },
            { field: 'carbonFootprint', editable: true, headerName: 'Carbon Footprint (kgCO2e/kg)', resizable: true, flex: 1, headerClass: 'header-left-align', cellClass: 'cell-left-align' },
        ];

        // Conditionally add the "Quantity" column
        if (runType === 'static') {
            columns.splice(4, 0, {
                field: 'quantity',
                editable: true,
                headerName: 'Quantity (part by weight)',
                resizable: true,
                flex: 1,
                headerClass: 'header-left-align',
                cellClass: 'cell-left-align',
            });
        }
        return columns;
    }, [runType]);

    const onCellValueChanged = (params) => {
        const selectedNodes = gridRef.current.api.getSelectedNodes();
        const selectedRowIds = selectedNodes.map(node => node.data.id);
        const updatedData = [...rowData];
        updatedData[params.node.rowIndex][params.colDef.field] = params.value;

        if (JSON.stringify(rowData) !== JSON.stringify(updatedData)) {
            setRowData(updatedData);
            onGridUpdate(updatedData);
            setTimeout(() => {
                gridRef.current.api.forEachNode((node) => {
                    node.setSelected(selectedRowIds.includes(node.data.id));
                });
            }, 0);;
        }
        
    };

    const onSelectionChanged = () => {
        const selectedNodes = gridRef.current.api.getSelectedNodes();
        const selectedRowIds = selectedNodes.map(node => node.data.id);
        const updatedData = rowData.map(item => {
            return { ...item, selected: (selectedRowIds.includes(item.id) ? true : false) };
        });
        if (JSON.stringify(rowData) !== JSON.stringify(updatedData)) {
            setRowData(updatedData);
            onGridUpdate(updatedData);
            setTimeout(() => {
                gridRef.current.api.forEachNode((node) => {
                    node.setSelected(selectedRowIds.includes(node.data.id));
                });
            }, 0);;
        }
    };

    const onGridReady = (params) => {
        onGridUpdate(rowData);
        params.api.forEachNode((node) => {
            node.setSelected(isRowSelected(node));
        });
    };

    return (
        <>
            <h3 style={{ textAlign: 'left' }}>Ingredient Inputs</h3>
            <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    suppressRowClickSelection={true}
                    rowSelection="multiple"
                    onGridSizeChanged={(params) => params.api.sizeColumnsToFit()}
                    defaultColDef={{ filter: true, sortable: true }}
                    onCellValueChanged={onCellValueChanged}
                    onGridReady={onGridReady}
                    onSelectionChanged={() => onSelectionChanged()}
                    getRowNodeId={getRowNodeId}
                />
            </div>
        </>
    );
};

export default IngredientGrid;
