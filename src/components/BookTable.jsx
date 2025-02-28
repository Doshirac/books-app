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
const LIKES_PER_REVIEW = 4;
const INCREMENT = 5;

const BookTable = () => {
    const { t, i18n } = useTranslation();
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("title");
    const [books, setBooks] = useState([]);
    const [seed, setSeed] = useState(42);
    const [reviewFraction, setReviewFraction] = useState(4.7);
    const [likeFraction, setLikeFraction] = useState(19);
    const [selectedBook, setSelectedBook] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [itemsToShow, setItemsToShow] = useState(INCREMENT);
    const containerRef = useRef(null);
    const bottomBoundaryRef = useRef(null);

    useEffect(() => {
      const newBooks = createBooks({
        localeCode: i18n.language,
        seed,
        count: BOOK_COUNT,
      });
      setBooks(newBooks);
      setItemsToShow(INCREMENT);
    }, [i18n.language, seed]);

    useEffect(() => {
      if (books.length > 0) {
        const random = selectRandomBook(books, seed);
        setSelectedBook(random);
      }
    }, [books, seed, i18n.language]);

    useEffect(() => {
      if (lastUpdated === "likes") {
        const calculatedReviews = parseFloat((likeFraction / LIKES_PER_REVIEW).toFixed(1));
        setReviewFraction(calculatedReviews);
      } else if (lastUpdated === "reviews") {
        const calculatedLikes = Math.round(reviewFraction * LIKES_PER_REVIEW);
        setLikeFraction(calculatedLikes);
      }
      if (lastUpdated) {
        setLastUpdated(null);
      }
    }, [lastUpdated, likeFraction, reviewFraction]);

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };

    const handleLikeFractionChange = (e) => {
      const newValue = parseFloat(e.target.value);
      setLikeFraction(newValue);
      setLastUpdated("likes");
    };

    const handleReviewFractionChange = (e) => {
      const newValue = parseFloat(e.target.value);
      setReviewFraction(newValue);
      setLastUpdated("reviews");
    };

    const sortedBooks = stableSort(books, getComparator(order, orderBy));
    const visibleBooks = sortedBooks.slice(0, itemsToShow);

    const headCells = [
      { id: "bookId", label: "#" },
      { id: "ISBN", label: "ISBN" },
      { id: "title", label: t("book.title") },
      { id: "authors", label: t("book.author") },
      { id: "publisher", label: t("book.publisher") },
    ];

    const handleGoToSelected = () => {
      if (!selectedBook) return;
      setTimeout(() => {
        const el = document.getElementById(`book-${selectedBook.bookId}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 200);
    };

    // Set up infinite scrolling with IntersectionObserver.
    useEffect(() => {
      if (!bottomBoundaryRef.current) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && itemsToShow < sortedBooks.length) {
            setItemsToShow((prev) => Math.min(prev + INCREMENT, sortedBooks.length));
          }
        });
      });
      observer.observe(bottomBoundaryRef.current);
      return () => {
        if (bottomBoundaryRef.current) {
          observer.unobserve(bottomBoundaryRef.current);
        }
      };
    }, [bottomBoundaryRef, itemsToShow, sortedBooks.length]);

    return (
      <Paper
        className="m-auto p-4 rounded shadow w-[80vw] bg-whiteborder"
        ref={containerRef}
      >
        <Toolbar className="bg-gray-50 rounded-t">
          <Box className="flex items-center w-full gap-2">
            <LanguageChange />
            <SeedReset seed={seed} onSeedChange={setSeed} />
            <Box className="flex items-center">
              <TextField
                label={t("book.likes")}
                type="number"
                variant="outlined"
                size="small"
                value={likeFraction}
                onChange={handleLikeFractionChange}
                sx={{ width: 100 }}
              />
            </Box>
            <Box className="flex items-center">
              <TextField
                label={t("book.reviews")}
                type="number"
                variant="outlined"
                size="small"
                value={reviewFraction}
                onChange={handleReviewFractionChange}
                sx={{ width: 100 }}
              />
            </Box>
            {selectedBook && (
              <Button variant="contained" onClick={handleGoToSelected}>
                {t("book.chooseBook")}
              </Button>
            )}
          </Box>
        </Toolbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" />
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
              {visibleBooks.map((book) => (
                <React.Fragment key={book.bookId}>
                  <BookRow
                    book={book}
                    localeCode={i18n.language}
                    seed={seed}
                    fraction={reviewFraction}
                    likeFraction={likeFraction}
                    forceOpen={
                      selectedBook && book.bookId === selectedBook.bookId
                    }
                  />
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
          <div ref={bottomBoundaryRef} style={{ height: "20px", margin: "10px" }} />
        </TableContainer>
      </Paper>
    );
};

export default BookTable;
