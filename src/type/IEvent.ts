export interface IEvent{
    _id:string;
    title:string;
    description:string;
    startDate:string;
    endDate:string;
    location:string;
    isVirtual:boolean;
    meetingLink:string;
    maxAttendees:number;
    imageUrl:string;
}

export interface IEventCreate{
    title:string;
    description:string;
    startDate:string;
    endDate:string;
    location:string;
    isVirtual:boolean;
    meetingLink:string;
    maxAttendees:number;
    imageUrl:File | null;
}

export interface IEventError{
    title:string;
    description:string;
    startDate:string;
    endDate:string;
    location:string;
    maxAttendees:string;
}