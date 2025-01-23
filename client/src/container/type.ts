export interface Register {
  email: string;
  password: string;
  name: string;
}

export interface Login {
  email: string;
  password: string;

}

export  interface User {
  userId: string;
  name: string;
  email: string;
  token: string;
  _id: string
}

export interface ApiResponse {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  token: string;
}

export interface Tasks  {
  userId: string;
  task: string;
  priority: string
  status: string
  date: string;
  _id?: string;
}

export interface Projects {
  userId: string;
  project: string;
  name: string
  owner: string
  date: string;
  _id?: string;
}

export interface columnTask {
  title: string;
  dataIndex: string;
  editable: boolean;
  render: (text: string) => JSX.Element;
}
