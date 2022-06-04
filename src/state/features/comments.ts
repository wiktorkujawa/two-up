import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IComment } from '../../interfaces';
import axios from 'axios';
export interface CommentState {
  loading: "IDLE" | "PENDING" | "FULFILLED" | "REJECTED",
  data: IComment[] | undefined,
  errors: string[]
}

const apiEndpoint = 'https://jsonplaceholder.typicode.com';

export const getComments = createAsyncThunk(
  'GET_COMMENTS',
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${apiEndpoint}/comments?postId=${id}`);

      return data;
    }
    catch(e: any) {
      return rejectWithValue(e.response.data)
    }    
  }
)

const initialState: CommentState = {
  loading: 'IDLE',
  data: undefined,
  errors: []
};

const commentsSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // GET REDUCERS
    builder.addCase(getComments.pending, (state: CommentState, _action) => {
      state.loading = "PENDING"
    })
    .addCase(getComments.fulfilled, (state: CommentState, action: PayloadAction<IComment[]>) => {
      state.loading = "FULFILLED"
      state.data = action.payload
      state.errors = []
    })
    .addCase(getComments.rejected, (state: CommentState, action: any) => {
      state.loading = "REJECTED"
      state.errors = action.payload
      state.data = undefined
    })
  }

})

export const selectComments = (state: RootState) => state.comment.data

export const selectError = (state: RootState) => state.comment.errors

export default commentsSlice.reducer