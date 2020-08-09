import React from "react";
import Navbar from "../Navbar";
import MatchesContainer from "../MatchesContainer";
import SwipeContainer from "../SwipeContainer";
import AboutUsContainer from "../AboutUsContainer";
import '../../stylesheets/homeview.css'
// import {ourGet} from '../utils'



const Home = () => {
  const jobseekerId = JSON.parse(localStorage.jobseeker).id

  const jobseekerMatchesUrl = `http://localhost:5000/api/jobseekers/${jobseekerId}/matches`;

  const [openingsState, setOpeningsState] = useState([]);
  const [matchesState, setMatchesState] = useState([]);
  const fetchMatches = async () => {
    const res = await fetch(jobseekerMatchesUrl); // + '/'
    const { matches } = await res.json();
    setMatchesState(matches);
  };

      useEffect(() => {
      (async() => {

        await fetchMatches();
      })();
      debugger
    }, [])

  return (
    <div className='home-view'>
      <Navbar />
      <MatchesContainer matchesState={matchesState}/>
      <SwipeContainer fetchMatches={fetchMatches}  setMatchesState={setMatchesState}/>
      <AboutUsContainer />
    </div>
  );
};

export default Home;
