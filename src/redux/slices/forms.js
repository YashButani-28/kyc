import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = {
  kycForms: {
    form1: null,
    form2: null,
    form3: null,
    form4: null,
    currentForm: null, 
    submitForm: null, // Tracks the current form dynamically
    // Tracks the current form dynamically
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // Sets data for the specified form dynamically
    setFormData(state, action) {
        const { formId, data } = action.payload; 
        if (formId !== undefined) {
          // Only update the specific form, do not modify others
          if (!state.kycForms[`form${formId}`]) {
            state.kycForms[`form${formId}`] = data;
          } else {
            // Optionally, you could merge with existing data if needed
            state.kycForms[`form${formId}`] = { ...state.kycForms[`form${formId}`], ...data };
          }
          console.log(`Data Stored in Form ${formId}:`, state.kycForms[`form${formId}`]);
        } else {
          console.warn("Form ID is not provided!");
        }
    },
    // Updates the current form
    setCurrentForm(state, action) {
      state.kycForms.currentForm = action.payload;
    },

    setSubmitForm(state, action) {
      state.kycForms.submitForm = action.payload;
    },
    // Clears all form data
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
      if (formId !== undefined && state.kycForms[`form${formId}`] !== undefined) {
        state.kycForms[`form${formId}`] = null;
        console.log(`Form ${formId} has been set to null.`);
      } else {
        console.error(`Invalid formId or formId not found.`);
      }
    },

    extraReducers: (builder) => {
      builder
        // When the fetchFormDetails is pending (request is being made)
        .addCase(fetchFormDetails.pending, (state) => {
          state.isLoading = true;
          state.error = null; // Reset error when starting new request
        })
        // When the fetchFormDetails is fulfilled (successful request)
        .addCase(fetchFormDetails.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error = null; // Reset error after successful request
        })
        // When the fetchFormDetails fails (request failed)
        .addCase(fetchFormDetails.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload; // Store the error message from the rejected case
        });
    },
  },
});

export const { setFormData, setCurrentForm, clearFormData,setSubmitForm, clearSpecificForm } = formSlice.actions;

export default formSlice.reducer;

// Thunk to store data in the current form
export const saveFormData = ({ formId, data }) => async (dispatch, getState) => {
    try {
        if (formId) {
          dispatch(setFormData({ formId, data }));
           // Pass formId and data to the reducer
           // Pass formId and data to the reducer
        } else {
          console.error("No formId provided to save form data!");
        }
      } catch (error) {
        console.error("Failed to save form data:", error);
      }
};
export const currentForm=(formId)=>async(dispatch,getState)=>{

  try { 
   
    if (formId) {
      dispatch(setCurrentForm(formId));
      const state = getState();
      const forms = state.forms.kycForms;
      console.log(forms.currentForm);
      
  } else {
    console.error("No formId provided to set current status!");
  }

  } catch (error) {
    console.error("Failed to set current form status:", error);
  }
}


export const resetFormState=()=>async(dispatch)=>{
  try {       
      dispatch(clearFormData(null));
  }
   catch (error) {
    console.error("Failed to reset form state:", error);
  }
}

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

    // Get the current state from the store
    const state = getState();
    const forms = state.forms.kycForms;

    if (forms) {
      // Fetch users from the server to find the matching userId
      const response = await axios.get("http://localhost:3000/users");
      const users = response.data;
      

      // Find the user object with the matching userId
      const user = users.find((user) => user.id == userId);

      if (user) {
const usersId=user.id
        
        // Generate a unique key starting with "APP1011"
        let randomDigit = 1011; // Starting point
        let applicationKey = `APP${randomDigit}`;
        const userKeys = Object.keys(user).filter((key) => key.startsWith("APP"));
        

        // Find the highest existing APP key and increment it
        if (userKeys.length > 0) {
           const applicationKey = userKeys[0];
          const highestKey = Math.max(
            ...userKeys.map((key) => Number(key.slice(3), 10)) // Extract number part and convert to integer
          );
          randomDigit = highestKey + 1;
          applicationKey = `APP${randomDigit}`;
          
        }
        console.log("kyckey",applicationKey);

        // Create a new user object with the new key
        const newUser = {
          ...user,
          [applicationKey]: { ...forms }, // Add forms data under the new unique key
        };
        console.log("kyckey",newUser);


        // Send POST request to save the new data
        const postResponse = await axios.put(`http://localhost:3000/users/${usersId}`, newUser);

        console.log("New user data created successfully:", postResponse.data);
    dispatch(clearFormData());

        console.log(`All form data exported under key ${applicationKey} successfully!`);
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


export const clearAllFormData = (userId,key) => async () => {
  try {
    // Clear Redux state
    // dispatch(clearFormData());
    console.log("Cleared form data from Redux state.");

    // Fetch the user data
    const response = await axios.get(`http://localhost:3000/users?id=${userId}`);
    const user = response.data[0]; // Access the first user object
    console.log(user);
    console.log(typeof key);
    
    
console.log(user);

    if (user) {
      // Remove the kycForms field locally
      console.log("sasassasa",user[key]);
      
      delete user[key];
      console.log("Updated User (kycForms removed):", user);

      // Update the user object on the server
      await axios.put(`http://localhost:3000/users/${userId}`, user);
      console.log("kycForms deleted successfully on server.");
      // window.location.reload();
    } else {
      console.error("User not found.");
    }
  } catch (error) {
    console.error("Failed to clear form data:", error);
  }
};




export const editKycForm = () => async (dispatch) => {
  try {
    // Dispatch action to set the submit form state to null
    dispatch(setSubmitForm(null));
    console.log("Submit form reset to null.");
  } catch (error) {
    console.error("Failed to reset submit form:", error);
  }
};

export const fetchFormDetails = createAsyncThunk(
  "form/fetchFormDetails",
  async ({userId,key}, { dispatch, rejectWithValue }) => {
    try {
      console.log("as",userId,key);
      
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      const user = response.data; 
      console.log("edit",user);
      const formData=user[key]
      if (formData) {
        // Dispatch data for all forms dynamically
        Object.keys(formData).forEach((formId) => {
          // For each form (form1, form2, etc.), dispatch the data dynamically
          const data = formData[formId];
          dispatch(setFormData({ formId: formId.slice(4), data })); // formId is like 'form1', 'form2', etc.
        });

        // Optionally set the current form if needed
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

