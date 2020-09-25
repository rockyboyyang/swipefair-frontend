import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import "../stylesheets/swipecontainer.css";
import "../stylesheets/tindercard.css";
import backendURL from '../backendURL'

const SwipeContainer = ({ setMatchesState, openingsState, setOpeningsState, jobseekerState, companyState, userCompanyOpenings }) => {

  let id;
  let matchesUrl;
  let fullBackendUrl;
  let roleBaseUrl;
  if(jobseekerState) {
    try {
      id = JSON.parse(localStorage.jobseeker).id;
      matchesUrl = backendURL + `api/jobseekers/${id}/matches`
      fullBackendUrl = backendURL + `/api/openings/notswiped/jobseeker/${id}`;
      roleBaseUrl = backendURL + 'api/jobseekers/'
    } catch (e) {

    }
  } else if (companyState) {
    try {
      id = JSON.parse(localStorage.company).id;
      matchesUrl = backendURL + `api/companies/${id}/matches`
      fullBackendUrl = backendURL + `api/openings/notswiped/company/${id}`;
      roleBaseUrl = backendURL + 'api/companies/'
    } catch (e) {

    }
  }
  // const jobseekerMatchesUrl = backendURL + `api/jobseekers/${jobseekerId}/matches`;

  // const fullBackendUrl = backendURL + `/api/openings/notswiped/jobseeker/${jobseekerId}`;
  let openingsId;
  let jobseekerId;
  const data = async () => {
    const response = await fetch(fullBackendUrl); // + '/'
    const { opening, jobseekers } = await response.json();
    if(jobseekerState) {
      setOpeningsState(opening);
      return opening;
    } else if (companyState) {
      setOpeningsState(jobseekers)

      return jobseekers
    }
    
  };
  const fetchMatches = async () => {
    const res = await fetch(matchesUrl); // + '/'
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
    const data = async (swipe) => {
      let response;
      if(jobseekerState) response = await fetch(backendURL + `api/swipes/jobseekers/${id}`);
      else if (companyState) response = await fetch(backendURL + `api/swipes/companies/${id}`);
      // const response = await fetch(
      //   `https://boiling-sands-04799.herokuapp.com/api/swipes/jobseekers/${jobseekerId}`
      // );
      const { swipes } = await response.json();
      const checkForMatches = (openingsId) => {
        let filteredSwipes = []
        let count = 0;
        if (jobseekerState) {
          filteredSwipes = swipes.filter((swipeElement) => {
            return swipeElement.openings_id === openingsId
          })
        } else if (companyState) {
          filteredSwipes = swipes.filter((swipeElement) => {
            return swipeElement.jobseekers_id === swipe.jobseekers_id
          })

          filteredSwipes = filteredSwipes.filter((swipeElement) => {
            return swipeElement.openings_id === openingsId
          })
        }
      
        for (let i = 0; i < filteredSwipes.length; i++) {
          if (filteredSwipes[i].swiped_right === true) count = count + 1;
        }
        if (count === 2) {
          const fetchChat = async () => {
            let getRes;
            if(jobseekerState) {
              getRes = await fetch(
                roleBaseUrl + `${id}/${openingsId}/chats`,
                {
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
                }
              );
            } else if (companyState) {
              getRes = await fetch(
                roleBaseUrl + `${id}/${openingsId}/${swipe.jobseekers_id}/chats`,
                {
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
                }
              );
            }
            let getResponse = await getRes.json();

            if (getResponse.boolean === true) return;
            let res;
            if(jobseekerState) {
              res = await fetch(
                roleBaseUrl + `${id}/${openingsId}/chats`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                }
              );
            } else if (companyState) {
              res = await fetch(
                roleBaseUrl + `${id}/${openingsId}/${swipe.jobseekers_id}/chats`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                }
              );
            }
            let result = await res.json()
            return result;
          };
          fetchChat();
        }
      }
      
      if(jobseekerState) {
          checkForMatches(openingsId)
      } else if (companyState) {
          for(let i = 0; i < userCompanyOpenings.length; i++) {
            checkForMatches(userCompanyOpenings[i].id)
        }
      }

    };
    data(swipe);

    return swipe;

  };

  const swiped = async (dir) => {
    const swiped_right = dir === "right" ? true : false;

    openingsId = openingsState.pop().id;

    let jobseekerEmail = null;
    if(companyState) jobseekerEmail = openingsState.pop().email

    const url = roleBaseUrl + `${id}/openings/${openingsId}`;
    const body = { swiped_right: swiped_right, jobseekerEmail: jobseekerEmail};
    const posts = await fetchPost(url, body);
    const matches = await fetchMatches();

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
  if((id && userCompanyOpenings && companyState) || (id && jobseekerState)) {
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
                    {/* <h1>{op.company_name}</h1> */}
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
                  {jobseekerState ? (
                    <>
                      <h4>About jobseeker:</h4>
                      <p>Bio: {op.bio}</p>
                      <p>Company Name: {op.name}</p>
                    </>
                  ) : (
                    <>
                      <h4>About jobseeker:</h4>
                      <p>Bio: {op.bio}</p>
                      <p>Name: {op.name}</p>
                    </>
                  )}
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
