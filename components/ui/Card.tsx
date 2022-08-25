import { ReactNode } from 'react';
import classes from './Card.module.css';

type CardTypeProps = {
    children: ReactNode
}

function Card(props: CardTypeProps) {
  return <div className={classes.card}>{props.children}</div>;
}

export default Card;