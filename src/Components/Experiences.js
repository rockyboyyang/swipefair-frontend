import React, { useEffect, useState } from "react";
import config from '../config'

const Experiences = ({allexperiences}) => {
    // const [allexperiences, setAllexperiences] = useState([])
    const id = JSON.parse(localStorage.getItem("jobseeker")).id

    // const getallexperiences = async () => {
    //     const res = await fetch(`${config.baseUrl}/jobseekers/${id}/experiences`);
    //     const data = await res.json()
    //     return data;
    // }

    // useEffect(() => {
    //     (async () => {
    //         const data = await getallexperiences()
    //         setAllexperiences(data.experiences)
    //     })();
    // }, [])

    // useEffect(() => {
    //     fetch(`${config.baseUrl}/jobseekers/${id}/experiences`, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     })
    //       .then((res) => res.json())
    //       .then(({ experiences }) => {
    //         setAllexperiences(experiences);
    //       });
    //   }, []);

  return( 
    <div>
        {allexperiences.map((exp) => {
            return (
                <>
                    <div>
                        <p>{exp.title}</p>
                        <p>{new Date(exp.date_start).toLocaleDateString()}</p>
                        <p>{new Date(exp.date_end).toLocaleDateString()}</p>
                        <p>{exp.description}</p>
                    </div>
                </>
            )
        })}
    </div>
    
    );
};

export default Experiences;
