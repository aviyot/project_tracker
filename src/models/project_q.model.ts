import {Question} from "./question.model"
import { LIFECYCLE_STAGE } from '../types/lifecycleStage.type';


interface projectQ extends Question {
    project_id:string;
    lifecycle_stage:LIFECYCLE_STAGE;
}
