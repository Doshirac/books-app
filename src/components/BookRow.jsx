import React, { useState, useEffect } from "react";
import {
    TableCell,
    TableRow,
    Collapse,
    IconButton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation()
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
              <div className="m-4 flex space-x-4">
                <div className="flex flex-col">
                  <div
                    className="relative w-48 h-72 mb-2 bg-cover bg-center rounded shadow-lg"
                    style={{
                      backgroundImage: `url(https://picsum.photos/seed/${book.bookId}/200/300)`,
                    }}
                  >
                    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-1 text-center rounded-b">
                      <div>{book.title}</div>
                      <div>{book.author}</div>
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <button onClick={handleLike} className="focus:outline-none">
                      <FaHeart className="text-red-500" size={24} />
                    </button>
                    <span className="ml-1 text-sm">{totalLikes} {t("book.likes")}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h6 className="text-lg font-semibold mb-2">
                    {t("book.reviews")} ({reviews.length})
                  </h6>
                  {reviews.map((review, index) => (
                    <div key={index} className="mb-4 p-3 bg-gray-50 rounded shadow">
                      <p className="text-sm">
                        <strong>{t("book.reviewer")}</strong> {review.reviewer}
                      </p>
                      <p className="text-sm italic">"{review.reviewText}"</p>
                      <p className="text-sm">
                        <strong>{t("book.rating")}</strong> {review.rating}/5
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
};
