import { useState, useMemo } from "react";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import {
  Button,
  Modal,
  IconButton,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Person, initialData } from "../makeData";
import { MRT_Localization_HE } from 'material-react-table/locales/he';

// example data type


const MRTtable = () => {
  const [data, setData] = useState<Person[]>(initialData); // Store table data in state
  const [rowData, setRowData] = useState<Person | null>(null);
  const [rowIndex, setRowIndex] = useState<number | null>(null); // To track the row index being edited

  // Handle modal opening
  const handleEditModalOpen = (row: MRT_Row<Person>, index: number) => {
    setRowData(row.original); // Set the selected row data in state
    setRowIndex(index); // Set the index of the row being edited
  };

  // Close modal
  const handleEditModalClose = () => {
    setRowData(null);
    setRowIndex(null); // Reset row index
  };

  // Save modal data
  const handleSaveModalData = () => {
    if (rowData && rowIndex !== null) {
      // Update the specific row in the table data
      const updatedData = [...data];
      updatedData[rowIndex] = rowData; // Update the row at the specific index
      setData(updatedData); // Set the updated data
      handleEditModalClose(); // Close the modal after saving
    }
  };

  // Define your columns
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "name.firstName",
        header: "First Name",
        size: 150,
        minSize:150,
      },
      {
        accessorKey: "name.lastName",
        header: "Last Name",
        size: 150,
        minSize:150,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 200,
        minSize:200,
      },
      {
        accessorKey: "city",
        header: "City",
        size: 150,
        minSize:150,
      },
      {
        accessorKey: "state",
        header: "State",
        size: 150,
        minSize:150,
      },
      {
        header: "Actions",
        id: "actions",
        size: 100,
        minSize:100,
        enableEditing: false, // No editing in the action column
        Cell: ({ row, table }) => (
          <IconButton onClick={() => handleEditModalOpen(row, row.index)}>
            <EditIcon />
          </IconButton>
        ),
      },
    ],
    [data]
  );

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data} // Table data from state
        enableColumnPinning
        enableHiding
        columnResizeDirection={"rtl"}
        enableColumnResizing
        localization={MRT_Localization_HE}
        enableColumnOrdering={true}
        enableRowSelection={true}
        enableGrouping={true}
        groupedColumnMode={"reorder"}
        enableEditing
        editDisplayMode="cell" // Use cell editing mode
      />

      {/* Modal for row editing */}
      {rowData && (
        <Modal open={!!rowData} onClose={handleEditModalClose}>
          <div
            style={{
              padding: "20px",
              background: "white",
              margin: "10% auto",
              width: "400px",
            }}
          >
            <h3>Edit Row</h3>
            <TextField
              label="First Name"
              value={rowData.name.firstName}
              fullWidth
              margin="normal"
              onChange={(e) =>
                setRowData((prev) =>
                  prev
                    ? {
                        ...prev,
                        name: { ...prev.name, firstName: e.target.value },
                      }
                    : prev
                )
              }
            />
            <TextField
              label="Last Name"
              value={rowData.name.lastName}
              fullWidth
              margin="normal"
              onChange={(e) =>
                setRowData((prev) =>
                  prev
                    ? {
                        ...prev,
                        name: { ...prev.name, lastName: e.target.value },
                      }
                    : prev
                )
              }
            />
            <TextField
              label="Address"
              value={rowData.address}
              fullWidth
              margin="normal"
              onChange={(e) =>
                setRowData((prev) =>
                  prev ? { ...prev, address: e.target.value } : prev
                )
              }
            />
            <TextField
              label="City"
              value={rowData.city}
              fullWidth
              margin="normal"
              onChange={(e) =>
                setRowData((prev) =>
                  prev ? { ...prev, city: e.target.value } : prev
                )
              }
            />
            <TextField
              label="State"
              value={rowData.state}
              fullWidth
              margin="normal"
              onChange={(e) =>
                setRowData((prev) =>
                  prev ? { ...prev, state: e.target.value } : prev
                )
              }
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveModalData}
            >
              Save
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default MRTtable;
