import * as React from 'react';
import "./ModalBox.css"
interface IModalBoxProps {
    content: any;
    open: boolean;
    onClose: Function;
    onAction: Function;
}

const ModalBox: React.FunctionComponent<IModalBoxProps> = (props) => {

    const className = props.open ? "click-catcher-open" : "click-catcher";

  return (
      <div className={className} onClick={() => props.onClose()}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
              {props.content}
          </div>
      </div>
  );
};

export default ModalBox;
