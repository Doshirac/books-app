import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Checkbox,
  Paper,
  TableSortLabel,
  TablePagination,
  Tooltip,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { getComparator } from "../utils/getComparator";
import { stableSort } from "../utils/stableSort";
import { BookRow } from "./BookRow";
import { LanguageChange } from "./LanguageChange";
import { createBooks } from "../utils/createBooks";
import { SeedReset } from "./SeedReset";

const BOOK_COUNT = 100;

const BookTable = () => {
  const { i18n } = useTranslation();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [books, setBooks] = useState([]);
  
  // Manage the seed state at the parent level.
  const [seed, setSeed] = useState(42);

  // Regenerate books when language or seed changes.
  useEffect(() => {
    const newBooks = createBooks({
      localeCode: i18n.language,
      seed,
      count: BOOK_COUNT,
    });
    setBooks(newBooks);
  }, [i18n.language, seed]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredBooks = books;
  const sortedBooks = stableSort(filteredBooks, getComparator(order, orderBy));
  const paginatedBooks = sortedBooks.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const headCells = [
    { id: "bookId", label: "#" },
    { id: "ISBN", label: "ISBN" },
    { id: "title", label: "Title" },
    { id: "author", label: "Author" },
    { id: "publisher", label: "Publisher" },
  ];

  return (
    <Paper>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <LanguageChange />
          <SeedReset seed={seed} onSeedChange={setSeed} />
        </div>
      </Toolbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, headCell.id)}
                  >
                    <Tooltip title="Sort" placement="bottom-start">
                      <span>{headCell.label}</span>
                    </Tooltip>
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBooks.map((book) => (
              <React.Fragment key={book.bookId}>
                <BookRow book={book} />
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredBooks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default BookTable;
