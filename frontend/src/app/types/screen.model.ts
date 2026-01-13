export interface Screen {
  id: string;

  entity?: string;

  screen: {
    type: 'form' | 'list' | 'detail';
    mode?: 'create' | 'edit' | 'view';
  };

  api?: {
    operationId: string;
    endpoint: string;
    method: string;
  };

  layout?: {
    type: 'single' | 'tabs';
  };

  fields?: any[];
  actions?: any;
}
