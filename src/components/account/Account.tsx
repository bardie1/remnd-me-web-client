import * as React from 'react';
import "./Account.css";
interface IAccountProps {
}

const Account: React.FunctionComponent<IAccountProps> = (props) => {
  return (
      <div id="account-container">
          <div id="account-info-container">
              <h2 id="account-info-header">Account Information</h2>
          </div>

          <div id="account-phone-numbers-container">
              <h2 id="account-info-header">Phone Numbers</h2>
          </div>
      </div>
  );
};

export default Account;
