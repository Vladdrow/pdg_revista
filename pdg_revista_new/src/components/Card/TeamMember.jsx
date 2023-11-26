import React from "react";

function TeamMember({ name, role, imageSrc }) {
    return (
        <article className="team-member">
            <div className="cont-1-team">
                {imageSrc ? <img src={imageSrc} alt={name} /> : imageSrc}

                <h3>{name}</h3>
            </div>
            <div className="desc-pers">
                <h3>{role}</h3>
            </div>
        </article>
    );
}

export default TeamMember;
