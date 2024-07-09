import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaSortDown } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from "../redux/action/homeAction";


const Orders = (props) => {
    const disptach = useDispatch();
    const {selectedItem} = props
    const userDetails = useSelector(state => state.home.userDetails);
    const userOrders = useSelector(state => state.home.userOrders);
    useEffect(() => {
        let userIds = sessionStorage.getItem('userId');
        // disptach(getUserDetail(userIds))
        disptach(getUserOrders(userDetails?.user_email ? userDetails?.user_email : "viannejewels@gmail.com"))
    }, [])
    return (
        <>
            <div className="d-lg-flex d-none dashboard-breadcrumb mb-2">
                <button className="dashboard-bradcrumb d-flex align-items-center">
                    {selectedItem === "orders" && "Orders"}
                </button>
            </div>
            <div className="">
                <h3 className="live-orders-title text-start pb-4">Live Orders</h3>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="live-order-box d-flex align-items-center">
                            <div className="order-icon">
                                <img className="" src={"/img/img/Frames.png"} alt="" />
                            </div>
                            <div className="ps-3">
                                <h3 className="order-count text-start">{userOrders?.total_orders || 0}</h3>
                                <p className="order-title">Orders</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="live-order-box d-flex align-items-center">
                            <div className="order-icon">
                                <img className="" src={"/img/img/Group.png"} alt="" />
                            </div>
                            <div className="ps-3">
                                <h3 className="order-count text-start">{userOrders?.orders?.filter((d) => d.order_status !== "completed")?.length || 0}</h3>
                                <p className="order-title">Total Pending</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="live-order-box d-flex align-items-center">
                            <div className="order-icon">
                                <img className="" src={"/img/img/Frame.png"} alt="" />
                            </div>
                            <div className="ps-3">
                                <h3 className="order-count text-start">{userOrders?.orders?.filter((d) => d.order_status === "completed")?.length || 0}</h3>
                                <p className="order-title">Total Dispatch</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="live-order-table">
                <div className="d-flex align-items-center justify-content-between py-4">
                    {/* <h3 className="live-orders-title text-start">Live Orders</h3> */}
                    <div className="d-flex">
                        <div class="dropdown sorting-dropdown me-2">
                            {/* <button class="btn sorting-dropdown-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Recent Orders
                                        </button> */}
                            <ul class="dropdown-menu border-0">
                                <li><a class="dropdown-item" href="#">Default sorting</a></li>
                                <li><a class="dropdown-item" href="#">sort by popularity</a></li>
                                <li><a class="dropdown-item" href="#">sort by avarge rating</a></li>
                                <li><a class="dropdown-item" href="#">sort by latest</a></li>
                                <li><a class="dropdown-item" href="#">sort by price: low to high</a></li>
                                <li><a class="dropdown-item" href="#">sort by price: high to low</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Table className="order-table" responsive="sm">
                    <thead>
                        <tr>
                            <th className="d-flex justify-content-center">id <FaSortDown className="ms-3" /></th>
                            <th>Product Name</th>
                            <th>Status</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    &ensp;
                    <tbody>
                        {userOrders?.orders?.length > 0 && userOrders?.orders?.map((d, index) => {
                            return (
                                <>
                                    <tr>
                                        <td className="order-no">#{d?.order_id}</td>
                                        <td className="user-name-table d-flex align-items-center justify-content-center">
                                            {d?.product_names.join(", ")}
                                        </td>
                                        <td className="delivery-stutus"><p>{d?.order_status}</p></td>
                                        <td className="order-amount">Rs.{d?.order_total}</td>
                                    </tr>
                                    &ensp;
                                </>
                            )
                        })}
                        &ensp;
                    </tbody>
                </Table>
            </div>
        </>

    )
}
export default Orders;