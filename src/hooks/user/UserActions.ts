import { UserWithId, setUser, clearUser } from "../../store/user/slice";
import { useAppDispatch } from "../../hooks/store";

export const UserActions = () =>{
    const dispatch = useAppDispatch();

    const handleSetUser = (user: UserWithId) => {
        dispatch(setUser(user));
    }

    const handleClearUser = () => {
        dispatch(clearUser());
    }

    return { handleSetUser, handleClearUser }
}