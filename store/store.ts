import { configureStore } from "@reduxjs/toolkit"
import charactersReducer from "./characterSlice"

// configure store with the generated reducer
const store = configureStore({
  reducer: {
    characters: charactersReducer
  },
})

export default store
