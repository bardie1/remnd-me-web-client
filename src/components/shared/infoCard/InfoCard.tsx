import * as React from 'react';

import "./InfoCard.css";

interface IInfoCardProps {
    cardType: string,
    text: string,
    alignment:string,
    Icon?: any;
    style?: React.CSSProperties,
}

const InfoCard: React.FunctionComponent<IInfoCardProps> = (props) => {
  return (
      <div id="info-card-container" style={props.style} className={props.cardType}>
          <div id="info-card-text" className={props.alignment}>
            {
                props.Icon && <props.Icon />
            }
            
            {props.text}
          </div>
      </div>
  ) ;
};

export default InfoCard;
