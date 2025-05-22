export interface INews{
    _id:string;
    title:string;
    content:string;
    imageUrl: string   
}

export interface INewsCreate{
    title:string;
    content:string;
    image: File | null,
    summary:string   
}

export interface INewsError{
    title:string;
    content:string;
}