import React from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { BsCircle, BsCircleFill } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { labelcardStyle } from "./style";
export const LabelCards = ({ note, deleteBook }) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return note.map((book) => (
    <>
      <Box sx={labelcardStyle.Sx}>
        <Box>
          <Typography variant="body1" sx={{ padding: "5px" }}>
            {book.title}
          </Typography>
          <Typography variant="body2" sx={{ padding: "5px" }}>
            {book.date}
          </Typography>
        </Box>
        <Box sx={labelcardStyle.iconBox}>
          <Checkbox
            color="primary"
            {...label}
            icon={<BsCircle color="primary" width="20px" height="20px" />}
            checkedIcon={<BsCircleFill />}
            sx={labelcardStyle.checkBox}
          />
          <Box sx={{ color: "#ff2c2c" }}>
            <RiDeleteBinLine
              onClick={() => deleteBook(book.date)}
              sx={labelcardStyle.delete}
            />
          </Box>
        </Box>
      </Box>
    </>
  ));
};
