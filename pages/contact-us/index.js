import React from 'react'
// import surat from '../Assets/img/surat.webp'
// import mubai from '../Assets/img/mubai.jpeg'
// import usa from '../Assets/img/usa.jpeg'
// import banner from '../Assets/img/contact-us.png'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Instagram from '@/src/Component/instagram';
import { createContactUs } from '@/src/redux/action/contactUsActions';


const Contact = () => {
    const disptach = useDispatch();
    const [isChecked, setIsChecked] = useState(false)
    const [inputform, setInputForm] = useState({
        name: '',
        email: "",
        phone_number: '',
        message: '',
    })
    const handleChange = (e) => {
        setInputForm((prevState) => ({
            ...prevState, [e.target.name]: e.target.value,
        }))
    }
    const Submitbtn = () => {
        localStorage.setItem('contact', JSON.stringify({ ...inputform, checked: isChecked }))
        disptach(createContactUs(inputform))
        toast('Inquired saved succesfully...')
        setInputForm({
            name: '',
            email: "",
            phone_number: '',
            message: '',

        })
        setIsChecked(!isChecked)
    }
    return (
        <div className="contact-us" style={{backgroundColor:'white'}}>
            <div className='contact-banner'>
                <div className='container'>
                    <img src={"/img/img/contact-us.png"} alt="img" className='w-100' style={{height:'300px',objectFit:'cover'}} />
                </div>
            </div>
            <div className='form-data mt-5'>
                <div className='container'>
                    <div className='appoinment-form-data'>
                        <div className='appoint-heading-box mb-3'>
                            <h2 className='appoinment-title pb-4'>Book An Appointment</h2>
                            <p className='appoinment-content'>We’re her to help you find the perfect jewellery: schedule a one-on-one phone. <br /> call with one of our jewelry experts.</p>
                        </div>
                        <div className='row'>
                            <div className='col-md-6 col-12'>
                                <form className='appoinment-form'>
                                    <input className='appoinment-input' name='name' value={inputform?.name} onChange={handleChange} placeholder='Your Name' type={"text"} />
                                    <input className='appoinment-input' name="email" value={inputform?.email} onChange={handleChange} placeholder='Your Email Address' type={"email"} />
                                    <input className='appoinment-input mb-0' name='phone_number' value={inputform?.phone_number} onChange={handleChange} placeholder='Your Mobile Phone' type={"text"} />
                                </form>
                            </div>
                            <div className='col-md-6 col-12 mt-md-0 mt-3'>
                                <textarea className='appoinment-area mb-0' name='message' value={inputform?.message} onChange={handleChange} placeholder='Your Message here' type={"text"} height={100} />
                            </div>
                            <div className='pt-4'>
                                <div className='d-md-flex d-block align-items-center justify-content-between'>
                                    <div className='d-flex align-items-start pe-md-4'>
                                        <input type={"checkbox"} checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} className="mt-2" />
                                        <p className='accept-content-data ps-3'>I accept the terms & conditions and I understand that my data will be hold securely in accordance with the privacy policy.</p>
                                    </div>
                                    <button className='send-message mt-md-0 mt-3' onClick={Submitbtn}>Send Message</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <div className='contact-ofc-title'>
                            <h3 className='our-office-title'>Our Offices</h3>
                        </div>
                        <div className='row m-0'>
                            <div className='col-md-4 col-12 mb-md-0 mb-4 p-0 px-lg-2 px-md-2'>
                                <div className='loacation-box text-start position-relative'>
                                    <img src={"/img/img/mubai.jpeg"} alt="img" />
                                    <div className='location-detail-box'>
                                        <p className='location-name'>Mumbai</p>
                                        <p className='location-address'>EW-8012, Bharat Diamond Bourse, Bandra Kurla Complex, Bandra East, Mumbai-400051, India</p>
                                        <a href='mailto:Viannejewels@Gmail.com' className='contact-mail d-inline-block'>indiaviannejewels@gmail.com</a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4 col-12 mb-md-0 mb-4 p-0 px-lg-2 px-md-2'>
                                <div className='loacation-box text-start position-relative'>
                                    <img src={"/img/img/surat.webp"} alt="img" />
                                    <div className='location-detail-box'>
                                        <p className='location-name'>Surat</p>
                                        <p className='location-address'>PLOT NO. 07-08 KARSHAN KAKA NI CHAWL, Sumul Dairy Rd, Opp. SKATING GROUND, Katargam, Surat, Gujarat 395006</p>
                                        <a href='mailto:Viannejewels@Gmail.com' className='contact-mail d-inline-block'>indiaviannejewels@gmail.com</a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4 col-12 p-0 px-lg-2 px-md-2'>
                                <div className='loacation-box text-start position-relative'>
                                    <img src={"/img/img/usa.jpeg"} alt="img" />
                                    <div className='location-detail-box'>
                                        <p className='location-name'>USA</p>
                                        <p className='location-address'>1145, One Rockefeller Plaza, New York, NY 10020, USA.</p>
                                        <a href='mailto:Viannejewels@Gmail.com' className='contact-mail d-inline-block'>viannejewels@gmail.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='py-5'>
                        <iframe src="https://www.google.com/maps/d/embed?mid=1j-FHmarn2ij-qgWjl70N8YzxzbJWrmo&ehbc=2E312F" height="450" style={{ border: 0, width: '100%' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
                <Instagram />
            </div>
        </div>
    )
}
export default Contact;