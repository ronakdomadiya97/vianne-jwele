import React from "react";
import LeftSideBar from "../Component/leftSidebar";
import HeaderPortal from "../Component/headerPortal";



const WrapperContainer = ({ children, handleSideClick, setSubCategoryId,setcategoryName, setCategoryId, selectedItem, sidebarOpen, setSidebarOpen, setIsSelectedProd, categoryId, categoryName }) => {
    return (
        <>
            <div className="dashboard-page m-0">
                <LeftSideBar categoryName={categoryName} categoryId={categoryId} setIsSelectedProd={setIsSelectedProd} handleSideClick={handleSideClick} setcategoryName={setcategoryName} setSubCategoryId={setSubCategoryId} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setCategoryId={setCategoryId} selectedItem={selectedItem} />
                <div className="right-dashboard">
                    <HeaderPortal handleSideClick={handleSideClick} selectedItem={selectedItem} setSidebarOpen={setSidebarOpen} />
                    <div className="p-2">
                        {children}
                    </div>
                </div>
            </div>
            {/* {compareView && (
                <div className="compare-view">
                    <Modal className="px-2 compare-modal" show={compareView} centered={true} bsSize="lg" >
                        <Modal.Body className="p-0">
                            <div className="p-3">
                                <Table responsive className="compare-table mb-0">
                                    <tbody>
                                        <tr className="header-row">
                                            <td style={{ verticalAlign: 'top' }}><p className="title-left">image</p>  </td>
                                            <td className="position-relative"><img className="close-btn" src={close} alt="" /><img src={products} alt="img" /> </td>
                                            <td className="position-relative"><img className="close-btn" src={close} alt="" /><img src={products} alt="img" /> </td>
                                            <td className="position-relative"><img className="close-btn" src={close} alt="" /><img src={products} alt="img" /> </td>
                                        </tr>
                                        <tr>
                                            <td><p className="title-left">Title</p></td>
                                            <td><p className="compare-content">0.68 TCW Round-Cut Lab Grown Diamond Pendant</p></td>
                                            <td><p className="compare-content">0.68 TCW Round-Cut Lab Grown Diamond Pendant</p></td>
                                            <td><p className="compare-content">0.68 TCW Round-Cut Lab Grown Diamond Pendant</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="title-left">Price</p></td>
                                            <td><p className="compare-value">₹191,600</p></td>
                                            <td><p className="compare-value">₹191,600</p></td>
                                            <td><p className="compare-value">₹191,600</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="title-left">Description</p></td>
                                            <td><p className="compare-descrption">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></td>
                                            <td><p className="compare-descrption">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></td>
                                            <td><p className="compare-descrption">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="title-left">Available</p></td>
                                            <td><p className="compare-availble">Yes</p></td>
                                            <td><p className="compare-availble">Yes</p></td>
                                            <td><p className="compare-availble">Yes</p></td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <div className="d-flex align-items-cener justify-content-end pt-5">
                                    <button className="pe-3" onClick={() => setCompareView(false)}><img src={close} className="h-100" alt="" /></button>
                                    <button className="compare-btn">Compare</button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            )} */}
        </>

    )
}
export default WrapperContainer;