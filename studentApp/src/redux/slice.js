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
            // console.log("state", state.fees);
        },
        addstudents: (state, action) => {
            console.log("action_students ", action.payload);
            state.students.push(action.payload)
        },
        addattendance: (state, action) => {
            state.attendance.push(action.payload);
            console.log("state", state.attendance);
        },
        addevent: (state, action) => {
            console.log("action", action.payload);
            state.event.push(action.payload)
            console.log("state", state.event);
        },
        addexam: (state, action) => {
            console.log("action", action.payload);
            state.exam.push(action.payload)
            console.log("state", state.exam);
        },
        addnotice: (state, action) => {
            console.log("action", action.payload);
            state.notice.push(action.payload)
            console.log("state", state.notice);
        }
    }
})

export const { addfees, addattendance, addevent, addexam, adminlogin, adminlogout, addstudents, addnotice } = adminSlice.actions;
export default adminSlice.reducer;