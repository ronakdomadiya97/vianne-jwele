import React, { useEffect, useState } from "react";
import "aos/dist/aos.css";
import { Accordion, Modal, Table } from "react-bootstrap";
import { FiEye, FiHeart } from "react-icons/fi";
import { IoIosGitCompare } from "react-icons/io";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { FaHeart } from "react-icons/fa6";
import { toast } from "react-toastify";
import { addComapreListData, fetchRelatedProduct, fetchSingleProductVariation, setLoader } from "@/src/redux/action/homeAction";
import { createProductInquiry } from "@/src/redux/action/contactUsActions";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Instagram from "@/src/Component/instagram";

const ShopDetail = () => {
  const disptach = useDispatch();
  const params = useParams();
  const navigate = useRouter();
  const productDetail = useSelector((state) => state.home.productDetail);
  const relatedProductList = useSelector(
    (state) => state.home.relatedProductList
  );
  const [isInquiry, setInquiey] = useState(false);
  const [isQuickView, setIsQuickView] = useState(false);
  const [selectQuickView, setSelectQuickView] = useState(null);
  const [compareView, setCompareView] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [whishListList, setWhishListList] = useState([]);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState({ x: 0, y: 0 });
  const [inputform, setInputForm] = useState({
    product_name: "",
    product_email: "",
    product_phone_number: "",
    product_message: "",
    first_name: "",
    last_name: "",
    billing_address: "",
    billing_city: "",
    billing_state: "",
    billing_postcode: "",
    billing_country: ""
  });
  const [selectFilter, setSelectFilter] = useState({
    metal_color: "",
    metal: "",
    price: "",
  });
  const [defaultImage, setDefaultImage] = useState([]);
  const [compareListData, setCompareListData] = useState([]);

  const handleQuickView = (data) => {
    setIsQuickView(true)
    setSelectQuickView(data);
  }
  const handleCompareList = (data) => {
    let compareList = [];
    compareList?.push(...compareListData, data);
    setCompareListData(compareList);
  }

  const CloseButton = (id) => {
    const filterData = compareListData?.filter((data, index) => data?.product_id !== id);
    if (compareListData?.length === 1) {
      setCompareView(false)
    }
    setCompareListData(filterData)
  }

  const handleChange = (e) => {
    setInputForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if(params?.id){
        disptach(fetchSingleProductVariation(params?.id));
        disptach(fetchRelatedProduct(params?.id));
    }
  }, [params?.id]);

  useEffect(() => {
    if (productDetail) {
      setSelectFilter({
        ...selectFilter,
        price: productDetail?.variations?.[0]?.price,
        metal: productDetail?.variations?.[0]?.carat_attribute,
        metal_color: productDetail?.color_attribute?.[0],
      });
    }
  }, [productDetail]);

  const bannerSlider = {
    dots: false,
    arrows: false,
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
  const realatedSlider = {
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
          slidesToShow: 3,
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
  const subImageSlider = {
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
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleWishList = (data) => {
    let wishList = JSON.parse(sessionStorage.getItem("wish_list")) || [];

    const existingProduct = wishList.find(
      (item) => item.product_id === data.product_id
    );
    if (existingProduct) {
      wishList = wishList.filter((item) => item.product_id !== data.product_id);
    } else {
      wishList.push(data);
    }
    whishListList?.some(
      (item) => item?.product_id === productDetails?.product_id
    )
      ? toast("Product Removed from wishlist")
      : toast("Product Added to wishlist ");

    sessionStorage.setItem("wish_list", JSON.stringify(wishList));
    setWhishListList(wishList);
  };

  useEffect(() => {
    if (productDetail) {
      setDefaultImage([
        {
          src: productDetail?.product_gallery_images?.[0],
        },
      ]);
      setProductDetails(productDetail);
    }
  }, [productDetail]);

  const isAnyValueEmpty = () => {
    for (const key in inputform) {
      if (inputform[key] === "") {
        return true; // If any value is empty, return true
      }
    }
    return false; // If no value is empty, return false
  }
  const Submitbtn = async () => {
    let params = inputform;
    params.product_id = productDetail?.product_id;
    params.quantity = qty;
    params.carat = selectFilter?.metal?.term_id;
    params.color = selectFilter?.metal_color?.term_id;
    if (!isAnyValueEmpty()) {
      let response = await disptach(createProductInquiry(params));
      console.log('response',response)
      if(response?.status === 200){
        toast("Inquiry sent")
        setInquiey(false);
        setInputForm({
          product_name: "",
          product_email: "",
          product_phone_number: "",
          product_message: "",
        });
      }
    } else {
      toast("Please fill in all fields.")
    }
  };

  const handleRelatedProduct = async (id) => {
    window.scroll(0, 0);
    disptach(setLoader(true))
    try {
      await Promise.all([
        disptach(fetchSingleProductVariation(id)),
        disptach(fetchRelatedProduct(id))
      ])
    } catch (error) {
      disptach(setLoader(false))
    } finally {
      disptach(setLoader(false))
    }

  };

  const phoneNumber = "1234567890"; // Replace with the desired phone number
  const message = "Hello, I want to chat!"; // Replace with your pre-filled message
  const handleWhatsAppClick = () => {
    // Generate the WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Open the WhatsApp link in a new window or tab
    window.open(whatsappUrl, "_blank");
  };
  const handleMouseMove = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    setTransformOrigin({ x, y });
    setZoom(true);
  };

  const handleMouseLeave = () => {
    setZoom(false);
  };
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
    disptach(addComapreListData(compareListData))
  }, [compareListData])

  let imageSrc = [];
  let productName = [];
  let descrption = [];
  for (let index = 0; index < compareListData?.length; index++) {
    let data = {
      src: '',
      id: '',
    };
    data.src = compareListData[index]?.product_feature_image;
    data.id = compareListData[index]?.product_id;
    const title = compareListData[index]?.product_name;
    const descrptions = compareListData[index]?.product_description;
    imageSrc?.push(data)
    productName?.push(title)
    descrption?.push(descrptions)
  }
  return (
    <div className="shop-detail pt-lg-5 pt-4">
      <div className="p-0 shop-detail-section">
        <div className="row mx-auto product-row">
          <div className="col-lg-6">
            <div>
              <Slider {...bannerSlider} className="m-0 p-0 product-slider">
                {defaultImage?.map((item) => {
                  let url = item?.src?.match(/^https?:\/\/([^/?#]+)/i);
                  return (
                    <li className="h-100 shop-main-image-scale">
                      <div
                        style={{ position: "relative", cursor: "pointer" }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                      >
                        <img
                          src={item.src}
                          height={530}
                          className="w-100 product-main-large-image"
                          alt=""
                          style={{
                            transition: "transform 0.2s ease",
                            transformOrigin: `${transformOrigin.x}px ${transformOrigin.y}px`,
                            transform: zoom ? "scale(1.8)" : "scale(1)",
                          }}
                        />
                      </div>
                      {/* )} */}
                    </li>
                  );
                })}
              </Slider>
              <ul
                className="product-main-large-sub-image"
              >
                <Slider {...subImageSlider}>
                  {productDetail?.product_gallery_images?.map((d, index) => {
                    return (
                      <li
                        key={index}
                        className="hover-imgs"
                        style={{ marginLeft: 5 }}
                        onClick={() => {
                          setDefaultImage([
                            {
                              src: d,
                            },
                          ]);
                        }}
                      >
                        <img className="" src={d} alt="img" width={'154px'} height={'154px'} loading="lazy" />
                      </li>
                    );
                  })}
                </Slider>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 pt-lg-0 pt-4">
            <div className="product-detail-data-box">
              <div className="w-lg-50 w-100 bg-lg-transparent bg-white pb-lg-0 pb-lg-5 pb-4 quick-content">
                <div className="main-product__detail__box text-start p-0">
                  <span className="quickview_details">
                    {productDetails?.product_name}
                  </span>
                  <p className="quickview_content mt-4">
                    {productDetails?.product_short_description}
                  </p>
                  <div className="d-flex mt-2 align-items-center">
                    <p className="product_whishlist_availability">
                      Availability:
                    </p>
                    <p className="product_whishlist_instock mt-0 ps-2 d-flex align-items-center">
                      In Stock
                      <img className="ms-2" src={"/img/img/check.png"} alt="" />{" "}
                    </p>
                  </div>
                  <div className="d-flex align-items-center py-2">
                    {productDetails?.color_attribute?.map((col) => {
                      return (
                        <img
                          alt=""
                          onClick={() =>
                            setSelectFilter({
                              ...selectFilter,
                              metal_color: col,
                            })
                          }
                          src={col?.term_image_url}
                          width={40}
                          height={40}
                          className={`color-img ${selectFilter?.metal_color?.term_name === col?.term_name
                            ? "selected"
                            : ""
                            }`}
                        />
                      );
                    })}
                  </div>
                  <ul className="d-flex align-items-center py-2">
                    {productDetails?.variations?.map((col,i) => {
                      return (
                        <li
                          key={i}
                          className="metal-color-list pe-3 text-center"
                          onClick={() => {
                            setSelectFilter({
                              ...selectFilter,
                              metal: col?.carat_attribute,
                              price: col?.price,
                            });
                          }}
                        >
                          <button
                            className={
                              selectFilter?.metal?.value !==
                                col?.carat_attribute?.value
                                ? "metal-btn"
                                : "metal-btn-select"
                            }
                          >
                            {col?.carat_attribute?.value}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  {/* <div className="d-md-flex align-items-center d-block pt-3 pb-1">
                    <p className="prodetail-price pt-2 me-4">
                      ₹{" "}
                      {parseInt(selectFilter?.price ? selectFilter?.price : 0)?.toLocaleString("en-IN")}
                    </p>
                  </div> */}
                  <div className="d-flex align-items-center mt-3">
                    <div class="quantity buttons_added">
                      {/* <input type="button" value="-" class="minus" /> */}
                      <input
                        type="number"
                        name="quantity"
                        value={qty}
                        class="input-text qty text"
                        onChange={(e) => setQty(e.target.value)}
                      // onKeyUp={() => { setQty(qty + 1) }}
                      // onKeyDown={() => { setQty(qty - 1) }}
                      />
                      {/* <input type="button" value="+" class="plus" /> */}
                    </div>
                    <button
                      className="send-inquiry-btn w-100"
                      onClick={() => setInquiey(true)}
                    >
                      Send Inquiry
                    </button>
                    <button
                      className="whishlit-icon"
                      onClick={() => handleWishList(productDetails)}
                    >
                      {whishListList?.some(
                        (item) =>
                          item?.product_id === productDetails?.product_id
                      ) ? (
                        <FaHeart color="#07362e" size={26} className="icon-change" />
                      ) : (
                        <FiHeart size={26} />
                      )}
                    </button>
                  </div>
                  <div
                    className="d-flex send-mail-box flex-wrap justify-content-around mt-4 mb-4"
                    style={{ padding: "20px 0px" }}
                  >
                    <div
                      className="d-sm-flex d-block text-center align-items-center"
                      onClick={() => handleWhatsAppClick()}
                      style={{ cursor: "pointer" }}
                    >
                      <img src={"/img/img/whatsapp.png"} alt="" height="20px" width={"20px"} className="image-hover" />
                      <p className="social-text">WhatsApp</p>
                    </div>
                    <div
                      className="d-sm-flex d-block text-center align-items-center"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate.push(`/contact-us`);
                      }}
                    >
                      <img src={"/img/img/mails.png"} alt="" eight="20px" width={"20px"} className="image-hover" s />
                      <p className="social-text">Email Us</p>
                    </div>
                    <div
                      className="d-sm-flex d-block text-center align-items-center call_box"
                      style={{ cursor: "pointer" }}
                    >
                      <a href="tel:+91 7990959811"><img src={"/img/img/phone.png"} alt="" eight="20px" width={"20px"} className="image-hover" /></a>
                      <a href="tel:+91 7990959811"><p className="social-text">Call</p></a>
                    </div>
                  </div>
                  <Accordion defaultActiveKey="0" className="pt-3">
                    <Accordion.Item
                      eventKey="0"
                      className="border-0 bg-transparent"
                    >
                      <Accordion.Header className="product-accordian-detail">
                        Product Info
                      </Accordion.Header>
                      <Accordion.Body className="pt-0 px-0">
                        <div>
                          {/* <h4 className="ring-detail">{params?.category_name?.toUpperCase()} INFORMATION</h4> */}
                          <p className="product-accordian-content">
                            {productDetails.product_description}
                          </p>
                          {/* <p className="product-accordian-content">Average width:
                                                        1.5 mm</p>
                                                    <p className="product-accordian-content">Setting:
                                                        Claw Prong</p> */}
                        </div>
                        {/* <div>
                                                    <h4 className="ring-detail">ACCENT GEMSTONES</h4>
                                                    <p className="product-accordian-content">Type:Natural or lab diamond, depending on selected center diamond</p>
                                                    <p className="product-accordian-content">Shape:Round</p>
                                                    <p className="product-accordian-content">Number:12</p>
                                                    <p className="product-accordian-content">Min. carat total weight:0.05</p>
                                                </div> */}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item
                      eventKey="0"
                      className="border-0 pb-3 bg-transparent"
                    >
                      <Accordion.Header className="product-accordian-detail">
                        More Details
                      </Accordion.Header>
                      <Accordion.Body className="pt-0 px-0">
                        <div>
                          <div className="d-flex">
                            <div className="col-md-6">
                              <p className="product-accordian-content">
                                Metal:{" "}
                                <span style={{ fontWeight: 500 }}>
                                  {productDetails?.additional_info?.["Metal"]}
                                </span>
                              </p>
                            </div>
                            {productDetails?.additional_info?.[
                              "Metal Kt / Colour"
                            ] && <div className="col-md-6">
                                <p className="product-accordian-content">
                                  Metal Kt / Colour:{" "}
                                  <span style={{ fontWeight: 500 }}>
                                    {
                                      productDetails?.additional_info?.[
                                      "Metal Kt / Colour"
                                      ]
                                    }
                                  </span>
                                </p>
                              </div>}
                          </div>
                          <div className="d-flex">
                            {productDetails?.additional_info?.[
                              "Colour / Clarity"
                            ] && <div className="col-md-6">
                                <p className="product-accordian-content">
                                  Colour / Clarity:{" "}
                                  <span style={{ fontWeight: 500 }}>
                                    {
                                      productDetails?.additional_info?.[
                                      "Colour / Clarity"
                                      ]
                                    }
                                  </span>
                                </p>
                              </div>}
                            {productDetails?.additional_info?.["Metal Color"] && <div className="col-md-6">
                              <p className="product-accordian-content">
                                {params?.category_name} Metal Color:{" "}
                                <span style={{ fontWeight: 500 }}>
                                  {productDetails?.additional_info?.["Metal Color"]}
                                </span>
                              </p>
                            </div>}
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row mx-auto product-row quality-content-row my-5">
                    <div className="col-lg-6">
                        <div className="made-just-box text-start">
                            <h3 className="made-just-title pb-4">Made Just For You</h3>
                            <p className="made-just-content">{productDetail?.product_description}</p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0" className="border-0 pb-3 bg-transparent">
                                <Accordion.Header className='quality-data-box'><img src={tree} alt="img" className="me-2" /> Mining Free</Accordion.Header>
                                <Accordion.Body>
                                    <p className="mining-tree-content">Lab Grown Real Diamonds are a Sustainable choice. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1" className="border-0 pb-3 bg-transparent">
                                <Accordion.Header className='quality-data-box'><img src={quality} alt="img" className="me-2" />Beauty Quality</Accordion.Header>
                                <Accordion.Body>
                                    <p className="mining-tree-content">Lab Grown Real Diamonds are a Sustainable choice. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2" className="border-0 pb-3 bg-transparent">
                                <Accordion.Header className='quality-data-box'><img src={value} alt="img" className="me-2" /> Value</Accordion.Header>
                                <Accordion.Body>
                                    <p className="mining-tree-content">Lab Grown Real Diamonds are a Sustainable choice. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div> */}
      </div>
      {relatedProductList?.length > 0 && (<div className="releted-product">
        <div className="releted-product-data mx-auto">
          <div className="section-title">
            <h2 className="section-main-title">Releted Product</h2>
          </div>
          <div className="m-0 releted-slider">
            <Slider {...realatedSlider}>
              {relatedProductList?.map((d,i) => {
                return (
                  <div className="main-product-box" key={i}>
                    <div className="main_product_image__box shop-product_page-box position-relative">
                      <img
                        src={`https://api.viannejewels.com${d?.product_feature_image}`}
                        alt="img"
                        // style={{ height: "300px" }}
                        className="mx-auto"
                        onClick={() => handleRelatedProduct(d?.product_id)}
                      />
                      <ul className="align-items-center icon-list">
                        <li className="position-relative" onClick={() => handleWishList(d)}>
                          <div className="icon-cover tooltips position-relative">
                            {whishListList?.some(item => item?.product_id === d?.product_id) ?
                              <FaHeart color="07362e" className="fill-color" /> :
                              <>
                                <div className=" d-inline-block">
                                  <FiHeart className='heart-icon' color="#07362e" />
                                </div>
                              </>
                            }
                            <span className="tooltiptext">
                              Whishlist <span className="triangle"></span>
                            </span>
                          </div>
                        </li>
                        <li className="position-relative" onClick={() => handleRelatedProduct(d?.product_id)}>
                          <div className="icon-cover tooltips position-relative">
                            <LiaShoppingBagSolid
                              className="heart-icon"
                              color="#046767"
                            />
                            <span className="tooltiptext">
                              Read more <span className="triangle"></span>
                            </span>
                          </div>
                        </li>
                        <li className="position-relative" onClick={() => { handleQuickView(d); setIsQuickView(true) }}>
                          <div className="icon-cover tooltips position-relative">
                            <FiEye className="heart-icon" color="#046767" />
                            <span className="tooltiptext">
                              Watch <span className="triangle"></span>
                            </span>
                          </div>
                        </li>
                        <li className="position-relative" onClick={() => { setCompareView(true); handleCompareList(d); }}>
                          <div className="icon-cover tooltips position-relative">
                            <IoIosGitCompare
                              className="heart-icon"
                              color="#046767"
                              onClick={() => setCompareView(true)}
                            />
                            <span className="tooltiptext">
                              Compare <span className="triangle"></span>
                            </span>
                          </div>
                        </li>
                      </ul>
                      <button className="product-add-cart d-none">
                        Add to Cart
                      </button>
                    </div>
                    <div className="main-product__detail__box" style={{ marginTop: 10 }}>
                      <p className="product_type_title">
                        {d?.product_name}
                      </p>
                      <div className="d-flex align-items-center justify-content-center py-3">
                        <img
                          alt=""
                          src={"/img/img/rose-gold.jpg"}
                          width={30}
                          height={30}
                          className="color-img"
                        />
                        <img
                          alt=""
                          src={"/img/img/gold.jpg"}
                          width={30}
                          height={30}
                          className="color-img"
                        />
                        <img
                          alt=""
                          src={"/img/img/white-gold.jpeg"}
                          width={30}
                          height={30}
                          className="color-img"
                        />
                      </div>
                      <h5 className="product_content">{d?.product_taxonomies?.[1]}</h5>
                      {d?.product_price && (
                        <p className="product_price">
                          ₹{d?.product_price ? parseInt(d?.product_price) : "0"}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>)}
      <Instagram />
      {isInquiry && (
        <div className="justify-content-center">
          <Modal
            className="px-2 inquiry-form-modal "
            show={isInquiry}
            centered={true}
            bsSize="lg"
          >
            <Modal.Body className="p-0">
              <div className="d-flex justify-content-between p-3 pb-0">
                <h3 style={{ color: "#07362e", fontWeight: 500, fontSize: 18 }}>
                  Send Inquiry
                </h3>
                <button
                  type="button"
                  className="btn btn-close"
                  onClick={() => setInquiey(false)}
                ></button>
              </div>
              <div className="inuquiry-form">
                <div className="row">
                  <div className="col-md-6">
                    <input
                      className="inquiry-input w-100 mb-3"
                      type={"text"}
                      name="first_name"
                      placeholder="Firsy Name"
                      value={inputform?.first_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      className="inquiry-input w-100 mb-3"
                      type={"text"}
                      name="last_name"
                      placeholder="Last Name*"
                      value={inputform?.last_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <input
                      className="inquiry-input w-100 mb-3"
                      type={"text"}
                      name="product_name"
                      placeholder="Name*"
                      value={inputform?.product_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      className="inquiry-input w-100 mb-3"
                      type={"mail"}
                      placeholder="Email*"
                      name="product_email"
                      value={inputform?.product_email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <input
                  className="inquiry-input w-100 mb-3"
                  type={"number"}
                  placeholder="Phone No*"
                  name="product_phone_number"
                  value={inputform?.product_phone_number}
                  onChange={handleChange}
                />
                <input
                  className="inquiry-input w-100 mb-3"
                  type={"text"}
                  placeholder="Billing Address*"
                  name="billing_address"
                  value={inputform?.billing_address}
                  onChange={handleChange}
                />
                <div className="row">
                  <div className="col-md-6">
                    <input
                      className="inquiry-input w-100 mb-3"
                      type={"text"}
                      name="billing_country"
                      placeholder="Country"
                      value={inputform?.billing_country}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      className="inquiry-input w-100 mb-3"
                      type={"text"}
                      name="billing_state"
                      placeholder="State*"
                      value={inputform?.billing_state}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <input
                      className="inquiry-input w-100 mb-3"
                      type={"text"}
                      name="billing_city"
                      placeholder="City"
                      value={inputform?.billing_city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      className="inquiry-input w-100 mb-3"
                      type={"number"}
                      name="billing_postcode"
                      placeholder="Post Code*"
                      value={inputform?.billing_postcode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <textarea
                  className="inquiry-textarea w-100 mb-3"
                  style={{ height: 100 }}
                  type={"message"}
                  placeholder="Message"
                  name="product_message"
                  value={inputform?.product_message}
                  onChange={handleChange}
                />
                <button className="inquiry-submit" onClick={Submitbtn}>
                  Submit Now
                </button>
              </div>
            </Modal.Body>
          </Modal>
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
                        <img src={d} alt="img" className="quickview-image" key={i} />
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
                      <p className='product_whishlist_availability'>Category:</p>
                      <p className='quickview_mental ps-2'>{params?.category_name ? params?.category_name : params?.main_cateogry_name}</p>
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
                {/* <div className="d-flex align-items-cener justify-content-end">
                  <button className="pe-3 bg-transparent" onClick={() => setCompareView(false)}><img src={close} height={30} width={30} alt="" /></button>
                </div> */}
                <Table responsive className="compare-table mb-0">
                  <tbody>
                    <>
                      <tr className="header-row">
                        <td style={{ verticalAlign: 'top' }}><p className="title-left">image</p>  </td>
                        {imageSrc?.map((data, index) => {
                          let url = data?.src?.match(/^https?:\/\/([^/?#]+)/i);
                          return (
                            <td key={index} className="position-relative text-center">
                               <img className="close-btn" width={30} src={"/img/img/close.png"} alt="" style={{ cursor: "pointer" }} onClick={() => CloseButton(data?.id)} />
                              <img src={url?.[0] === "https://api.viannejewels.com" ? data?.src : `https://api.viannejewels.com${data?.src}`} width={150} height={150} alt="img" />
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
                          let url = data?.src?.match(/^https?:\/\/([^/?#]+)/i);
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
  );
};
export default ShopDetail;
