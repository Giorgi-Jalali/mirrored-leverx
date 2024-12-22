export interface IManager {
    id: string;
    first_name: string;
    last_name: string;
  }

  interface IVisa {
    type: string;
    issuing_country: string;
    start_date: number;
    end_date: number;
  }

  export type TViewProps = {
    employees: IEmployee[];
    searchQuery: string;
  };
  
  export interface IEmployee {
    id: string;
    password: string;
    passwordHash: string;
    role: string;
    first_name: string;
    last_name: string;
    user_avatar: string;
    first_native_name: string;
    last_native_name: string;
    middle_native_name: string;
    department: string;
    building: string;
    room: string;
    desk_number: string;
    date_birth: { day: number; month: number; year: number };
    manager: IManager;
    phone: string;
    email: string;
    skype: string;
    cnumber: string;
    citizenship: string;
    visa?: IVisa[];
  }
  