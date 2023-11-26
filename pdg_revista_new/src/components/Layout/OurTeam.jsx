/* import React from "react";

import "../../assets/css/components/Layout/team_member.css";
function TeamMember({
    RutaImagen,
    Nombre,
    ApellidoPaterno,
    ApellidoMaterno,
    Rol,
}) {
    const NombreCompleto = `${Nombre} ${ApellidoPaterno} ${ApellidoMaterno}`
    return (
        <article className="team-member">
            <div className="cont-1-team">
                <img src={RutaImagen} alt={NombreCompleto} />
                <h3>{NombreCompleto}</h3>
            </div>
            <div className="desc-pers">
                <h3>{Rol}</h3>
            </div>
        </article>
    );
}

export default TeamMember;
 */

import "../../assets/css/components/Layout/our_team.css";
import TeamMember from "../Card/TeamMember";
import User1 from "../../assets/resources/user1.svg";
import React, { useEffect, useState } from "react";

import { getEditorsData } from "../../api/content.api";
import config from "../../../config";

function OurTeam() {
    /*     const teamData = [
        {
            name: "RENZO VALENCIA",
            role: "Desarrollador",
            imageSrc: User1
        },
        {
            name: "JUAN PEREZ",
            role: "Diseñador",
            imageSrc: User1
        },
        {
            name: "ANA LOPEZ",
            role: "Gerente",
            imageSrc: User1
        }
        // ... Puedes agregar más miembros aquí
    ]; */

    const baseURL = config.contentPath;
    const [teamData, setTeamData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEditorsData();
                setTeamData(
                    data.map((section) => ({
                        ...section,
                        RutaImagen: `${baseURL}${section.RutaImagen}${section.NombreImagen}`,
                    }))
                );
            } catch (error) {
                console.error("Hubo un error al obtener los datos:", error);
            }
        };
        fetchData();
    }, []);
    console.log("teamData:", teamData);
    return (
        <section id="our-team">
            <h2>OUR TEAM</h2>
            <div className="members">
                {teamData.map((member, index) => (
                    <TeamMember
                        key={index}
                        name={`${member.Nombre} ${member.ApellidoPaterno}`}
                        role={member.Rol}
                        imageSrc={member.RutaImagen}
                    />
                ))}
            </div>
        </section>
    );
}

export default OurTeam;
