import {create} from 'zustand'
import type{ListNote, Note, VisibilityStore, CurrentNote} from './utils/interface'

const useListNoteStore = create<ListNote>()((set) => ({
    listNote: [],
    setListNote: (List: Note[]) => set(() => ({listNote: [...List]})), 
    addListNote: (Note: Note) => set((state) => ({listNote: [...state.listNote, Note]}) ),
    deleteListNote: (timestamp: number) => set((state) => ({listNote: state.listNote.filter((note)=>note.timestamp !== timestamp)})) 
}));

const useVisibilityStore = create<VisibilityStore>()((set) => ({
    visibility: false,
    setShow: () => set(() => ({visibility: true})),
    setHide: () => set(() => ({visibility: false}))
}));

const useCurrentNoteStore = create<CurrentNote>()((set) => ({
    currentNote: null,
    setNote: (note: Note) => set(() => ({currentNote: note})),
    setTitle: (title: string) => set((state) => ({
        currentNote: state.currentNote ? {...state.currentNote, title} : null
    })),
    setDescription: (description: string) => set((state) => ({
        currentNote: state.currentNote ? {...state.currentNote, description} : null
    })),
}));

export {useListNoteStore, useVisibilityStore, useCurrentNoteStore};

