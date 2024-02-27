export type Id = string | number ;

export type Column = {
  _id: Id;
  title: string;
};

export type Task = {
  // id: Id;
  // columnId: Id;
  // content?: string;
  // name?: string;
  // date?: string;
  // status?: string;
  // client?: string;
  // assigned_by?: string;
  // assigned_to?: string;

  _id: string;
  column_id: string | number;
  title?: string;
  due_date?: string;
  due_time?: string;
  agenda?: string;
  createdAt?: string;
  status?: string;
  client_name?: string;
  assigned_to_name?: string;
  assigned_by_name?: string;
  assigned_by_first_name?: string;
  assigned_by_last_name?: string;
};