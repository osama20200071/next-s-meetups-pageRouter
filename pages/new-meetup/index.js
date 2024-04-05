import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export default function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(data) {
    // console.log(data);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await response.json();
    // console.log(resData);
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>New Meetup</title>
        <meta
          name="description"
          content="add your own next meetup and join the community"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
}
