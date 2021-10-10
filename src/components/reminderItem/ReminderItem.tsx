import * as React from 'react';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import "./ReminderItem.css";
interface IReminderItemProps {
}

const ReminderItem: React.FunctionComponent<IReminderItemProps> = (props) => {
  return (
      <div className="reminder-item-container">
          <div className="reminder-item-data-holder">
            <div className="reminder-item-top-row">
                <p className="reminder-item-title">Title</p>
                <p><span><AccessTimeFilledRoundedIcon /></span>22 August 2020 09:00</p>
                <p><span><SendRoundedIcon /></span>Sent</p>
            </div>
            <div className="reminder-item-view-details">View Details <span><ChevronRightRoundedIcon /></span></div>
            <div className="reminder-item-action-holder">
                <EditIcon />
                <DeleteIcon />
            </div>
          </div>
      </div>
  ) ;
};

export default ReminderItem;
