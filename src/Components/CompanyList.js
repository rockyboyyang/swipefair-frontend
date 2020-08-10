import React, {setState} from 'react'
import OpeningDetail from './OpeningDetail.js'

export default function CompanyList({company_name, openings, image}) {
  
return <>
      <div>{company_name}</div>
      <img style={{height:'50px', width:'50px'}}src={image} alt='logo'></img>
      <div> Matched on <span> {openings.length} # Openings!</span></div>
          
    </>
}