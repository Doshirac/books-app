import React, { useState } from "react";
import {
    TableCell,
    TableRow,
    Box,
    Collapse,
    IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { generateRandomReviews } from "../utils/generateRandomReviews";

export const BookRow = ({ book }) => {
    const [open, setOpen] = useState(false);
    const reviews = generateRandomReviews();

    return (
      <>
        <TableRow
          hover
          onClick={() => setOpen(!open)}
          style={{ cursor: "pointer" }}
        >
          <TableCell padding="checkbox">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{book.bookId}</TableCell>
          <TableCell>{book.ISBN}</TableCell>
          <TableCell>{book.title}</TableCell>
          <TableCell>{book.author}</TableCell>
          <TableCell>{book.publisher}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Box
                  sx={{
                    position: "relative",
                    width: 200,
                    height: 300,
                    backgroundImage: `url(https://picsum.photos/seed/${book.bookId}/200/300)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    marginBottom: 2,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      padding: "4px",
                      textAlign: "center",
                    }}
                  >
                    <div>{book.title}</div>
                    <div>{book.author}</div>
                  </Box>
                </Box>
                <Box>
                  <h4>Reviews</h4>
                  {reviews.map((review, index) => (
                      <Box key={index} mb={2}>
                        <p>
                          <strong>Reviewer:</strong> {review.reviewer}
                        </p>
                        <p>"{review.reviewText}"</p>
                        <p>
                          <strong>Rating:</strong> {review.rating}/5
                        </p>
                      </Box>
                  ))}
                </Box>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
};
