import React, { useState } from "react";
import check from "../Assets/img/check.png";
import { useEffect } from "react";
import { useSelector } from "react-redux";


const WhishList = ({selectedItem}) => {
    const currencyRate = useSelector(state => state.home.currencyRate);
    const currency = useSelector(state => state.home.currency);
    const [whishListList, setWhishListList] = useState([]);
    // const whishListList = useSelector(state => state.home.whishList);


    useEffect(() => {
        let wishList = JSON.parse(sessionStorage.getItem("wish_list")) || [];
        setWhishListList(wishList)
    }, []);

    const handlRemoveItem = (itm) => {
        let wishList = JSON.parse(sessionStorage.getItem("wish_list_after")) || [];
        const existingProduct = wishList.findIndex((item) => item.product_id === itm.product_id);
        wishList.splice(existingProduct, 1);
        sessionStorage.setItem("wish_list_after", JSON.stringify(wishList));
        setWhishListList(wishList);
    }

    return (
        <div>
            <div className="d-lg-flex d-none dashboard-breadcrumb mb-2">
                <button className="dashboard-bradcrumb d-flex align-items-center">
                    {selectedItem === "whishlist" && "Whishlist"}
                </button>
            </div>
            <div className="container">
                {whishListList?.length > 0 ? whishListList?.map((d,i) => {
                    return (
                        <div className="w-100" key={i}>
                            <div className="d-md-flex d-block justify-content-center mb-4">
                                <div className="d-md-none d-flex position-relative top-0 right-0 pb-2 close-wishlist justify-content-end">
                                    <button className="btn btn-close" onClick={() => handlRemoveItem(d)}></button>
                                </div>
                                <div className="col-md-2">
                                    <img src={d.product_feature_image ? d.product_feature_image : `https://api.viannejewels.com${d?.product_thumbnail}`} alt="img" className="w-100 wishlist-imgs" />
                                </div>
                                <div className="pt-md-0 pt-4 w-100 ps-3">
                                    <div className='main-product__detail__box text-start position-relative'>
                                        <div className="d-md-flex d-none close-wishlist justify-content-end">
                                            <button className="btn btn-close" onClick={() => handlRemoveItem(d)}></button>
                                        </div>
                                        <h2 className='product_whishlist_title'>{d?.product_name}</h2>
                                        <h6 className='product_whishlist_content'>{d?.product_short_description}</h6>
                                        <p className='product_whishlist_price'>{`${currency == 'USD' ? '$' : '₹'}${parseInt(d?.product_sale_price ?currency == 'USD' ? Math.ceil(currencyRate * parseInt(d?.product_sale_price)) : d?.product_sale_price : d?.product_price ? (currency == 'USD' ? Math.ceil(currencyRate * parseInt(d?.product_price)) : d?.product_price) : "0")?.toLocaleString('en-IN')}`}</p>
                                        <div className="d-flex">
                                            <p className='product_whishlist_availability'>Availability:</p>
                                            <p className='product_whishlist_instock mt-0 mb-3'>In Stock <img className="ms-2" src={check} alt="" /></p>
                                        </div>
                                        {/* <button className="read-more mt-0 d-flex">
                                            Read More
                                        </button> */}
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                }) :
                    <div style={{
                        padding: '20px 0px',
                        height: '200px',
                        justifyContent: ' center',
                        alignItems: 'center',
                        display: 'flex'
                    }}>
                        <h5 style={{ textAlign: 'center' }}>No Data added in the list</h5>
                    </div>
                }
            </div>
        </div>
    )
}

export default WhishList;