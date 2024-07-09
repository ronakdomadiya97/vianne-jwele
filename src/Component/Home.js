import React, { useEffect, useRef, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import Slider from "react-slick";
import Aos from "aos";
import "aos/dist/aos.css";
import Instagram from "./instagram";
import { useSelector, useDispatch } from "react-redux";
import { addToCartProduct, fetchCategory, fetchProduct, fetchProducts, setLoader } from "../redux/action/homeAction";
import { fetchBlogs, fetchSingleBlog } from "../redux/action/blogAction";
import { toast } from 'react-toastify';
import { FaHeart } from "react-icons/fa6";
import { FiBox, FiEye, FiHeart } from "react-icons/fi";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoIosGitCompare } from "react-icons/io";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const BannerList = [
  {
    src: "/img/img/Homebanner1.png",
    title: "A New Beginning",
    description: "Celebrate your past, present and future with a one of a kind Minimal pendant.",
    leftContent: "Shop Halo Pendant",
    rightContent: "Shop Minimal Pendant",
    leftNavigation: {
      pathname: '/shop',
      query: {
        id: '270',
        category_name: 'Halo',
        category_id: '181',
        main_cateogry_name: 'Pendant',
      }
    },
    rightNavigation: {
      pathname: '/shop',
      query: {
        id: '271',
        category_name: 'Minimal',
        category_id: '181',
        main_cateogry_name: 'Pendant',
      }
    }
  },
  {
    src: "/img/img/Homebanner2.png",
    title: "A New Beginning",
    description: "Celebrate the next chapter with a meticulously ",
    leftContent: "Shop Engagement Rings",
    rightContent: "Shop Wedding Rings",
    leftNavigation: {
      pathname: '/shop',
      query: {
        id: '256',
        category_name: 'Engagement',
        category_id: '73',
        main_cateogry_name: 'Rings',
      }
    },
    rightNavigation: {
      pathname: '/shop',
      query: {
        id: '257',
        category_name: 'wedding',
        category_id: '73',
        main_cateogry_name: 'Rings',
      }
    }
  },
];
const Reviewlist = [
  {
    src: "/img/img/review1.jpg",
    clientName: "— Joshua Keith",
    clientReview: `I recently purchased a beautiful diamond necklace from this jeweler and I couldn't be happier with my purchase. The craftsmanship is top-notch and the diamonds are absolutely stunning. I receive compliments every time I wear it!`,
  },
  {
    src: "/img/img/review2.jpg",
    clientName: "— Piyush Sutariya",
    clientReview: `I recently purchased a pair of earrings from this jewelry store and was blown away by the quality and design. The earrings are so unique and I've received so many compliments when wearing them. I'll definitely be a repeat customer!`,
  },
  {
    src: "/img/img/review3.jpg",
    clientName: "— Sharon Gunther",
    clientReview: `I was looking for a unique engagement ring and found the perfect one at this jewelry store. The staff was incredibly knowledgeable and helped me find the perfect ring within my budget. My fiancé was thrilled with the ring and we both couldn't be happier`,
  },
];
const HomePage = ({ setIsSelectedProd, isSelectedProd }) => {

  const disptach = useDispatch();
  const navigate = useRouter();
  const categoryList = useSelector((state) => state.home.categoryList);
  const productList = useSelector((state) => state.home.productList?.variable_products);
  const postList = useSelector((state) => state.blog.blogList.posts);
  const [isActive, setIsActive] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const currencyRate = useSelector(state => state.home.currencyRate);
  const currency = useSelector(state => state.home.currency);
  const [compareView, setCompareView] = useState(false);
  const [compareListData, setCompareListData] = useState([]);
  const [isQuickView, setIsQuickView] = useState(false);
  const [selectQuickView, setSelectQuickView] = useState(null);
  const [subCategoryName, setSubCategoryName] = useState(null);
  const [whishListList, setWhishListList] = useState([]);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const ReadMore = (data) => {
    navigate.push("/blog-detail");
    disptach(fetchSingleBlog(data?.post_id));
  };

  useEffect(() => {
    Aos.init({
      duration: 1500,
      once: false,
    });
    fetchData()
  }, [disptach, currentSlide]);

  const fetchData = async () => {

    try {
      await Promise.all([
        disptach(fetchCategory()),
        disptach(fetchProducts()),
        disptach(fetchBlogs({ page: 1, posts_per_page: 10 }))
      ])
    } catch (error) {
    } finally {
    }
  }

  const bannerSlider = {
    // centerMode: true,
    // focusOnSelect: true,
    dots: false,
    arrows: true,
    autoplay: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
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
  const bannersSlider = {
    dots: true,
    arrows: true,
    autoplay: true,
    speed: 500,
    fade: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
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
          arrows: false,
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

  useEffect(() => {
    // Check if the browser supports IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver is not supported in this browser');
      return;
    }

    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px', // No margin
      threshold: 0.5, // Trigger when 50% of the video is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Start playing the video when it becomes visible
          entry.target.play();
        } else {
          // Pause the video when it is not visible
          entry.target.pause();
        }
      });
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    // Clean up the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, [videoRef]);
  const startVideo = () => {
    videoRef.current.pause();
    setPlaying(false);
  }

  const pauseVideo = () => {
    videoRef.current.play();
    setPlaying(true);
  }

  const handleScroll = (e) => {
    if (playing) {
      pauseVideo();
    }
  }

  const handleVideoPress = () => {
    if (playing) {
      startVideo();
    } else {
      pauseVideo();
    }
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

  // const ReadMore_pro = (data) => {
  //     setIsBlogCateogry(false)
  //     setIsSelectedBlog(true)
  //     setSelectedBlog(data)
  // }

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

  const Moving = document.getElementById("exlxusive-img");
  if (Moving?.style) {
    document.onmousemove = ev => {
      const positionX = (window.innerWidth / 2 - ev.clientX) / 7;
      const positionY = (window.innerHeight / 2 - ev.clientY) / 7;
      Moving.style.transform = `translate(${positionX}px, ${positionY}px)`;
    };
  }


  return (
    <>
      {BannerList?.length > 0 && <div className="home-banner">
        <Slider {...bannersSlider} className="m-0 p-0 home-banner-slider">
          {BannerList?.map((item, i) => {
            return (
              <div key={i} className="row position-relative pe-0 ps-0" style={{ backgroundColor: "#07362e" }}>
                <div className="position-relative pe-0 ps-0">
                  <div className="home-banner-mainImg-container"
                  >
                    <img
                      src={item?.src}
                      height={580}
                      style={{ objectFit: "cover" }}
                      alt="img"
                      loading="lazy"
                      className="w-100 home-banner-mainImg d-lg-block d-none"
                    />

                    <img
                      src={"/img/img/Homebanner1-responsive.png"}
                      style={{ objectFit: "cover", height: "100%" }}
                      loading="lazy"
                      alt="img"
                      className="w-100 d-lg-none d-block home-banner-responsive"
                    />
                  </div>
                </div>
                <div className="container">
                  <div className="row home-content-1">
                    <div className="col-md-6 home-content-first-col"></div>
                    <div className="col-md-6 home-content-second-col">
                      <div className="home-content home-content-1" style={{ position: "absolute", bottom: '40%', left: '50%' }}>
                        <h3>{item.title}</h3>
                        <p className="py-lg-3 py-2">{item.description}</p>
                        <button className={` mt-lg-0 mt-2 shop-rings-btn-active`} style={{ marginRight: '15px' }}
                          onClick={() => {
                            setIsActive(1)
                            navigate.push(item?.leftNavigation)
                          }}
                        >{item?.leftContent}</button>
                        <button className={`shop-collection-btn mt-lg-0 mt-2`}
                          onClick={() => {
                            setIsActive(2)
                            navigate.push(item?.rightNavigation)
                          }}
                        >{item?.rightContent}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </Slider>
      </div>}

      <div style={{ backgroundColor: "#07362e" }}>
        <div className="marquee">
          <ul className="trade-list marquee__inner" aria-hidden="true">
            <li className="d-flex align-items-center">
              <img src={"/img/img/exchange.png"} alt="img" />
              <p className="ms-2">100% Eco-friendly</p>
            </li>
            <li className="d-flex align-items-center">
              <img src={"/img/img/money-back.png"} alt="img" />
              <p className="ms-2">Exclusive Designs</p>
            </li>
            <li className="d-flex align-items-center">
              <img src={"/img/img/truck.png"} alt="img" />
              <p className="ms-2">Insured Shipping</p>
            </li>
          </ul>
        </div>
      </div>
      {(!isSelectedProd && productList?.length > 0) && <div className="arrival-section" data-aos="fade-left">
        <div className="section-title mt-lg-5 mt-6">
          <p className="blog-text mb-2">New Arrival</p>
          <h2 className="section-main-title">See What’s Trending</h2>
        </div>
        <div className="container">
          {(!isSelectedProd && productList?.length > 0) && (
            <div className="new-product-section">
              <div className="row m-0">
                <Slider {...newproductSlider} className="p-0">
                  {!isSelectedProd && productList?.length > 0 && productList?.map((prod, index) => {
                    return (
                      <div className='col-lg-3 col-md-6 col-12' key={index}>
                        <div className='main-product-box'>
                          <div className='main_product_image__box shop-product_page-box position-relative'>
                            <Link href={`/shop-detail/${prod?.product_id}`}>
                              <div>
                                {/* <img className="new-product-main-img" src={prod?.product_feature_image} alt="img" loading="lazy" /> */}
                                {/* <Image
                                  fill
                                  alt="img"
                                  src={prod?.product_feature_image}
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                /> */}
                                <div style={{ height: 400, position: 'relative', width: 'auto' }}>
                                  <Image
                                  className="new-product-main-img"
                                    src='/prod?.product_feature_image'
                                    alt="Description of image"
                                    layout="fill"
                                    objectFit="contain"
                                  />
                                </div>
                              </div>
                            </Link>
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

                          </div>
                          <div className='main-product__detail__box' style={{ marginTop: 10 }}>
                            <p className='product_type_title'>{prod?.product_name}</p>
                            <h5 className='product_content'>{prod?.product_taxonomies?.[0]}</h5>
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
                        {selectQuickView?.product_gallery_images?.length > 0 && selectQuickView?.product_gallery_images?.map((d, i) => {
                          return (
                            <img key={i} src={d} alt="img" className="quickview-image" loading="lazy" />
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
                            {productName?.map((data, i) => {
                              return (
                                <td key={i}><p className="compare-content">{data}</p></td>
                              )
                            })}
                          </tr>
                          <tr>
                            <td><p className="title-left">Price</p></td>
                            {priceList?.map((data, i) => {
                              return (
                                <td key={i}><p className="compare-value">₹ {data ? parseInt(data)?.toLocaleString('en-IN') : 0}</p></td>
                              )
                            })}

                          </tr>
                          <tr>
                            <td><p className="title-left">Description</p></td>
                            {compareListData?.map((data, i) => {
                              return (
                                <td key={i}><p className="compare-value">{data?.product_short_description}</p></td>
                              )
                            })}
                          </tr>
                          <tr>
                            <td><p className="title-left">Available</p></td>
                            {compareListData?.map((data, i) => {
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
        </div>
      </div>}
      <section data-aos="fade-left">
        <div className="container my-5 py-lg-5 py-4">
          <div
            style={{
              width: "100%",
              overflow: "hidden",
            }}
            className="video-play"
          >


            <video
              controls
              autoPlay="autoPlay"
              width="100%"
              onClick={handleVideoPress}
              ref={videoRef}
              loop
              muted
            >
              <source src={"/img/img/vianne_v2_4k_2_1.mp4"} type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="exclusive-section" data-aos="fade-left">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="">
                <img id="exlxusive-img"
                  src={"/img/img/exclusive.png"}
                  alt=""
                  className="exlxusive-img"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-md-6">
              <p className="the-story mb-2">the story</p>
              <div className="exclusive-data text-start">
                <h2 className="">
                  Our <br /> <span className="ps-5">Exclusive</span> <br />{" "}
                  Styles
                </h2>
                <p>
                  Step into a realm where unique elegance meets timeless design.
                  Discover pieces that resonate with your distinctive taste,
                  each brimming with an unmatched brilliance. Find your next
                  showstopper in this carefully curated selection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {<section className="categories py-lg-5" data-aos="fade-left">
        <div className="section-title pb-lg-3">
          <h2 className="section-main-title">Browse by Categories</h2>
        </div>
        <div className="container">
          <ul>
            <Slider
              {...{ ...bannerSlider, initialSlide: 2 }}
              className="categories-slider m-0 p-0 row"
            >
              {categoryList?.map((item, i) => {
                return (
                  <li className="col-md-4 position-relative explore-row-data home-explore" key={i}>
                    <img
                      loading="lazy"
                      src={
                        item?.category_image !== ""
                          ? item?.category_image
                          : "/img/img/13.png"
                      }
                      alt="img"
                      className="explore-img w-100 object-fit-cover"
                    />
                    <div className="explore-data">
                      <div className="explore-main-box">
                        <h3 className="product-type-title">{item?.name}</h3>
                        <button
                          className="explore-btn mt-3"
                          onClick={() => {
                            navigate.push({
                              pathname: '/shop',
                              query: {
                                id: item?.children?.[0]?.id,
                                category_name: item?.children?.[0]?.name,
                                category_id: item.id,
                                main_cateogry_name: item.name,
                              }
                            })
                          }
                          }
                        >
                          Explore
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </Slider>
          </ul>
        </div>
      </section>}
      <section className="lab-grown-diamonds" data-aos="flip-up">
        <div className="section-title">
          <p className="blog-text mb-2">About</p>
          <h2 className="section-main-title pb-lg-3">Lab Grown Diamonds</h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-12 mt-lg-0 mt-4">
              <div className="img-box text-center">
                <img src={"/img/img/lab-1.png"} alt="img" height={120} loading="lazy" />
                <h3 className="img-title">Mining Free</h3>
                <p className="img-descrption">
                  Lab Grown Real Diamonds are a Sustainable choice.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-12 mt-lg-0 mt-4">
              <div className="img-box text-center">
                <img src={"/img/img/lab-2.png"} alt="img" height={120} loading="lazy" />
                <h3 className="img-title">Beauty Quality</h3>
                <p className="img-descrption">
                  Lab Grown Real Diamonds are identical to Mined Diamonds.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-12 mt-lg-0 mt-4">
              <div className="img-box text-center">
                <img src={"/img/img/lab-3.png"} alt="img" height={120} loading="lazy" />
                <h3 className="img-title">Value</h3>
                <p className="img-descrption">
                  Lab Grown Real Diamonds are a significant buy, Compared to
                  Mined Diamonds in size and quality
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="lab-grown-diamonds" data-aos="zoom-in-left">
        <div className="row m-0">
          <div className="col-xl-4 col-lg-3 col-md-2 col-3 pe-0">
            <div className="why-shop-img">
              <img className="w-100" src={"/img/img/product-6.jpg"} alt="" loading="lazy" />
            </div>
          </div>
          <div className="col-xl-8 col-lg-9 col-md-10 col-9 ps-0">
            <div className="why-shop-data position-relative">
              <div className="why-shop-contain text-start">
                <h4>Why shop with us?</h4>
                <p className="mt-2">
                  Discover timeless elegance and impeccable craftsmanship with
                  our exquisite jewelry collection.
                </p>
              </div>
              <div className="why-shop-row d-lg-block d-none m-0 pb-lg-0 pb-4">
                <div className="row m-0">
                  <div className="col-lg-4 col-md-6 col-12 mb-lg-0 mb-4">
                    <div className="text-center why-shop-box">
                      <img
                        loading="lazy"
                        src={"/img/img/shop-1.jpeg"}
                        alt="img"
                        style={{
                          height: "195px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <h3 className="shop-title">Trust of Vianne Jweles</h3>
                      <p className="shop-descrption">
                        Jewellery Design & Craftsmanship legacy of more than 36
                        years.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-12 mb-md-0 mb-4">
                    <div className="text-center why-shop-box">
                      <img
                        src={"/img/img/blog-slide2.webp"}
                        alt="img"
                        style={{
                          height: "195px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <h3 className="shop-title">Handcrafted with Love</h3>
                      <p className="shop-descrption">
                        Fine jewelry craftsmanship at an accessible price.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="text-center why-shop-box">
                      <img
                        loading="lazy"
                        src={"/img/img/shop-3.webp"}
                        alt="img"
                        style={{
                          height: "195px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <h3 className="shop-title">
                        Finest Jewellery, Fairest Prices
                      </h3>
                      <p className="shop-descrption">
                        Finest jewelry deserves fair prices. And so do you. All
                        of our jewelry is born, raised.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row m-0 d-lg-none d-flex mt-4">
          <div className="col-sm-4 col-12 mb-sm-0 mb-4 pe-md-2 pe-sm-1">
            <div className="text-center why-shop-box">
              <img
                loading="lazy"
                src={"/img/img/blog-slide2.webp"}
                alt="img"
                style={{
                  height: "195px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
              <h3 className="shop-title">Trust of Vianne Jweles</h3>
              <p className="shop-descrption">
                Jewellery Design & Craftsmanship legacy of more than 36
                years.
              </p>
            </div>
          </div>
          <div className="col-sm-4 col-12 mb-sm-0 mb-4 px-md-2 px-sm-1">
            <div className="text-center why-shop-box">
              <img
                loading="lazy"
                src={"/img/img/shop-1.jpeg"}
                alt="img"
                style={{
                  height: "195px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
              <h3 className="shop-title">Handcrafted with Love</h3>
              <p className="shop-descrption">
                Fine jewelry craftsmanship at an accessible price.
              </p>
            </div>
          </div>
          <div className="col-sm-4 col-12 ps-md-2 ps-sm-1">
            <div className="text-center why-shop-box">
              <img
                src={"/img/img/shop-3.webp"}
                loading="lazy"
                alt="img"
                style={{
                  height: "195px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
              <h3 className="shop-title">
                Finest Jewellery, Fairest Prices
              </h3>
              <p className="shop-descrption">
                Finest jewelry deserves fair prices. And so do you. All
                of our jewelry is born, raised.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="" data-aos="zoom-in-right">
        <div className="section-title customer_heading">
          <h2 className="section-main-title mb-0">What Our Customer Says?</h2>
        </div>
        <div className="container">
          <ul>
            <Slider
              {...reviewSlider}
              className="m-0 p-0 collecion-slider customer-slider"
            >
              {Reviewlist?.map((item, i) => {
                return (
                  <div className="col-10" key={i}>
                    <div className="scot-img">
                      <img src={"/img/img/scot.png"} alt="img" loading="lazy" />
                    </div>
                    <div className="col-ms-9 col-11 mx-auto">
                      <li className="review-row">
                        <div className="product-review position-relative">
                          <div className="product-box">
                            <img
                              src={item?.src}
                              height={165}
                              width={150}
                              alt="img"
                              loading="lazy"
                              className="m-auto"
                            />
                          </div>
                          <h5 className="review-title text-sm-start text-center">
                            Captivatingly Ethereal
                          </h5>
                          <div className="d-sm-flex mt-3">
                            <h4 className="review-name">{item?.clientName}</h4>
                            <div className="d-flex justify-content-md-start justify-content-center align-tems-center ps-sm-5">
                              <img src={"/img/img/star.png"} alt="img" loading="lazy" />
                              <img src={"/img/img/star.png"} alt="img" loading="lazy" />
                              <img src={"/img/img/star.png"} alt="img" loading="lazy" />
                              <img src={"/img/img/star.png"} alt="img" loading="lazy" />
                              <img src={"/img/img/star.png"} alt="img" loading="lazy" />
                            </div>
                          </div>
                          <div className="review-detail-box">
                            <p
                              className="review-descrption text-sm-start text-center pt-3"
                              style={{ fontSize: "14px" }}
                            >
                              {item?.clientReview}
                            </p>
                          </div>
                        </div>
                      </li>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </ul>
        </div>
      </section>
      {<section className="our-blog">
        <div className="section-title">
          <p className="blog-text mb-2">news & inspired</p>
          <h2 className="section-main-title">Jewellery Style Files</h2>
        </div>
        <div className="container">
          <div className="blog-row">
            <div className="row">
              {postList?.slice(0, 3)?.map((pos, i) => {
                return (
                  <div className="col-md-4 mt-0 pt-4" key={i}>
                    <div className="blog-data-box text-start">
                      <div className="blog-img">
                        <img
                          loading="lazy"
                          src={pos?.post_feature_image}
                          alt="img"
                          className="w-100 blogs-img object-fit-cover"
                          height={260}
                        />
                      </div>
                      <p className="blog-date text-start pt-3">
                        {pos?.post_created_date}
                      </p>
                      <p className="blog-title text-start py-3 mt-0">
                        {pos?.post_title}.
                      </p>
                      <p className="blog-descrption text-start mt-0">
                        {pos?.post_excerpt}
                      </p>
                      <button
                        className="read-more mt-3"
                        onClick={() => ReadMore(pos)}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>}
      <Instagram />
    </>
  );
};
export default HomePage;
