import * as React from 'react';
import "./Home.css";
import ReminderService from "../../services/reminder";
import { Reminder } from '../../models/reminder';
import { AxiosResponse } from 'axios';
import ReminderItem from '../reminderItem/ReminderItem';
interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {

    const [reminders, setReminders] = React.useState<Reminder[]>([]);

    React.useEffect(() => {
        ReminderService.getReminders().then((res: AxiosResponse<Reminder[]>) => setReminders(res.data)).catch((error: any) => console.log(error));
        return () => {

        }
    },[]);
  return (
      <div>
          {
              reminders.map(r => {
                  return <ReminderItem key={r.externalRef} />
              })
          }
      </div>
  );
};

export default Home;

