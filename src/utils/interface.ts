export interface Note{
    title: string,
    description: string, 
    timestamp: number, 
};
    
export interface ListNote{
    listNote: Note[]
};

export interface GetKey{
    user: string,
    timestamp: string
}

