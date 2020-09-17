import React from 'react';

const ExperienceCard = ({exp}) => {
    return(
        <div className="experience-card">
            <div>
                <div>{exp.title}</div>
                <div>{new Date(exp.date_start).toLocaleDateString()} - {new Date(exp.date_end).toLocaleDateString()}</div>
                <div>{exp.description}</div>
            </div>
        </div>
    )
}

export default ExperienceCard;