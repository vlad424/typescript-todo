import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../lib/store";

export const useAppDispatch = () => useDispatch<AppDispatch>()             // 
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector // custom hooks