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
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addUser } from "../redux/userSlice";
import { deleteAllUser } from "../redux/userSlice";
import moment from "moment/moment";
export const Cards = (props) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    date: "",
  });

  const handleAddUser = () => {
    if (values.date && !values.name) {
      document.getElementById("err").innerText = "Enter purpose of schedule..";
    } else if (!values.date && values.name) {
      document.getElementById("err").innerText =
        "Enter scheduled time and date..";
    } else if (!values.date && !values.name) {
      document.getElementById("err").innerText = "Please enter above fields!";
    } else if (values.date && values.name) {
      document.getElementById("err").innerText = " ";
      setValues({ name: "", date: "" });
      dispatch(
        addUser({
          id: uuidv4(),
          name: values.name,
          date: values.date,
          isSelected: false,
        })
      );
    }
  };
  const handleDeleteAllUser = () => {
    dispatch(deleteAllUser());
  };

  const [time, setTime] = useState();
  const [day, setDay] = useState();

  useEffect(() => {
    setInterval(() => {
      setTime(moment().format("h:m A"));
    }, 1000);
    setDay(moment().format("ddd DD"));
  }, []);
  return (
    <>
      <Box sx={cardStyle.titlecontent}>
        <h5>TODO List(redux tool-kit method)</h5>
      </Box>
      <Card sx={cardStyle.mainCard}>
        <Box>
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
              <Typography variant="h6">{day}</Typography>
              <Typography variant="h5">{time}</Typography>
            </Box>
          </CardActionArea>
          <Box sx={cardStyle.boxMediate}>
            <Box sx={cardStyle.noteBg}>
              <InputBase
                fullWidth
                placeholder="Note"
                id="fullWidth"
                sx={{
                  padding: "13px",
                }}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                value={values.name}
              />
              <InputBase
                type="datetime-local"
                sx={cardStyle.dateBase}
                value={values.date}
                onChange={(e) => setValues({ ...values, date: e.target.value })}
              />
            </Box>
            <Button
              variant="contained"
              sx={cardStyle.plusBtn}
              onClick={handleAddUser}
            >
              <Box sx={{ color: "#ffffff" }}>
                <AiOutlinePlus />
              </Box>
            </Button>
          </Box>
        </Box>
        <Typography
          component="h6"
          sx={cardStyle.helperText}
          id="err"
        ></Typography>
        <CardContent>
          <Box sx={cardStyle.cardContent}>
            <Box sx={{ height: "530px", width: "500px" }}>
              <LabelCards />
              <Button onClick={handleDeleteAllUser}>Remove All</Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
