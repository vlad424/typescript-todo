import React, { useEffect, useState } from "react";
import { CirclePicker } from "react-color";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IAdminList } from "../../types/rtk.types";
import { useDeleteListOrCommentMutation, useGetListsAndTasksQuery, useUpdateListMutation } from "../../hooks/api-query/admin-api/admin-api";
import { listSlice } from "../../hooks/reducers/listSlice";
import DropUser from "../../components/UI/DropUser";

const ListControl = () => {
  const colors_picker = [
    "#000",
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
  ];
  const colorHandler = (hex_color: any) => {
    setColor(hex_color.hex)
  };
  const currentElList = useAppSelector(
    (state) => state.listReducer.currentElList
  );

  const checker = () => {
    if (Object.keys(currentElList).length === 0) setEnable(false);
    else setEnable(true);
  };
  const returnTryObj = () => {
    if (Object.keys(currentElList).length !== 0)
      return currentElList as IAdminList;
    else
      return {
        id: 0,
        name: "Выберете лист",
        desc: "Выберете лист",
        dateCreate: "-",
        dateAt: "-",
        text_color: "#000",
      };
  };
  const userId = useAppSelector((state) => state.taskReducer.User!.id);
  const [value_area, setValue_area] = useState(returnTryObj().desc.toString());
  const [enable, setEnable] = useState(true);
  const [dateAt, setDateAt] = useState(returnTryObj().dateAt);
  const [color, setColor] = useState(returnTryObj().text_color)

  const handleUpdateClick = async () => {
    const res : any = await patchList({
      userId: userId,
      listId: returnTryObj().id,
      data: {
        desc: value_area,
        dateAt: dateAt,
        text_color: color,
        userIdAddr: users
      }
    })
    dispatch(setElList(res.data.data.updateListEl))
    dispatch(changeElInList(res.data.data.updateListEl))
  }

  const dispatch = useAppDispatch();
  const { clearElList, setElList, changeElInList } = listSlice.actions;
  const [deleteListEl] = useDeleteListOrCommentMutation();
  const [patchList] = useUpdateListMutation()

  const users = useAppSelector(state => state.listReducer.userShare)

  useEffect(() => {
    checker();
    returnTryObj()

    setValue_area(returnTryObj().desc)
    setDateAt(returnTryObj().dateAt)
  }, [currentElList]);

  return (
    <aside className="right-side">
      <header
        style={{
          transition: "0.3s",
          display: "flex",
          width: "100%",
          minHeight: "10%",
          backgroundColor: "#F3F3F3",
        }}
      >
        <h1>{returnTryObj().name}</h1>
      </header>
      <div className="side-task-info">
        <div className="side-task-setting">
          <textarea
            className={enable ? "side-desc-task" : "side-desc-task disabled"}
            value={value_area}
            placeholder={value_area}
            onChange={(e) => setValue_area(e.target.value)}
          ></textarea>
          <ul className="side-task-date-menu">
            <li
              className={
                enable ? "side-task-menu-item" : "side-task-menu-item disabled"
              }
            >
              Date of creation:{" "}
            </li>
            <li className="side-task-menu-item">{returnTryObj().dateCreate}</li>
            <li
              className={
                enable ? "side-task-menu-item" : "side-task-menu-item disabled"
              }
            >
              Date of end:{" "}
            </li>
            <li className="side-task-menu-item">
              <input
                type="text"
                value={dateAt}
                placeholder={dateAt}
                onChange={(e) => setDateAt(e.target.value)}
              />
            </li>
          </ul>
          <CirclePicker
            width="auto"
            className={enable ? "circle-picker" : "disabled circle-picker"}
            colors={colors_picker}
            color={returnTryObj().text_color}
            onChange={(color) => colorHandler(color)}
          />
          <DropUser/>
        </div>
      </div>
      <div className="side-task-commit-changes">
        <button
          className={
            enable ? "side-buttons side-delete-task" : "side-buttons disabled"
          }
          onClick={async () => {
            await deleteListEl({
              action: "DELETE LIST EL",
              data: returnTryObj().id,
              id: userId,
            });
            dispatch(clearElList(""));
          }}
        >
          delete task
        </button>
        <button
          className={
            enable ? "side-buttons side-save-task" : "side-buttons disabled"
          }
          onClick={async() =>
            await handleUpdateClick()
          }
        >
          save changes
        </button>
      </div>
    </aside>
  );
};

export default ListControl;
