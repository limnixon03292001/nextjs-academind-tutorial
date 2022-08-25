import { MongoClient, ObjectId,} from "mongodb";
import type { GetStaticPropsContext } from "next";
import MeetUpDetails from "../components/meetups/MeetUpDetails";

type MeetUpType = {
    meetUpData: {
      id: string
      image: string
      title: string
      address: string
      description: string
    }
}
  
function MeetUpDetail({ meetUpData }: MeetUpType) {
    
    return (
        <div>
            <MeetUpDetails
                image={meetUpData?.image}
                title={meetUpData?.title}
                address={meetUpData?.address}
                description={meetUpData?.description}
            />
        </div>
    )
}

export async function getStaticPaths() {

    const client = await MongoClient.connect('mongodb+srv://limnixon:12252001lols@cluster0.wib4l.mongodb.net/meetups?retryWrites=true&w=majority');
            
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
  
    const meetups = await meetupsCollection.find({}, { projection: { _id: 1 }}).toArray();

    client.close();

    return {
        paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } })),
        fallback: 'blocking',
    };
}

export async function getStaticProps(context: GetStaticPropsContext) {

    const meetupId = context.params?.meetupId?.toString();
  
    const client = await MongoClient.connect('mongodb+srv://limnixon:12252001lols@cluster0.wib4l.mongodb.net/meetups?retryWrites=true&w=majority');
            
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
  
    const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId), });
    
    client.close();

    return {
        props: {
            meetUpData: {
                id: selectedMeetup?._id.toString(),
                title: selectedMeetup?.title,
                address: selectedMeetup?.address,
                image: selectedMeetup?.image,
                description: selectedMeetup?.description,
            },
        }
    }
}

export default MeetUpDetail;