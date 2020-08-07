import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import "../stylesheets/swipecontainer.css";
import "../stylesheets/tindercard.css";

const SwipeContainer = (props) => {
  const [openings, setOpenings] = useState([
    {
      image: "logo",
      company_name: "Amazon",
      email: "jeff@amazon.com",
      size: "large",
      location: "Seattle, WA",
      bio: "Sells goods and services online",
      title: "Software Engineer",
      opening_id: 1,
      description: "Looking for super coder!",
    },
    {
      image: "logo",
      company_name: "Google",
      email: "sergey@google.com",
      size: "large",
      location: "Mountain View, CA",
      bio: "Specializes in Internet-related services and products,",
      title: " Junior Software Engineer",
      opening_id: 2,
      description: "Come change the world!",
    },
  ]);

  const backendUrl = "http://localhost:5000/api/openings";

  const data = async () => {
    const response = await fetch(backendUrl + "/");
    debugger;
    const openings = await response.json();
    setOpenings(openings);
  };

  return (
    <div>
      <div className="center-container">
        {openings.map((op) => (
          <TinderCard
            className="card"
            key={op.opening_id}
            preventSwipe={["up", "down"]}
          >
            <div className="swipe">
              <div>{op.image}</div>
              <div>{op.comapany_name}</div>
              <div>{op.email}</div>
              <div>{op.size}</div>
              <div>{op.location}</div>
              <div>{op.bio}</div>
              <div>{op.title}</div>
              <div>{op.description}</div>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
};

export default SwipeContainer;
