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
    startTime:string;
    endTime:string;
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
    startTime:string;
    endTime:string;
}

export interface IEventError{
    title:string;
    description:string;
    startDate:string;
    endDate:string;
    location:string;
    maxAttendees:string;
    startTime:string;
    endTime:string;
}

export interface IAttendee {
  id: string;
  userType: "Student" | "Instructor" | "Guest" | string;
  registeredAt: string;          // ISO‑8601
  userId: {
    id: string;
    email: string;
    name: string;
  };
}