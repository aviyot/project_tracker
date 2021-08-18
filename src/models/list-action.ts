export interface ListAction {
  action: 'ADD_ITEM' | 'VIEW_ITEMS' | 'VIEW_ITEM';
  item?: number;
  closeList?: boolean;
}
