import React, {setState} from 'react'
import OpeningDetail from './OpeningDetail.js'

export default function CompanyList({company_name, openings, image, jobseeker_name}) {
  
// return <>
//       <div>{company_name}</div>
//       <img style={{height:'50px', width:'50px'}}src={image} alt='logo'></img>
//       <div> Matched on <span> {openings.length} # Openings!</span></div>
//     </>
  return (
  <>
    <div className="matched-box">
      <img style={{ height: '50px', width: '50px' }} src={image} alt='logo'></img>
      <div className="openingAndCompany">
        <h3>{company_name}</h3>
        <h5 className="openingTitle">{openings[0].title}</h5>
      </div>
    </div>
  </>
  )
}