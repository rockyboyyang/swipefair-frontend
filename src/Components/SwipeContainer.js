import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import "../stylesheets/swipecontainer.css";
import "../stylesheets/tindercard.css";
import backendURL from '../backendURL'

const SwipeContainer = ({ setMatchesState, openingsState, setOpeningsState }) => {
  // const backendUrl = "https://boiling-sands-04799.herokuapp.com/api/openings";
  // /notswiped/<int:jobseekerId>
  // const herokuUrl = "https://boiling-sands-04799.herokuapp.com/api/openings";
  let jobseekerId;
  try {
    jobseekerId = JSON.parse(localStorage.jobseeker).id;
  } catch (e) {
    console.log(e)
  }
  // const jobseekerMatchesUrl = `https://boiling-sands-04799.herokuapp.com/api/jobseekers/${jobseekerId}/matches`;
  const jobseekerMatchesUrl = backendURL + `api/jobseekers/${jobseekerId}/matches`;

  // const backendUrl = `https://boiling-sands-04799.herokuapp.com/api/openings/notswiped/jobseeker/${jobseekerId}`;
  const fullBackendUrl = backendURL + `/api/openings/notswiped/jobseeker/${jobseekerId}`;
  let openingsId;
  const data = async () => {
    const response = await fetch(fullBackendUrl); // + '/'
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
    const swipe = await swiped(dir);
    const data = async () => {
      const response = await fetch(backendURL + `api/swipes/jobseekers/${jobseekerId}`);

      // const response = await fetch(
      //   `https://boiling-sands-04799.herokuapp.com/api/swipes/jobseekers/${jobseekerId}`
      // );

      const { swipes } = await response.json();
      let filteredSwipes = swipes.filter(
        (swipe) => swipe.openings_id === openingsId
      );
      let count = 0;
      for (let i = 0; i < filteredSwipes.length; i++) {
        if (filteredSwipes[i].swiped_right === true) count += 1;
      }
      if (count === 2) {
        const fetchChat = async () => {
          const getRes = await fetch(
            backendURL + `api/jobseekers/${jobseekerId}/${openingsId}/chats`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          let getResponse = await getRes.json();
          if (getResponse.boolean === true) return;
          const res = await fetch(
            backendURL + `api/jobseekers/${jobseekerId}/${openingsId}/chats`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
            }
          );
          let result = await res.json()
          return result;
        };
        fetchChat();
      }
    };
    data();

    return swipe;

  };

  const swiped = async (dir) => {
    const swiped_right = dir === "right" ? true : false;

    openingsId = openingsState.pop().id;

    const url = backendURL + `api/jobseekers/${jobseekerId}/openings/${openingsId}`;
    const body = { swiped_right: swiped_right };
    const posts = await fetchPost(url, body);
    const matches = await fetchMatches();
    // console.log(matches)
    setMatchesState(matches.matches);
    if (posts) setOpeningsState(openingsState);
    return posts;
  };
  // const swiped = (dir) => {
  //   const swiped_right = dir === "right" ? true : false;

  //   openingsId = openingsState.pop().id;

  //   const url = `https://boiling-sands-04799.herokuapp.com/api/jobseekers/${jobseekerId}/openings/${openingsId}`;
  //   const body = { swiped_right: swiped_right };
  //   const posts = fetchPost(url, body).then(thing => {
  //     setOpeningsState(openingsState);
  //     console.log(thing)
  //     return thing

  //   })
    // const matches = await fetchMatches();
    // setMatchesState(matches);
    // setOpeningsState(openingsState);
  //   return posts;
  // };
  // useEffect(() => { set(propName) }, [matchesState]);
  if(jobseekerId) {
    console.log(jobseekerId)
    return (
        <div className="swipe-container">
          <div>
            <img src="https://advocatesrc.org/wp-content/uploads/2020/03/unnamed.png" alt="sorry"></img>
          </div>
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
                <div className="description">
                  <h4>Job description </h4>
                  <p>{op.description}</p>
                </div>
                <div className="contact-info">
                  <h4>Contact info:</h4>
                  <p>{op.email}</p>
                </div>
                <div>{op.size}</div>
                <div>{op.location}</div>
                <div className="about-company">
                  <h4>About company:</h4>
                  <p>{op.bio}</p>
                </div>
              </div>
            </TinderCard>
          ))}
        </div>
    );
  } else {
    return (
      <>
      </>
    )
  }
};
export default SwipeContainer;
