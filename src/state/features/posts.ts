import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IPost, IPosts } from '../../interfaces';
import axios from 'axios';
export interface PostState {
  loading: "IDLE" | "PENDING" | "FULFILLED" | "REJECTED",
  data: IPosts | undefined,
  errors: string[]
}

const apiEndpoint = 'https://jsonplaceholder.typicode.com';

export const getPreviousPost = createAsyncThunk(
  'GET_PREV_POST',
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${apiEndpoint}/posts/${id}`);

      return data;
    }
    catch(e: any) {
      return rejectWithValue(e.response.data)
    }    
  }
)

export const switchPost = createAsyncThunk(
  'SWITCH_POSTS',
  async (data: IPost, { rejectWithValue }) => {
    try {
      return data;
    }
    catch(e: any) {
      return rejectWithValue(e.response.data)
    }    
  }
)

export const getPost = createAsyncThunk(
  'GET_POST',
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${apiEndpoint}/posts/${id}`);

      return data;
    }
    catch(e: any) {
      return rejectWithValue(e.response.data)
    }    
  }
)

export const getNextPost = createAsyncThunk(
  'GET_NEXT_POST',
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${apiEndpoint}/posts/${id}`);

      return data;
    }
    catch(e: any) {
      return rejectWithValue(e.response.data)
    }    
  }
)

const initialState: PostState = {
  loading: 'IDLE',
  data: {
    prev: undefined,
    current: undefined,
    next: undefined
  },
  errors: []
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // GET REDUCERS
    builder.addCase(getPost.pending, (state: PostState, _action) => {
      state.loading = "PENDING"
    })
    .addCase(getPost.fulfilled, (state: PostState, action: PayloadAction<IPost>) => {
      state.loading = "FULFILLED"
      state.data!.current = action.payload
      state.errors = []
    })
    .addCase(getPost.rejected, (state: PostState, action: any) => {
      state.loading = "REJECTED"
      state.errors = action.payload
      state.data = undefined
    })
    .addCase(getPreviousPost.fulfilled, (state: PostState, action: PayloadAction<IPost>) => {
      state.loading = "FULFILLED"
      state.data!.prev = action.payload
      state.errors = []
    })
    .addCase(getPreviousPost.rejected, (state: PostState, action: any) => {
      state.loading = "REJECTED"
      state.errors = action.payload
      state.data = undefined
    })
    .addCase(getNextPost.fulfilled, (state: PostState, action: PayloadAction<IPost>) => {
      state.loading = "FULFILLED"
      state.data!.next = action.payload
      state.errors = []
    })
    .addCase(getNextPost.rejected, (state: PostState, action: any) => {
      state.loading = "REJECTED"
      state.errors = action.payload
      state.data = undefined
    })
    .addCase(switchPost.fulfilled, (state: PostState, action: PayloadAction<IPost>) => {
      state.loading = "FULFILLED"
      state.data!.current = action.payload
      state.errors = []
    })
    .addCase(switchPost.rejected, (state: PostState, action: any) => {
      state.loading = "REJECTED"
      state.errors = action.payload
      state.data = undefined
    })
  }

})

export const selectPost = (state: RootState) => state.post.data

export const selectError = (state: RootState) => state.post.errors

export default postSlice.reducer