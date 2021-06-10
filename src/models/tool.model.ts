import { ToolType } from "src/types/toolType.type";

export interface Tool {
    name:string;
    desc?:string;
    purpose?:string;
    ver:string;
    githubLink?:string;
    webSite?:string;
    npmLink?:string;
    type?:ToolType;
}