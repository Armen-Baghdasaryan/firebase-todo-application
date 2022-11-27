import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isUbdate: false,
  todos: [],
};

export const createTodo = createAsyncThunk(
  "todoSlice/createTodo",
  async (props, { rejectWithValue }) => {
    try {
      const res = await addDoc(collection(db, "todos"), {
        ...props,
      });
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getData = createAsyncThunk(
  "todoSlice/getData",
  async (_, { rejectWithValue }) => {
    let list = [];
    try {
      const querySnapshot = await getDocs(collection(db, "todos"));
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      return list;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const ubdateTodo = createAsyncThunk(
  "todoSlice/ubdateTodo",
  async (props, { rejectWithValue }) => {
    try {
      await setDoc(doc(db, "todos", props.id), {
        ...props.data,
      });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const ubdateCompleted = createAsyncThunk(
  "todoSlice/ubdateCompleted",
  async (props, { rejectWithValue }) => {
    try {
      await setDoc(doc(db, "todos", props.id), {
        ...props.data,
      });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const removeTodo = createAsyncThunk(
  "todoSlice/removeTodo",
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "todos", id));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create Todo
    builder.addCase(createTodo.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(createTodo.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      toast(action.payload.error || "Something Went Wrong");
    });

    // Get Data
    builder.addCase(getData.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.todos = action.payload;
    });
    builder.addCase(getData.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      toast(action.payload.error || "Something Went Wrong");
    });

    // Ubdate Todo
    builder.addCase(ubdateTodo.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(ubdateTodo.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isUbdate = !state.isUbdate;
      toast("Todo was ubdated");
    });
    builder.addCase(ubdateTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      toast(action.payload.error || "Something Went Wrong");
    });

    // Ubdate Completed
    builder.addCase(ubdateCompleted.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(ubdateCompleted.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isUbdate = !state.isUbdate;
    });
    builder.addCase(ubdateCompleted.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      toast(action.payload.error || "Something Went Wrong");
    });

    // Remove Todo
    builder.addCase(removeTodo.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(removeTodo.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isUbdate = !state.isUbdate;
      toast("Todo was deleted");
    });
    builder.addCase(removeTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      toast(action.payload.error || "Something Went Wrong");
    });
  },
});

export default todoSlice.reducer;
