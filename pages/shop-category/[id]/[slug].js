import { FaHeart, FaSailboat } from "react-icons/fa6";
import { FiEye, FiHeart } from "react-icons/fi";
import { IoIosGitCompare } from "react-icons/io";
import roseGold from '../Assets/img/rose-gold.jpg'
import close from "../Assets/img/close.png";
import React, { useEffect, useState } from "react";
import { Accordion, Carousel, Modal, Tab, Table, Tabs } from "react-bootstrap";
import bgImg from '../Assets/img/contact-us.png'
import { RangeSlider } from "rsuite";
import { LiaShoppingBagSolid } from "react-icons/lia";
import check from "../Assets/img/check.png";
import { useSelector, useDispatch } from 'react-redux';
import Slider from "react-slick";
import { addWhishListData, addComapreListData, fetchCategoryWiseProduct, getSubCategory, productFilters, getProductWiseFilter } from "@/src/redux/action/homeAction";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
// import { productFilters } from "@/src/redux/action/homeAction";

const ShoppingByCategory = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const productList = useSelector(state => state.home.categoryProductList);
    const subCategoryList = useSelector(state => state.home.subCategoryList);
    const productFilter = useSelector(state => state.home.productFilter);

    const [isQuickView, setIsQuickView] = useState(false);
    const [selectQuickView, setSelectQuickView] = useState(null);
    const [whishListData, setWhishListData] = useState([]);
    const [compareListData, setCompareListData] = useState([]);
    const [compareView, setCompareView] = useState(false);
    const [whishListList, setWhishListList] = useState([]);
    const [addToCartList, setAddToCartList] = useState([]);
    const [selectFilter, setSelectFilter] = useState({
        metal_color: '',
        metal: '',
    });
    const [selectedSubCategory, setSelectedSubCategory] = useState(params?.id);
    const [stateMinMaxPrice, setStateMinMaxPrice] = useState({
        minPrice: 0,
        maxPrice: 0
    });
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

    useEffect(() => {
        let wishList = JSON.parse(sessionStorage.getItem("wish_list")) || [];
        setWhishListList(wishList);
        dispatch(getSubCategory(params?.category_id))
        dispatch(productFilters())
    }, [dispatch, params])

    useEffect(() => {
        if (selectedSubCategory) {
            //  dispatch(fetchCategoryWiseProduct(params.id));
            dispatch(fetchCategoryWiseProduct("111"));
        }
    }, [selectedSubCategory])


    const handleWishList = (data) => {
        let wishList = JSON.parse(sessionStorage.getItem("wish_list")) || [];

        const existingProduct = wishList.find((item) => item.product_id === data.product_id);
        if (existingProduct) {
            wishList = wishList.filter((item) => item.product_id !== data.product_id);
        } else {
            wishList.push(data);
        }
        {whishListList?.some(item => item?.product_id === data?.product_id) ?
            toast('Successfully Removed..') :
            toast('Successfully Added..')
        }
        sessionStorage.setItem("wish_list", JSON.stringify(wishList));
        setWhishListList(wishList)
    }
    const handleAddToCart = (data) => {
        let wishList = JSON.parse(sessionStorage.getItem("addtocart")) || [];

        const existingProduct = wishList.find((item) => item.product_id === data.product_id);
        if (existingProduct) {
            wishList = wishList.filter((item) => item.product_id !== data.product_id);
        } else {
            wishList.push({ ...data, quantatiy: 1 });
        }

        sessionStorage.setItem("addtocart", JSON.stringify(wishList));
        setAddToCartList(wishList)
    }
    const handleCompareList = (data) => {
        let compareList = [];
        compareList?.push(...compareListData, data);
        setCompareListData(compareList);
    }

    const ApplyFilter = () => {
        let obj = {
            page: 1, id: params?.id,
            minPrice: stateMinMaxPrice?.minPrice,
            maxPrice: stateMinMaxPrice?.maxPrice,
            metal: selectFilter?.metal,
            metal_color: selectFilter?.metal_color
        }
        dispatch(getProductWiseFilter(obj))
    }

    useEffect(() => {
        dispatch(addComapreListData(compareListData))
    }, [compareListData])


    useEffect(() => {
        dispatch(addWhishListData(whishListData))
    }, [whishListData])

    return (
        <div className="shop-page pb-5">
            <div className='product_page'>
                <div className="common-banner" style={{ backgroundImage: `url(${bgImg})` }}>
                    <div className="row m-0 justify-content-end">
                        <div className="col-lg-5 col-md-8 col-12">
                            <div className="common-banner-content text-start">
                                <h2 className="common-banner-title">{params.category_name}</h2>
                                <p className="common-banner-descrption my-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                <button className="shop-diamond-btn">Shop Diamond Ring</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-10">
                        <Tabs
                            defaultActiveKey="home"
                            id="uncontrolled-tab-example"
                            className="mb-3 justify-content-center filter-tabs"
                        >
                            <Tab eventKey="home" title="Shop by style">
                                <div>
                                    <ul className="filter-product-list slider-list d-flex justify-content-lg-center">
                                        {subCategoryList?.map((item,i) => {
                                            return (
                                                <li key={i} className={item?.id == selectedSubCategory ? "selected-ring" : ""} onClick={() => setSelectedSubCategory(item?.id)}>
                                                    <img src={item?.category_image} alt="" className="filter-prodcut-img" />
                                                    <p>{item?.name}</p>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </Tab>
                            <Tab eventKey="profile" title="More filter">
                                <div>
                                    <div className="row justify-content-between">
                                        <div className="col-lg-5">
                                            <p className="diamond-shape-title text-start py-4">Metal</p>
                                            <div>
                                                <ul className="d-flex align-items-center justify-content-start">
                                                    {productFilter?.length > 0 && productFilter?.carat_values?.map((col,i) => {
                                                        return (
                                                            <li key={i} className="metal-list pe-3 text-center" onClick={() => {
                                                                setSelectFilter({ ...selectFilter, metal: col?.name })
                                                            }}>
                                                                <button className={selectFilter?.metal !== col?.name ? "metal-btn" : "metal-btn-select"}>{col?.name}</button>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                            {/* <div className="d-flex align-items-center">
                                                <p className="diamond-shape-title text-start pe-3">Setting style</p>
                                                <label class="checkboxDiv setting-style-data">Bridal Sets Only
                                                    <input type="checkbox" />
                                                    <span class="checkmark"></span>
                                                </label>
                                            </div> */}
                                            {/* <ul className="filter-product-list filter-product-list-slider">
                                                <Slider {...productSlider}>
                                                    {product?.map((item) => {
                                                        return (
                                                            <li className="selected-ring w-auto text-center">
                                                                <img src={item?.src} alt="" className="filter-prodcut-img" />
                                                                <p>Ring</p>
                                                            </li>
                                                        )
                                                    })}
                                                </Slider>
                                            </ul> */}
                                            <p className="diamond-shape-title text-start py-4">Metal Color</p>
                                            <div>
                                                <ul className="d-flex align-items-center justify-content-start">
                                                    {productFilter?.length > 0 && productFilter?.color_values?.map((col,i) => {
                                                        return (
                                                            <li className={`pe-3 text-center`}
                                                            key={i}
                                                            style={{cursor:'pointer'}}
                                                                onClick={() => {
                                                                    setSelectFilter({ ...selectFilter, metal_color: col?.name })
                                                                }}
                                                            >
                                                                <div className={`${selectFilter?.metal_color === col?.name ? "metal-list-select" : "metal-list"}`}>
                                                                    <img src={col?.image_url} width={26} height={26} />
                                                                </div>
                                                                <p>{col?.name}</p>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-5">
                                            {/* <p className="diamond-shape-title text-start">Diamond Shape</p>
                                            <ul className="filter-product-list filter-product-list-slider">
                                                <Slider {...productSlider}>
                                                    {product?.map((item) => {
                                                        return (
                                                            <li className="selected-ring w-auto text-center">
                                                                <img src={item?.src} alt="" className="filter-prodcut-img" />
                                                                <p>Ring</p>
                                                            </li>
                                                        )
                                                    })}
                                                </Slider>
                                            </ul> */}
                                            <p className="diamond-shape-title text-start py-4">Ring Price <b>(Seeting + diamond)</b></p>
                                            <div>
                                                <RangeSlider className="price-slider" min={productFilter?.min_price} max={productFilter?.max_price} defaultValue={[productFilter?.min_price, productFilter?.max_price]} onChange={(value) => {
                                                    setStateMinMaxPrice({ ...stateMinMaxPrice, minPrice: value[0], maxPrice: value[1] })
                                                }} />
                                                <p className="progess-bar-value pt-3 text-start">Price: ₹{stateMinMaxPrice?.minPrice} - ₹{stateMinMaxPrice?.maxPrice}</p>
                                                <button className="metal-btn" onClick={() => ApplyFilter()}>Apply Filter</button>
                                                <button className="metal-btn" onClick={() => {
                                                    setSelectFilter({ metal: '', metal_color: '' });
                                                    setStateMinMaxPrice({ minPrice: 0, metal_color: 0 });
                                                    dispatch(fetchCategoryWiseProduct("111"))
                                                }} style={{ marginTop: '20px' }} >Clear Filter</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                <div className="mt-lg-5 mt-3 pt-lg-5 pt-3">
                    <div className='d-flex align-items-center justify-content-end filter-top'>
                        {/* <button class="btn filter-btn d-flex align-items-center" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><img alt="" src={filter} className="me-2" /> Filter</button> */}

                        <div className="d-flex">
                            <div class="dropdown sorting-dropdown me-2">
                                <button class="btn sorting-dropdown-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Price,Low,High
                                </button>
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
                        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                            <div class="offcanvas-header">
                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div class="offcanvas-body">
                                <div className='left-filter'>
                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Item eventKey="0" className="border-0 pb-3">
                                            <Accordion.Header className='left-data-title'><p>Categories</p></Accordion.Header>
                                            <Accordion.Body>
                                                <ul className='product-categories'>
                                                    <li className='cat-item d-flex align-items-center justify-content-between'>
                                                        <label class="checkboxDiv">Bracelets
                                                            <input type="checkbox" />
                                                            <span class="checkmark"></span>
                                                        </label>
                                                        <span className="total-item">32</span>
                                                    </li>
                                                    <li className='cat-item d-flex align-items-center justify-content-between'>
                                                        <label class="checkboxDiv">Diamond
                                                            <input type="checkbox" />
                                                            <span class="checkmark"></span>
                                                        </label>
                                                        <span className="total-item">7</span>
                                                    </li>
                                                    <li className='cat-item d-flex align-items-center justify-content-between'>
                                                        <label class="checkboxDiv">Earrings
                                                            <input type="checkbox" />
                                                            <span class="checkmark"></span>
                                                        </label>
                                                        <span className="total-item">14</span>
                                                    </li>
                                                    <li className='cat-item d-flex align-items-center justify-content-between'>
                                                        <label class="checkboxDiv">Pendant
                                                            <input type="checkbox" />
                                                            <span class="checkmark"></span>
                                                        </label>
                                                        <span className="total-item">20</span>
                                                    </li>
                                                    <li className='cat-item d-flex align-items-center justify-content-between'>
                                                        <label class="checkboxDiv">Rings
                                                            <input type="checkbox" />
                                                            <span class="checkmark"></span>
                                                        </label>
                                                        <span className="total-item">25</span>
                                                    </li>
                                                    <li className='cat-item d-flex align-items-center justify-content-between'>
                                                        <label class="checkboxDiv">unathorise
                                                            <input type="checkbox" />
                                                            <span class="checkmark"></span>
                                                        </label>
                                                        <span className="total-item">30</span>
                                                    </li>
                                                </ul>
                                                <div>
                                                    <h2 className="filter-by-price mb-3">Filter by Price</h2>
                                                    <RangeSlider className="price-slider" defaultValue={[10, 50]} />
                                                    <p className="price-value pt-3 text-start">Price: ₹0 - ₹1,11,100</p>

                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1" className="border-0 pb-3">
                                            <Accordion.Header className='left-data-title'>Metal</Accordion.Header>
                                            <Accordion.Body className="px-0">
                                                <div className="d-flex">
                                                    <button className="metal-btn">18k Gold</button>
                                                    <button className="metal-btn ms-3">14k Gold</button>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2" className="border-0 pb-3">
                                            <Accordion.Header className='left-data-title'>Metal Colors</Accordion.Header>
                                            <Accordion.Body className="px-0">
                                                <div className="d-flex">
                                                    <img alt="" src={"/img/img/gold.jpg"} className="color-img" width={50} height={50} />
                                                    <img alt="" src={"/img/img/rose-gold.jpg"} className="color-img" width={50} height={50} />
                                                    <img alt="" src={"/img/img/white-gold.jpeg"} className="color-img" width={50} height={50} />
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="3" className="border-0 pb-3">
                                            <Accordion.Header className='left-data-title'>Stone Shape</Accordion.Header>
                                            <Accordion.Body className="px-0">
                                                <div className="d-flex">
                                                    <img alt="" src={"/img/img/gold.jpg"} className="color-img" width={50} height={50} />
                                                    <img alt="" src={"/img/img/rose-gold.jpg"} className="color-img" width={50} height={50} />
                                                    <img alt="" src={"/img/img/white-gold.jpeg"} className="color-img" width={50} height={50} />
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mx-auto product-page__row mt-4 mb-5'>
                        <div className='product-list '>
                            <div className='row m-0'>
                                {productList?.length > 0 && productList?.map((prod,i) => {
                                    return (
                                        <div className='col-lg-3 col-md-6 col-12' key={i}>
                                            <div className='main-product-box'>
                                                <div className='main_product_image__box shop-product_page-box position-relative'>
                                                    <Link to={`/shop-detail/${prod?.product_id}/${params.category_name}`}>
                                                        <img src={prod?.product_feature_image} alt="img" />
                                                    </Link>
                                                    <ul className='align-items-center icon-list'>
                                                        <li className='position-relative' onClick={() => handleWishList(prod)}>
                                                            <div className='icon-cover tooltips position-relative'>
                                                                {whishListList?.some(item => item?.product_id === prod?.product_id) ?
                                                                    <FaHeart color="#07362e" /> :
                                                                    <FiHeart className='heart-icon' color="#046767" />}
                                                                {/* Fill heatr */}
                                                                {/* <FaHeart color="#07362e" /> */}
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
                                                    <a href='#' className='product_type_title'>{params.category_name}</a>
                                                    <div className="d-flex align-items-center justify-content-center py-3">
                                                        <img alt="" src={"/img/img/rose-gold.jpg"} width={30} height={30} className="color-img" />
                                                        <img alt="" src={"/img/img/gold.jpg"} width={30} height={30} className="color-img" />
                                                        <img alt="" src={"/img/img/white-gold.jpeg"} width={30} height={30} className="color-img" />
                                                    </div>
                                                    <h5 className='product_content'>{prod.product_name}</h5>
                                                    <p className='product_price'>₹{prod?.product_sale_price ? parseInt(prod?.product_sale_price)?.toLocaleString('en-IN') : "0"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
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
                                                        <img src={d} alt="img" className="quickview-image" key={i}/>
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
                                                    <p className='product_whishlist_instock ps-2 mt-0'>In Stock <img className="ms-2" src={check} alt="" /> </p>
                                                </div>
                                                <div className="d-flex mt-2 align-items-center">
                                                    <p className='product_whishlist_availability'>Price:</p>
                                                    <p className='quickview_mental ps-2'>₹{selectQuickView?.product_regular_price}</p>
                                                </div>
                                                <div className="d-flex mt-2 align-items-center">
                                                    <p className='product_whishlist_availability'>Category:</p>
                                                    <p className='quickview_mental ps-2'>{params?.category_name}</p>
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
                                        <Table responsive className="compare-table mb-0">
                                            <tbody>
                                                {compareListData?.length > 0 && compareListData?.map((item) => {
                                                    return (
                                                        <>
                                                            <tr className="header-row">
                                                                <td style={{ verticalAlign: 'top' }}><p className="title-left">image</p>  </td>
                                                                {compareListData?.len}
                                                                <td className="position-relative text-center"><img className="close-btn" width={30} src={close} alt="" /><img src={item?.product_feature_image} width={150} height={150} alt="img" /> </td>
                                                                {/* <td className="position-relative text-center"><img className="close-btn" width={30} src={close} alt="" /><img src={products} width={150} height={150} alt="img" /> </td>
                                                            <td className="position-relative text-center"><img className="close-btn" width={30} src={close} alt="" /><img src={products} width={150} height={150} alt="img" /> </td>
                                                            <td className="position-relative text-center"><img className="close-btn" width={30} src={close} alt="" /><img src={products} width={150} height={150} alt="img" /> </td>
                                                            <td className="position-relative text-center"><img className="close-btn" width={30} src={close} alt="" /><img src={products} width={150} height={150} alt="img" /> </td>
                                                            <td className="position-relative text-center"><img className="close-btn" width={30} src={close} alt="" /><img src={products} width={150} height={150} alt="img" /> </td>
                                                            <td className="position-relative text-center"><img className="close-btn" width={30} src={close} alt="" /><img src={products} width={150} height={150} alt="img" /> </td> */}
                                                            </tr>
                                                            <tr>
                                                                <td><p className="title-left">Title</p></td>
                                                                <td><p className="compare-content">{item?.product_name}</p></td>
                                                                {/* <td><p className="compare-content">0.68 TCW Round-Cut Lab Grown Diamond Pendant</p></td>
                                                            <td><p className="compare-content">0.68 TCW Round-Cut Lab Grown Diamond Pendant</p></td>
                                                            <td><p className="compare-content">0.68 TCW Round-Cut Lab Grown Diamond Pendant</p></td>
                                                            <td><p className="compare-content">0.68 TCW Round-Cut Lab Grown Diamond Pendant</p></td>
                                                            <td><p className="compare-content">0.68 TCW Round-Cut Lab Grown Diamond Pendant</p></td>
                                                            <td><p className="compare-content">0.68 TCW Round-Cut Lab Grown Diamond Pendant</p></td> */}
                                                            </tr>
                                                            <tr>
                                                                <td><p className="title-left">Price</p></td>
                                                                <td><p className="compare-value">{item?.product_regular_price}</p></td>
                                                                {/* <td><p className="compare-value">₹191,600</p></td>
                                                            <td><p className="compare-value">₹191,600</p></td>
                                                            <td><p className="compare-value">₹191,600</p></td>
                                                            <td><p className="compare-value">₹191,600</p></td>
                                                            <td><p className="compare-value">₹191,600</p></td>
                                                            <td><p className="compare-value">₹191,600</p></td> */}
                                                            </tr>
                                                            <tr>
                                                                <td><p className="title-left">Description</p></td>
                                                                <td><p className="compare-descrption">{item?.product_description}</p></td>
                                                                {/* <td><p className="compare-descrption">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></td>
                                                            <td><p className="compare-descrption">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></td>
                                                            <td><p className="compare-descrption">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></td>
                                                            <td><p className="compare-descrption">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></td>
                                                            <td><p className="compare-descrption">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></td>
                                                            <td><p className="compare-descrption">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></td> */}
                                                            </tr>
                                                            <tr>
                                                                <td><p className="title-left">Available</p></td>
                                                                <td><p className="compare-availble">Yes</p></td>
                                                                {/* <td><p className="compare-availble">Yes</p></td>
                                                            <td><p className="compare-availble">Yes</p></td>
                                                            <td><p className="compare-availble">Yes</p></td>
                                                            <td><p className="compare-availble">Yes</p></td>
                                                            <td><p className="compare-availble">Yes</p></td>
                                                            <td><p className="compare-availble">Yes</p></td> */}
                                                            </tr>
                                                        </>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                        <div className="d-flex align-items-cener justify-content-end pt-5">
                                            <button className="pe-3" onClick={() => setCompareView(false)}><img src={close} height={30} width={30} alt="" /></button>
                                            <button className="compare-btn py-2">Compare</button>
                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default ShoppingByCategory;