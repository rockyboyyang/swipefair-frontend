import React from "react";
import "../stylesheets/experiencecard.css";

const ExperienceCard = ({ exp }) => {
  return (
    <div className="experience-card">
      <div className="experience-card-title-dates">
        <div className="experience-card-title">{exp.title}</div>
        <div>
          {new Date(exp.date_start).toLocaleDateString()} -{" "}
          {new Date(exp.date_end).toLocaleDateString()}
        </div>
      </div>
      <div className="experience-card-description">{exp.description}</div>
    </div>
  );
};

export default ExperienceCard;
