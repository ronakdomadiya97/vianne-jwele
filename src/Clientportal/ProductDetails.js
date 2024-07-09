import React, { useEffect, useState } from "react";
import "aos/dist/aos.css";
import { Accordion} from "react-bootstrap";
import { FiHeart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import check from "../../public/img/img/check.png";
import { createProductInquiry } from "../redux/action/contactUsActions";
import {
  addToCartProduct,
  fetchRelatedProduct,
  fetchSingleProduct,
  fetchSingleProductVariationUser,
} from "../redux/action/homeAction";
import Instagram from "../Component/instagram";
import { FaHeart } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

const ProductDetails = ({ selectedProduct, categoryName, setIsSelectedProd, userDetails }) => {
  const disptach = useDispatch();
  const navigate = useRouter();
  const params = useSearchParams();
  const productDetail = useSelector((state) => state.home.productDetail);
  const currencyRate = useSelector(state => state.home.currencyRate);
  const currency = useSelector(state => state.home.currency);
  const [isInquiry, setInquiey] = useState(false);
  const [compareView, setCompareView] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [whishListList, setWhishListList] = useState([]);
  const [selectQuickView, setSelectQuickView] = useState(null);
  const [qty, setQty] = useState(1);
  const [inputform, setInputForm] = useState({
    product_name: "",
    product_email: "",
    product_phone_number: "",
    product_message: "",
  });
  const [selectFilter, setSelectFilter] = useState({
    metal_color: "",
    metal: "",
    price: "",
  });
  const [defaultImage, setDefaultImage] = useState([]);
  const [zoom, setZoom] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState({ x: 0, y: 0 });

  const handleChange = (e) => {
    setInputForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    disptach(fetchSingleProductVariationUser(userDetails?.user_id, selectedProduct?.product_id));
  }, [disptach]);

  useEffect(() => {
    if (productDetail) {
      setSelectFilter({
        ...selectFilter,
        price: productDetails?.variations?.[0]?.price,
        metal: productDetails?.variations?.[0]?.carat_attribute?.value,
        metal_color: productDetails?.color_attribute?.[0]?.term_name,
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
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleWishList = (data) => {
    let wishList = JSON.parse(sessionStorage.getItem("wish_list_after")) || [];

    const existingProduct = wishList.find(
      (item) => item.product_id === data?.product_id
    );
    if (existingProduct) {
      wishList = wishList.filter((item) => item.product_id !== data?.product_id);
    } else {
      wishList.push(data);
    }
    {
      whishListList?.some(
        (item) => item?.product_id === productDetails?.product_id
      )
        ? toast("Successfully Removed..")
        : toast("Successfully Added..");
    }
    sessionStorage.setItem("wish_list_after", JSON.stringify(wishList));
    setWhishListList(wishList);
  };

  useEffect(() => {
    if (productDetail) {
      setDefaultImage([
        {
          src: productDetail?.product_feature_image,
        },
      ]);
      setProductDetails(productDetail);
    }
  }, [productDetail]);

  const Submitbtn = () => {
    let params = inputform;
    params.product_id = productDetail?.product_id;
    disptach(createProductInquiry(params));
    setInquiey(false);
    setInputForm({
      product_name: "",
      product_email: "",
      product_phone_number: "",
      product_message: "",
    });
  };

  const handleRelatedProduct = (id) => {
    disptach(fetchSingleProduct(id));
    disptach(fetchRelatedProduct(id));
  };

  const handleAddToCart = async (data) => {
    let userIds = await sessionStorage.getItem('userId');
    const response = await disptach(addToCartProduct({ product_id: data?.product_id }, userIds));
    if (response) {
      // navigate.push('/')
      toast('Successfully add to cart product')
    }
  }

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

  return (
    <div className="shop-detail pt-lg-5 pt-4">
      <div className="p-0 shop-detail-section">
        <div className="row mx-auto product-row">
          <div className="col-lg-6">
            <div>
              <Slider {...bannerSlider} className="m-0 p-0 product-slider">
                {defaultImage?.map((item,i) => {
                  let url = item?.src?.match(/^https?:\/\/([^/?#]+)/i);
                  return (
                    <li key={i} className="h-100 shop-main-image-scale">
                      <div
                        style={{ position: "relative", cursor: "pointer" }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                      >
                        <img
                          src={url?.[0] === "https://api.viannejewels.com" ? item?.src : `https://api.viannejewels.com${item?.src}`}
                          height={530}
                          className="w-100 product-main-large-image"
                          alt=""
                          style={{
                            transition: "transform 0.2s ease",
                            transformOrigin: `${transformOrigin.x}px ${transformOrigin.y}px`,
                            transform: zoom ? "scale(1.8)" : "scale(1)",
                          }}
                          loading="lazy"
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
                      <img className="ms-2" src={check} alt="" />{" "}
                    </p>
                  </div>
                  <div className="d-flex align-items-center py-2">
                    {productDetails?.color_attribute?.map((col,i) => {
                      return (
                        <img
                          alt=""
                          key={i}
                          onClick={() =>
                            setSelectFilter({
                              ...selectFilter,
                              metal_color: col?.term_name,
                            })
                          }
                          src={col?.term_image_url}
                          width={40}
                          height={40}
                          className={`color-img ${selectFilter?.metal_color === col?.term_name
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
                              metal: col?.carat_attribute?.value,
                              price: col?.price,
                            });
                          }}
                        >
                          <button
                            className={
                              selectFilter?.metal !==
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
                  <div className="d-md-flex align-items-center d-block pt-3 pb-1">
                    <p className="prodetail-price pt-2 me-4">
                      {currency == 'USD' ? '$' : '₹'}{" "}
                      {parseInt(selectFilter?.price ? currency == 'USD' ? Math.ceil(currencyRate * parseInt(selectFilter?.price)) : selectFilter?.price : 0)?.toLocaleString("en-IN")}
                    </p>
                  </div>
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
                      onClick={() => handleAddToCart(productDetails)}
                    >
                      Add To Cart
                    </button>
                    <button
                      className="whishlit-icon "
                      onClick={() => handleWishList(productDetails)}
                    >
                      {whishListList?.some(
                        (item) =>
                          item?.product_id === productDetails?.product_id
                      ) ? (
                        <FaHeart color="#07362e" size={25} />
                      ) : (
                        <FiHeart size={25} />
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
                  {/* <div
                    className="d-flex send-mail-box flex-wrap justify-content-around mt-4 mb-4"
                    style={{ padding: "20px 0px" }}
                  >
                    <div
                      className="d-flex align-items-center"
                      onClick={() => handleWhatsAppClick()}
                      style={{ cursor: "pointer" }}
                    >
                      <img src={whatsapp} alt="" height="20px" width={"20px"} className="image-hover" />
                      <p className="social-text">WhatsApp</p>
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate.push(`/contact-us`);
                      }}
                    >
                      <img src={mails} alt="" eight="20px" width={"20px"} className="image-hover" s />
                      <p className="social-text">Email</p>
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ cursor: "pointer" }}
                    >
                      <img src={phone} alt="" eight="20px" width={"20px"} className="image-hover" />
                      <p className="social-text">+91 7990959811</p>
                    </div>
                  </div> */}
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
                          <div className="d-md-flex">
                            <div className="col-md-6  mb-md-0">
                              <p className="product-accordian-content">
                                Metal:{" "}
                                <span style={{ fontWeight: 500 }}>
                                  {productDetails?.additional_info?.["Metal"]}
                                </span>
                              </p>
                            </div>
                            {productDetails?.additional_info?.["Metal Kt / Colour"] && (
                              <div className="col-md-6">
                                <p className="product-accordian-content">
                                  Metal Kt / Colour:{" "}
                                  <span style={{ fontWeight: 500 }}>
                                    {productDetails?.additional_info?.["Metal Kt / Colour"]}
                                  </span>
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="d-md-flex">
                            {productDetails?.additional_info?.["Colour / Clarity"] && (
                              <div className="col-md-6 mb-md-0">
                                <p className="product-accordian-content">
                                  Colour / Clarity:{" "}
                                  <span style={{ fontWeight: 500 }}>
                                    {productDetails?.additional_info?.["Colour / Clarity"]}
                                  </span>
                                </p>
                              </div>
                            )}
                            {productDetails?.additional_info?.["Metal Color"] && (
                              <div className="col-md-6">
                                <p className="product-accordian-content">
                                  {params?.category_name} Metal Color:{" "}
                                  <span style={{ fontWeight: 500 }}>
                                    {productDetails?.additional_info?.["Metal Color"]}
                                  </span>
                                </p>
                              </div>
                            )}
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

      <Instagram />


    </div>
  );
};
export default ProductDetails;
