import React, { useState, useEffect, useRef } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Paper,
    TableSortLabel,
    TablePagination,
    Tooltip,
    Box,
    TextField,
    Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { getComparator } from "../utils/getComparator";
import { stableSort } from "../utils/stableSort";
import { BookRow } from "./BookRow";
import { LanguageChange } from "./LanguageChange";
import { createBooks } from "../utils/createBooks";
import { SeedReset } from "./SeedReset";
import { selectRandomBook } from "../utils/selectRandomBook";

const BOOK_COUNT = 100;

const BookTable = () => {
    const { i18n } = useTranslation();
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("title");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [books, setBooks] = useState([]);
    const [seed, setSeed] = useState(42);
    const [reviewFraction, setReviewFraction] = useState(4.7);
    const [likeFraction, setLikeFraction] = useState(50);
    const [selectedBook, setSelectedBook] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
      const newBooks = createBooks({
        localeCode: i18n.language,
        seed,
        count: BOOK_COUNT,
      });
      setBooks(newBooks);
    }, [i18n.language, seed]);

    useEffect(() => {
      if (books.length > 0) {
        const random = selectRandomBook(books, seed);
        setSelectedBook(random);
      }
    }, [books, seed, i18n.language]);

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

    const sortedBooks = stableSort(books, getComparator(order, orderBy));
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

    const handleGoToSelected = () => {
      if (!selectedBook) return;

      const index = sortedBooks.findIndex(
        (book) => book.bookId === selectedBook.bookId
      );
      if (index === -1) return;

      const newPage = Math.floor(index / rowsPerPage);

      setPage(newPage);

      setTimeout(() => {
        const el = document.getElementById(`book-${selectedBook.bookId}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 200);
    };

    return (
      <Paper className="m-auto p-4 rounded shadow w-[80vw] bg-whiteborder" ref={containerRef}>
        <Toolbar className="bg-gray-50 rounded-t">
          <Box className="flex items-center w-full gap-2">
            <LanguageChange />
            <SeedReset seed={seed} onSeedChange={setSeed} />
            <Box className="flex items-center">
              <TextField
                label="Likes"
                type="number"
                variant="outlined"
                size="small"
                value={likeFraction}
                onChange={(e) =>
                  setLikeFraction(parseFloat(e.target.value))
                }
                sx={{ width: 100 }}
              />
            </Box>
            <Box className="flex items-center">
              <TextField
                label="Reviews"
                type="number"
                variant="outlined"
                size="small"
                value={reviewFraction}
                onChange={(e) =>
                  setReviewFraction(parseFloat(e.target.value))
                }
                sx={{ width: 100 }}
              />
            </Box>
            {selectedBook && (
              <Button variant="contained" onClick={handleGoToSelected}>
                Go to Selected Book
              </Button>
            )}
          </Box>
        </Toolbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <></>
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
                  <BookRow
                    book={book}
                    localeCode={i18n.language}
                    seed={seed}
                    fraction={reviewFraction}
                    likeFraction={likeFraction}
                    forceOpen={selectedBook && book.bookId === selectedBook.bookId}
                  />
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={books.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
};

export default BookTable;
