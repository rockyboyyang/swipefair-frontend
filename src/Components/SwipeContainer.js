import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import "../stylesheets/swipecontainer.css";
import "../stylesheets/tindercard.css";
const SwipeContainer = ({ setMatchesState }) => {
  // const backendUrl = "http://localhost:5000/api/openings";
  // /notswiped/<int:jobseekerId>
  // const herokuUrl = "https://boiling-sands-04799.herokuapp.com/api/openings";
  const jobseekerId = JSON.parse(localStorage.jobseeker).id;
  const jobseekerMatchesUrl = `http://localhost:5000/api/jobseekers/${jobseekerId}/matches`;

  const backendUrl = `http://localhost:5000/api/openings/notswiped/jobseeker/${jobseekerId}`;
  let openingsId;
  const data = async () => {
    const response = await fetch(backendUrl); // + '/'
    const { opening } = await response.json();
    setOpeningsState(opening);
    // debugger
    // openingsId = opening.map(o => o.id)
    // setOpeningsIdsState(opening.map(o => o.id));
    return opening;
  };
  const fetchMatches = async () => {
    const res = await fetch(jobseekerMatchesUrl); // + '/'
    return await res.json();
  };

  const [openingsState, setOpeningsState] = useState([]);
  // const [openingsIdsState, setOpeningsIdsState] = useState([]);
  useEffect(() => {
    (async () => {
      const payload = await data();
    })();
    // setOpeningsState(payload);
  }, []);
  const fetchPost = async (url, body) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return await res.json();
  };
  //'/jobseekers/<string:jobseekerEmail>/openings/<int:openingId>' post
  const onSwipe = async (dir) => {
    return await swiped(dir);

    // console.log("You swiped: " + dir);
  };
  const swiped = async (dir) => {
    console.log("the states", openingsState);
    console.log("jobseekerId", jobseekerId);
    const swiped_right = dir === "right" ? true : false;

    openingsId = openingsState.pop().id;
    setOpeningsState(openingsState);
    // openingsId = openingsState[openingsState.length-1].id
    // setOpeningsIdsState(openingsIdsState.slice(1))
    const url = `http://localhost:5000/api/jobseekers/${jobseekerId}/openings/${openingsId}`;
    const body = { swiped_right: swiped_right };
    const posts = await fetchPost(url, body);
    const matches = await fetchMatches()
    setMatchesState(matches);
    return posts;
  };
  // useEffect(() => { set(propName) }, [matchesState]);
  return (
    <div className="hidden">
      <div className="swipe-container">
        {openingsState.map((op) => (
          <TinderCard
            className="card"
            key={op.id}
            // onCardLeftScreen={() => {
            //   onCardisSwiped("foobar");
            // }}
            // onCardLeftScreen={() => onCardLeftScreen("fooBar")}
            onSwipe={onSwipe}
            preventSwipe={["up", "down"]}
          >
            <div className="swipe">
              <div className="company-image">
                <img src={op.image} alt="company" />
              </div>
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
