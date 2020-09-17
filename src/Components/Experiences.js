import React from "react";
import ExperienceCard from "./ExperienceCard";

const Experiences = ({ allexperiences }) => {

  return (
    <div className="experiences-container">
      {allexperiences.map((exp) => {
        return (
          <div key={exp.id}>
            <ExperienceCard  exp={exp} />
          </div>
        );
      })}
    </div>
  );
};

export default Experiences;
