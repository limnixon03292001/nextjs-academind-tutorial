import type { GetServerSidePropsContext } from 'next'
import MeetupList from '../components/meetups/MeetUpList'

import { MongoClient } from 'mongodb'

type MeetUpType = {
  meetups: {
    id: number
    image: string
    title: string
    address: string
    description: string
  }[]
}

const DUMMY_MEETUPS = [
  {
    id: 1,
    title: 'First Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Schlossfuerstenau1.jpg/1024px-Schlossfuerstenau1.jpg',
    address: 'Some address 5 hehhe City',
    description: 'This my first meetup'
  },
  {
    id: 2,
    title: 'Second Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Schlossfuerstenau1.jpg/1024px-Schlossfuerstenau1.jpg',
    address: 'Some address 5 hehhe City',
    description: 'This my second meetup'
  },
  {
    id: 3,
    title: 'Third Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Schlossfuerstenau1.jpg/1024px-Schlossfuerstenau1.jpg',
    address: 'Some address 5 hehhe City',
    description: 'This my third meetup'
  },
  {
    id: 4,
    title: 'Fourth Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Schlossfuerstenau1.jpg/1024px-Schlossfuerstenau1.jpg',
    address: 'Some address 5 hehhe City',
    description: 'This my fourth meetup'
  }
];

const Home = (props: MeetUpType) => {

  return (
    <div>
      <MeetupList meetups={props.meetups}/>
    </div>
  )
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const req = context.req;
//   const res = context.res;

//   //fetch data from an api
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     } 
//   };
// }

export async function getStaticProps() {
  //fetch data from an api

  const client = await MongoClient.connect('mongodb+srv://limnixon:12252001lols@cluster0.wib4l.mongodb.net/meetups?retryWrites=true&w=majority');
            
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description
      })),
    },
    revalidate: 1 //unlocks incremental static generation
  }; // always return object
}

export default Home
