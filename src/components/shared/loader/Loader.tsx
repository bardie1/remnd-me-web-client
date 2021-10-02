import * as React from 'react';
import "./Loader.css";
interface ILoaderProps {
    color: string;
    size: string;
}

const Loader: React.FunctionComponent<ILoaderProps> = (props) => {
  return (
      <div className={`loader ${(props.color)}` } style={{width: props.size, height: props.size}}></div>
  );
};

export default Loader;
