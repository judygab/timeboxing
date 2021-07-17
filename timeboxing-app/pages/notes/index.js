import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NoteCard } from '../../components/NoteCard';
import { GET_ALL_NOTES } from '../../graphql/queries';
import {
  signIn,
  signOut,
  useSession,
  getSession
} from 'next-auth/client';


const Notes = ({ noteList }) => {

  const [ session ] = useSession();

  return (
    <div className="jobs">

      {session && <>
        {noteList.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}

        <div>
          <h1>Signed in as {session.user.email} </h1> <br/>
          <button onClick={signOut}>Sign out</button>
        </div>

      </>}

      {!session && <>
        <div>
          <h1>You are not signed in</h1> <br/>
          <button onClick={signIn}>Sign in</button>
        </div>
      </>}

    </div>
  )
}

export const getServerSideProps = async (context) => {

  const session = await getSession(context);

  if (!session) return {
    props: {}
  };

  const client = new ApolloClient({
    uri: process.env.GRAPHQL_URL,
    cache: new InMemoryCache()
  });

  const { data } = await client.query({ query: GET_ALL_NOTES });
  console.log("Query!!");

  return {
    props: {
      noteList: data.notes
    }
  }
}

export default Notes;
