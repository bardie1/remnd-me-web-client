import * as React from 'react';
import ReactDOM from 'react-dom';
import ModalBox from '../modalBox/ModalBox';

interface IModalProps {
    open: boolean;
    onClose: Function;
    onAction: Function;
}

const Modal: React.FunctionComponent<IModalProps> = (props) => {

    let node:any = React.useRef(null);


    React.useEffect(() => {
        node.current = document.createElement('div');
        document.body.appendChild(node.current);
        ReactDOM.render(<ModalBox {...props} content={props.children} />, node.current)

        return () => {
            ReactDOM.unmountComponentAtNode(node.current);
            node.parentNode && node.parentNode.removeChild(node.current);
        }
    }, [props])
  return (
    <script></script>
  );
};

export default Modal;
