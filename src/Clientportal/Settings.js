import React, { useState } from "react";



const Settings = (props) => {
    const {userDetails, selectedItem} = props
    return (
        <>
            <div className="d-lg-flex d-none dashboard-breadcrumb mb-3">
                <button className="dashboard-bradcrumb d-flex align-items-center">
                    {selectedItem === "settings" && "Settings"}
                </button>
            </div>
            <div className="text-sm-start text-center">
                <div className="profile-box d-inline-block position-relative">
                    {/* <img src={products} alt="img" className="profile-imgs" /> */}
                    <div width={150} height={150} style={{
                        borderRadius: '100px', backgroundColor: '#E6F0F0', width: 150, height: 150, color: 'black', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', fontSize: '30px'
                    }}>
                        {userDetails?.user_name && userDetails?.user_name?.charAt(0)?.toUpperCase()}{userDetails?.user_name && userDetails?.user_name?.split('_')?.[1]?.charAt(0)?.toUpperCase()}
                    </div>
                    {/* <div className="open-file">
                                    <input className="file-input" type={'file'} />
                                    <img src={select} alt="img " className="icon-slectpic" />
                                </div> */}
                </div>
            </div>
            <form className="profile-form pt-5">
                <div className="profile-form-box pb-3">
                    <label>Full Name</label>
                    <input placeholder="full Name"
                        disabled={true}
                        value={`${userDetails?.user_name?.split('_').join(' ') || ""}`}
                    />
                </div>
                <div className="profile-form-box pb-3">
                    <label>Email</label>
                    <input placeholder="Email"
                        disabled={true}
                        value={userDetails?.user_email}
                    />
                </div>
                {/* <div className="profile-form-box pb-3">
                                <label>Number</label>
                                <input placeholder="full Name" disabled />
                            </div>
                            <div className="profile-form-box pb-3">
                                <label>City</label>
                                <input placeholder="Surat" disabled />
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="profile-form-box pb-3">
                                        <label>City</label>
                                        <input placeholder="Surat" disabled />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="profile-form-box pb-3">
                                        <label>Zip Code</label>
                                        <input placeholder="395004" disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="profile-form-box pb-3">
                                <label>Country</label>
                                <input placeholder="india" />
                            </div> */}
            </form>
            {/* <div className="d-flex align-items-center mt-5 justify-content-end">
                            <button className="compare-profile me-4">Compare</button>
                            <button className="save-btn">Save Changes</button>
                        </div> */}
        </>

    )
}
export default Settings;