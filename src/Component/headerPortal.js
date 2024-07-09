import React from "react";
import { RxExit } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { USER_DETAILS } from '../redux/type/constant';
import { FiAlignJustify } from 'react-icons/fi';
import { cuurencyConvter } from "../redux/action/homeAction";
import Link from "next/link";


const HeaderPortal = ({ handleSideClick, selectedItem, setSidebarOpen }) => {
    const dispatch = useDispatch();
    const currency = useSelector(state => state.home.currency);
    const currencyRate = useSelector(state => state.home.currencyRate);
    return (
        <div className="dashboard-header">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-lg-flex d-none dashboard-breadcrumb">
                    {/* <button className="dashboard-bradcrumb d-flex align-items-center" onClick={() => handleSideClick('dashboard')} ><img src={dashboard} alt="img" className="me-3" /> Dashboards <img src={italic} className="ms-3" alt="" /></button>
                    <button className="dashboard-bradcrumb active">
                        {selectedItem === "dashboard" ? "Dashboard"
                            : selectedItem === "category" ? "Category"
                                : selectedItem === "products" ? "All Products"
                                    : selectedItem === "orders" ? "Orders"
                                        : selectedItem === "whishlist" ? "Whishlist"
                                            : selectedItem === "settings" ? "Settings"
                                                : selectedItem === "addtocart" ? "Add to Cart" : ""}
                    </button> */}
                </div>
                <div className='dashboard-logo-box'>
                    <div >
                        <img style={{ cursor: "pointer" }} onClick={() => handleSideClick('dashboard')} src={"https://api.viannejewels.com/wp-content/uploads/2023/03/logo-2-2.png.webp"} alt="" height={60} />
                    </div>
                </div>
                <div className="d-sm-flex d-none align-items-center justify-content-between">
                    <select class="custom-select" id="inputGroupSelect03" style={{ marginRight: "10px" }} value={currency == 'USD' ? 'INR' : 'USD'} onChange={(e) => {
                        dispatch(cuurencyConvter({ from: e.target.value, to: e.target.value === 'INR' ? 'USD' : 'INR' }))
                    }}>
                        <option>Choose...</option>
                        <option value="USD" selected><span role="img" aria-label="India Flag">
                            🇮🇳
                        </span>INR</option>
                        <option value="INR">{'\uD83C\uDDFA\uD83C\uDDF8'}USD</option>
                    </select>

                    <div className='dashboard-logout-sec text-end d-lg-block d-none'>
                        <Link href='/' className="logout-dashboard" onClick={() => {
                            sessionStorage.removeItem('userId');
                            dispatch({ type: USER_DETAILS, payload: {} });
                            // navigate('/login')
                        }}><RxExit className="me-2" />Logout</Link>
                    </div>
                </div>
                <div className='d-lg-none d-block' style={{ cursor: "pointer" }} onClick={() => setSidebarOpen(true)}>
                    <FiAlignJustify color='#046767' size={25} />
                </div>
            </div>
            <div className="d-lg-none d-flex dashboard-breadcrumb">
                <button className="dashboard-bradcrumb d-flex align-items-center" onClick={() => handleSideClick('dashboard')} ><img src={"/img/img/dashboard-icon.png"} alt="img" className="me-3" /> Dashboards <img src={"/img/img/italic.png"} className="ms-3" alt="" /></button>
                <button className="dashboard-bradcrumb active">
                    {selectedItem === "dashboard" ? "Dashboard"
                        : selectedItem === "category" ? "Category"
                            : selectedItem === "products" ? "All Products"
                                : selectedItem === "orders" ? "Orders"
                                    : selectedItem === "whishlist" ? "Whishlist"
                                        : selectedItem === "settings" ? "Settings"
                                            : selectedItem === "addtocart" ? "Add to Cart" : ""}
                </button>
            </div>
        </div>
    )
}
export default HeaderPortal;