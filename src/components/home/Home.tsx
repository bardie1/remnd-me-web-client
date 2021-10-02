import * as React from 'react';
import "./Home.css";
import ReminderService from "../../services/reminder";
import { Reminder } from '../../models/reminder';
import { AxiosResponse } from 'axios';
interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {

    React.useEffect(() => {
        ReminderService.getReminders().then((res: AxiosResponse<Reminder[]>) => console.log(res)).catch((error: any) => console.log(error));
    })
  return (
      <div>Home</div>
  );
};

export default Home;

