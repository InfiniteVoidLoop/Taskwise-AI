import {Dayjs} from 'dayjs'

export interface Note{
    title: string,
    description: string, 
    timestamp: number,
    type: string, 
    marked: boolean
};
    
export interface ListNote{
    listNote: Note[],
    setListNote: (list: Note[]) => void,
    addListNote: (note: Note) => void,
    deleteListNote: (timestamp: number) => void;
    setNoteInList: (note: Note) => void;
};

export interface ModifyNotePos{
    x: number, 
    y: number
};

export interface VisibilityStore{
    visibility: boolean;
    setShow: () => void;
    setHide: () => void;
};

export interface CurrentNote{
    currentNote: Note | null,
    setNote: (note: Note) => void;
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    setType: (type: string) => void
};

export interface CacheNote{
    cacheNote: Note | null,
    setCache: (note: Note) => void
};

export interface DateMonth{     // get the chosen day
    dateMonth: Dayjs;  
    setDateMonth: (newDate: Dayjs) => void;
};

export interface UnfinishedTask{
    redDates: string[];
    pushUnfinishedDate: (date: Dayjs) => void;
    popUnfinishedDate: (date: Dayjs) => void;
};

export interface FinishedTask{
    greenDates: string[];
    pushFinishedDate: (date: Dayjs) => void;
    popFinishedDate: (date: Dayjs) => void;
};

export interface Progress{
    done: number;
    unDone: number;
    inc: (type: string) => void;
    dec: (type: string) => void;
    reset: () => void;
};

export interface ListTimestamp{
    listTimestamp: number[];
    pushTimestamp: (timestamp: number) => boolean;
    popTimestamp: (timestamp: number) => void;
};

export interface UserUID{
    userUID: string, 
    setUserUID: (UID: string ) => void;
};

export interface ChatBotResponse{
    response: string;
    isShow: boolean;
    setResponse: (newResponse: string) => void;
    setTrue: () => void;
    setFalse: () => void;
};

export interface ViewNote{
    typeView: number,
    setView: (type: number) => void,
};