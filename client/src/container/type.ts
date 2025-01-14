export interface Register {
  email: string;
  password: string;
  name: string;
  _id: string;

}

export interface Login {
  email: string;
  password: string;
  name: string;
  _id: string;

}

export  interface User {
  userId: string;
  name: string;
  email: string;
  token: string;
}

export interface UserId extends Omit<User, "email" | "password" | "_id"> {
  userId: string;
}

export interface ApiResponse {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  token: string;
}

export interface DataTypeTask {
  key: string;
  task: string;
  priority: string;
  status: string;
  date: string;
}
export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: DataTypeTask;
  index: number;
}