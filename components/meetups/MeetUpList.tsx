import MeetupItem from './MeetupItem';
import classes from './meetUpList.module.css';

type MeetUpType = {
  id: number
  image: string
  title: string
  address: string
  description: string
}

type MeetUpListTypeProps = {
    meetups: MeetUpType[]
}

function MeetupList(props: MeetUpListTypeProps) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
        />
      ))}
    </ul>
  );
}

export default MeetupList;