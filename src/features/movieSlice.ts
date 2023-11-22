import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface Movie {
  title: string,
  release_date: number,
  overview: string,
  poster: string,
}

// Define a type for the slice state
interface MovieState {
  searchResults: Movie[],
  toWatchList: Movie[],
  watchedList: Movie[]
}

// Define the initial state using that type
const initialState: MovieState = {
  searchResults: [],
  toWatchList: [],
  watchedList: [],
}

export const movieSlice = createSlice({
  name: 'movies',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setResults: (state, action: PayloadAction<Movie[]>) => {
      state.searchResults = action.payload;
    },
    setWatched: (state, action: PayloadAction<Movie[]>) => {
      state.toWatchList = action.payload;
    },
    setToWatch: (state, action: PayloadAction<Movie[]>) => {
      state.watchedList = action.payload;
    },
  },
})

export const { setResults, setWatched, setToWatch } = movieSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectMovieState = (state: RootState) => state;

export default movieSlice.reducer