import { FaHeart } from "react-icons/fa6";
import { FiEye, FiHeart } from "react-icons/fi";
import { IoIosGitCompare } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { Accordion, Modal, Tab, Table, Tabs } from "react-bootstrap";
import { RangeSlider } from "rsuite";
import { useSelector, useDispatch } from 'react-redux';
import Slider from "react-slick";
import { addWhishListData, addComapreListData, fetchCategoryWiseProduct, getSubCategory, productFilters, getProductWiseFilter, setLoader } from "@/src/redux/action/homeAction";
import { toast } from 'react-toastify';
import { Pagination } from "antd";
import Link from "next/link";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useRouter as useRoutes} from "next/router";

const Shopping = () => {
    const dispatch = useDispatch();
    const navigate = useRouter();
    const router = useRoutes();
    const perPage = 10;
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
    const [categoryName, setCategoryName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [bannerImg, setBanneImg] = useState('');
    const [totalProduct, setTotalProduct] = useState(0);
    const [selectFilter, setSelectFilter] = useState({
        metal_color: '',
        metal: '',
    });
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [stateMinMaxPrice, setStateMinMaxPrice] = useState({
        minPrice: 0,
        maxPrice: 0
    });
    const [page, setPage] = useState(1)
    const handleQuickView = (data) => {
        setIsQuickView(true)
        setSelectQuickView(data);
    }

    console.log('router', router)
    const bannerList = [{
        name: 'Bracelet',
        img: "/img/img/4.jpg"
    },
    {
        name: 'Rings',
        img: "/img/img/2.jpg"
    },
    {
        name: 'Earrings',
        img: "/img/img/5.jpg"
    },
    {
        name: 'Necklace',
        img: "/img/img/3.jpg"
    },
    {
        name: 'Pendant',
        img: "/img/img/1.jpg"
    },
    ]

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
        if (router?.query?.id !== selectedSubCategory) {
            setPage(1)
        }
        let wishList = JSON.parse(sessionStorage.getItem("wish_list")) || [];
        setWhishListList(wishList);
        setCategoryId(router?.query?.category_id)
        dispatch(getSubCategory(router?.query?.category_id));
        dispatch(productFilters())
        setBanneImg(bannerList?.find(itm => itm.name == router?.query?.main_cateogry_name))

    }, [router?.query])

    useEffect(() => {
        let isEmpty = false;
        if (router?.query?.category_id !== categoryId) {
            setSelectedSubCategory('');
            isEmpty = true
        }
        getFetchData(isEmpty);
    }, [page, router?.query])

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    const getFetchData = async (isEmpty) => {
        let id = subCategoryList?.length > 0 ? (router?.query?.id === '270' || router?.query?.id === '271') ? router?.query?.id : isEmpty ? router?.query?.category_id : selectedSubCategory ? selectedSubCategory : router?.query?.category_id : router?.query?.category_id
        const response = await dispatch(fetchCategoryWiseProduct(id, perPage, page));
        setTotalProduct(response?.data?.total_products);
        if (router?.query?.id === '270' || router?.query?.id === '271') {
            setSelectedSubCategory(router?.query?.id)
        }
    }

    const handleWishList = (data) => {
        let wishList = JSON.parse(sessionStorage.getItem("wish_list")) || [];

        const existingProduct = wishList.find((item) => item.product_id === data.product_id);
        if (existingProduct) {
            wishList = wishList.filter((item) => item.product_id !== data.product_id);
        } else {
            wishList.push(data);
        }
        {
            whishListList?.some(item => item?.product_id === data?.product_id) ?
                toast('Product Removed from wishlist') :
                toast('Product Added to wishlist ')
        }
        sessionStorage.setItem("wish_list", JSON.stringify(wishList));
        setWhishListList(wishList)
    }
    // const handleAddToCart = (data) => {
    //     let wishList = JSON.parse(sessionStorage.getItem("addtocart")) || [];

    //     const existingProduct = wishList.find((item) => item.product_id === data.product_id);
    //     if (existingProduct) {
    //         wishList = wishList.filter((item) => item.product_id !== data.product_id);
    //     } else {
    //         wishList.push({ ...data, quantatiy: 1 });
    //     }

    //     sessionStorage.setItem("addtocart", JSON.stringify(wishList));
    //     setAddToCartList(wishList)
    // }
    const handleCompareList = (data) => {
        let compareList = [];
        compareList?.push(...compareListData, data);
        setCompareListData(compareList);
    }

    const ApplyFilter = () => {
        let obj = {
            page: 1,
            id: subCategoryList?.length > 0 ? selectedSubCategory ? router?.query?.id : router?.query?.category_id : router?.query?.category_id,
            minPrice: stateMinMaxPrice?.minPrice,
            maxPrice: stateMinMaxPrice?.maxPrice,
            metal: selectFilter?.metal,
            metal_color: selectFilter?.metal_color
        }
        dispatch(getProductWiseFilter(obj))
    }

    useEffect(() => {
        compareListData && dispatch(addComapreListData(compareListData))
    }, [compareListData])


    useEffect(() => {
        whishListData && dispatch(addWhishListData(whishListData))
    }, [whishListData])

    let imageSrc = [];
    let productName = [];
    let priceList = [];
    let descrption = [];
    for (let index = 0; index < compareListData?.length; index++) {
        let data = {
            src: '',
            id: '',
        };
        data.src = compareListData[index]?.product_feature_image;
        data.id = compareListData[index]?.product_id;
        const title = compareListData[index]?.product_name;
        const price = compareListData[index]?.product_regular_price;
        const descrptions = compareListData[index]?.product_description;
        imageSrc?.push(data)
        productName?.push(title)
        priceList?.push(price)
        descrption?.push(descrptions)
    }

    const CloseButton = (id) => {
        const filterData = compareListData?.filter((data, index) => data?.product_id !== id);
        if (compareListData?.length === 1) {
            setCompareView(false)
        }
        setCompareListData(filterData)
    }

    return (
        <div className="shop-page pb-lg-5 pb-4">
            <div className='product_page'>
                <div className="common-banner" style={{ backgroundImage: `url(${bannerImg ? bannerImg?.img : "/img/img/contact-us.png"})` }}>
                    <div className="row m-0 justify-content-end">
                        <div className="col-lg-5 col-md-8 col-12">
                            <div className="common-banner-content text-start">
                                {/* <h2 className="common-banner-title">{categoryName !== "undefined" ? categoryName : params?.main_cateogry_name}</h2> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center m-0" style={{ backgroundColor: "white" }}>
                    <div className="col-sm-10">
                        <Tabs
                            defaultActiveKey="home"
                            id="uncontrolled-tab-example"
                            className="mb-3 justify-content-center filter-tabs"
                        >
                            <Tab eventKey="home" title="Shop by style">
                                <div>
                                    <ul className="filter-product-list slider-list d-flex justify-content-md-center">
                                        {subCategoryList?.length > 0 && subCategoryList?.map((item,i) => {
                                            return (
                                                <li key={i} className={(item?.id == selectedSubCategory) ? "selected-ring" : ""} onClick={() => {
                                                    setSelectedSubCategory(item?.id);
                                                    setCategoryName(item?.name);
                                                    setPage(1);
                                                    navigate.push({
                                                        pathname: '/shop',
                                                        query: {
                                                          id: item?.id,
                                                          category_name: item?.name,
                                                          category_id: router?.query?.category_id,
                                                          main_cateogry_name: router?.query?.main_cateogry_name,
                                                        },
                                                        state: {
                                                          data:"skjjsk"
                                                        }
                                                      })
                                                    // navigate.push(
                                                    //     `/shop/${item?.id}/${item?.name}/${params?.category_id}/${params.main_cateogry_name}`
                                                    // );
                                                }}>
                                                    <img src={item?.category_image} alt="" className="filter-prodcut-img" loading="lazy" />
                                                    <p className="filter-name">{item?.name}</p>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </Tab>
                            <Tab eventKey="profile" title="More filter">
                                <div>
                                    <div className="">
                                        <div className="justify-content-center">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6">
                                                    <p className="diamond-shape-title text-start py-2">Metal</p>
                                                    <div>
                                                        <ul className="d-flex align-items-center justify-content-start">
                                                            {productFilter?.carat_values?.length > 0 && productFilter?.carat_values?.map((col,i) => {
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
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <p className="diamond-shape-title text-start py-2 ps-md-3 ps-0">Metal Color</p>
                                                    <div>
                                                        <ul className="d-flex align-items-center justify-content-start ps-md-3 ps-0">
                                                            {productFilter?.color_values?.length > 0 && productFilter?.color_values?.map((col,i) => {
                                                                return (
                                                                    <li key={i} className={`pe-3 text-center`}
                                                                        style={{ cursor: 'pointer' }}
                                                                        onClick={() => {
                                                                            setSelectFilter({ ...selectFilter, metal_color: col?.name })
                                                                        }}>
                                                                        <div className={`${selectFilter?.metal_color === col?.name ? "metal-list-select" : "metal-list"}`}>
                                                                            <img src={col?.image_url} width={26} height={26} className="color-img" loading="lazy" />
                                                                        </div>
                                                                        <p className="color-text-name">{col?.name}</p>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: '30px' }}>
                                            <div>
                                                <div className="row">
                                                    <div className="col-md-6 ps-0">
                                                        <button className="metal-btn" onClick={() => ApplyFilter()} style={{ marginBottom: '10px' }} >Apply Filter</button>
                                                    </div>
                                                    <div className="col-md-6 ps-md-4 ps-0">
                                                        <button className="metal-btn" onClick={() => {
                                                            setSelectFilter({ metal: '', metal_color: '' });
                                                            setStateMinMaxPrice({ minPrice: 0, maxPrice: 0 });
                                                            // setCategoryId('')
                                                            dispatch(fetchCategoryWiseProduct(selectedSubCategory || router?.query?.id))
                                                        }}
                                                        >Clear Filter</button>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                <div className="mt-lg-5 mt-3 pt-lg-2 pt-0" style={{ backgroundColor: "white" }}>
                    <div className='d-flex align-items-center justify-content-end filter-top'>
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
                                                    <img alt="" src={"/img//img/white-gold.jpg"} className="color-img" width={50} height={50} />
                                                    <img alt="" src={"/img/img/rose-gold.jpg"} className="color-img" width={50} height={50} />
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="3" className="border-0 pb-3">
                                            <Accordion.Header className='left-data-title'>Stone Shape</Accordion.Header>
                                            <Accordion.Body className="px-0">
                                                <div className="d-flex">
                                                    <img alt="" src={"/img/img/gold.jpg"} className="color-img" width={50} height={50} />
                                                    <img alt="" src={"/img/img/white-gold.jpg"} className="color-img" width={50} height={50} />
                                                    <img alt="" src={"/img/img/rose-gold.jpg"} className="color-img" width={50} height={50} />
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mx-auto product-page__row mt-4 mb-lg-5 mb-0'>
                        <div className='product-list '>
                            <div className='row m-lg-5 m-sm-3 m-0 my-3'>
                                {productList?.length > 0 ? productList?.map((prod,i) => {
                                    return (
                                        <div className='col-lg-3 col-md-4 col-6' key={i}>
                                            <div className='main-product-box'>
                                                <div className='main_product_image__box shop-product_page-box position-relative'>
                                                    <Link href={`/shop-detail/${prod?.product_id}/${categoryName !== "undefined" ? categoryName : router?.query?.main_cateogry_name}`}>
                                                        <img src={prod?.product_feature_image} alt="img" style={{ height: "300px" }} loading="lazy"
                                                            className="mx-auto" />
                                                    </Link>
                                                    <ul className='align-items-center icon-list'>
                                                        <li className='position-relative' onClick={() => handleWishList(prod)}>
                                                            <div className='icon-cover tooltips position-relative'>
                                                                {whishListList?.some(item => item?.product_id === prod?.product_id) ?
                                                                    <FaHeart color="07362e" className="fill-color" /> :
                                                                    <>
                                                                        <div className=" d-inline-block">
                                                                            <FiHeart className='heart-icon' color="#07362e" />
                                                                        </div>
                                                                    </>
                                                                }
                                                                <span className="tooltiptext">Whishlist <span className="triangle"></span></span>
                                                                {/* Fill heatr */}
                                                                {/* <FaHeart color="#07362e" /> */}

                                                            </div>
                                                        </li>

                                                        <li className='position-relative' onClick={() => { handleQuickView(prod); setIsQuickView(true) }}>
                                                            <div className='icon-cover tooltips position-relative'>
                                                                <div className=" d-inline-block">
                                                                    <FiEye className='heart-icon' color="#046767" />
                                                                </div>
                                                                <span className="tooltiptext">Quick View <span className="triangle"></span></span>
                                                            </div>
                                                        </li>
                                                        <li className='position-relative' onClick={() => {
                                                            if (compareListData?.length < 4) {
                                                                setCompareView(true);
                                                                handleCompareList(prod);
                                                            } else {
                                                                toast('You can compare maximum 4 products.')
                                                            }
                                                        }}>
                                                            <div className='icon-cover tooltips position-relative'>
                                                                <div className=" d-inline-block">
                                                                    <IoIosGitCompare className='heart-icon' color="#046767" />
                                                                </div>
                                                                <span className="tooltiptext">Compare <span className="triangle"></span></span>
                                                            </div>
                                                        </li>
                                                        <Link href={`/shop-detail/${prod?.product_id}/${categoryName !== "undefined" ? categoryName : router?.query?.main_cateogry_name}`}>
                                                            <li className='position-relative'>
                                                                <div className='icon-cover tooltips position-relative'>
                                                                    <div className=" d-inline-block">
                                                                        <MdOutlineMoreHoriz className='heart-icon' color="#046767" />
                                                                        <span className="tooltiptext">Read more <span className="triangle"></span></span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </Link>
                                                    </ul>
                                                    <button className="product-add-cart d-none">Add to Cart</button>
                                                    {/* <div className="features-box">
                                                        <p className="discount-btn me-2">-50%</p>
                                                        <p className="discount-btn">features</p>
                                                    </div> */}
                                                </div>
                                                <div className='main-product__detail__box'>
                                                    <p className='product_type_title'>{prod.product_name}</p>
                                                    <div className="d-flex align-items-center justify-content-center py-3">
                                                        <img alt="" src={"/img/img/rose-gold.jpg"} width={30} height={30} className="color-img" />
                                                        <img alt="" src={"/img/img/gold.jpg"} width={30} height={30} className="color-img" />
                                                        <img alt="" src={"/img/img/white-gold.jpeg"} width={30} height={30} className="color-img" />
                                                    </div>
                                                    <h5 className='product_content'>
                                                        {(selectedSubCategory || router?.query?.id === '270' || router?.query?.id === '271') ? router?.query?.category_name : router?.query?.main_cateogry_name}

                                                    </h5>
                                                    {selectQuickView?.product_sale_price && (<p className='product_price'>₹{parseInt(prod?.product_sale_price)?.toLocaleString('en-IN')}</p>)}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : (
                                    <div className="mb-5">No data availble</div>
                                )}

                            </div>
                        </div>
                        <Pagination className="product-pagination" defaultCurrent={"01"} current={page} total={totalProduct} onChange={(page, pageSize) => setPage(page)} />;
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
                                                        <img key={i} src={d} alt="img" className="quickview-image" loading="lazy" />
                                                    )
                                                })}
                                            </Slider>
                                        </div>
                                        <div className="width-50 bg-lg-transparent bg-white pb-lg-0 pb-5 quick-content" style={{ paddingLeft: 10, paddingRight: 10 }}>
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
                                                    <p className='product_whishlist_availability'>Category:</p>
                                                    <p className='quickview_mental ps-2'>{router?.query?.category_name ? router?.query?.category_name : router?.query?.main_cateogry_name}</p>
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
                                    <div className="p-3 ">
                                        {/* <div className="d-flex align-items-cener justify-content-end">
                                            <button className="pe-3 bg-transparent" onClick={() => setCompareView(false)}><img src={close} height={30} width={30} alt="" /></button>
                                        </div> */}
                                        <Table responsive className="compare-table mb-0">
                                            <tbody>
                                                <>
                                                    <tr className="header-row">
                                                        <td style={{ verticalAlign: 'top' }}><p className="title-left">image</p>  </td>
                                                        {imageSrc?.map((data, index) => {
                                                            return (
                                                                <td className="position-relative text-center" key={index}>
                                                                    <img className="close-btn" width={30} src={"/img/img/close.png"} alt="" style={{ cursor: "pointer" }} onClick={() => CloseButton(data?.id)} />
                                                                    <img src={data?.src} width={150} height={150} alt="img" /> </td>
                                                                // <td className="position-relative text-center">
                                                                //     <img src={data?.src} width={150} height={150} alt="img" />
                                                                // </td>
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
                                                    {/* <tr>
                                                        <td><p className="title-left">Action</p></td>
                                                        {imageSrc?.map((data, index) => {
                                                            return (
                                                                <td className="position-relative text-center">
                                                                    <button className="btn btn-close pe-3 bg-transparent" onClick={() => CloseButton(data?.id)}></button>
                                                                </td>
                                                            )
                                                        })}
                                                    </tr> */}
                                                </>
                                            </tbody>
                                        </Table>
                                        <div className="d-flex align-items-cener justify-content-end pt-5">
                                            {/* <button className="pe-3 bg-transparent" onClick={() => setCompareView(false)}><img src={close} height={30} width={30} alt="" /></button> */}
                                            <button className="compare-btn py-2" onClick={() => setCompareView(false)}>Compare</button>
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
export default Shopping;