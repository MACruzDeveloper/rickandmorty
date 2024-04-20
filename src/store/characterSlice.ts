import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// define the async thunk for fetching characters data
export const fetchAllCharacters = createAsyncThunk('character/fetchAllCharacters', 
  async () => {
    const response = await fetch('https://rickandmortyapi.com/api/character')
    const jsonData = await response.json()
    return jsonData
})

// define the characters slice
export const characterSlice = createSlice({
  name: "characters",
  initialState: {
    characters: [], 
    loading: false, 
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCharacters.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAllCharacters.fulfilled, (state, action) => {
        state.loading = false
        state.characters = action.payload
      })
      .addCase(fetchAllCharacters.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default characterSlice.reducer