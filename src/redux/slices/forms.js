import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  kycForms: {
    form1: null,
    form2: null,
    form3: null,
    form4: null,
    currentForm: null,
    submitForm: null,
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData(state, action) {
      const { formId, data } = action.payload;
      if (formId !== undefined) {
        if (!state.kycForms[`form${formId}`]) {
          state.kycForms[`form${formId}`] = data;
        } else {
          state.kycForms[`form${formId}`] = {
            ...state.kycForms[`form${formId}`],
            ...data,
          };
        }
        console.log(
          `Data Stored in Form ${formId}:`,
          state.kycForms[`form${formId}`]
        );
      } else {
        console.warn("Form ID is not provided!");
      }
    },

    setCurrentForm(state, action) {
      state.kycForms.currentForm = action.payload;
    },

    setSubmitForm(state, action) {
      state.kycForms.submitForm = action.payload;
    },

    clearFormData(state) {
      state.kycForms.form1 = null;
      state.kycForms.form2 = null;
      state.kycForms.form3 = null;
      state.kycForms.form4 = null;
      state.kycForms.currentForm = null;
      state.kycForms.submitForm = null;
    },
    clearSpecificForm(state, action) {
      const { formId } = action.payload;
      if (
        formId !== undefined &&
        state.kycForms[`form${formId}`] !== undefined
      ) {
        state.kycForms[`form${formId}`] = null;
        console.log(`Form ${formId} has been set to null.`);
      } else {
        console.error(`Invalid formId or formId not found.`);
      }
    },

  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchFormDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchFormDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchFormDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setFormData,
  setCurrentForm,
  clearFormData,
  setSubmitForm,
  clearSpecificForm,
} = formSlice.actions;

export default formSlice.reducer;

export const saveFormData =
  ({ formId, data }) =>
  async (dispatch) => {
    try {
      if (formId) {
        dispatch(setFormData({ formId, data }));
      } else {
        console.error("No formId provided to save form data!");
      }
    } catch (error) {
      console.error("Failed to save form data:", error);
    }
  };
export const currentForm = (formId) => async (dispatch) => {
  try {
    if (formId) {
      dispatch(setCurrentForm(formId));
     
    } else {
      console.error("No formId provided to set current status!");
    }
  } catch (error) {
    console.error("Failed to set current form status:", error);
  }
};

export const resetFormState = () => async (dispatch) => {
  try {
    dispatch(clearFormData(null));
  } catch (error) {
    console.error("Failed to reset form state:", error);
  }
};

export const resetSpecificForm = (formId) => async (dispatch) => {
  try {
    if (formId) {
      dispatch(clearSpecificForm({ formId }));
      console.log(`Form ${formId} has been reset to null in Redux state.`);
    } else {
      console.error("No formId provided to reset the form.");
    }
  } catch (error) {
    console.error("Failed to reset the form:", error);
  }
};

export const dataTransmit = (userId) => async (dispatch, getState) => {
  try {
    dispatch(setSubmitForm(true));

    const state = getState();
    const forms = state.forms.kycForms;

    if (forms) {
      const response = await axios.get("http://localhost:3000/users");
      const users = response.data;
      const user = users.find((user) => user.id == userId);

      if (user) {
        const usersId = user.id;

        // Generate a unique key
        let randomDigit = 1011;
        let applicationKey = `APP${randomDigit}`;
        const userKeys = Object.keys(user).filter((key) =>
          key.startsWith("APP")
        );

        // Find the highest existing APP key and increment it
        if (userKeys.length > 0) {
          let applicationKey = userKeys[0];
          const highestKey = Math.max(
            ...userKeys.map((key) => Number(key.slice(3), 10)) // Extract number part and convert to integer
          );
          randomDigit = highestKey + 1;
          applicationKey = `APP${randomDigit}`;
        }
        console.log("kyckey", applicationKey);

        const newUser = {
          ...user,
          [applicationKey]: { ...forms },
        };
        console.log("kyckey", newUser);

        // Send POST request to save the new data
        const postResponse = await axios.put(
          `http://localhost:3000/users/${usersId}`,
          newUser
        );

        console.log("New user data created successfully:", postResponse.data);
        dispatch(clearFormData());

        console.log(
          `All form data exported under key ${applicationKey} successfully!`
        );
      } else {
        console.error(`User with ID ${userId} not found.`);
      }
    } else {
      console.error("No form data found in the state.");
    }
  } catch (error) {
    console.error("Failed to export form data:", error);
  }
};

export const clearAllFormData = (userId, key) => async () => {
  try {
    console.log("Cleared form data from Redux state.");

    const response = await axios.get(
      `http://localhost:3000/users?id=${userId}`
    );
    const user = response.data[0];

    if (user) {
      delete user[key];
      console.log("Updated User (kycForms removed):", user);

      await axios.put(`http://localhost:3000/users/${userId}`, user);
      console.log("kycForms deleted successfully on server.");
    } else {
      console.error("User not found.");
    }
  } catch (error) {
    console.error("Failed to clear form data:", error);
  }
};

export const editKycForm = () => async (dispatch) => {
  try {
    dispatch(setSubmitForm(null));
    console.log("Submit form reset to null.");
  } catch (error) {
    console.error("Failed to reset submit form:", error);
  }
};

export const fetchFormDetails = createAsyncThunk(
  "form/fetchFormDetails",
  async ({ userId, key }, { dispatch, rejectWithValue }) => {
    try {
      console.log("as", userId, key);

      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      const user = response.data;
      console.log("edit", user);
      const formData = user[key];
      if (formData) {
        Object.keys(formData).forEach((formId) => {
          const data = formData[formId];
          dispatch(setFormData({ formId: formId.slice(4), data }));
        });

        dispatch(setCurrentForm(key));

        console.log("Form data dispatched successfully:", formData);
      } else {
        console.error("Form data not found for the provided key");
      }

      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
