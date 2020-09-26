import React, {setState, useState, useEffect} from 'react'
import OpeningDetail from './OpeningDetail.js'
import backendURL from '../backendURL'

export default function CompanyList({name, openings, image, matchesState, jobseekerState, companyState}) {
  const [openingIdState, setOpeningIdState] = useState('')
// return <>
//       <div>{company_name}</div>
//       <img style={{height:'50px', width:'50px'}}src={image} alt='logo'></img>
//       <div> Matched on <span> {openings.length} # Openings!</span></div>
//     </>
  let role;
  let id;
  if (companyState !== undefined) {
    try {
      console.log(true)
      id = companyState.id
    } catch (e) {

    }
  }

  if (jobseekerState !== undefined) {
    try {
      id = jobseekerState.id
    } catch (e) {

    }
  }

  jobseekerState !== undefined ? role = 'jobseekers' : role = 'companies'

  const herokuUrl = backendURL + `api/${role}/${id}/chats`
  const [chatsState, setChatsState] = useState([])
  const data = async () => {
    console.log(id, role)
    const response = await fetch(herokuUrl); // + '/'
    const { chats } = await response.json();
    setChatsState(chats);
  };

  useEffect(() => {
    data()
  }, [])

  return (
  <>
    <div className="matched-box">
      <img style={{ height: '50px', width: '50px' }} src={image} alt='logo'></img>
      <div className="openingAndCompany">
        <h3>{name}</h3>
        <h5 className="openingTitle">{openings[0].title}</h5>
      </div>
    </div>
  </>
  )
}