import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin: false,
    fees: [],
    attendance: [],
    event: [],
    exam: [],
    students: [],
    notice: []
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminlogin: (state) => {
            state.admin = true;
        },
        adminlogout: (state) => {
            state.admin = false;
        },
        addfees: (state, action) => {
            state.fees = action.payload
        },
        addstudents: (state, action) => {
            state.students.push(action.payload)
        },
        addattendance: (state, action) => {
            state.attendance.push(action.payload);
        },
        addevent: (state, action) => {
            state.event.push(action.payload)
        },
        addexam: (state, action) => {
            state.exam.push(action.payload)
        },
        addnotice: (state, action) => {
            state.notice.push(action.payload)
        }
    }
})

export const { addfees, addattendance, addevent, addexam, adminlogin, adminlogout, addstudents, addnotice } = adminSlice.actions;
export default adminSlice.reducer;