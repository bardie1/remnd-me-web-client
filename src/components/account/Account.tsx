import * as React from 'react';
import { UserContext } from '../../context/userContext';
import "./Account.css";
import AccountPhoneItem from '../accountPhoneItem/AccountPhoneItem';
import PhoneService from "../../services/phone";
import { Phone } from '../../models/phone';
import { AxiosError, AxiosResponse } from 'axios';
interface IAccountProps {
}

const Account: React.FunctionComponent<IAccountProps> = (props) => {

    const userContext = React.useContext(UserContext);
    const [username, setUsername] = React.useState<string>(userContext.user.username);
    const [oldPassword, setOldPassword] = React.useState<string>('');
    const [newPassword, setNewPassword] = React.useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = React.useState<string>('');
    const [showUsernameEdit, setShowUsernameEdit] = React.useState<boolean>(true);
    const [showChangePasswordForm, setShowChangePasswordForm] = React.useState<boolean>(false);
    const [phoneNumbers, setPhoneNumbers] = React.useState<Phone[]>([]);

    React.useEffect(() => {

        PhoneService.getPhoneNumbers()
            .then((res: AxiosResponse<Phone[]>) => {
                setPhoneNumbers(res.data);
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            }) 

        return () => {

        }
    }, [])


    const createPhone = (phone: Phone): Promise<any> => {
        return new Promise((resolve, reject) => {
            PhoneService.createPhoneNumber(phone.phoneNumber || '')
                .then((res: AxiosResponse<Phone>) => {
                    
                    setPhoneNumbers([...phoneNumbers, res.data]);
                    resolve(true);
                })
                .catch((err: AxiosError) => {
                    reject(err);
                })
        }) 
    }

    const updatePhone = (phone: Phone): Promise<any> => {
        return new Promise((resolve, reject) => {
            PhoneService.updatePhoneNumber(phone)
                .then((res: AxiosResponse<Phone>) => {
                    let copiedArr: Phone[] = phoneNumbers.slice();
                    let index = copiedArr.findIndex(p => p.externalRef === res.data.externalRef);
                    if (index > -1){
                        copiedArr[index] = res.data;
                        setPhoneNumbers(copiedArr);
                    }
                    resolve(true);
                })
                .catch((err: AxiosError) => {
                    reject(err);
                })
        }) 
    }

    const updatePhoneState = (phone: Phone) => {
        let copiedArr: Phone[] = phoneNumbers.slice();
        let index = copiedArr.findIndex(p => p.externalRef === phone.externalRef);
        if (index > -1){
            copiedArr[index] = phone;
            setPhoneNumbers(copiedArr);
        }
    }

  return (
      <div id="account-container">
          <div id="account-info-container">
              <h2 id="account-info-header" className="section-header">Account Information</h2>
              <div id="account-info-data" className="section-data">
                <div id="account-username-holder">
                    <label htmlFor="account-username">Username:</label>
                    <span id="account-username">{username}</span>
                    {/* <input value={username} onChange={(e) => setUsername(e.target.value)} className="ghost" type="text"/> */}
                </div>
                <div id="account-password-holder">
                    {
                        showChangePasswordForm ? 
                            <form action="">
                                <div className="input-group-row">
                                    <label htmlFor="account-old-password">Old Password:</label>
                                    <input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Enter Old Password" className="ghost" type="password"/>
                                </div>
                                <div className="input-group-row">
                                    <label htmlFor="account-new-password">New Password:</label>
                                    <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter New Password" className="ghost" type="password"/>
                                </div>
                                <div className="input-group-row">
                                    <label htmlFor="account-confirm-password">Confirm New Password:</label>
                                    <input value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder="Confirm New Password" className="ghost" type="password"/>
                                </div>
                                <button id="cancel-change-password" onClick={() => setShowChangePasswordForm(false)}  className="ghost">Cancel</button>
                                <button id="process-change-password" className="filled">Change Password</button>
                            </form>
                            :
                            <button id="change-password" onClick={() => setShowChangePasswordForm(true)} className="filled black">Change Password</button>

                    }
                </div>
              </div>
          </div>

          <div id="account-phone-numbers-container">
              <h2 id="account-info-header" className="section-header">Phone Numbers</h2>
              <div id="phone-info-data" className="section-data">

                {
                    phoneNumbers.map((p, idx) => {
                        return (<AccountPhoneItem updatePhoneState={updatePhoneState} upsertPhone={updatePhone} newNumber={false} phone={p} identifier={p.externalRef || idx} key={p.externalRef} />)
                    })
                }
                <AccountPhoneItem upsertPhone={createPhone} newNumber={true} identifier={'new'} />

              </div>
          </div>
      </div>
  );
};

export default Account;
