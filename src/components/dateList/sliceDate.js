import { createSlice, createEntityAdapter} from "@reduxjs/toolkit";

const dateAdapter = createEntityAdapter();

const initialState = dateAdapter.getInitialState({
    startDate: new Date(),
    showModal: false,
    objDate: {}
});

const personSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        dateChanged: (state, action) => { state.startDate = action.payload; },
        setShow: (state, action) => {state.showModal = action.payload},
        updateObjDate: (state,action) => {state.objDate.date = action.payload}
    }
});

const { actions, reducer } = personSlice;

export default reducer;

export const {
    dateChanged,
    setShow,
    updateObjDate
} = actions;