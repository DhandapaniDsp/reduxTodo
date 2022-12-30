import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { BsCircle } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { labelcardStyle } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../redux/userSlice";
import { isSelect } from "../redux/userSlice";
import moment from "moment/moment";
export const LabelCards = (props) => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.users);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const completeHandler = (user) => {
    let id = user.id;
    dispatch(isSelect({ id }));

  };
  const handleRemoveUser = (id) => {
    dispatch(deleteUser({ id }));
  };

  function Daymaker(date) {
    const today = new Date();
    let tomorrow = new Date();
    let yesterday = new Date();

    tomorrow.setDate(today.getDate() + 1);
    yesterday.setDate(today.getDate() - 1);
    let input = new Date(date);
    if (today.getDate() === input.getDate()) {
      return "Today " + input.toLocaleTimeString();
    } else if (tomorrow.getDate() === input.getDate()) {
      return "Tomorrow " + input.toLocaleTimeString();
    } else if (yesterday.getDate() === input.getDate()) {
      return "Yesterday " + input.toLocaleTimeString();
    } else {
      let date = input.toLocaleDateString();
      let time = input.toLocaleTimeString();
      return `${date} ${time}`;
    }
  }
  console.log(users, "dfh");
  return (
    <>
      {users.map((user) => (
        <Box sx={labelcardStyle.Sx} key={user.id}>
          <Box>
            <Typography
              variant="body1"
              sx={{
                padding: "5px",
                textDecoration: user.isSelected ? "line-through" : "none",
              }}
            >
              {user.name}
            </Typography>
            <Typography variant="body2" sx={{ padding: "5px" }}>
              {Daymaker(user.date)}
            </Typography>
          </Box>
          <Box sx={labelcardStyle.iconBox}>
            <Checkbox
              color="primary"
              {...label}
              icon={<BsCircle color="primary" width="20px" height="20px" />}
              checkedIcon={<AiOutlineCheckCircle />}
              sx={labelcardStyle.checkBox}
              onClick={() => completeHandler(user)}
            />
            <Box sx={labelcardStyle.delete}>
              <RiDeleteBinLine onClick={() => handleRemoveUser(user.id)} />
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};
