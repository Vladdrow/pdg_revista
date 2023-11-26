import React from "react";
import "../../assets/css/components/Layout/text_blocks.css";
import contenedor from "../../assets/resources/contenedor.png";
import engranaje from "../../assets/resources/engranaje.png";
import Bars from "../../assets/resources/bars-graphic.svg";

function TextBlocks() {
    // Aquí creamos el array con las imágenes y textos para cada contenedor

    return (
        <section id="text-blocks-section">
            <h2>LIDERES EN SOLUCIONES LOGISTICAS</h2>
            <h3>Impulsando negocios con datos precisos y operaciones optimizadas.</h3>
            {blocks.map((block, idx) => (
                <div className="text-block" key={idx}>
                    <div className="txt-block-img">
                        {/* <img src={block.imgSrc} alt="Descripción imagen" /> */}
                        {block.imgSrc}
                    </div>
                    <div className="txt-block-desc">
                        <p className="stadistics-number">{block.stadistics}</p>
                        <p>{block.text}</p>
                    </div>
                </div>
            ))}
            <div className="two-column-text">
                <div className="column-txt">
                    <p>
                        En la vanguardia de la conectividad global y la eficiencia operativa,
                        nuestra Guía Empresarial Logística es la herramienta definitiva para
                        profesionales y negocios que buscan forjar conexiones esenciales en la
                        industria. Con un compendio exhaustivo de contactos, desde proveedores de
                        transporte internacional hasta expertos en la gestión de la cadena de
                        suministro, este directorio es más que una simple lista de números: es un
                        puente hacia la optimización logística y la colaboración estratégica.
                    </p>
                </div>
                <div className="column-txt">
                    <p>
                        Este recurso es el resultado de un análisis detallado y una recopilación de
                        datos, garantizando que cada entrada no solo cumpla con los más altos
                        estándares de servicio, sino que también esté al día con las innovaciones
                        más recientes en logística y tecnología de transporte. Con el compromiso de
                        mantener una fuente de información precisa y actualizada, invitamos a las
                        empresas a sumarse a nuestra red creciente, y a los usuarios a aprovechar
                        las oportunidades que nuestro directorio ofrece para expandir sus
                        operaciones y mejorar sus cadenas de suministro con confianza y facilidad.
                    </p>
                </div>
            </div>
        </section>
    );
}

const blocks = [
    {
        imgSrc: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 1024 1024"
            >
                <path
                    fill="#000000"
                    d="M1024 959.5q0 26.5-19 45.5t-45 19H64q-27 0-45.5-18.5T0 960t18.5-45.5T64 896V576q0-27 18.5-45.5T128 512h128q26 0 45 18.5t19 45.5v320h64V64q0-27 18.5-45.5T448 0h128q27 0 45.5 18.5T640 64v832h64V320q0-27 19-45.5t45-18.5h128q27 0 45.5 18.5T960 320v576q27 0 45.5 18.5t18.5 45z"
                />
            </svg>
        ),
        stadistics: "+10k",
        text: "Empresas registradas",
    },
    /* { imgSrc: engranaje, stadistics: "+5", text: "" }, */
    {
        imgSrc: (
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14">
                <path
                    fill="#000000"
                    fill-rule="evenodd"
                    d="M7.207.478a.5.5 0 0 0-.414 0L4.17 1.672L6.998 2.96l2.83-1.289L7.207.478ZM3.7 5.61V2.556l2.8 1.275v3.375L3.991 6.065a.5.5 0 0 1-.293-.455Zm3.8 6.712v-3.34l2.652 1.208v3.375l-2.506-1.141a.5.5 0 0 1-.147-.102Zm3.652 1.245V10.19l2.803-1.276v3.055a.5.5 0 0 1-.293.455l-2.51 1.143ZM6.498 8.982v3.344a.5.5 0 0 1-.143.098l-2.51 1.143V10.19l2.653-1.208ZM2.845 10.19v3.375L.34 12.424a.5.5 0 0 1-.293-.455V8.915l2.8 1.275Zm4.653-2.982V3.83l2.803-1.276V5.61a.5.5 0 0 1-.293.455l-2.51 1.143Zm2.948-.37a.5.5 0 0 1 .414 0l2.62 1.192l-2.83 1.289L7.825 8.03l2.622-1.194Zm-7.306 0a.5.5 0 0 1 .414 0l2.62 1.192l-2.829 1.29L.518 8.03L3.14 6.837Z"
                    clip-rule="evenodd"
                />
            </svg>
        ),
        stadistics: "+10",
        text: "Sectores cubiertos",
    },
    {
        imgSrc: (
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
                <path
                    fill="#000000"
                    d="M21.053 20.8c-1.132-.453-1.584-1.698-1.584-1.698s-.51.282-.51-.51s.51.51 1.02-2.548c0 0 1.413-.397 1.13-3.68h-.34s.85-3.51 0-4.7c-.85-1.188-1.188-1.98-3.057-2.547s-1.188-.454-2.547-.396c-1.36.058-2.492.793-2.492 1.19c0 0-.85.056-1.188.396c-.34.34-.906 1.924-.906 2.32s.283 3.06.566 3.625l-.337.114c-.284 3.283 1.13 3.68 1.13 3.68c.51 3.058 1.02 1.756 1.02 2.548s-.51.51-.51.51s-.452 1.245-1.584 1.698c-1.132.452-7.416 2.886-7.927 3.396c-.512.51-.454 2.888-.454 2.888H29.43s.06-2.377-.452-2.888c-.51-.51-6.795-2.944-7.927-3.396zm-12.47-.172c-.1-.18-.148-.31-.148-.31s-.432.24-.432-.432s.432.432.864-2.16c0 0 1.2-.335.96-3.118h-.29s.144-.59.238-1.334a10.01 10.01 0 0 1 .037-.996l.038-.426c-.02-.492-.107-.94-.312-1.226c-.72-1.007-1.008-1.68-2.59-2.16c-1.584-.48-1.01-.384-2.16-.335c-1.152.05-2.112.672-2.112 1.01c0 0-.72.047-1.008.335c-.27.27-.705 1.462-.757 1.885v.28c.048.654.26 2.45.47 2.873l-.286.096c-.24 2.782.96 3.118.96 3.118c.43 2.59.863 1.488.863 2.16s-.432.43-.432.43s-.383 1.058-1.343 1.44l-.232.092v5.234h.575c-.03-1.278.077-2.927.746-3.594c.357-.355 1.524-.94 6.353-2.862zm22.33-9.056c-.04-.378-.127-.715-.292-.946c-.718-1.008-1.007-1.68-2.59-2.16c-1.583-.48-1.007-.384-2.16-.335c-1.15.05-2.11.672-2.11 1.01c0 0-.72.047-1.008.335c-.27.272-.71 1.472-.758 1.89h.033l.08.914c.02.23.022.435.027.644c.09.666.21 1.35.33 1.59l-.286.095c-.24 2.782.96 3.118.96 3.118c.432 2.59.863 1.488.863 2.16s-.43.43-.43.43s-.054.143-.164.34c4.77 1.9 5.927 2.48 6.28 2.833c.67.668.774 2.316.745 3.595h.48V21.78l-.05-.022c-.96-.383-1.344-1.44-1.344-1.44s-.433.24-.433-.43s.433.43.864-2.16c0 0 .804-.23.963-1.84V14.66c0-.018 0-.033-.003-.05h-.29s.216-.89.293-1.862v-1.176z"
                />
            </svg>
        ),
        stadistics: "+1k",
        text: "Usuarios registrados",
    },
    {
        imgSrc: (
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <g fill="#000000">
                    <path d="m20.27 16.265l.705-4.08a1.666 1.666 0 0 0-1.64-1.95h-5.181a.833.833 0 0 1-.822-.969l.663-4.045a4.783 4.783 0 0 0-.09-1.973a1.635 1.635 0 0 0-1.092-1.137l-.145-.047a1.346 1.346 0 0 0-.994.068c-.34.164-.588.463-.68.818l-.476 1.834a7.628 7.628 0 0 1-.656 1.679c-.415.777-1.057 1.4-1.725 1.975l-1.439 1.24a1.67 1.67 0 0 0-.572 1.406l.812 9.393A1.666 1.666 0 0 0 8.597 22h4.648c3.482 0 6.453-2.426 7.025-5.735Z" />
                    <path
                        fill-rule="evenodd"
                        d="M2.968 9.485a.75.75 0 0 1 .78.685l.97 11.236a1.237 1.237 0 1 1-2.468.107V10.234a.75.75 0 0 1 .718-.749Z"
                        clip-rule="evenodd"
                    />
                </g>
            </svg>
        ),
        stadistics: "+5k",
        text: "Clientes satisfechos",
    },
];
export default TextBlocks;
