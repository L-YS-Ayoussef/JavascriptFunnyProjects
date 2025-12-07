import React from 'react';

function Footer(){
    const currentYear = new Date().getFullYear();
    return <footer><p>Copyright ©️ Chameleon {currentYear}</p></footer>;
}

export default Footer;
