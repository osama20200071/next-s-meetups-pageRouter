import React from "react";
import classes from "./MeetupDetails.module.css";

export default function MeetupDetails({
  image,
  title,

  description,
  address,
}) {
  return (
    <section className={classes.detail}>
      <img src={image} />
      <h1>{title}</h1>
      <address>{address}</address>
      <p> {description}</p>
    </section>
  );
}
