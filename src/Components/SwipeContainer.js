import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import "../stylesheets/swipecontainer.css";
import "../stylesheets/tindercard.css";
const SwipeContainer = (props) => {
  //   const backendUrl = "http://localhost:5000/api/openings";
  const herokuUrl = "https://boiling-sands-04799.herokuapp.com/api/openings";

  const data = async () => {
    const response = await fetch(herokuUrl); // + '/'
    const { opening } = await response.json();
    setOpeningsState(opening);
    return opening;
  };
  // const defaultData = [
  //   {
  //     image: "logo",
  //     company_name: "Amazon",
  //     email: "jeff@amazon.com",
  //     size: "large",
  //     location: "Seattle, WA",
  //     bio: "Sells goods and services online",
  //     title: "Software Engineer",
  //     opening_id: 1,
  //     description: "Looking for super coder!",
  //   },
  //   {
  //     image: "logo",
  //     company_name: "Google",
  //     email: "sergey@google.com",
  //     size: "large",
  //     location: "Mountain View, CA",
  //     bio: "Specializes in Internet-related services and products,",
  //     title: " Junior Software Engineer",
  //     opening_id: 2,
  //     description: "Come change the world!",
  //   },
  // ];
  const [openingsState, setOpeningsState] = useState([]);

  useEffect(async () => {
    const payload = await data();
    console.log(payload);
    // setOpeningsState(payload);
  }, []);

  return (
    <div>
      <div className="center-container">
        {openingsState.map((op) => (
          <TinderCard
            className="card"
            key={op.opening_id}
            preventSwipe={["up", "down"]}
          >
            <div className="swipe">
              <div>{op.image}</div>
              <div>{op.company_name}</div>
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
