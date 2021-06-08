import { LIFECYCLE_STAGE } from "src/types/lifecycleStage.type";

export interface ProjectDesc {
    name: string;
    desc: string;
    startTime: string;
    endTime?: string;
    lifecycleStage: LIFECYCLE_STAGE;
    gitHub?:string;
    site:string;
}