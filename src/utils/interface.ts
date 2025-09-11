export interface Note{
    title: string,
    description: string, 
    timestamp: number, 
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
    setDescription: (title: string) => void;
};

export interface CacheNote{
    cachNote: Note,
    setCache: (note: Note) => void
};