export interface IJob{
    _id:string;
    title:string;
    description:string;
    company:string;
    location:string;
    jobType:string;
    salary:string;
    applicationDeadline:string;
}

export interface IJobCreate{
    title:string;
    description:string;
    company:string;
    location:string;
    jobType:string;
    salary:string;
    applicationDeadline:string;
}

export interface IJobError{
    title:string;
    description:string;
    company:string;
    location:string;
    jobType:string;
    applicationDeadline:string;
}