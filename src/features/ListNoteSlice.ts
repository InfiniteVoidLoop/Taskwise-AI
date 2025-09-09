import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Note} from '../utils/interface'

const ListNoteSlice = createSlice({
    name: 'listNote',
    initialState: {
        list: []
    }, 
    reducers: {
        addListNote: (state, action: PayloadAction <Note>){
            state.list.push(action.payload)
        },
        deleteListNote: (state, action: PayloadAction <Note>){
            state.list.filter((data) => data != action.payload);
        }
    }
})

export const {addListNote, deleteListNote} = ListNoteSlice.actions;
export const listNoteSelector = (state) => state.listNote
export default ListNoteSlice.reducer;