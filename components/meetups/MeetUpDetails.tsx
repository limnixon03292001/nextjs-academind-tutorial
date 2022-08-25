import classes from './meetUpDetails.module.css';

type MeetUpItemTypeProps = {
    id?: string
    image: string
    title: string
    address: string
    description: string
}

function MeetUpDetails(props: MeetUpItemTypeProps) {
    return (
        <section className={classes.detail}>
            <img src={props.image} alt="img" />
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.description}</p>
        </section >
    )
}

export default MeetUpDetails;