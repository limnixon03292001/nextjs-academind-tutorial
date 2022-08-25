import { useRouter } from "next/router";
import NewMeetupForm from "../components/meetups/NewMeetupForm";


function NewMeetUp() {
    const router = useRouter();

    async function addMeetupHandler(enteredMeetupData: any) {
        const response = await fetch('/api/new-meetup',{
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type':  'application/json'
            }
        });

        const data = await response.json();
        console.log(data);
        router.push('/');
    }
    return (
        <div>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </div>
    )
}

export default NewMeetUp;