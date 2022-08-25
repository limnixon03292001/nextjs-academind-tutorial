import { MongoClient } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   message: string
//   result: {
    
//   }
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method === 'POST'){
        const data = req.body;

        //i just created this try-catch lol
        try {
            const client = await MongoClient.connect('mongodb+srv://limnixon:12252001lols@cluster0.wib4l.mongodb.net/meetups?retryWrites=true&w=majority');
            
            const db = client.db();
            const meetupsCollection = db.collection('meetups');
            const result = await meetupsCollection.insertOne(data);
            client.close();

            console.log(result);
            res.status(201).json({
                message: 'Meet up successfully inserted!',
                result: result
            });
        } catch (error: any) {
            console.log("error", error.message);
            res.status(500).json({error: error.message});
        }
    }
}
