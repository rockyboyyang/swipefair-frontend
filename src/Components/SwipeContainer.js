// import React, { useState, useEffect } from "react";
// import TinderCard from "react-tinder-card";
// import "../stylesheets/swipecontainer.css";
// import "../stylesheets/tindercard.css";
// // import {ourPost} from '../utils.py'

// // const ourGet = async(path) => {
// //   const backendUrl = "http://localhost:5000/api";
// //   const response = await fetch(backendUrl + path);
// //   return await response.json();
// // }

// const ourPost = async(path) => {
//   const backendUrl = "http://localhost:5000/api";
//   const response = await fetch(backendUrl + path);
//   return await response.json();
// }

// const SwipeContainer = () => {
//   const [openingsState, setOpeningsState]= useState([])

//   // const [numOpeninbgs, setNumOpenings] = useState(0)
//   // const [swipesState, setSwipesState] = useState([]);
//   // (()=>{
//   //   const {openings} = myGet('/openings')
//   // })();
//   // //TODO: change url to heroku link
//   // const data = async () => {

//   // const getOpenings = async () => {
//   //   const backendUrl = "http://localhost:5000/api/";
//   //   const response = await fetch(backendUrl + "opening/");
//   //   const data = await response.json();

//   //   setOpeningsState(openings);
//   // };

//   const postJobseekerSwipes= async () => {
//     const backendUrl = "http://localhost:5000/api/openings";
//     const response = await fetch(backendUrl + "/");
//     const data = await response.json();
//     const { opening: openings } = data;
//   }

//   const onswipe = (direction) => {
//     console.log('is a post i swear')
//   }

//   useEffect(async() => {
//     async function ourGet(path) {
//       const backendUrl = "http://localhost:5000/api/";
//       const response = await fetch(backendUrl + path);
//       const data = await response.json();
//       return data
//     }

//     const data = await ourGet('openings/');
//     debugger
//     setOpeningsState(data.opening)
//   });

//   return openingsState ? (
//     <div>
//       {openingsState.map(op =>
//       <div className="center-container">
//         <TinderCard
//           className="card"
//           key={'opening_id'}
//           preventSwipe={["up", "down"]}
//           onSwipe={onswipe}
//         >
//           <div className="swipe">
//             <div>{op.image}</div>
//             <div>{op.company_name}</div>
//             <div>{op.email}</div>
//             <div>{op.size}</div>
//             <div>{op.location}</div>
//             <div>{op.bio}</div>
//             <div>{op.title}</div>
//             <div>{op.description}</div>
//           </div>
//         </TinderCard>
//         <TinderCard
//           className="card"
//           key={'end_card'}
//           preventSwipe={["up", "down","left", "right"]}
//         ></TinderCard>
//       </div>)}
//     </div>
//   ) : null;
// };

// export default SwipeContainer;

import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import "../stylesheets/swipecontainer.css";
import "../stylesheets/tindercard.css";
const SwipeContainer = (props) => {
  //   const backendUrl = "http://localhost:5000/api/openings";
  const herokuUrl = "https://boiling-sands-04799.herokuapp.com/api/openings";
  const data = async () => {
    const response = await fetch(herokuUrl); // + '/'
    debugger;
    const { opening } = await response.json();
    setOpeningsState(opening);  
  };

  const [openingsState, setOpeningsState] = useState([
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

  useEffect(() => {
     data();
  }, [])
  ;
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
