export enum JobType {
  FullTime = 'full-time',
  PartTime = 'part-time',
  Contract = 'contract',
  Internship = 'internship',
}

export const jobTypeFormatter=(typeName:string)=>{
  if(typeName=='full-time'){
    return "Full time";
  }else if(typeName=='part-time'){
    return "Part time";
  } else if(typeName=="contract"){
    return "Contract"
  }else{
    return "Internship"
  }
}