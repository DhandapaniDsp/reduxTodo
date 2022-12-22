import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, TextField } from "@mui/material";
import { cardStyle } from "./style";
import { Box } from "@mui/system";
import flower from "../../assets/images/yellow.png";
import { AiOutlinePlus } from "react-icons/ai";
import InputBase from "@mui/material/InputBase";
import { LabelCards } from "../LabelCards";
export const Cards = (props) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const handleAddBookSubmit = (e) => {
    e.preventDefault();
    let book = {
      title,
      date,
    };
    setNote([...note, book]);
    setTitle("");
    setDate("");
  };

  const deleteBook = (date) => {
    const filteredBooks = note.filter((element, index) => {
      return element.date !== date;
    });
    setNote(filteredBooks);
  };
  useEffect(() => {
    localStorage.setItem("Note", JSON.stringify(note));
  }, [note]);
  return (
    <Card sx={cardStyle.mainCard}>
      <CardActionArea>
        <Box>
          <CardMedia
            component="img"
            height="140"
            image={flower}
            alt="green iguana"
            sx={cardStyle.cardAction}
          />
        </Box>

        <Box sx={cardStyle.timeText}>
          <Typography variant="h6">Thur 9</Typography>
          <Typography variant="h5">6.23 AM</Typography>
        </Box>
      </CardActionArea>
      <CardContent sx={cardStyle.cardContent}>
        <Box sx={cardStyle.boxMediate}>
          <Box sx={cardStyle.noteBg}>
            <InputBase
              fullWidth
              placeholder="Note"
              id="fullWidth"
              sx={{
                padding: "13px",
              }}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <InputBase
              type="datetime-local"
              sx={cardStyle.dateBase}
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </Box>
          <Button
            variant="contained"
            sx={cardStyle.plusBtn}
            onClick={handleAddBookSubmit}
          >
            <Box sx={{ color: "#ffffff" }}>
              <AiOutlinePlus />
            </Box>
          </Button>
        </Box>

        {note.length > 0 && (
          <Box>
            <LabelCards note={note} deleteBook={deleteBook} />

            <Button onClick={() => setNote([])}>Remove All</Button>
          </Box>
        )}
        {note.length < 1 && (
          <Box sx={cardStyle.emptyContent}>
            <Typography>No notes are added yet</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
