import React, { useEffect, useRef, useState } from "react";
import { Accordion, Modal, Table } from "react-bootstrap";
import { CiGrid41 } from "react-icons/ci";
import { FiBox, FiEye, FiHeart } from "react-icons/fi";
import {  IoSettingsOutline } from "react-icons/io5";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { RxExit } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { USER_DETAILS } from "../redux/type/constant";
import { cuurencyConvter } from "../redux/action/homeAction";
import Link from "next/link";

const LeftSideBar = ({ categoryName, categoryId, setIsSelectedProd, handleSideClick, setSubCategoryId, setcategoryName,setCategoryId, sidebarOpen,setSidebarOpen, selectedItem }) => {
    const userDetails = useSelector(state => state.home.userDetails);
    const categoryList = useSelector(state => state.home.categoryList);
    const boxRef = useRef(null);
    const dispatch = useDispatch()
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    })
    function handleClickOutside(event) {
        if (boxRef.current && !boxRef.current.contains(event.target)) {
            setSidebarOpen(false);
        }
    }
    return (
        <div ref={boxRef} className={`dashborad-sidebar ${sidebarOpen === true && 'siderbar-open'}`}>
            <div className="dashboard-left-bar">
                <div className="d-flex user-div align-items-center">
                    <div width={30} height={30} style={{
                        borderRadius: '50px', backgroundColor: '#E6F0F0', width: 30, height: 30, color: 'black', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', fontSize: '14px'
                    }}>
                        {userDetails?.user_name && userDetails?.user_name?.charAt(0)?.toUpperCase()}{userDetails?.user_name && userDetails?.user_name?.split('_')?.[1]?.charAt(0)?.toUpperCase()}
                    </div>
                    <p className="user-name">{userDetails?.user_name?.split('_').join(' ')}</p>
                </div>
            </div>
            <div className="dashboard-list">
                <div>
                    <p className="dash-board-titles pt-4 pb-3 text-start">Dashboard</p>
                    <div className="d-sm-none d-flex align-items-center justify-content-between">
                        <select class="custom-select" id="inputGroupSelect03" style={{width:"100%" , marginBottom: "15px" , borderRadius: "10px" , padding: "6px"}} onChange={(e) => {
                            dispatch(cuurencyConvter({from : e.target.value,to: e.target.value === 'INR' ? 'USD'  : 'INR'}))
                        }}>
                            <option>Choose...</option>
                            <option value="USD" selected>INR</option>
                            <option value="INR">USD</option>
                        </select>

                        <div className='dashboard-logout-sec text-end d-lg-block d-none'>
                            <Link href='/' className="logout-dashboard" onClick={() => {
                                sessionStorage.removeItem('userId');
                                dispatch({ type: USER_DETAILS, payload: {} });
                                // navigate('/login')
                            }}><RxExit className="me-2" />Logout</Link>
                        </div>
                    </div>
                    <ul>
                        <li className="category-list" onClick={() => {setIsSelectedProd(false); handleSideClick('category')}}>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0" className="border-0">
                                    <Accordion.Header className={`category-title`} style={{borderRadius: selectedItem === "category" && '5px', backgroundColor: selectedItem === "category" && 'var(--green)', padding: selectedItem === "category" && "10px 15px 10px"}}>
                                        <CiGrid41 size={20} color={selectedItem === "category" ? "#ffffff" : "#046767"} className="me-2" />
                                        <span className={`${selectedItem === "category" ? "category-title-selected" : "category-title"} `}>Category</span>
                                    </Accordion.Header>
                                    <Accordion.Body className="p-0">
                                        {
                                            categoryList?.map((cat,i) => {
                                                return (

                                                    <li className="d-flex align-items-center open-hover-box position-relative" key={i}>
                                                        <Accordion ActiveKey="5">
                                                            <Accordion.Item eventKey="5" className="border-0 w-100">
                                                                <Accordion.Header className={`category-title ${cat.name === categoryName && 'open-hover-box-list1'}`}>
                                                                    <img className="me-2" src={cat?.category_image} width={30} height={30} style={{ borderRadius: 50 }} alt="img" />
                                                                    <p 
                                                                        onClick={() => {
                                                                            setCategoryId(cat)
                                                                            setSubCategoryId(cat?.children[0])
                                                                            setSidebarOpen(false)
                                                                        }}
                                                                    >{cat?.name}</p>
                                                                </Accordion.Header>
                                                                <Accordion.Body className="p-0 pt-2">
                                                                    {cat?.children?.map((itm,i) => {
                                                                        return (
                                                                            <li key={i} className={`d-flex align-items-center py-2 open-hover-box ${itm.id === categoryId && 'open-hover-box-list'} pt-2 position-relative`}
                                                                                onClick={() => {
                                                                                    setSubCategoryId(itm)
                                                                                    setCategoryId(itm)
                                                                                    setcategoryName(cat)
                                                                                    setSidebarOpen(false)
                                                                                }}
                                                                            >
                                                                                <p className="subcatogery-title">{itm?.name}</p>
                                                                            </li>
                                                                        )
                                                                    })}
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                        </Accordion>
                                                    </li>
                                                )
                                            })
                                        }
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </li>
                        <li className={`category-list ${selectedItem === "products" ? "portal-product-list-selected" : "portal-product-list"} mt-3  text-start`} onClick={() =>{ handleSideClick('products'); setSidebarOpen(false)}}>
                            <p className={`${selectedItem === "products" ? "category-title-selected" : "category-title"} `}>
                                <FiBox size={20} color={selectedItem === "products" ? "#ffffff" : "#046767"} className="me-2" />All Products
                            </p>
                        </li>
                        {/* <li className={`category-list ${selectedItem === "products" ? "portal-product-list-selected" : "portal-product-list"} mt-3  text-start`} onClick={() => handleSideClick('compare')}>
                            <p className={`${selectedItem === "products" ? "category-title-selected" : "category-title"} `}><IoGitCompareOutline size={20} color={selectedItem === "products" ? "#ffffff" : "#046767"} className="me-2" />Compare</p>
                        </li> */}
                        <li className={`category-list ${selectedItem === "addtocart" ? "portal-product-list-selected" : "portal-product-list"} mt-3  text-start`} onClick={() =>{setIsSelectedProd(false); handleSideClick('addtocart'); setSidebarOpen(false)}}>
                            <p className={`${selectedItem === "addtocart" ? "category-title-selected" : "category-title"} `}><LiaShoppingBagSolid size={20} color={selectedItem === "addtocart" ? "#ffffff" : "#046767"} className="me-2" />Add To cart</p>
                        </li>
                        <li className={`category-list ${selectedItem === "orders" ? "portal-product-list-selected" : "portal-product-list"} mt-3  text-start`} onClick={() =>{setIsSelectedProd(false); handleSideClick('orders'); setSidebarOpen(false)}}>
                            <p className={`${selectedItem === "orders" ? "category-title-selected" : "category-title"} `}><LiaShoppingBagSolid size={20} color={selectedItem === "orders" ? "#ffffff" : "#046767"} className="me-2" />Order</p>
                        </li>
                        <li className={`category-list ${selectedItem === "whishlist" ? "portal-product-list-selected" : "portal-product-list"} mt-3  text-start`} onClick={() =>{ setIsSelectedProd(false); handleSideClick('whishlist'); setSidebarOpen(false)}}>
                            <p className={`${selectedItem === "whishlist" ? "category-title-selected" : "category-title"} `}><FiHeart size={20} color={selectedItem === "whishlist" ? "#ffffff" : "#046767"} className="me-2" />Wihislist</p>
                        </li>
                    </ul>
                </div>
                <div className={`category-list  ${selectedItem === "settings" ? "portal-product-list-selected" : "bg-transparent portal-product-list"} text-start`} onClick={() =>{setIsSelectedProd(false); handleSideClick('settings'); setSidebarOpen(false)}} style={{marginTop:18}}>
                    <div className={`${selectedItem === "settings" ? "category-title-selected" : "category-title"} `}><IoSettingsOutline color={selectedItem === "settings" ? "#ffffff" : "#046767"} size={20} className="me-2"/> Settings</div>
                    {/* {sidebarOpen === true &&
                        <div className='dashboard-logout-sec text-start pt-3 w-100'>
                            <a href='/' className="logout-dashboard-sidebar d-inline-block" onClick={() => {
                                sessionStorage.removeItem('userId');
                                dispatch({ type: USER_DETAILS, payload: {} });
                                // navigate('/login')
                            }}><RxExit className="me-2" />Logout</a>
                        </div>
                    } */}
                </div>
                {sidebarOpen === true &&
                        <div className='dashboard-logout-sec text-start pt-3 w-100'>
                            <Link href='/' className="logout-dashboard d-inline-block" onClick={() => {
                                sessionStorage.removeItem('userId');
                                dispatch({ type: USER_DETAILS, payload: {} });
                                // navigate('/login')
                            }}><RxExit className="me-2" />Logout</Link>
                        </div>
                    }
            </div>
        </div>
    )
}
export default LeftSideBar;