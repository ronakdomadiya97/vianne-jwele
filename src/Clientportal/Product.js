import React, { useEffect, useState } from "react";
import {  Modal, Table } from "react-bootstrap";
import {  FiEye, FiHeart } from "react-icons/fi";
import { IoIosGitCompare } from "react-icons/io";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { useDispatch, useSelector } from 'react-redux';
import { addComapreListData, addToCartProduct, fetchCategoryWiseProductUser } from "../redux/action/homeAction";
import Slider from "react-slick";
import ProductDetails from "./ProductDetails";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { FaHeart } from "react-icons/fa6";
import { Pagination } from "antd";


const Product = ({ userDetails, subCategoryId, categoryId, categoryName, selectedItem, category, setIsSelectedProd, isSelectedProd }) => {
    const disptach = useDispatch();
    const currencyRate = useSelector(state => state.home.currencyRate);
    const currency = useSelector(state => state.home.currency);
    const categoryProductList = useSelector(state => state.home.categoryProductList);
    const [compareView, setCompareView] = useState(false);
    const [compareListData, setCompareListData] = useState([]);
    const [isQuickView, setIsQuickView] = useState(false);
    const [selectQuickView, setSelectQuickView] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [whishListList, setWhishListList] = useState([]);
    const perPage = 10;
    const [page, setPage] = useState(1)
    const [totalProduct, setTotalProduct] = useState(0);
    const [selectedSubCategory, setSelectedSubCategory] = useState('');

    useEffect(() => {
        if (categoryId !== selectedSubCategory) {
            setPage(1)
        }
        setSelectedSubCategory(categoryId);
    }, [categoryId]);

    useEffect(() => {
        if (selectedSubCategory) {
            getFetchData();
        }
    }, [selectedSubCategory, page])

    const getFetchData = async () => {
        const response = await disptach(fetchCategoryWiseProductUser(categoryId, userDetails?.user_id, perPage, page))
        setTotalProduct(response?.data?.total_products)
    }
    useEffect(() => {
        let wishList = JSON.parse(sessionStorage.getItem("wish_list")) || [];
        setWhishListList(wishList);
    }, [])

    const handleQuickView = (data) => {
        setIsQuickView(true)
        setSelectQuickView(data);
    }
    const reviewSlider = {
        dots: false,
        arrows: true,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    let imageSrc = [];
    let productName = [];
    let priceList = [];
    for (let index = 0; index < compareListData?.length; index++) {
        const element = compareListData[index]?.product_feature_image;
        const title = compareListData[index]?.product_name;
        const price = compareListData[index]?.product_sale_price;
        imageSrc?.push(element)
        productName?.push(title)
        priceList?.push(price)

    }

    const handleCompareList = (data) => {
        let compareList = [...compareListData];
        if (compareListData.find((d) => d?.product_id === data?.product_id)) {
            compareList = compareList.filter((item) => item.product_id !== data.product_id);
        } else {
            compareList?.push(data);
        }
        setCompareListData(compareList);
    }

    useEffect(() => {
        disptach(addComapreListData(compareListData))
    }, [compareListData])

    const handleAddToCart = async (data) => {
        let userIds = await sessionStorage.getItem('userId');
        const response = await disptach(addToCartProduct({ product_id: data.product_id }, userIds));
        if (response) {
            toast('Successfully add to cart product')
        }
    }

    const handleSaveData = (prod) => {
        // Save data to the cookie
        const dataToStore = {
            id: prod.product_id,
            subCategoryName: categoryName
        };
        Cookies.set('relatedProduct', JSON.stringify(dataToStore));
    };
    const handleWishList = (data, index) => {
        let wishList = JSON.parse(sessionStorage.getItem("wish_list")) || [];

        const existingProduct = wishList.find((item) => item.product_id === data.product_id);
        if (existingProduct) {
            wishList = wishList.filter((item) => item.product_id !== data.product_id);
        } else {
            wishList.push(data);
        }

        {
            categoryProductList?.some((item, i) => index === i && whishListList?.map((d) => d.product_id)?.includes(item?.product_id)) ?
            toast('Successfully Removed..') :
            toast('Successfully Added..')
        }
        sessionStorage.setItem("wish_list", JSON.stringify(wishList));
        setWhishListList(wishList)
    }
    return (
        <>
            <div className="d-lg-flex d-none dashboard-breadcrumb">
                <button className="dashboard-bradcrumb d-flex align-items-center" onClick={() => setIsSelectedProd(false)}>
                    {selectedItem === "category" && "Category"}
                    {category.name && <img src={"/img/img/italic.png"} className="ms-2" alt="" />}</button>
                <button className="dashboard-bradcrumb active">
                    {category.name}
                    {subCategoryId?.name && <img src={"/img/img/italic.png"} className="ms-2" alt="" loading="lazy"/>}
                </button>
                <button className="dashboard-bradcrumb active">
                    {subCategoryId?.name}
                </button>
            </div>
            <div className="px-2 pt-3 pb-0 d-block">
                {!isSelectedProd && (
                    <div className='row m-0'>
                        {categoryProductList?.length > 0 ? categoryProductList?.map((prod, index) => {
                            return (
                                <div className='col-lg-3 col-6' key={index}>
                                    <div className='main-product-box'>
                                        <div className='main_product_image__box shop-product_page-box position-relative'>
                                            <div onClick={() => {
                                                setIsSelectedProd(true)
                                                setSelectedProduct(prod)
                                                handleSaveData(prod)
                                            }}>
                                                <img src={prod?.product_feature_image} alt="img" style={{ height: '250px', width: '250px' }} loading="lazy"/>
                                            </div>
                                            <ul className='align-items-center icon-list'>
                                                <li className='position-relative' onClick={() => handleWishList(prod, index)}>
                                                    <div className='icon-cover tooltips position-relative'>
                                                        {categoryProductList?.some((item, i) => index === i && whishListList?.map((d) => d.product_id)?.includes(item?.product_id)) ?
                                                            <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top">
                                                                <FaHeart color="#07362e" className="fill-color" />
                                                            </button>
                                                            :
                                                            <FiHeart color="#046767" className='heart-icon' />
                                                        }
                                                        <span className="tooltiptext">Whishlist <span className="triangle"></span></span>
                                                    </div>
                                                </li>
                                                <li className='position-relative' onClick={() => handleAddToCart(prod)}>
                                                    <div className='icon-cover tooltips position-relative'>
                                                        <div className=" d-inline-block">
                                                            <LiaShoppingBagSolid className='heart-icon' color="#046767" />
                                                            <span className="tooltiptext">Shopping <span className="triangle"></span></span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className='position-relative' onClick={() => { handleQuickView(prod); setIsQuickView(true) }}>
                                                    <div className='icon-cover tooltips position-relative'>
                                                        <div className=" d-inline-block">
                                                            <FiEye className='heart-icon' color="#046767" />
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className='position-relative' onClick={() => { setCompareView(true); handleCompareList(prod); }}>
                                                    <div className='icon-cover tooltips position-relative'>
                                                        <div className=" d-inline-block">
                                                            <IoIosGitCompare className='heart-icon' color="#046767" />
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <button className="product-add-cart d-none">Add to Cart</button>
                                            {/* <div className="features-box">
                                                    <p className="discount-btn me-2">-50%</p>
                                                    <p className="discount-btn">features</p>
                                                </div> */}
                                        </div>
                                        <div className='main-product__detail__box'>
                                            <a href='#' className='product_type_title'>{prod?.product_taxonomies?.join(", ")}</a>
                                            <h5 className='product_content'>{prod?.product_name}</h5>
                                            <p className='product_price'>{currency == 'USD' ? '$' : '₹'}{prod?.product_sale_price ? currency == 'USD' ? Math.ceil(currencyRate * parseInt(prod?.product_sale_price)) : parseInt(prod?.product_sale_price)?.toLocaleString('en-IN') : '0'}</p>
                                        </div>
                                        {isQuickView && (
                                            <div>
                                                <Modal className="px-2" show={isQuickView} centered={true} bsSize="lg" >
                                                    <Modal.Body className="p-0">
                                                        <div className="d-lg-flex d-block">
                                                            <div className="width-50">
                                                                <Slider {...reviewSlider} className="quick-view-slider" >
                                                                    {selectQuickView?.product_gallery_images?.length > 0 && selectQuickView?.product_gallery_images?.map((d,i) => {
                                                                        return (
                                                                            <img src={d} alt="img" className="quickview-image" loading="lazy" key={i}/>
                                                                        )
                                                                    })}
                                                                </Slider>
                                                            </div>
                                                            <div className="width-50 bg-lg-transparent bg-white pb-lg-0 pb-5 quick-content">
                                                                <div className="d-flex justify-content-end p-3 pb-0">
                                                                    <button type="button" className="btn btn-close" onClick={() => {
                                                                        setIsQuickView(false)
                                                                        setSelectQuickView(null);
                                                                    }}>
                                                                    </button>
                                                                </div>
                                                                <div className='main-product__detail__box'>
                                                                    <span className='quickview_details'>{selectQuickView?.product_name}</span>
                                                                    <div className="d-flex align-items-center py-3">
                                                                        {/* <img src={stars} alt="img" />
                                                        <h6 className='quickview_content review-count mb-0'>2 Review</h6> */}
                                                                    </div>
                                                                    <p className='quickview_content_modal'>{selectQuickView?.product_short_description}</p>
                                                                    <div className="d-flex mt-2 align-items-center">
                                                                        <p className='product_whishlist_availability'>Availability:</p>
                                                                        <p className='product_whishlist_instock ps-2 mt-0'>In Stock <img className="ms-2" src={"/img/img/check.png"} alt="" /> </p>
                                                                    </div>
                                                                    <div className="d-flex mt-2 align-items-center">
                                                                        <p className='product_whishlist_availability'>Price:</p>
                                                                        <p className='quickview_mental ps-2'>₹{selectQuickView?.product_sale_price ? parseInt(selectQuickView?.product_sale_price)?.toLocaleString('en-IN') : '0'}</p>
                                                                    </div>
                                                                    <div className="d-flex mt-2 align-items-center">
                                                                        <p className='product_whishlist_availability'>Category:</p>
                                                                        <p className='quickview_mental ps-2'>{subCategoryId?.name}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Modal.Body>
                                                </Modal>
                                            </div>
                                        )}
                                        {compareView && (
                                            <div className="compare-view">
                                                <Modal className="px-2 compare-modal" show={compareView} centered={true} bsSize="lg" >
                                                    <Modal.Body className="p-0">
                                                        <div className="p-3">
                                                            <div className="d-flex align-items-cener justify-content-end">
                                                                <button className="pe-3 bg-transparent" onClick={() => setCompareView(false)}><img src={"/img/img/close.png"} height={30} width={30} alt="" /></button>
                                                            </div>
                                                            <Table responsive className="compare-table mb-0">
                                                                <tbody>
                                                                    <>
                                                                        <tr className="header-row">
                                                                            <td style={{ verticalAlign: 'top' }}><p className="title-left">image</p>  </td>
                                                                            {compareListData?.map((data, index) => {
                                                                                return (
                                                                                    <td className="position-relative text-center" key={index}>
                                                                                        {/* <img className="close-btn" width={30} src={close} alt=""
                                                                                    onClick={() => {
                                                                                        let list = [...compareListData];
                                                                                        let fIndex = list.findIndex(itm => itm?.id === data?.id);
                                                                                        list.splice(fIndex, 1);
                                                                                        if (compareListData?.length === 1) {
                                                                                            setCompareView(false);
                                                                                        }
                                                                                        setCompareListData(list);
                                                                                    }} /> */}
                                                                                        <img src={data?.product_feature_image} width={150} height={150} alt="img" loading="lazy" /> </td>
                                                                                )
                                                                            })}
                                                                        </tr>
                                                                        <tr>
                                                                            <td><p className="title-left">Title</p></td>
                                                                            {compareListData?.map((data,i) => {
                                                                                return (
                                                                                    <td key={i}><p className="compare-content">{data?.product_name}</p></td>
                                                                                )
                                                                            })}
                                                                        </tr>
                                                                        <tr>
                                                                            <td><p className="title-left">Price</p></td>
                                                                            {compareListData?.map((data,i) => {
                                                                                return (
                                                                                    <td key={i}><p className="compare-value">₹ {data?.product_sale_price ? parseInt(data?.product_sale_price)?.toLocaleString('en-IN') : 0}</p></td>
                                                                                )
                                                                            })}

                                                                        </tr>
                                                                        <tr>
                                                                            <td><p className="title-left">Description</p></td>
                                                                            {compareListData?.map((data,i) => {
                                                                                return (
                                                                                    <td key={i}><p className="compare-value">{data?.product_short_description}</p></td>
                                                                                )
                                                                            })}
                                                                        </tr>
                                                                        <tr>
                                                                            <td><p className="title-left">Available</p></td>
                                                                            {compareListData?.map((data,i) => {
                                                                                return (
                                                                                    <td key={i}><p className="compare-value">Yes</p></td>
                                                                                )
                                                                            })}
                                                                        </tr>
                                                                        <tr className="header-row">
                                                                            <td><p className="title-left">Action</p>  </td>
                                                                            {compareListData?.map((data, index) => {
                                                                                return (
                                                                                    <td className="position-relative text-center" key={index}>
                                                                                        <button className="btn btn-close pe-3 bg-transparent" onClick={() => {
                                                                                            let list = [...compareListData];
                                                                                            let fIndex = list.findIndex(itm => itm?.id === data?.id);
                                                                                            list.splice(fIndex, 1);
                                                                                            if (compareListData?.length === 1) {
                                                                                                setCompareView(false);
                                                                                            }
                                                                                            setCompareListData(list);
                                                                                        }}></button>
                                                                                    </td>
                                                                                )
                                                                            })}
                                                                        </tr>
                                                                    </>

                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </Modal.Body>
                                                </Modal>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        }) : (
                            <div className="mb-5">No data availble</div>
                        )}
                        <Pagination
                            className="product-pagination"
                            defaultCurrent={"01"}
                            current={page}
                            total={totalProduct}
                            onChange={(page, pageSize) => setPage(page)}
                        />;

                    </div>
                )}
                {isSelectedProd && (
                    <ProductDetails
                        selectedProduct={selectedProduct}
                        categoryName={categoryName}
                        setIsSelectedProd={setIsSelectedProd}
                        userDetails={userDetails}
                    />
                )}
            </div>
        </>
    )
}

export default Product;