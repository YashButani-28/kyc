import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  isLoading: false, // loading state
  registrationData: [], // store register information
  user: null, // store user info. like email,pass
  isAuthenticated: false, // check user is login
  error: null, // give an error
};

export const fetchUsers = createAsyncThunk(
  "auth/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3000/users");

      return await response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.error = null;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    registerSuccess(state, action) {
      state.registrationData = [...state.registrationData, action.payload];
      // console.log("New user added:", action.payload);
      state.isLoading = false;
    },

    login(state, action) {
      (state.isAuthenticated = true), (state.user = action.payload);
      state.isLoading = false;
    },

    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
    },

    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        (state.isLoading = false), (state.registrationData = action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.payload);
      });
  },
});

// Reducer
export default authSlice.reducer;

// Actions
export const {
  login,
  logout,
  registerSuccess,
  hasError,
  startLoading,
  clearError,
} = authSlice.actions;

export const fetchData = () => async (dispatch) => {
  // dispatch(startLoading());
  try {
    const response = await axios.get("/users");
    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(hasError("Failed to register user. Please try again!"));
  }
};

export const sendUserData = (data) => async (dispatch) => {
  try {
    dispatch(login(data));
  } catch (error) {
    dispatch(hasError("Failed to receive user data. Please try again!"));
  }
};
