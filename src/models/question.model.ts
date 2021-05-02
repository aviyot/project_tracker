
export interface Question {
  question: string;
  questionTime: string;
  answer: {
    answered: boolean;
    answer: string;
    answerTime: string;
    findBy: string;
    link: string;
    links: {
      title: string;
      link: string;
    }[];
  };
}
