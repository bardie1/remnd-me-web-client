import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import PhoneService from "../../services/phone";

import "./AccountPhoneItem.css";
import { Phone } from '../../models/phone';
import { AxiosError, AxiosResponse } from 'axios';
import Modal from '../shared/modal/Modal';
interface IAccountPhoneItemProps {
  //optional for now...
  phone?: Phone;
  identifier: string | number;
  newNumber: boolean;
  upsertPhone?: Function;
  updatePhoneState?: Function;
}

const AccountPhoneItem: React.FunctionComponent<IAccountPhoneItemProps> = (props) => {

  const [initialPhoneNumber, setInitialPhoneNumber] = React.useState<string | undefined>(props.phone?.phoneNumber as string);
  const [phoneNumber, setPhoneNumber] = React.useState<string | undefined>(props.phone?.phoneNumber as string);
  const [showPhoneEdit,setShowPhoneEdit] = React.useState<boolean>(true);
  const [showEnterKey, setShowEnterKey] = React.useState<boolean>(false);
  const [maskedPhoneNumber, setMaskedPhoneNumber] = React.useState<string>('');
  const [phone, setPhone] = React.useState<Phone | undefined>(props.phone);
  const [awaitingCode, setAwaitingCode] = React.useState<boolean>(false);
  const [verificationCode, setVerificationCode] = React.useState<string>('');
  const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMaskedPhoneNumber(phoneSpacingMask(initialPhoneNumber || ''));
    return () => {

    }
  }, [initialPhoneNumber, props.identifier]);


  React.useEffect(() => {
    if (phoneNumber === initialPhoneNumber) {
      setShowEnterKey(false)
    } else {
      setShowEnterKey(true)
    }

    return () => {

    }
  }, [phoneNumber, initialPhoneNumber])

  const verifyCode = React.useCallback(() => {
    if (phone) {
      PhoneService.verifyCode(phone, verificationCode)
        .then((res: AxiosResponse<any>) => {
          if (res.data.verified === false) {
            console.log("INCORRECT PIN");
          } else {
            if (props.updatePhoneState) {
              setAwaitingCode(false);
              setPhone(res.data);
              props.updatePhoneState(res.data);
            }
          }
        })
        .catch((err: AxiosError) => console.log(err));
    }
  },[phone, verificationCode, props])

  React.useEffect(() => {
    if (verificationCode.length === 6) {
      verifyCode();
    }
  }, [verificationCode, verifyCode])

  const focusOnInput = (inputId: string) => {
    let i = document.getElementById(inputId);
    i?.focus();
}
  const blurInput = (inputId: string) => {
    let i = document.getElementById(inputId);
    i?.blur();
}

const phoneSpacingMask =(phone: string): string =>  {
  let finalText: string = phone;
  if (phone?.length > 2) {
    finalText = finalText.slice(0,2) + " " + finalText.slice(2);
  }

  if (finalText?.length > 6) {
    finalText = finalText.slice(0,6) + " " + finalText.slice(6);
  }

  if (finalText.length > 10) {
    finalText = finalText.slice(0,10) + " " + finalText.slice(10);
  }

  return finalText;
}

const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  let text = e.target.value;
  let newText: string = '';
  if (text) {
    newText = text.replaceAll(/\D/g, "");
  }
  let finalText: string = newText;
  if (newText?.length > 11) {
    finalText = newText.slice(0, newText.length - 1);
  }

  let maskedText = phoneSpacingMask(finalText);

  setMaskedPhoneNumber(maskedText);
  setPhoneNumber((finalText) ? finalText : '');
}

const sendVerificationCode = () => {
  setAwaitingCode(true);
  if (phone) {
    PhoneService.sendVerificationCode(phone)
  }
}


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  let phoneToUpdate = {...phone};
  phoneToUpdate.phoneNumber = phoneNumber;
  if (props.upsertPhone) {
    try {
      await props.upsertPhone(phoneToUpdate);
      if (props.newNumber) {
        setPhoneNumber('');
        setInitialPhoneNumber('');
        blurInput(`account-phone-${props.identifier}`);
      } else {
        blurInput(`account-phone-${props.identifier}`);
      }
    } catch (err) {
      console.log(err)
    }
  }
}

const onModalClosed = () => {
  setDeleteModalOpen(false);
}

const onModalAction = () => {
  console.log('action');
}

  return (
      <div id={`account-phone-item-${props.identifier}`} className="account-phone-item">
        <form onSubmit={handleSubmit}>
          <div className="account-phone-input-holder">
          {((phoneNumber !== '' && phoneNumber) || !showPhoneEdit) && <span>+</span>} <input id={`account-phone-${props.identifier}`} type="text" placeholder="Enter Phone Number" onFocus={() => setShowPhoneEdit(false)} onBlur={(e) => setShowPhoneEdit(true)} className={`ghost num ${(!phoneNumber || phoneNumber === '') ? 'empty' : ''}`} value={maskedPhoneNumber} onChange={(e) => handleInput(e)}/>
          { showPhoneEdit && <span className="edit-button" onClick={() => focusOnInput(`account-phone-${props.identifier}`)}><EditIcon style={{ color: "606060", fontSize: '18px', paddingLeft: "5px"}} /></span>}
          {(!showPhoneEdit && phoneNumber?.length === 11 && showEnterKey) && <span style={{marginLeft: '20px', color: 'grey'}}>Hit <kbd>Enter ↵</kbd> {(props.newNumber) ? 'to add number' : 'to save changes'}</span>}
          {(showPhoneEdit && showEnterKey) && <div style={{marginLeft: '20px', color: 'orange', display: 'flex', alignItems: 'center'}}><WarningRoundedIcon style={{color: 'orange', marginRight: '5px', marginTop: '-2px'}} /> <p>Unsaved changes</p></div>}
          </div>
        </form>

    {
      !props.newNumber &&
         <>
          {
            awaitingCode && 
            <div className="input-group verification-code-input-holder">
              <input type="text" placeholder="Enter Verification Code" className="verification-code-input" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)}/>
            </div>

          }
            <div className="action-holder">

              {
                phone?.verified ? 
                <div className="verified-holder">
                    <CheckCircleRoundedIcon />
                    <p>Verified</p>
                  </div>
                :
                <button onClick={() => sendVerificationCode()} className="filled send-code">{(awaitingCode) ? "Resend Verification Code" : "Send Verification Code"}</button>
              }
              <div onClick={() => setDeleteModalOpen(true)} className="delete-icon">
                <DeleteIcon style={{marginLeft: '20px'}} />
              </div>
            </div> 

            {
              deleteModalOpen &&
            <Modal open={deleteModalOpen} onClose={onModalClosed} onAction={onModalAction}>
              <h3 className="delete-modal-header">Delete Warning</h3>
              <p>Are you sure you want to delete this phone number?</p>
              <div className="del-modal-actions">
                <button onClick={() => onModalClosed()} className="ghost cancel">Cancel</button>
                <button onClick={() => onModalAction()} className="filled confirm">Yes, delete it</button>
              </div>
            </Modal>
            }
         </>
    }
      </div>
  );
};

export default AccountPhoneItem;
