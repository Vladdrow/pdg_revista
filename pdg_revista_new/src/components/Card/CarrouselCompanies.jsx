import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "../../assets/css/components/Card/carrousel_companies.css";

// Instala los módulos que usarás (en este caso, Navigation)

function CarrouselCompanies({ imagesData, title = "Nuestros clientes", home = false }) {
    return (
        <section id={`carrousel-companies`} className="skyblue">
            <h2>{title}</h2>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={30} // Espacio entre diapositivas
                slidesPerView={3} // Número de diapositivas visibles a la vez por defecto (PC)
                /* navigation */ // Habilita las flechas de navegación
                pagination={{ clickable: true }}
                /* scrollbar={{ draggable: true }} */
                /* onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")} */ /* Indican en la consola cuando hay un swipe */
                loop={true}
                allowTouchMove={true}
                autoplay={{
                    delay: 0, // Intervalo entre cambios de diapositiva, en milisegundos. Por defecto es 5000 (5 segundos).
                    disableOnInteraction: false, // Si quieres que el autoplay se detenga después de que el usuario interactúa con el carrusel, configúralo a `true`.
                    pauseOnMouseEnter: true,
                }}
                speed={6000}
                breakpoints={{
                    1600: {
                        slidesPerView: home ? 5 : 2,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: home ? 4 : 2,
                        spaceBetween: 30,
                    },
                    // Cuando el ancho de la ventana es <= 768px
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    600: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    // Cuando el ancho de la ventana es <= 480px
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    380: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                }}
            >
                {imagesData.map((imageData, index) => (
                    <SwiperSlide key={index}>
                        <a href={imageData.url} target="_blank" rel="noopener noreferrer">
                            <img
                                src={imageData.src}
                                alt={`Descripción de la imagen ${index + 1}`}
                            />
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div class="custom-shape-divider-bottom-1700410661">
                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        opacity=".25"
                        class="shape-fill"
                    ></path>
                    <path
                        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                        opacity=".5"
                        class="shape-fill"
                    ></path>
                    <path
                        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                        class="shape-fill"
                    ></path>
                </svg>
            </div>
        </section>
    );
}

export default CarrouselCompanies;
