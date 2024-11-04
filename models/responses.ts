interface ExamCenterID {
    _id: string;
  }
  
  export interface InvigilatorResponse {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    examCenterID: ExamCenterID;
    __v: number;
  }
  