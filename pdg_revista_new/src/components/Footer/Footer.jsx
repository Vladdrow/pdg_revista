import React from "react";
import LogoLogistica from "../../assets/resources/logo-revista.png";
import "../../assets/css/components/Footer/footer.css";
import IconDiscord from "../../assets/resources/icons/logo_discord.png";
import IconFacebook from "../../assets/resources/icons/logo_facebook.png";
import IconInstagram from "../../assets/resources/icons/logo_instagram.png";
import IconTwitter from "../../assets/resources/icons/logo_twitter.png";

function Footer() {
    const socialNetwork = [
        { src: IconDiscord, name: "Discord" },
        { src: IconFacebook, name: "Facebook" },
        { src: IconInstagram, name: "Instagram" },
        { src: IconTwitter, name: "Twitter" },
    ];
    return (
        <footer>
            <div className="content-wrapper">
                <section id="icon-company">
                    <img src={LogoLogistica} alt="" />
                </section>
                <section>
                    <h4>:: Oficina Central - RCE Santa Cruz</h4>
                    <address>
                        Dirección: Calle Tte. Cueto #3056 (Av. Alemana y 4° anillo)
                        <br />
                        Telf: (591 3) 3324981 / 332 4977 <br />
                        WhatsApp: (+591) 70075310 (+591) 70953095 <br />
                        Email: contactoe@cotas.com.bo
                    </address>
                </section>
                <section id="social-networks">
                    <h4>Redes Sociales</h4>
                    {socialNetwork.map((social, index) => (
                        <div key={social.name}>
                            {" "}
                            {/* Use the social network's name as the key */}
                            <img src={social.src} alt={social.name} width={50} />
                        </div>
                    ))}
                </section>
            </div>
            <section id="copyright">
                <p>Copyright © 2023 CadenaLogistica | Todos los derechos reservados.</p>
            </section>
        </footer>
    );
}

export default Footer;
