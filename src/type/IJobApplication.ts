
export interface IJobApplicant{
    _id:string;
    name:string;
}
export interface IJobApplication{
    applicant:IJobApplicant;
    resume:string;
    applicationDate:string;
    status:string
}

