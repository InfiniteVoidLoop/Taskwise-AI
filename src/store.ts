import { create } from 'zustand'
import type {ChatBotResponse, UserUID, ListTimestamp, Progress, ListNote, Note, VisibilityStore, CurrentNote, CacheNote, DateMonth, FinishedTask, UnfinishedTask } from './utils/interface'
import dayjs, { Dayjs } from 'dayjs'

const useListNoteStore = create<ListNote>()((set) => ({
    listNote: [],
    setListNote: (List: Note[]) => set(() => ({ listNote: [...List] })),
    addListNote: (Note: Note) => set((state) => ({ listNote: [...state.listNote, Note] })),
    deleteListNote: (timestamp: number) => set((state) => ({ listNote: state.listNote.filter((note) => note.timestamp !== timestamp) })),
    setNoteInList: (note: Note) => set((state) => {
        for (let i = 0; i < state.listNote.length; i++) {
            if (state.listNote[i].timestamp === note.timestamp) {
                state.listNote[i] = note;
            }
        }
        return { listNote: state.listNote };
    })
}));

const useVisibilityStore = create<VisibilityStore>()((set) => ({
    visibility: false,
    setShow: () => set(() => ({ visibility: true })),
    setHide: () => set(() => ({ visibility: false }))
}));

const useCurrentNoteStore = create<CurrentNote>()((set) => ({
    currentNote: null,
    setNote: (note: Note) => set(() => ({ currentNote: note })),
    setTitle: (title: string) => set((state) => ({
        currentNote: state.currentNote ? { ...state.currentNote, title } : null
    })),
    setDescription: (description: string) => set((state) => ({
        currentNote: state.currentNote ? { ...state.currentNote, description } : null
    })),
    setType: (type: string) => set((state) => ({
        currentNote: state.currentNote ? { ...state.currentNote, type } : null
    }))
}));

const useCacheNoteStore = create<CacheNote>()((set) => ({
    cacheNote: null,
    setCache: (note: Note) => set(() => ({ cacheNote: note })),
}));

const useDateMonthStore = create<DateMonth>()((set) => ({
    dateMonth: dayjs(),
    setDateMonth: (newDate: Dayjs) => set(() => ({
        dateMonth: newDate
    }))
}));

const useRedDateStore = create<UnfinishedTask>()((set) => ({
  redDates: [],
  pushUnfinishedDate: (date: Dayjs) =>
    set((state) => {
      const formatted = date.format("YYYY-MM-DD");
      return state.redDates.includes(formatted)
        ? state
        : { redDates: [...state.redDates, formatted] };
    }),
  popUnfinishedDate: (date: Dayjs) =>
    set((state) => ({
      redDates: state.redDates.filter(
        (dateString) => dateString !== date.format("YYYY-MM-DD")
      ),
    })),
}));

const useGreenDateStore = create<FinishedTask>()((set) => ({
  greenDates: [],
  pushFinishedDate: (date: Dayjs) =>
    set((state) => {
      const formatted = date.format("YYYY-MM-DD");
      return state.greenDates.includes(formatted)
        ? state
        : { greenDates: [...state.greenDates, formatted] };
    }),
  popFinishedDate: (date: Dayjs) =>
    set((state) => ({
      greenDates: state.greenDates.filter(
        (dateString) => dateString !== date.format("YYYY-MM-DD")
      ),
    })),
}));

const useProgressStore = create<Progress>()((set) => ({
    done: 0,
    unDone: 0,
    inc: (type) =>
        set((state) => {
            if (type === "done") {
                return { ...state, done: state.done + 1 };
            } else if (type === "unDone") {
                return { ...state, unDone: state.unDone + 1 };
            }
            return state; 
        }),
    dec: (type) =>
        set((state) => {
            if (type === "done") {
                return { ...state, done: state.done - 1 };
            } else if (type === "unDone") {
                return { ...state, unDone: state.unDone - 1 };
            }
            return state;
        }),
    reset: () => 
        set(()=>({
            done: 0,
            unDone: 0
        }))
}));

const useListTimestamp = create<ListTimestamp>()((set) => ({
    listTimestamp: [], 
    pushTimestamp: (timestamp: number) => 
    {
        let result = true;
        set((state) => {
            result = state.listTimestamp.includes(timestamp);
            if (result) 
                return {listTimestamp: [...state.listTimestamp]};
            else 
                return {listTimestamp: [...state.listTimestamp, timestamp]}
        })
        return result;
    },
    popTimestamp: (timestamp: number) => 
        set((state) => ({
            listTimestamp: state.listTimestamp.filter((time) => timestamp !== time)
        }))
}))

const useUserUIDStore = create<UserUID>()((set) => ({
    userUID: '',
    setUserUID: (UID: string) => 
        set(() => ({userUID: UID}))
}));

const useChatBotResponseStore = create<ChatBotResponse>((set) => ({
    response: '',
    isShow: false,
    setResponse: (newResponse: string) => set({ response: newResponse }),
    setTrue: () => set(() => ({isShow: true})),
    setFalse: () => set(() => ({isShow: false})),
}));

export {useChatBotResponseStore, useUserUIDStore, useListTimestamp, useProgressStore, useListNoteStore, useVisibilityStore, useCurrentNoteStore, useCacheNoteStore, useDateMonthStore, useRedDateStore, useGreenDateStore };
