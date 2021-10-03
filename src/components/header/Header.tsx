import * as React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./Header.css";
import { UserContext } from '../../context/userContext';
import logo from "../../assets/images/remndme_logo.png";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import useOutsideAlerter from '../../hooks/useOutsideAlerter';
import { useHistory } from 'react-router-dom';
interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {

  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const wrapperRef = React.useRef(null);
  const triggerRef = React.useRef(null);
  const {clickedOutside } = useOutsideAlerter(wrapperRef, showMenu, triggerRef);
  const userContext = React.useContext(UserContext);
  const history = useHistory();

  React.useEffect(()=> {
    if (clickedOutside) {
      setShowMenu(false);
    }
  }, [clickedOutside])

  const logout = () => {
    userContext.logout();
  }

  return (
      <div id="header-container">
        <div id="header-content">
          <div id="header-logo">
            <img src={logo} alt="remnd me logo"/>
          </div>
          <div ref={triggerRef} onClick={() => setShowMenu(!showMenu)} id="header-user-menu">
            <div id="header-username">
              {userContext?.user.username}
            </div>
            <ArrowDropDownIcon />
          </div>
        </div>

      {
        showMenu &&
        <div ref={wrapperRef} id="menu-popup">
          <ul>
              <li onClick={() => history.push("/account")}><AccountBoxIcon /> <span>Account</span></li>
            <li onClick={() => logout()}><LogoutIcon /> <span>Logout</span></li>
          </ul>
        </div>
      }
      </div>
  );
};

export default Header;


