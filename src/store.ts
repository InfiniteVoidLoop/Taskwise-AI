import {create} from 'zustand'
import type{ListNote, Note} from './utils/interface'

const useListNoteStore = create<ListNote>()((set) => ({
    listNote: [],
    setListNote: (List: Note[]) => set(() => ({listNote: [...List]})), 
    addListNote: (Note: Note) => set((state) => ({listNote: [...state.listNote, Note]}) ),
}));

export {useListNoteStore};
