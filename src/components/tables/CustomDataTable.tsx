"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

type ColumnDef<T> = {
  label: string;
  accessor?: keyof T;
  width?: string;
  render?: (row: T, index: number) => React.ReactNode;
};

interface CustomDataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
}

export default function CustomDataTable<T>({
  data,
  columns,
}: CustomDataTableProps<T>) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="data table">
        <TableHead>
          <TableRow>
            {columns.map((col, idx) => (
              <TableCell key={idx} style={{ width: col.width }}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.length > 0 && data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((col, colIndex) => (
                <TableCell key={colIndex}>
                  {col.render
                    ? col.render(row, rowIndex)
                    : col.accessor
                    ? (row[col.accessor] as React.ReactNode)
                    : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
