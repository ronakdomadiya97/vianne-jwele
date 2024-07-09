import React, { useEffect, useState } from "react";
import {  Modal, Table } from "react-bootstrap";
import {  FiEye, FiHeart } from "react-icons/fi";
import { IoIosGitCompare } from "react-icons/io";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { useDispatch, useSelector } from 'react-redux';
import { addToCartProduct, fetchAllProductUser, fetchRelatedProductUser, getUserDetail, getUserOrders } from "../redux/action/homeAction";
import Cookies from 'js-cookie';
import Slider from "react-slick";
import ProductDetails from "./ProductDetails";
import { fetchBlogs } from "../redux/action/blogAction";
import BlogDetails from "./BlogDetails";
import { FaHeart } from "react-icons/fa6";
import { toast } from 'react-toastify';
import BlogByCategoryClientSide from "./BlogByCategoryClientSide";

const DashBoard = ({ children, handleSideClick, setIsSelectedProd, isSelectedProd }) => {
    const disptach = useDispatch();
    const userDetails = useSelector(state => state.home.userDetails);
    const currencyRate = useSelector(state => state.home.currencyRate);
    const currency = useSelector(state => state.home.currency);
    const [compareView, setCompareView] = useState(false);
    const [compareListData, setCompareListData] = useState([]);
    const [isQuickView, setIsQuickView] = useState(false);
    const [selectQuickView, setSelectQuickView] = useState(null);
    const [subCategoryName, setSubCategoryName] = useState(null);
    const [isBlogVategory, setIsBlogCateogry] = useState(false);
    const [cateId, setCateId] = useState('');
    const relatedProductList = useSelector(state => state.home.relatedProductList);
    const productList = useSelector(state => state.home.productList?.variable_products);
    const postList = useSelector(state => state.blog.blogList.posts);
    const [whishListList, setWhishListList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isSelectedBlog, setIsSelectedBlog] = useState(false);
    console.log('sdfsdf123...',isSelectedProd);



    useEffect(() => {
        let wishList = JSON.parse(sessionStorage.getItem("wish_list")) || [];
        setWhishListList(wishList);
        const storedUserData = Cookies.get('relatedProduct');
        if (storedUserData) {
            disptach(fetchRelatedProductUser(userDetails?.user_id, JSON.parse(storedUserData)?.id))
            setSubCategoryName(JSON.parse(storedUserData)?.subCategoryName)
        }
        let userIds = sessionStorage.getItem('userId');
        disptach(getUserDetail(userIds))
        disptach(fetchAllProductUser(userDetails?.user_id))
        disptach(fetchBlogs({ page: 1, posts_per_page: 10 }))
        disptach(getUserOrders(userDetails?.user_email ? userDetails?.user_email : "viannejewels@gmail.com"))
    }, [])




    const reviewSlider = {
        dots: false,
        arrows: true,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
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
                    slidesToShow: 2,
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
    const newblogtSlider = {
        dots: false,
        arrows: true,
        autoplay: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
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
    const recommandeadSlider = {
        dots: false,
        arrows: true,
        autoplay: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerPadding: "10px",
                },
            },
        ],
    };
    const newproductSlider = {
        dots: false,
        arrows: true,
        autoplay: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerPadding: "10px",
                },
            },
        ],
    };

    let imageSrc = [];
    let productName = [];
    let priceList = [];
    for (let index = 0; index < compareListData?.length; index++) {
        let data = {
            src: '',
            id: '',
        };
        data.src = compareListData[index]?.product_feature_image;
        data.id = compareListData[index]?.product_id;
        const title = compareListData[index]?.product_name;
        const price = compareListData[index]?.product_sale_price;
        imageSrc?.push(data)
        productName?.push(title)
        priceList?.push(price)

    }
    const handleQuickView = (data) => {
        setIsQuickView(true)
        setSelectQuickView(data);
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
    const ReadMore = (data) => {
        setIsBlogCateogry(false)
        setIsSelectedBlog(true)
        setSelectedBlog(data)
    }
    const handleWishList = (data, index) => {
        let wishList = JSON.parse(sessionStorage.getItem("wish_list")) || [];

        const existingProduct = wishList.find((item) => item.product_id === data.product_id);
        if (existingProduct) {
            wishList = wishList.filter((item) => item.product_id !== data.product_id);
        } else {
            wishList.push(data);
        }
        {
            productList?.some((item, i) => i === index && whishListList?.map((d) => d.product_id)?.includes(item?.product_id)) ?
                toast('Successfully Removed..') :
                toast('Successfully Added..')
        }
        sessionStorage.setItem("wish_list", JSON.stringify(wishList));
        setWhishListList(wishList)
    }

    const handleAddToCart = async (data) => {
        let userIds = await sessionStorage.getItem('userId');
        const response = await disptach(addToCartProduct({ product_id: data.product_id }, userIds));
        if (response) {
            toast('Successfully add to cart product')
        }
    }

    const CloseButton = (id) => {
        const filterData = compareListData?.filter((data, index) => data?.product_id !== id);
        if (compareListData?.length === 1) {
            setCompareView(false)
        }
        setCompareListData(filterData)
    }

    const handlePostByCategory = (id) => {
        setIsSelectedBlog(false)
        setIsBlogCateogry(true)
        setCateId(id)
    }
    return (
        <>
            {/* New Product */}
            {!isSelectedProd && !isSelectedBlog && !isBlogVategory && productList?.length > 0 && (
                <div className="new-product-section">
                    <h2 className="new-product-title">New Product</h2>
                    <div className="row m-0">
                        <Slider {...newproductSlider} className="p-0">
                            {!isSelectedProd && !isSelectedBlog && productList?.length > 0 && productList?.map((prod, index) => {
                                return (
                                    <div className='col-lg-3 col-md-6 col-12'>
                                        <div className='main-product-box'>
                                            <div className='main_product_image__box shop-product_page-box position-relative'>
                                                <div onClick={() => {
                                                    setIsSelectedProd(true)
                                                    setSelectedProduct(prod)
                                                }}>
                                                    <img className="new-product-main-img" src={prod?.product_feature_image} alt="img" loading="lazy"/>
                                                </div>
                                                <button className="new-btn">New</button>
                                                <ul className='align-items-center icon-list'>
                                                    <li className='position-relative' onClick={() => handleWishList(prod, index)}>
                                                        <div className='icon-cover tooltips position-relative'>
                                                            {productList?.some((item, i) => i === index && whishListList?.map((d) => d.product_id)?.includes(item?.product_id)) ?
                                                                <FaHeart color="#07362e" /> :
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
                                                            <span className="tooltiptext">Watch <span className="triangle"></span></span>
                                                        </div>
                                                    </li>
                                                    <li className='position-relative' onClick={() => { setCompareView(true); handleCompareList(prod); }}>
                                                        <div className='icon-cover tooltips position-relative'>
                                                            <div className=" d-inline-block">
                                                                <IoIosGitCompare className='heart-icon' color="#046767" />
                                                            </div>
                                                            <span className="tooltiptext">Compare <span className="triangle"></span></span>
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
                                                <a href='#' className='product_type_title'>{prod?.product_taxonomies?.join()}</a>
                                                <h5 className='product_content'>{prod?.product_name}</h5>
                                                <p className='product_price'>{currency == 'USD' ? '$' : '₹'}{prod?.product_sale_price ? currency == 'USD' ? Math.ceil(currencyRate * parseInt(prod?.product_sale_price)) : parseInt(prod?.product_sale_price)?.toLocaleString('en-IN') : '0'}</p>
                                            </div>


                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
            )}
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
                                            <p className='quickview_mental ps-2'>{currency == 'USD' ? '$' : '₹'}{selectQuickView?.product_sale_price ? currency == 'USD' ? Math.ceil(currencyRate * parseInt(selectQuickView?.product_sale_price)) : parseInt(selectQuickView?.product_sale_price)?.toLocaleString('en-IN') : '0'}</p>
                                        </div>
                                        <div className="d-flex mt-2 align-items-center">
                                            <p className='product_whishlist_availability'>Category:</p>
                                            <p className='quickview_mental ps-2'>{subCategoryName}</p>
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
                            <div className="p-sm-3 p-2">
                                <div className="d-flex align-items-cener justify-content-end">
                                    <button className="pe-3 bg-transparent" onClick={() => setCompareView(false)}><img src={"/img/img/close.png"} height={30} width={30} alt="" /></button>
                                </div>
                                <Table responsive className="compare-table mb-0">
                                    <tbody>
                                        <>
                                            <tr className="header-row">
                                                <td style={{ verticalAlign: 'top' }}><p className="title-left">image</p>  </td>
                                                {imageSrc?.map((data, index) => {
                                                    let url = data?.src?.match(/^https?:\/\/([^/?#]+)/i);
                                                    return (
                                                        <td className="position-relative text-center" key={index}>
                                                            <img src={url?.[0] === "https://api.viannejewels.com" ? data?.src : `https://api.viannejewels.com${data?.src}`} width={150} height={150} alt="img" loading="lazy" />
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr>
                                                <td><p className="title-left">Title</p></td>
                                                {productName?.map((data,i) => {
                                                    return (
                                                        <td key={i}><p className="compare-content">{data}</p></td>
                                                    )
                                                })}
                                            </tr>
                                            <tr>
                                                <td><p className="title-left">Price</p></td>
                                                {priceList?.map((data,i) => {
                                                    return (
                                                        <td key={i}><p className="compare-value">₹ {data ? parseInt(data)?.toLocaleString('en-IN') : 0}</p></td>
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
                                            <tr>
                                                <td><p className="title-left">Action</p></td>
                                                {imageSrc?.map((data, index) => {
                                                    return (
                                                        <td className="position-relative text-center" key={index}>
                                                            <button className="btn btn-close pe-3 bg-transparent" onClick={() => CloseButton(data?.id)}></button>
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
            {/* Top Ranking */}
            {/* <div className="top-ranking-section pb-4">
                <div className="">
                    <h2 className="new-product-title">Top Ranking</h2>
                </div>
                <div className="row">
                    <Slider {...rankingSlider} >
                        <div className="col-lg-4">
                            <div className="ranking-box">
                                <div className="d-flex">
                                    <img className="ranking-img" src={products} alt="img" />
                                    <div className="ranking-box-data ps-2">
                                        <h3>Pendant</h3>
                                        <p>0.68 TCW Round-Cut Lab Grown Diamond Pendant</p>
                                        <h4>₹191,600</h4>
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex align-items-center">
                                                <img src={star} />
                                                <img src={star} />
                                                <img src={star} />
                                                <img src={star} />
                                                <img src={star} />
                                            </div>
                                            <h5>2 Review</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <button>Detials</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="ranking-box">
                                <div className="d-flex">
                                    <img className="ranking-img" src={products} alt="img" />
                                    <div className="ranking-box-data ps-2">
                                        <h3>Pendant</h3>
                                        <p>0.68 TCW Round-Cut Lab Grown Diamond Pendant</p>
                                        <h4>₹191,600</h4>
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex align-items-center">
                                                <img src={star} />
                                                <img src={star} />
                                                <img src={star} />
                                                <img src={star} />
                                                <img src={star} />
                                            </div>
                                            <h5>2 Review</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <button>Detials</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="ranking-box">
                                <div className="d-flex">
                                    <img className="ranking-img" src={products} alt="img" />
                                    <div className="ranking-box-data ps-2">
                                        <h3>Pendant</h3>
                                        <p>0.68 TCW Round-Cut Lab Grown Diamond Pendant</p>
                                        <h4>₹191,600</h4>
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex align-items-center">
                                                <img src={star} />
                                                <img src={star} />
                                                <img src={star} />
                                                <img src={star} />
                                                <img src={star} />
                                            </div>
                                            <h5>2 Review</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <button>Detials</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="ranking-box">
                                <div className="d-flex">
                                    <img className="ranking-img" src={products} alt="img" />
                                    <div className="ranking-box-data ps-2">
                                        <h3>Pendant</h3>
                                        <p>0.68 TCW Round-Cut Lab Grown Diamond Pendant</p>
                                        <h4>₹191,600</h4>
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex align-items-center">
                                                <img src={star} />
                                                <img src={star} />
                                                <img src={star} />
                                                <img src={star} />
                                                <img src={star} />
                                            </div>
                                            <h5>2 Review</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <button>Detials</button>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div> */}

            {/* Recommended for you */}
            {!isSelectedProd && !isSelectedBlog && !isBlogVategory && relatedProductList?.length > 0 && (
                <div className="new-product-section product-recommndation">
                    <h2 className="new-product-title">Recommended for you</h2>
                    <div className="row m-0">
                        <Slider {...recommandeadSlider} className="p-0" >
                            {!isSelectedProd && !isSelectedBlog && relatedProductList?.length > 0 && relatedProductList?.map((prod, index) => {
                                return (
                                    <div className='col-lg-2 col-md-6 col-12' key={index}>
                                        <div className='main-product-box'>
                                            <div className='main_product_image__box shop-product_page-box position-relative'>
                                                <div onClick={() => {
                                                    setIsSelectedProd(true)
                                                    setSelectedProduct(prod)
                                                }}>
                                                    <img loading="lazy" src={`https://api.viannejewels.com${prod?.product_feature_image}`} alt="img" style={{ height: '283px' }} />
                                                </div>
                                                <ul className='align-items-center icon-list'>
                                                    <li className='position-relative' onClick={() => handleWishList(prod)}>
                                                        <div className='icon-cover tooltips position-relative'>
                                                            {relatedProductList?.some((item, i) => index === i && whishListList?.map((d) => d.product_id)?.includes(item?.product_id)) ?
                                                                <FaHeart color="#07362e" size={26} /> :
                                                                <FiHeart size={26} />
                                                            }
                                                            <span className="tooltiptext">Whishlist <span className="triangle"></span></span>
                                                        </div>
                                                    </li>
                                                    <li className='position-relative'>
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
                                                            <span className="tooltiptext">Watch <span className="triangle"></span></span>
                                                        </div>
                                                    </li>
                                                    <li className='position-relative' onClick={() => { setCompareView(true); handleCompareList(prod); }}>
                                                        <div className='icon-cover tooltips position-relative'>
                                                            <div className=" d-inline-block">
                                                                <IoIosGitCompare className='heart-icon' color="#046767" />
                                                            </div>
                                                            <span className="tooltiptext">Compare <span className="triangle"></span></span>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <button className="product-add-cart d-none">Add to Cart</button>
                                            </div>
                                            <div className='main-product__detail__box'>
                                                <a href='#' className='product_type_title'>{subCategoryName}</a>
                                                <h5 className='product_content'>{prod?.product_name}</h5>
                                                <p className='product_price'>{currency == 'USD' ? '$' : '₹'}{parseInt(prod?.product_sale_price ? currency == 'USD' ? Math.ceil(currencyRate * parseInt(prod?.product_sale_price)) : prod?.product_sale_price : 0)?.toLocaleString('en-IN')}</p>
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
                                                                                <img key={i} src={d} alt="img" className="quickview-image" loading="lazy"/>
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
                                                                            <p className='quickview_mental ps-2'>{currency == 'USD' ? '$' : '₹'}{selectQuickView?.product_sale_price ? currency == 'USD' ? Math.ceil(currencyRate * parseInt(selectQuickView?.product_sale_price)) : parseInt(selectQuickView?.product_sale_price)?.toLocaleString('en-IN') : '0'}</p>
                                                                        </div>
                                                                        <div className="d-flex mt-2 align-items-center">
                                                                            <p className='product_whishlist_availability'>Category:</p>
                                                                            <p className='quickview_mental ps-2'>{subCategoryName}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Modal.Body>
                                                    </Modal>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
            )}
            {isSelectedProd && (
                <ProductDetails
                    selectedProduct={selectedProduct}
                    categoryName={subCategoryName}
                    setIsSelectedProd={setIsSelectedProd}
                    userDetails={userDetails}
                />
            )}
            {/* New Blog */}
            {!isSelectedProd && !isSelectedBlog && !isBlogVategory && postList?.length > 0 && (
                <div className="blog-details-dashboard pb-4">
                    <h2 className="new-product-title">New In Blog</h2>
                    <div className="row m-0">
                        <Slider {...newblogtSlider} className="p-0">
                            {!isSelectedProd && !isSelectedBlog && postList?.map((pos,i) => {
                                return (
                                    <div className="col-md-6 mt-0 pt-4" key={i}>
                                        <div className="blog-data-box text-start">
                                            <div className="blog-img">
                                                <img src={pos?.post_feature_image} alt="img" className="w-100 blogs-img object-fit-cover" height={260} loading="lazy"/>
                                            </div>
                                            <p className="blog-date text-start pt-3">{pos?.post_created_date}</p>
                                            <p className="blog-title text-start py-3 mt-0">{pos?.post_title}.</p>
                                            <p className="blog-descrption text-start mt-0">{pos?.post_excerpt}</p>
                                            <button className="read-more mt-3" onClick={() => ReadMore(pos)}>
                                                Read More
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
            )}
            {!isBlogVategory && isSelectedBlog && (
                <BlogDetails
                    selectedBlog={selectedBlog}
                    setIsSelectedBlog={setIsSelectedBlog}
                    handlePostByCategory={handlePostByCategory}
                />
            )}
            {!isSelectedBlog && isBlogVategory && <BlogByCategoryClientSide id={cateId} ReadMore={ReadMore} />}
        </>

    )
}
export default DashBoard;