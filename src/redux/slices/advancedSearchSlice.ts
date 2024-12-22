import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAdvancedSearchState {
  name: string;
  email: string;
  phone: string;
  skype: string;
  building: string;
  room: string;
  department: string;
}

const initialState: IAdvancedSearchState = {
  name: "",
  email: "",
  phone: "",
  skype: "",
  building: "",
  room: "",
  department: "",
};

const advancedSearchSlice = createSlice({
  name: "advancedSearch",
  initialState,
  reducers: {
    updateSearchField: (state, action: PayloadAction<{ field: string, value: string }>) => {
      const { field, value } = action.payload;
      state[field as keyof IAdvancedSearchState] = value;
    },
  },
});

export const { updateSearchField } = advancedSearchSlice.actions;
export default advancedSearchSlice.reducer;