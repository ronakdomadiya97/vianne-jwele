import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

const About = () => {
    return (
        <div className="about-page">
            <section className="about-banner mb-5" style={{ padding: '0px' }}>
                <div className="container">
                    {/* <video autoPlay="autoPlay" loop="loop" muted width="100%">
                        <source src="https://www.svaraa.com/media/videos/svaraa_home.mp4" height={200} type="video/mp4" />
                    </video> */}
                    <div className="section-title mt-5">
                        <h2 className="section-main-title mb-0">About</h2>
                    </div>
                    <div>
                        <div className="row align-items-center">
                            <div className="col-lg-6 position-1 mt-5">
                                <div className="left-descrption text-start">
                                    <h3 className="since-start">SINCE</h3>
                                    <h4 className="descrption-title text-start">1983</h4>
                                    <p className="descrption-subtitle text-start">Our story begins with the remarkable journey of Mr Arjanbhai Lathiya who Started with just a handful of diamond polishing machines in 1983, he said the foundation for N.J Gems, an industry trailblazer by 2000, thanks to the collaboration of his sons, Naresh Lathiya and Jayesh Lathiya, and their partner, Janak Miyani. </p>
                                    <p className="descrption-subtitle text-start">As the world shifted towards innovation, N. J Gems pivoted masterfully in mined diamonds. In 2018, they introduced Anjal Gems, specializing in Lab-Grown Diamonds, positioning them at the cutting edge of industry evolution.

                                        Now, in 2022, the firm unveils VIANNE JEWELS a brand aims to redefine luxury, making diamond jewelry an attainable dream for many.

                                        From humble beginnings to industry leadership, the legacy shines as brightly as the gems they craft.</p>
                                    {/* <button className="discover-now-btn mt-4">Discover Now</button> */}
                                </div>
                            </div>
                            <div className="col-lg-6 position-0 mt-5">
                                <img style={{ objectFit: 'cover' }} src={"/img/img/creft.jpg"} height={400} alt="img" />
                            </div>
                            <div className="col-lg-4 position-2 mt-lg-0 mt-3">
                                <img style={{ objectFit: 'cover' }} src={"img/designs.jpg"} height={315} alt="img" />
                            </div>
                            <div className="col-lg-8 mt-lg-5 mt-3 position-5">
                                <div className="left-descrption">
                                    <h4 className="descrption-title text-start">About Us</h4>
                                    <p className="descrption-subtitle text-start">Vianne Jewels, a groundbreaking jewelry brand committed to sustainability, ethical sourcing, and social responsibility.</p>
                                    <p className="descrption-subtitle text-start">We embraces innovation by using lab-grown diamonds and gemstones in our creations, ensuring that our products are conflict-free and environmentally friendly. We also utilize recycled precious metals, further minimizing our ecological footprint and promoting responsible sourcing in the jewelry industry.</p>
                                    <p className="descrption-subtitle text-start">Transparency and traceability are central to our brand ethos. Vianne Jewels is dedicated to providing an exceptional customer experience. Our personalized approach ensures that every customer receives the attention and care they deserve.</p>
                                </div>


                            </div>
                           
                            
                            <div className="col-lg-8 position-3 mt-lg-0 mt-3">
                                <div className="left-descrption">
                                    <h4 className="descrption-title text-start">Our Vision</h4>
                                    <p className="descrption-subtitle text-start">Our vision is to transform the luxury landscape, crafting stunning pieces that balance aesthetic allure with an unwavering respect for our planet. We are striving for a world where every diamond tells a story of innovation, responsibility, and ethical brilliance. </p>
                                </div>
                            </div>
                            <div className="col-lg-4 position-2 mt-lg-0 mt-3">
                                <img style={{ objectFit: 'cover' }} src={"/img/img/designs.jpg"} height={315} alt="img" />
                            </div>
                            <div className="col-lg-4 mt-lg-5 mt-3 position-4">
                                <img style={{ objectFit: 'cover' }} src={"/img/img/creft.jpg"} height={315} alt="img" />
                            </div>
                            <div className="col-lg-8 mt-lg-5 mt-3 position-5">
                                <div className="left-descrption">
                                    <h4 className="descrption-title text-start">Our Mission</h4>
                                    <p className="descrption-subtitle text-start">Our mission at Vianne Jewels is to craft breathtaking jewelry using innovative materials like lab-grown diamonds and recycled metals. We aim to inspire our customers with not only the allure of our designs, but also with the knowledge that each piece they wear contributes to a healthier, more sustainable planet.</p>
                                </div>
                            </div>
                            
                          
                            <div className="col-lg-8 mt-lg-5 mt-3 position-7">
                                <div className="left-descrption">
                                    <h4 className="descrption-title text-start">Lab Grown Diamonds</h4>
                                    <p className="descrption-subtitle text-start4">Vianne Jewels, a groundbreaking jewelry brand committed to sustainability, ethical sourcing, and social responsibility.
                                        We embraces innovation by using lab-grown diamonds and gemstones in our creations, ensuring that our products are conflict-free and environmentally friendly. We also utilize recycled precious metals, further minimizing our ecological footprint and promoting responsible sourcing in the jewelry industry.</p>
                                </div>
                            </div>
                              <div className="col-lg-4 mt-lg-5 mt-3 position-6">
                                <img src={"/img/img/labgrown.jpg"} style={{ objectFit: 'cover' }} alt="img" height={315} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="team-section mt-0">
                <div className="container">
                    <div className="section-title">
                        <h2 className="section-main-title mb-3">Our Team</h2>
                    </div>
                    <div className="row pt-5 team-row align-items-start">
                        <div className="col-lg-5">
                            <div className="team-img">
                                <img src={labgrown} alt="team img" />
                            </div>
                        </div>
                        <div className="col-lg-7 mt-lg-0 mt-4 mb-lg-0 mb-4">
                            <div className="people-detail position-relative">
                                <h4 className="position-title text-start">Founder & MD</h4>
                                <h3 className="owner-name text-start">Naman Lathiya</h3>
                                <p className="position-descrption mt-lg-0 mt-4 team-primary-member text-start ">Mr. Nilay Kheni the Founder of Vianne. The Visionary man plays a significant role in the all-around development of The 'Kalamandir Jewellers-The Pride of Gujarat'. He owns the expertise of over more than 25 years in the Jewellery industry and in simple words, he's a complete library of knowledge of Jewellery & Diamonds.
                                    <br />  Vianne is being nurtured under the leadership of Mr.Nilay Kheni with a vision of providing the most exemplary and world-class diamond jewellery to people.</p>
                            </div>
                        </div>
                        <div className="col-lg-7 mt-lg-0 mt-4 team-detail pt-lg-5">
                            <div className="people-detail position-relative">
                                <h4 className="position-title text-lg-end text-start">Founder & MD</h4>
                                <h3 className="owner-name text-lg-end text-start">Nilay Kheni</h3>
                                <p className="position-descrption mt-lg-0 mt-4 team-second-member  text-start">Mr. Nilay Kheni the Founder of Vianne. The Visionary man plays a significant role in the all-around development of The 'Kalamandir Jewellers-The Pride of Gujarat'. He owns the expertise of over more than 25 years in the Jewellery industry and in simple words, he's a complete library of knowledge of Jewellery & Diamonds.
                                    <br />  Vianne is being nurtured under the leadership of Mr.Nilay Khenih with a vision of providing the most exemplary and world-class diamond jewellery to people.</p>
                            </div>
                        </div>
                        <div className="col-lg-5 team-img pt-lg-0 pt-3">
                            <div className="team-img">
                                <img src={labgrown} alt="team img" />
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
        </div>
    )
}
export default About;