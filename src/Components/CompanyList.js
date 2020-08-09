import React, {setState} from 'react'
import OpeningDetail from './OpeningDetail.js'

export default function CompanyList({company}) {
return <div>
      <div>{company.company_name}</div>
      <img src={company.image} alt="company-logo"/>
    </div>
}