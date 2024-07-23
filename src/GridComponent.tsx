import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, RowDragEvent, SelectionChangedEvent,ColGroupDef } from 'ag-grid-community';
import { generateData, RowData } from './dataGenerator';

const GridComponent: React.FC = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [rowData, setRowData] = useState<RowData[]>(generateData(50));
  const [selectedRows, setSelectedRows] = useState<RowData[]>([]);

  // Column definitions with checkbox selection enabled
  const columnDefs: ColDef<RowData>[] = useMemo(() => [
    { 
      headerCheckboxSelection: true, // Show checkbox in the header
      checkboxSelection: true, // Show checkbox in each row
      width: 50, // Adjust width to fit checkboxes
    },
    { 
      headerName: 'Athlete', 
      field: 'athlete', 
      sortable: true, 
      filter: true, 
      pinned: 'left', 
      editable: true,
      rowDrag: true // Enable row dragging for this column
    },
    { 
      headerName: 'Year', 
      field: 'year', 
      sortable: true, 
      filter: true, 
      editable: true 
    },
    { 
      headerName: 'Country', 
      field: 'country', 
      sortable: true, 
      filter: true, 
      editable: true 
    },
    { 
      headerName: 'Age', 
      field: 'age', 
      sortable: true, 
      filter: true, 
      editable: true 
    },
    { 
      headerName: 'Date', 
      field: 'date', 
      sortable: true, 
      filter: true, 
      editable: true 
    },
    { 
      headerName: 'Sport', 
      field: 'sport', 
      sortable: true, 
      filter: true, 
      editable: true 
    },
    {
      headerName: 'Sports Results',
      children: [
        { columnGroupShow: 'closed', field: 'total', headerName: 'Total', sortable: true, filter: true },
        { columnGroupShow: 'open', field: 'gold', headerName: 'Gold', sortable: true, filter: true },
        { columnGroupShow: 'open', field: 'silver', headerName: 'Silver', sortable: true, filter: true },
        { columnGroupShow: 'open', field: 'bronze', headerName: 'Bronze', sortable: true, filter: true }
      ]
    },
  ], []);


  // Handle row drag end event
  const onRowDragEnd = useCallback((event: RowDragEvent<RowData>) => {
    if (event.node.rowIndex !== null && event.overIndex !== null) {
      const updatedRowData = [...rowData];
      const movedRowIndex = event.node.rowIndex;
      const draggedRow = updatedRowData[movedRowIndex];
      updatedRowData.splice(movedRowIndex, 1); // Remove the dragged row

      const targetRowIndex = event.overIndex;
      updatedRowData.splice(targetRowIndex, 0, draggedRow); // Insert the row at the target position

      setRowData(updatedRowData);
    }
  }, [rowData]);

  const onCellValueChanged = (params: any) => {
    const updatedData = rowData.map(row =>
      row.athlete === params.data.athlete ? { ...row, ...params.data } : row
    );
    setRowData(updatedData);
  };

  const onSelectionChanged = useCallback((event: SelectionChangedEvent) => {
    const selectedRows = event.api.getSelectedRows();
    setSelectedRows(selectedRows);
  }, []);

  return (
    <div>
      <div>
        <label htmlFor="pageSize">Page Size:</label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
      <div className="ag-theme-alpine" style={{ height: 400, width: '85%' }}>
        <AgGridReact<RowData>
          columnDefs={columnDefs}
          rowData={rowData}
          rowSelection="multiple"
          pagination={true}
          paginationPageSize={pageSize}
          onCellValueChanged={onCellValueChanged}
          onRowDragEnd={onRowDragEnd}
          onSelectionChanged={onSelectionChanged}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Selected Rows Data:</h3>
        <pre>{JSON.stringify(selectedRows, null, 2)}</pre>
      </div>
    </div>
  );
};

export default GridComponent;
