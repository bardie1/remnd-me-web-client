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
  identifier: string | number;
  newNumber: boolean;
}

const AccountPhoneItem: React.FunctionComponent<IAccountPhoneItemProps> = (props) => {

  const [initialPhoneNumber, setInitialPhoneNumber] = React.useState<string | undefined>(props.phone?.phoneNumber as string);
  const [phoneNumber, setPhoneNumber] = React.useState<string | undefined>(props.phone?.phoneNumber as string);
  const [showPhoneEdit,setShowPhoneEdit] = React.useState<boolean>(true);
  const [showEnterKey, setShowEnterKey] = React.useState<boolean>(false);
  const [maskedPhoneNumber, setMaskedPhoneNumber] = React.useState<string>('');
  const [phone, setPhone] = React.useState<Phone | undefined>(props.phone);
  const [awaitingCode, setAwaitingCode] = React.useState<boolean>(false);


  React.useEffect(() => {
    setInitialPhoneNumber(initialPhoneNumber?.replace("+",""))
    setPhoneNumber(initialPhoneNumber?.replace("+",""))
    let spanInput = document.getElementById(`account-phone-${props.identifier}`);
    if (spanInput) {
      spanInput.textContent = phoneSpacingMask(initialPhoneNumber || '');
    }
  }, [])


  React.useEffect(() => {
    if (phoneNumber === initialPhoneNumber) {
      setShowEnterKey(false)
    } else {
      setShowEnterKey(true)
    }
  }, [phoneNumber, initialPhoneNumber])

  const focusOnInput = (inputId: string) => {
    let i = document.getElementById(inputId);
    i?.focus();
}


const moveCursorToEnd = (e:React.FocusEvent<HTMLSpanElement> | React.FormEvent<HTMLSpanElement>) =>{
    setShowPhoneEdit(false);
   ContentEditableUtil.moveCursorToEnd(e.target);
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

  let maskedText = phoneSpacingMask(finalText);

  e.currentTarget.textContent = maskedText;
  setMaskedPhoneNumber(maskedText);
  moveCursorToEnd(e);
  setPhoneNumber((finalText) ? finalText : '');
}

const sendVerificationCode = () => {
  setAwaitingCode(true);
}

  return (
      <div id={`account-phone-item-${props.identifier}`} className="account-phone-item">
        <div className="account-phone-input-holder">
  { ((phoneNumber !== '' && phoneNumber) || !showPhoneEdit) && <span>+</span>}<span id={`account-phone-${props.identifier}`} onInput={(e) => {handleInput(e)}} onBlur={(e) => setShowPhoneEdit(true)} onFocus={(e) => moveCursorToEnd(e)} className={"ghost-input " + ((showPhoneEdit) ? 'pointer' : '')} contentEditable role="textbox" placeholder="Enter Phone Number" suppressContentEditableWarning={true}>{maskedPhoneNumber}</span> 
  { showPhoneEdit && <span className="edit-button" onClick={() => focusOnInput(`account-phone-${props.identifier}`)}><EditIcon style={{ color: "606060", fontSize: '18px', paddingLeft: "5px"}} /></span>}
  {(!showPhoneEdit && phoneNumber?.length === 11 && showEnterKey) && <span style={{marginLeft: '20px', color: 'grey'}}>Hit <kbd>Enter ↵</kbd> to save changes</span>}
        </div>

    {
      !props.newNumber &&
         <>
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
              <div className="delete-icon">
                <DeleteIcon style={{marginLeft: '20px'}} />
              </div>
            </div> 
         </>
    }
      </div>
  );
};

export default AccountPhoneItem;
