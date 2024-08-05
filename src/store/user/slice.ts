import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface App{
    statusId: number
    offerId: number
    userId: number
    url: string
}

interface Role{
    id: number
    name: string
}

interface Profile{
    id: number
    userId: number
    profession: string | null
    bio: string | null
    location: string | null
    website: string | null
}

interface Skill{
    name: string
}

interface User {
    name: string
    email: string
    profile: Profile
    Role: Role
    roleId: number
    skills: Skill[]
    applications: App[]
}

export interface UserWithId extends User {
    id: number
}

const DEFAULT_USER: UserWithId = {
    id: 0,
    name: "",
    email: "",
    applications: [],
    profile: {
        id: 0,
        userId: 0,
        profession: "",
        bio: "",
        location: "",
        website: ""
    },
    Role: {
        id: 0,
        name: ""
    },
    roleId: 0,
    skills: [],
}

const initialState: UserWithId = (() =>{
    const persistedState = localStorage.getItem("reduxState");
    if (persistedState) {
        return JSON.parse(persistedState).user;
    }
    return DEFAULT_USER;
})();

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserWithId>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.applications = action.payload.applications;
            state.Role = action.payload.Role;
            state.roleId = action.payload.roleId;
            state.profile = action.payload.profile;
            state.skills = action.payload.skills;
        },
        clearUser: () => {
            return DEFAULT_USER;
        }
    },
});

export default userSlice.reducer;

export const { setUser, clearUser } = userSlice.actions;