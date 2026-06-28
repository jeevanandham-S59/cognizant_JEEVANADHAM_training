import { createSlice } from "@reduxjs/toolkit";

const initialState={
    enrolledCourses:[]
};

const courseSlice=createSlice({

    name:"courses",

    initialState,

    reducers:{

        enroll(state,action){

            state.enrolledCourses.push(action.payload);

        },

        remove(state,action){

            state.enrolledCourses=

            state.enrolledCourses.filter(

                course=>course.id!==action.payload

            );

        }

    }

});

export const {enroll,remove}=courseSlice.actions;

export default courseSlice.reducer;