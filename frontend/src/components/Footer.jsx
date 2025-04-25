import React from "react";
import '../styles/footer.css';

const Footer = () => {
    const textStyle = {
        margin: 0,
        fontSize: "14px",
        textAlign: "center",
    };

    return (
        <div className="FooterContainer">
            <p style={textStyle}>
                © Eulogio "Amang" Rodriguez Institute of Science and Technology - Manila Campus 2025
            </p>
        </div>
    );
};

export default Footer;
