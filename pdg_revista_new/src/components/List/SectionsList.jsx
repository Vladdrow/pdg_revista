import React from "react";

function SectionsList({sections, showSections}) {
    return (
        <div id="show-sections"  className={`sections-list ${showSections ? 'show':''}`}>
            {sections.map((section, index) => (
                <a key={index} href={section.path}>
                    {section.name}
                </a>
            ))}
        </div>
    );
}

export default SectionsList;
