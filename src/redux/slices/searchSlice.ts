import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISearchState {
  query: string;
}

const initialState: ISearchState = {
  query: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const { updateSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
