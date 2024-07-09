import React from "react";
import { useState } from "react";
import { FaBook, FaRegCalendarAlt } from "react-icons/fa";
import { LuClipboardCheck, LuMoveRight } from "react-icons/lu";
import { BsGrid } from "react-icons/bs";
import { LuCheckCircle2 } from "react-icons/lu";
import { FaMountainSun } from "react-icons/fa6";
import { LuMoveLeft } from "react-icons/lu";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-toastify';
import moment from "moment";
import { useSelector, useDispatch } from 'react-redux';
import { createBookAppoinment } from "@/src/redux/action/contactUsActions";

const morningSlot = [
    {start: "9:00", end: "10:00", formatted_start_time: "9:00 am", formatted_end_time: "10:00 am"},
    {start: "10:00", end: "11:00", formatted_start_time: "10:00 am", formatted_end_time: "11:00 am"},
    {start: "11:00", end: "12:00", formatted_start_time: "11:00 am", formatted_end_time: "12:00 pm"},
]

const afternoonSlot = [
    {start: "12:00", end: "1:00", formatted_start_time: "12:00 pm", formatted_end_time: "1:00 pm"},
    {start: "1:00", end: "2:00", formatted_start_time: "1:00 pm", formatted_end_time: "2:00 pm"},
    {start: "2:00", end: "3:00", formatted_start_time: "2:00 pm", formatted_end_time: "3:00 pm"},
    {start: "3:00", end: "4:00", formatted_start_time: "3:00 pm", formatted_end_time: "4:00 pm"},
]

const eveningSlot = [
    {start: "4:00", end: "5:00", formatted_start_time: "4:00 pm", formatted_end_time: "5:00 pm"},
]
const BookAppoinment = () => {
    const [tab, setTabs] = useState(0);
    const [selectCategory, setSelectCategory] = useState("all");
    const [selectService, setSelectService] = useState(null);
    const [selectDate, setSelectDate] = useState(new Date());
    const [selectTime, setSelectTime] = useState(null);
    const [book_appointment_first_name, setBook_appointment_first_name] = useState("");
    const [book_appointment_last_name, setBook_appointment_last_name] = useState("");
    const [book_appointment_contact_number, setBook_appointment_contact_number] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const disptach = useDispatch();

    const tileDisabled = ({ date }) => {
        return date.getDay() === 0 || date < new Date();
    };

    const handleBookAppoinment = () => {
        let params = {
            book_appointment_first_name: book_appointment_first_name,
            book_appointment_last_name: book_appointment_last_name,
            book_appointment_contact_number: book_appointment_contact_number,
            email: email,
            book_appointment_date: moment(selectDate).format("YYYY-MM-DD"),
            book_appointment_time: selectTime?.start,
            day_name: moment(selectDate).format("dddd")
        }
        if(message) {
            params.message = message
        }
        let res = disptach(createBookAppoinment(params))
        if(res) {
            toast("Appointment created successfully")
            setBook_appointment_first_name("");
            setBook_appointment_last_name("");
            setBook_appointment_contact_number("");
            setEmail("")
            setMessage("");
            setSelectDate(new Date());
            setSelectTime(null);
            setSelectService(null);
            setSelectCategory("all");
            setTabs(0);
        }
    }
    return (
        // <div>book appoinment</div>
        <div className="appoinment" style={{ marginTop: 50 }}>
            <div className="container">
                <div className="row">
                    <div className="container">
                        <div className="row pb-4">
                            <div className="col-lg-3">
                                <div className="appoinment-tab-heading">
                                    <div className="">
                                        <ul className="tabs-list d-lg-block d-flex p-md-4 p-3">
                                            <li className={`d-flex align-items-center mb-lg-4 mb-0 ${tab === 0 && "active"}`} style={{cursor:'pointer'}} onClick={() => setTabs(0)}><div className="tabs-icon"><BsGrid size={16} /></div>
                                                <p>Service</p></li>
                                            <li className={`d-flex align-items-center mb-lg-4 mb-0 ${tab === 1 && "active"}`} style={{cursor:'pointer'}} onClick={() => {
                                                if(!selectService) return toast.error('Please select any service to book an appointment.')
                                                setTabs(1)
                                            }}><div className="tabs-icon" ><FaRegCalendarAlt size={16} /></div>
                                                <p>Date & Time</p></li>
                                            <li className={`d-flex align-items-center mb-lg-4 mb-0 ${tab === 2 && "active"}`} style={{cursor:'pointer'}} onClick={() => {
                                                if(!selectTime) return toast.error('Please select a time slot to proceed with the booking.')
                                                setTabs(2)}}
                                            ><div className="tabs-icon" ><FaBook size={16} /></div>
                                                <p>Basic Details</p></li>
                                            <li className={`d-flex align-items-center mb-lg-4 mb-0 ${tab === 3 && "active"}`} style={{cursor:'pointer'}} onClick={() => {
                                                if(!book_appointment_first_name) return toast.error('Please enter your firstname');
                                                if(!book_appointment_last_name) return toast.error('Please enter your lastname');
                                                if(!book_appointment_contact_number) return toast.error('Please enter your contact number');
                                                if(!email) return toast.error('Please enter your email');
                                                setTabs(3)
                                            }}><div className="tabs-icon" ><LuClipboardCheck size={16} /></div>
                                                <p>Summary</p></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="tab-right">
                                    <div className="tab-chnages-contain">
                                        {tab === 0 &&
                                            <>
                                                {/* <h3 className="service-title">Select Category</h3>
                                                <ul className="d-flex align-items-center category-btn-list">
                                                    <li className={`d-flex align-items-center ${selectCategory === 'all' && 'selected'} me-4`} onClick={() => {setSelectCategory('all'); setSelectService(null)}}>
                                                        <p>All</p>
                                                        {selectCategory === 'all' && (<LuCheckCircle2 className="ms-2" />)}
                                                    </li>
                                                    <li className={`d-flex align-items-center custom-jweler ${selectCategory === 'customize' && 'selected'}`} onClick={() => {setSelectCategory('customize'); setSelectService(null)}}>
                                                        <p>Customize Jewellery</p>
                                                        {selectCategory === 'customize' && (<LuCheckCircle2 className="ms-2" />)}
                                                    </li>
                                                </ul> */}
                                                <h3 className="service-title pt-2">Select Service</h3>
                                                <div className="row">
                                                    {/* {selectCategory === 'all' && (
                                                        <>
                                                            <div className="col-lg-6">
                                                                <div className={`d-flex align-items-center  service-detail-box ${selectService === 1 && 'selected'} position-relative`} 
                                                                    onClick={() => {
                                                                        setSelectService(1);
                                                                        setTabs(1);
                                                                    }}
                                                                >
                                                                    <div className="service-icon"><FaMountainSun size={26} color="#202020" /></div>
                                                                    <div className="service-detail-subbox text-start ps-4">
                                                                        <h3 className="mb-2">Create Your Own</h3>
                                                                        <p>Duration: <b>1h</b></p>
                                                                    </div>
                                                                    {selectService === 1 && (<LuCheckCircle2 className="ms-2 check-icon" size={18} />)}
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className={`d-flex align-items-center  service-detail-box ${selectService === 2 && 'selected'} position-relative`} 
                                                                    onClick={() => {
                                                                        setSelectService(2);
                                                                        setTabs(1);
                                                                    }}
                                                                >
                                                                    <div className="service-icon"><FaMountainSun size={26} color="#202020" /></div>
                                                                    <div className="service-detail-subbox text-start ps-4">
                                                                        <h3 className="mb-2">Test Service Name</h3>
                                                                        <div className="d-flex align-itemns-center ">
                                                                            <p>Duration: <b>1h</b></p>
                                                                            <p className="m-0 ms-3">Price: <span>₹500.00</span></p>
                                                                        </div>
                                                                    </div>
                                                                    {selectService === 2 && (<LuCheckCircle2 className="ms-2 check-icon" size={18} />)}
                                                                </div>
                                                            </div>
                                                        </>
                                                    )} */}
                                                    <div className="col-lg-12">
                                                            <div className={`d-flex align-items-center custom-jweler service-detail-box position-relative ${selectService === 3 && 'selected'}`} 
                                                                onClick={() => {
                                                                    setSelectService(3);
                                                                    setTabs(1);
                                                                }}
                                                            >
                                                                <div className="service-icon"><FaMountainSun size={26} color="#202020" /></div>
                                                                <div className="service-detail-subbox text-start ps-4">
                                                                    <h3 className="mb-2">Create Your Own</h3>
                                                                    <p>Duration: <b>1h</b></p>
                                                                </div>
                                                                {selectService === 3 && (<LuCheckCircle2 className="ms-2 check-icon" size={18} />)}
                                                            </div>
                                                        </div>
                                                    {/* {selectCategory === 'customize' && (
                                                        <div className="col-lg-12">
                                                            <div className={`d-flex align-items-center custom-jweler service-detail-box position-relative ${selectService === 3 && 'selected'}`} 
                                                                onClick={() => {
                                                                    setSelectService(3);
                                                                    setTabs(1);
                                                                }}
                                                            >
                                                                <div className="service-icon"><FaMountainSun size={26} color="#202020" /></div>
                                                                <div className="service-detail-subbox text-start ps-4">
                                                                    <h3 className="mb-2">Create Your Own</h3>
                                                                    <p>Duration: <b>1h</b></p>
                                                                </div>
                                                                {selectService === 3 && (<LuCheckCircle2 className="ms-2 check-icon" size={18} />)}
                                                            </div>
                                                        </div>
                                                    )} */}
                                                </div>
                                            </>
                                        }{tab === 1 && <>
                                            <div className="row date_time_tab">
                                                <div className="col-lg-6">
                                                    <div>
                                                        <Calendar 
                                                            onChange={setSelectDate} 
                                                            value={selectDate} 
                                                            tileDisabled={tileDisabled}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="time-slot">
                                                        <h3>Time Slot</h3>
                                                        <div>
                                                            <h4>Morning</h4>
                                                            <div className="row">
                                                                {morningSlot?.map((d,i) => {
                                                                    return (
                                                                        <div className={`col-6`} key={i} style={{cursor: 'pointer'}} onClick={() => {
                                                                            setSelectTime(d);
                                                                            setTabs(2);
                                                                        }}>
                                                                            <div className={`time-box ${selectTime?.start === d.start && 'selected'} mb-3`}>
                                                                                <p>{d.formatted_start_time} - {d.formatted_end_time}</p>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h4>Afternoon</h4>
                                                            <div className="row">
                                                                {afternoonSlot?.map((d,i) => {
                                                                    return(
                                                                        <div className="col-6" key={i} style={{cursor: 'pointer'}} onClick={() => {
                                                                            setSelectTime(d)
                                                                            setTabs(2)
                                                                        }}>
                                                                            <div className={`time-box ${selectTime?.start === d.start && 'selected'} mb-3`}>
                                                                                <p>{d.formatted_start_time} - {d.formatted_end_time}</p>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h4>Evening</h4>
                                                            <div className="row">
                                                                {eveningSlot?.map((d,i) => {
                                                                    return (
                                                                        <div className="col-6" key={i} style={{cursor: 'pointer'}} onClick={() => {
                                                                            setSelectTime(d)
                                                                            setTabs(2)
                                                                        }}>
                                                                            <div className={`time-box ${selectTime?.start === d.start && 'selected'} mb-3`}>
                                                                                <p>{d.formatted_start_time} - {d.formatted_end_time}</p>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>}
                                        {tab === 2 && <>
                                            <div className="service-detail">
                                                <h3>Basic Deatils</h3>
                                                <div className="details-form">
                                                    <label>First Name <span>*</span></label>
                                                    <input 
                                                        placeholder="enter your firstname" 
                                                        onChange={(e) => setBook_appointment_first_name(e.target.value)}
                                                        value={book_appointment_first_name}
                                                        name="book_appointment_first_name"
                                                        type={"text"}
                                                    />
                                                </div>
                                                <div className="details-form">
                                                    <label>Last Name <span>*</span></label>
                                                    <input 
                                                        placeholder="enter your lastname" 
                                                        onChange={(e) => setBook_appointment_last_name(e.target.value)}
                                                        value={book_appointment_last_name}
                                                        name="book_appointment_last_name"
                                                        type={"text"}
                                                    />
                                                </div>
                                                <div className="details-form">
                                                    <label>Email Address<span>*</span></label>
                                                    <input 
                                                        placeholder="enter your Email address" 
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        value={email}
                                                        name="email"
                                                        type={"email"}
                                                    />
                                                </div>
                                                <div className="details-form">
                                                    <label>Phone Number<span>*</span></label>
                                                    <input 
                                                        placeholder="enter your phone number" 
                                                        onChange={(e) => setBook_appointment_contact_number(e.target.value)}
                                                        value={book_appointment_contact_number}
                                                        name="book_appointment_contact_number"
                                                        type={"number"}
                                                    />
                                                </div>
                                                <div className="details-form">
                                                    <label>Note</label>
                                                    <textarea 
                                                        placeholder="enter note Detail" 
                                                        onChange={(e) => setMessage(e.target.value)}
                                                        value={message}
                                                        name="message"
                                                        type={"text"}
                                                    />
                                                </div>
                                            </div>
                                        </>}
                                        {tab === 3 && <>
                                            <div className="summary-detail">
                                                <div className="">
                                                    <img alt="img" src={"/img/img/summary.svg"} />
                                                    <div className="summary-title mt-4">
                                                        <h3>Summary</h3>
                                                        <p>Your appointment booking summary</p>
                                                    </div>
                                                    <div className="summary-box py-5">
                                                        <p>Customer</p>
                                                        <h4>{book_appointment_first_name} {book_appointment_last_name}</h4>
                                                    </div>
                                                    <div className="d-md-flex d-block justify-content-center ">
                                                        <div className="summary-box summary-first-box mb-md-0 mb-3">
                                                            <p className="text-start">Service</p>
                                                            <h4 className="text-start">{(selectService === 1 || selectService === 3) ? "Create Your Own" : selectService === 2 && "Test service Name"}</h4>
                                                        </div>
                                                        <div className="summary-box">
                                                            <p className="text-start">Date & Time</p>
                                                            <h4 className="text-start">{moment(selectDate).format("MMM DD, yyyy")}, {selectTime?.formatted_start_time} - {selectTime?.formatted_end_time}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>}
                                    </div>
                                    <div className="bottom-content-box p-4">
                                        <div className="d-flex align-items-center justify-content-end">
                                            {tab !== 0 && (
                                            <div className="d-flex align-items-center prev-btn"
                                                onClick={() => {
                                                    if (tab === 1) {
                                                        setTabs(0)
                                                    } else if(tab === 2) {
                                                        setTabs(1)
                                                    } else if(tab === 3) {
                                                        setTabs(2)
                                                    }
                                                }}
                                                style={{cursor: 'pointer'}}
                                            >
                                                <LuMoveLeft className="me-3" />
                                                <p>Go Back</p>
                                            </div>
                                            )}
                                            <button className="next-btn ms-4"
                                                onClick={() => {
                                                    if (tab === 0) {
                                                        if(!selectService) return toast.error('Please select any service to book an appointment.')
                                                        setTabs(1)
                                                    } else if(tab === 1) {
                                                        if(!selectTime) return toast.error('Please select a time slot to proceed with the booking.')
                                                        setTabs(2)
                                                    } else if(tab === 2) {
                                                        if(!book_appointment_first_name) return toast.error('Please enter your firstname');
                                                        if(!book_appointment_last_name) return toast.error('Please enter your lastname');
                                                        if(!book_appointment_contact_number) return toast.error('Please enter your contact number');
                                                        if(!email) return toast.error('Please enter your email');
                                                        setTabs(3)
                                                    } else if(tab === 3) {
                                                        handleBookAppoinment()
                                                    }
                                                }}
                                                style={{cursor: 'pointer'}}
                                            >
                                                {tab !== 3 && ("Next: ")}
                                                {tab === 0 ? "Date & Time" : tab === 1 ? "Basic Details" : tab === 2 ? "Summary" : tab === 3 && "Book Appoinment"}
                                                {tab !== 3 && (<LuMoveRight className="ms-2" />)}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BookAppoinment;