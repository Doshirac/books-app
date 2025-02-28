import React, { useState, useEffect } from "react";
import {
  TableCell,
  TableRow,
  Box,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { generateRandomReviews } from "../utils/generateRandomReviews";
import { generateRandomLikes } from "../utils/generateRandomLikes";
import { FaHeart } from "react-icons/fa";

export const BookRow = ({
    book,
    localeCode,
    seed,
    fraction,
    likeFraction,
    forceOpen = false,
}) => {
    const [open, setOpen] = useState(forceOpen);
    const [userAddedLikes, setUserAddedLikes] = useState(0);

    useEffect(() => {
      if (forceOpen) {
        setOpen(true);
      }
    }, [forceOpen]);

    const reviews = generateRandomReviews({
      localeCode,
      seed: `${seed}-${book.bookId}-reviews`,
      fraction,
    });

    const generatedLikes = generateRandomLikes({
      seed: `${seed}-${book.bookId}-likes`,
      fraction: likeFraction,
    });
    
    const totalLikes = generatedLikes + userAddedLikes;

    const handleLike = (e) => {
      e.stopPropagation();
      setUserAddedLikes(userAddedLikes + 1);
    };

    return (
      <>
        <TableRow
          id={`book-${book.bookId}`}
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
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
                  <Typography variant="h6">Reviews ({reviews.length})</Typography>
                  {reviews.map((review, index) => (
                    <Box key={index} mb={2}>
                      <Typography variant="body2">
                        <strong>Reviewer:</strong> {review.reviewer}
                      </Typography>
                      <Typography variant="body2">"{review.reviewText}"</Typography>
                      <Typography variant="body2">
                        <strong>Rating:</strong> {review.rating}/5
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <IconButton onClick={handleLike}>
                    <FaHeart color="red" size={24} />
                  </IconButton>
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {totalLikes} Likes
                  </Typography>
                </Box>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
};
