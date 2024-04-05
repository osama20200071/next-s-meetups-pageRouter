import MeetupDetails from "@/components/meetups/MeetupDetails";
import { dbConnection } from "@/db";
import { ObjectId } from "mongodb";
import Head from "next/head";

import React from "react";

export default function MeetupDetailsPage({ meetup }) {
  return (
    <>
      <Head>
        <title>{meetup.title}</title>
        <meta name="description" content={meetup.description} />
      </Head>
      <MeetupDetails {...meetup} />
    </>
  );
}

export async function getStaticProps(context) {
  const { meetupid } = context.params;
  const { meetupsCollection, client } = await dbConnection();
  const objId = new ObjectId(meetupid);
  const meetup = await meetupsCollection.findOne({ _id: objId });
  // console.log(meetup);
  client.close();

  return {
    props: {
      meetup: {
        title: meetup.title,
        image: meetup.image,
        description: meetup.description,
        address: meetup.address,
        id: meetup._id.toString(),
      },
    },
  };
}

export async function getStaticPaths() {
  const { meetupsCollection, client } = await dbConnection();
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  // console.log(meetups);
  client.close();

  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: {
        meetupid: meetup._id.toString(),
      },
    })),
  };
}
