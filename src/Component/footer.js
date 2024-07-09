import React from "react";
import Image from "next/image";
import { NavLink } from "react-bootstrap";
import Link from "next/link";

const Footer = (props) => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="footer-left text-start">
                            <img src={'https://api.viannejewels.com/wp-content/uploads/2023/03/logo-2-2.png.webp'} alt="" className="footer-logo" />
                            <p className="pt-3">EW-8012, Bharat Diamond Bourse, Bandra Kurla Complex, Bandra East, Mumbai-400051, India</p>
                            <ul className="d-flex align-items-center pt-4 footer-social">
                                <li className="pe-2">
                                    <a href="https://www.facebook.com/profile.php?id=100091311095830" target="_blank" style={{ cursor: 'pointer' }}>
                                        <Image width={35} height={35} src={"/img/img/fb.png"} alt="img" />
                                    </a>
                                </li>
                                <li className="pe-2"><a href="https://www.linkedin.com/company/viannejewels/about/" target="_blank" style={{ cursor: 'pointer' }}><Image width={35} height={35} src={"/img/img/in.png"} alt="img" /></a></li>
                                <li className="pe-2"><a href="https://www.instagram.com/viannejewels" target="_blank" style={{ cursor: 'pointer' }}><Image width={35} height={35} src={"/img/img/insta.png"} alt="img" /></a></li>
                                <li><a href="https://twitter.com/viannejewels" target="_blank" style={{ cursor: 'pointer' }}><Image width={35} height={35} src={"/img/img/x.png"} alt="img" /></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-lg-4 pt-lg-0 pt-4">
                                <div className="footer-column">
                                    {/* <h4 className="footer-column-title">Quick Links</h4> */}
                                    <ul className="footer-list-home">
                                        <li
                                            className="nav-sub-category"
                                            style={{ fontWeight: '500', }}
                                        >
                                            <NavLink to={"/"}
                                                className="active-text"
                                                activeClassName="active"
                                            >
                                                Home
                                            </NavLink>
                                        </li>
                                        <li
                                            className="nav-sub-category"
                                            style={{ fontWeight: '500' }}
                                        >
                                            <NavLink to={"/about-us"}
                                                className="active-text"
                                                activeClassName="active"
                                            >
                                                About Us
                                            </NavLink>

                                        </li>
                                        <li
                                            className="nav-sub-category"
                                            style={{ fontWeight: '500' }}
                                        >
                                            <NavLink to={"/contact-us"}
                                                className="active-text"
                                                activeClassName="active"
                                            >
                                                Contact Us
                                            </NavLink>
                                        </li>

                                        <li
                                            className="nav-sub-category"
                                            style={{ fontWeight: '500' }}
                                        >
                                            <NavLink
                                                to={"/blog"}
                                                className="active-text"
                                                activeClassName="active"
                                            >
                                                Blog
                                            </NavLink>

                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 pt-lg-0 pt-4">
                                <div className="footer-column">
                                    <h4 className="footer-column-title">Polices</h4>
                                    <ul className="footer-list">
                                        <li
                                            className="nav-sub-category"
                                            style={{ fontWeight: '500', color: "#222" }}
                                        >
                                            <Link href={"/terms-condition"}>
                                                Terms & condition
                                            </Link>
                                        </li>
                                        <li
                                            className="nav-sub-category"
                                            style={{ fontWeight: '500', color: "#222" }}
                                        >
                                            <Link href={"/privacy-policy"}>
                                                Privacy Plolices
                                            </Link>
                                        </li>
                                        <li
                                            className="nav-sub-category"
                                            style={{ fontWeight: '500', color: "#222" }}
                                        >
                                            <Link href={"/return-policy"}>
                                                Return Polices
                                            </Link>
                                        </li>
                                        <li
                                            className="nav-sub-category"
                                            style={{ fontWeight: '500', color: "#222" }}
                                        >
                                            <Link href={"/shipping-policy"}>
                                                Shipping Polices
                                            </Link>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 pt-lg-0 pt-4">
                                <div className="footer-column">
                                    <h4 className="footer-column-title">Contact</h4>
                                    <ul className="footer-list">
                                        <li>
                                            <a href="mailto:viannejewels@gmail.com">viannejewels@gmail.com</a>
                                        </li>
                                        <li>
                                            <a href="tel:123456879">+91 7990959811</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <div className="d-flex align-items-center justify-content-center">
                            <input className="email-input" type={"email"} placeholder="Email address" />
                            <button className="subscribe-btn">Subscribe</button>
                        </div> */}
                    </div>
                </div>
                <div className="footer-bottom pt-4">
                    <div className="footer-bottom-title">
                        <p>Copyright © 2023 Vianne Jewels. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer;