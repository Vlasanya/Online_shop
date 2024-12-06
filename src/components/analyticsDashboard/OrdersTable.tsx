import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { NumericFormat } from "react-number-format";
import Dot from "@/components/@extended/Dot";
import { Theme } from "@mui/material/styles";
import ChartWrapper from "./ChartWrapper";

export interface RowData extends GridValidRowModel {
  tracking_no: number;
  name: string;
  fat: number;
  carbs: number;
  protein: number;
}

const OrderStatus: React.FC<{ status: number }> = ({ status }) => {
  const statusMapping: Record<
    number,
    { color: keyof Theme["palette"]; title: string }
  > = {
    0: { color: "warning", title: "Pending" },
    1: { color: "success", title: "Approved" },
    2: { color: "error", title: "Rejected" },
  };

  const { color, title } = statusMapping[status] || {
    color: "primary",
    title: "None",
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

const OrderTable: React.FC = () => {
  const [rows, setRows] = useState<RowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  useEffect(() => {
    fetch("/api/grid-data")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data: RowData[]) => {
        setRows(data);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const columns: GridColDef<RowData>[] = [
    {
      field: "tracking_no",
      headerName: "Tracking No.",
      flex: 1,
      renderCell: (params: GridRenderCellParams<RowData, number>) => (
        <Link color="secondary">{params.value ?? ""}</Link>
      ),
    },
    {
      field: "name",
      headerName: "Product Name",
      flex: 1,
    },
    {
      field: "fat",
      headerName: "Total Order",
      type: "number",
      flex: 1,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "carbs",
      headerName: "Status",
      flex: 1,
      renderCell: (params: GridRenderCellParams<RowData, number>) => (
        <OrderStatus status={params.value ?? 0} />
      ),
    },
    {
      field: "protein",
      headerName: "Total Amount",
      type: "number",
      flex: 1,
      align: "right",
      headerAlign: "right",
      renderCell: (params: GridRenderCellParams<RowData, number>) => (
        <NumericFormat
          value={params.value ?? 0}
          displayType="text"
          thousandSeparator
          prefix="$"
        />
      ),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ChartWrapper title="Order Table">
      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={(model) => setPaginationModel(model)}
          pageSizeOptions={[5, 10, 25, 50]}
          getRowId={(row) => row.tracking_no.toString()}
        />
      </Box>
    </ChartWrapper>
  );
};

export default OrderTable;
