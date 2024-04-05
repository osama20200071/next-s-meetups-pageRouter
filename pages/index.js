import MeetupList from "@/components/meetups/MeetupList";
import { dbConnection } from "@/db";
import Head from "next/head";

export default function HomePage({ meetups }) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browser all the coming meetups and join the community"
        />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
}

export async function getStaticProps() {
  console.log("building after 1 min");
  // data fetching logic
  // this function only executes when building the app for production
  const { meetupsCollection, client } = await dbConnection();
  const meetups = await meetupsCollection.find().toArray();
  // console.log(meetups);
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        description: meetup.description,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    // for incremental static regeneration after m seconds
    revalidate: 60,
  };
}

// export const dummy_meetups = [
//   {
//     id: "m1",
//     title: "fist meetup",
//     image:
//       "https://appstronauts.co/wp-content/uploads/2020/04/8938-Converted.png",
//     address: "cairo egypt",
//     description: "the first meetup in the world",
//   },
//   {
//     id: "m2",
//     title: "second meetup",
//     image:
//       "https://appstronauts.co/wp-content/uploads/2020/04/8938-Converted.png",
//     address: "cairo egypt",
//     description: "the second meetup in the world",
//   },
// ];

// this function is only called when requesting this page
// this run during the runtime
// export async function getServerSideProps(context) {
//   // get the data from the database
//   const { meetupsCollection, client } = await dbConnection();
//   const meetups = await meetupsCollection.find().toArray();
//   console.log(meetups);
//   client.close();

//   return {
//     props: {
//       meetups: meetups.map((meetup) => ({
//         title: meetup.title,
//         image: meetup.image,
//         description: meetup.description,
//         address: meetup.address,
//         id: meetup._id.toString(),
//       })),
//     },
//   };
// }
