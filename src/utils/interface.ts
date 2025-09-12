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
    dateMonth: Dayjs|null;  
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