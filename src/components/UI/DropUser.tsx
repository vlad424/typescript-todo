import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import React, { useEffect, useLayoutEffect } from "react";
import { useGetListsAndTasksQuery } from "../../hooks/api-query/admin-api/admin-api";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useDispatch } from "react-redux";
import { listSlice } from "../../hooks/reducers/listSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 2.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

export default function DropUser() {
  const [personName, setPersonName] = React.useState([]);

  const userId = useAppSelector((state) => state.taskReducer.User!.id);

  const { setUserShare } = listSlice.actions;
  const { data, isLoading } = useGetListsAndTasksQuery(userId);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
    dispatch(
      setUserShare(typeof value === "string" ? value.split(",") : value)
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Пользователь</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Пользователь" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {isLoading !== true ? (
            data!.users.map((name) => (
              <MenuItem key={name.email} value={name.email}>
                <Checkbox checked={personName.indexOf(name as never) > -1} />
                <ListItemText primary={name.email} />
              </MenuItem>
            ))
          ) : (
            <MenuItem key={"okey"} value={"okey"}>
              <ListItemText primary={"okey"} />
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}
