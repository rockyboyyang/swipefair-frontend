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
    // send a fetch request to the openings table and grab the companyId via the openingsId
    // send a fetch request to the swipes table by filtering out the jobseekerId and grabbing every swipes that involves jobseekerId
    // compare and filter out swipes.companies_id === companyId
    const swipe = await swiped(dir)
    const data = async () => {
      const response = await fetch(`http://localhost:5000/api/swipes/jobseekers/${jobseekerId}`); // + '/'
      const { swipes } = await response.json();
      let filteredSwipes = swipes.filter((swipe) => swipe.openings_id === openingsId)
      let count = 0;
      for(let i = 0; i < filteredSwipes.length; i++){
        if(filteredSwipes[i].swiped_right === true) count += 1;
      }
      if(count === 2) {
        const fetchChat = async () => {
          const getRes = await fetch(`http://localhost:5000/api/jobseekers/${jobseekerId}/${openingsId}/chats`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          let getResponse = await getRes.json();
          if(getResponse.boolean === true) return;
          const res = await fetch(`http://localhost:5000/api/jobseekers/${jobseekerId}/${openingsId}/chats`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
          return await res.json();
        };
        fetchChat();
      }
    };
    data()

    return swipe;

    // console.log("You swiped: " + dir);
  };
  const swiped = async (dir) => {
    console.log("the states", openingsState);
    console.log("jobseekerId", jobseekerId);
    const swiped_right = dir === "right" ? true : false;

    openingsId = openingsState.pop().id;
    setOpeningsState(openingsState);
    console.log(openingsState);
    // openingsId = openingsState[openingsState.length-1].id
    // setOpeningsIdsState(openingsIdsState.slice(1))
    const url = `http://localhost:5000/api/jobseekers/${jobseekerId}/openings/${openingsId}`;
    const body = { swiped_right: swiped_right };
    const posts = await fetchPost(url, body);
    const matches = await fetchMatches();
    setMatchesState(matches);
    return posts;
  };
  // useEffect(() => { set(propName) }, [matchesState]);
  return (
    <div className="hidden">
      <div className="swipe-container">
        <div>You currently have no openning</div>
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
              <div className="company-info">
                <div className="company-image">
                  <img src={op.image} alt="company" />
                </div>
                <div className="company-name">
                  <h1>{op.company_name}</h1>
                  <p>{op.location}</p>
                </div>
              </div>
              <div className="title">
                <h2>{op.title}</h2>
              </div>
              <div className='description'>
                <h4>Job description </h4>
                <p>{op.description}</p> 
              </div>
              <div className="contact-info">
                <h4>Contact info:</h4>
                <p>{op.email}</p></div>
              <div>{op.size}</div>
              <div>{op.location}</div>
              <div className='about-company'>
                <h4>About company:</h4>
                <p>{op.bio}</p> 
                </div>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
};
export default SwipeContainer;
