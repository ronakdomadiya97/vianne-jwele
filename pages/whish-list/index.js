import React, { useState } from "react";
import { useEffect } from "react";

const WhishList = () => {
    const [whishListList, setWhishListList] = useState([]);
    // const whishListList = useSelector(state => state.home.whishList);


    useEffect(() => {
        let wishList = JSON.parse(sessionStorage.getItem("wish_list")) || [];
        setWhishListList(wishList)
    }, []);

    const handlRemoveItem = (itm) => {
        let wishList = JSON.parse(sessionStorage.getItem("wish_list")) || [];
        const existingProduct = wishList.findIndex((item) => item.product_id === itm.product_id);
        wishList.splice(existingProduct, 1);
        sessionStorage.setItem("wish_list", JSON.stringify(wishList));
        setWhishListList(wishList);
    }

    return (
        <div className="mt-10">
            <div className="container">
                {whishListList?.length > 0 ? whishListList?.map((d,i) => {
                     let url = d.product_feature_image?.match(/^https?:\/\/([^/?#]+)/i);
                    return (
                        <div className="w-100" key={i}>
                            <div className="d-md-flex d-block justify-content-center mb-4">
                                <div className="d-md-none d-flex position-relative top-0 right-0 pb-2 close-wishlist justify-content-end">
                                    <button className="btn btn-close" onClick={() => handlRemoveItem(d)}></button>
                                </div>
                                <div className="col-md-2">
                                    <img src={url?.[0] === "https://api.viannejewels.com" ? d?.product_feature_image : `https://api.viannejewels.com${d?.product_feature_image}`} alt="img" className="w-100 wishlist-imgs" />
                                </div>
                                <div className="pt-md-0 pt-4 w-100 ps-3">
                                    <div className='main-product__detail__box text-start position-relative'>
                                        <div className="d-md-flex d-none close-wishlist justify-content-end">
                                            <button className="btn btn-close" onClick={() => handlRemoveItem(d)}></button>
                                        </div>
                                        <h2 className='product_whishlist_title'>{d?.product_name}</h2>
                                        <h6 className='product_whishlist_content'>{d?.product_short_description}</h6>
                                        <div className="d-flex">
                                            <p className='product_whishlist_availability'>Availability:</p>
                                            <p className='product_whishlist_instock mt-0 mb-3'>In Stock <img className="ms-2" src={"/img/img/check.png"} alt="" /></p>
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