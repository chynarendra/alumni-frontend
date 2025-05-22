export interface IContact{
    _id:string;
    name:string;
    email:string;
    subject:string;
    message:string;
}

export interface IContactCreate{
    name:string;
    email:string;
    subject:string;
    message:string;
}

export interface IContactError{
    name:string;
    email:string;
    subject:string;
    message:string;
}