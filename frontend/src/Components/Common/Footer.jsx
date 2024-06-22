import React from 'react';
import { FaFacebook, FaLinkedin, FaPhoneSquareAlt, FaTwitter } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import "./Common_Styles/Footer.css";

function Footer() {
    return (
        <div className='footer'>
            <div className='footer_content'>
                <div className='footer_column'>
                    <img src='/Images/logo2.png' alt='logo' className='image_w'/>
                    <p>
                        A secure and efficient solution for managing university attendance using biometric fingerprint recognition and web technology.
                    </p>
                </div>
                <div className='footer_column'>
                    <h5>CONTACT US</h5>
                    <p>Faculty of Engineering, Hapugala, Galle, Sri Lanka.</p>
                    <p><MdMail /> Email: fingertrax22@gmail.com</p>
                    <p><FaPhoneSquareAlt /> Phone: +(94)0 91 2245765/6</p>
                </div>
                <div className='footer_column'>
                    <h5>FOLLOW US ON</h5>
                    <div className='social_media_links'>
                        <a href='https://www.linkedin.com/company/universityofruhuna/'><FaLinkedin /></a>
                        <a href='https://web.facebook.com/EfacUOR/events/?locale2=fo_FO&paipv=0&eav=Afb67KBTMEQ6u4Q4JZhwBy6g2wgyXnPLLIuBpOA4DDhfdE0N7t2A5X3lx4Ux5lUbXa4&_rdc=1&_rdr'><FaFacebook /></a>
                        <a href='https://www.eng.ruh.ac.lk/dmme/'><FaTwitter /></a>
                    </div>
                </div>
            </div>
            <hr/>
            <div className='footer_end'>
            <p>Copyright © Fingerprint Recognition Attendance Tracking System-2024. All rights reserved.</p>
            </div>
            </div>
    );
}

export default Footer;
