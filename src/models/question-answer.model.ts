export interface QuestionAnswer{
  question: string;
  featureId?:string;
  lifecycleStageId?:string;
  questionTime?: string;
  answered?: boolean;
  answer?: string;
  answerTime?: string;
  answerLinks?:{
    from: string;
    link: string;
    prefer: boolean;
  }[];
}
