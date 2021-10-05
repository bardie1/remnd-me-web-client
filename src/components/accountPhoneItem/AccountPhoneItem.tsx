import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import "./AccountPhoneItem.css";
import { Phone } from '../../models/phone';
import { ContentEditableUtil } from '../../utils/contentEditable';
interface IAccountPhoneItemProps {
  //optional for now...
  phone?: Phone;
}

const AccountPhoneItem: React.FunctionComponent<IAccountPhoneItemProps> = (props) => {

  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const [showPhoneEdit,setShowPhoneEdit] = React.useState<boolean>(true);
  const [maskedPhoneNumber, setMaskedPhoneNumber] = React.useState<string>('');
  const [phone, setPhone] = React.useState<Phone | undefined>(props.phone);
  const [awaitingCode, setAwaitingCode] = React.useState<boolean>(false);

  const focusOnInput = (inputId: string) => {
    let i = document.getElementById(inputId);
    i?.focus();
}


const moveCursorToEnd = (e:React.FocusEvent<HTMLSpanElement> | React.FormEvent<HTMLSpanElement>) =>{
    setShowPhoneEdit(false);
   ContentEditableUtil.moveCursorToEnd(e.target);
}

const handleInput = (e: React.FormEvent<HTMLSpanElement>) => {
  moveCursorToEnd(e);
  let text = e.currentTarget.textContent;
  let newText: string = '';
  if (text) {
    newText = text.replaceAll(/\D/g, "");
  }
  let finalText: string = newText;
  if (newText?.length > 11) {
    finalText = newText.slice(0, newText.length - 1);
  }

  if (newText?.length > 2) {
    finalText = finalText.slice(0,2) + " " + finalText.slice(2);
  }

  if (finalText?.length > 6) {
    finalText = finalText.slice(0,6) + " " + finalText.slice(6);
  }

  if (finalText.length > 10) {
    finalText = finalText.slice(0,10) + " " + finalText.slice(10);
  }

  e.currentTarget.textContent = finalText;
  setMaskedPhoneNumber(finalText);
  moveCursorToEnd(e);
  setPhoneNumber((newText) ? newText : '');

}

const sendVerificationCode = () => {
  setAwaitingCode(true);
}

  return (
      <div id="account-phone-item" className="account-phone-item">
        <div className="account-phone-input-holder">
  { (phoneNumber !== '' || !showPhoneEdit) && <span>+</span>}<span id="account-phone" onInput={(e) => {handleInput(e)}} onBlur={(e) => setShowPhoneEdit(true)} onFocus={(e) => moveCursorToEnd(e)} className={"ghost-input " + ((showPhoneEdit) ? 'pointer' : '')} contentEditable role="textbox" placeholder="Enter Phone Number" suppressContentEditableWarning={true}>{maskedPhoneNumber}</span> { showPhoneEdit && <span className="edit-button" onClick={() => focusOnInput('account-phone')}><EditIcon style={{ color: "606060", fontSize: '18px', paddingLeft: "5px"}} /></span>}
        </div>

        {
          awaitingCode && 
          <div className="input-group verification-code-input-holder">
            <input type="text" placeholder="Enter Verification Code" className="verification-code-input"/>
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
            <DeleteIcon style={{marginLeft: '20px'}} />
          </div>
      </div>
  );
};

export default AccountPhoneItem;
