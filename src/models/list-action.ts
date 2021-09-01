import { ProjectSection } from 'src/types/project-sections.type';

export interface ListAction {
  action: 'ADD_ITEM' | 'VIEW_ITEMS' | 'VIEW_ITEM' | 'CLOSE_ITEM';
  item?: number;
  section?: ProjectSection;
  closeList?: boolean;
}
