import { useEffect, useRef, useState } from "react";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { FiHeart, FiSearch } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   fetchCategory,
//   fetchProduct,
//   getUserDetail,
//   navHoverClose,
//   setLoader,
// } from "../redux/action/homeAction";
import Slider from "react-slick";
import { Accordion } from "react-bootstrap";
import { FaBook, FaRegCalendarAlt } from "react-icons/fa";
// import { GET_PRODUCT } from "../redux/type/constant";
// import { signInUser } from "../redux/action/contactUsActions";
import { toast } from "react-toastify";
import { LuChevronDown } from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { fetchCategory, fetchProduct, getUserDetail, setLoader } from "../redux/action/homeAction";

const Header = (props) => {
  const location=usePathname();
  const [loginId, setLoginId] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openSerach, setOpenSerach] = useState(false);
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [activeIndex, setActiveIndex] = useState(false);

  const navigate = useRouter();
  const disptach = useDispatch();
  const boxRef = useRef(null);
  const serachRef = useRef(null);
  const { categoryList } = props;
  // let wishList = JSON.parse(sessionStorage.getItem("addtocart")) || [];

  useEffect(() => {
    disptach(fetchCategory());
  }, [disptach]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  function handleClickOutside(event) {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      setOpenModel(false);
    }
    if (serachRef.current && !serachRef.current.contains(event.target)) {
      setOpenSerach(false);
    }
  }

  const handleSignIn = () => {
    let params = {
      email: email,
      password: pass,
    };
    disptach(setLoader(true));
    signInUser(params)
      .then((res) => {
        if (
          res.message !== "User not found" &&
          res.message !== "Incorrect password"
        ) {
          disptach(setLoader(false));
          sessionStorage.setItem("userId", res?.user_id);
          disptach(getUserDetail(res.user_id)).then(() => {
            window.location.href = "/dashboard";
            setLoginId(res.user_id);
          });
        } else {
          disptach(setLoader(false));
          toast(res.message);
        }
      })
      .catch((err) => {
        disptach(setLoader(false));
        console.log("err", err);
      });
  };

  const handleActiveSection = () => {
    setActiveIndex(true);
  };

  const handleDownActiveSection = () => {
    setActiveIndex(false);
  };

  const catogerySlider = {
    dots: false,
    arrows: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 5,
    // slidesPerRow:1,
    // swipeToSlide:true,
    // swipe:true,
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
          slidesToShow: 4,
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

  const handleSearch = (e) => {
    setOpenSerach(true);
    setSearch(e.target.value);
    if (e.target.value === "") {
      disptach({ type: GET_PRODUCT, payload: [] });
    } else {
      disptach(fetchProduct(e.target.value));
    }
  };

  const productList = useSelector((state) => state.home.productList?.variable_products);

  return (
    <div className="header">
      <div className="header-inner py-2">
        <nav class="navbar navbar-expand-lg bg-body-tertiary mb-sm-2 mb-0 d-block">
          <div class="container-fluid px-lg-5">
            <div className="d-flex width-md-33 width-100 justify-content-start align-items-center">
              <li
                className="d-lg-block d-none pointer"
                style={{ cursor: "pointer" }}
                onClick={() => navigate.push(`/book-appointment`)}
              >
                <div className="tooltips position-relative">
                  <div className=" d-inline-block">
                    <FaRegCalendarAlt
                      color="#046767"
                      size={20}
                      className="me-3"
                    />
                  </div>
                  <span className="tooltiptext header-tooltips">
                    Book An Appoinment <span className="triangle"></span>
                  </span>
                </div>
              </li>
              <div className="position-relative">
                <div className="search-canvas-model">
                  <button
                    className="btn search-open-canvas p-0"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasTop"
                    aria-controls="offcanvasTop"
                  >
                    <FiSearch color="#046767" size={20} /> Search...
                  </button>
                  <div className="position-relative">
                    <div
                      class="offcanvas offcanvas-top "
                      tabindex="-1"
                      id="offcanvasTop"
                      aria-labelledby="offcanvasTopLabel"
                    >
                      <div class="offcanvas-header">
                        <input
                          className="search-bar-header ms-3 w-100"
                          type={"search"}
                          placeholder="Search..."
                          value={search}
                          onChange={(e) => handleSearch(e)}
                        />
                        <button
                          type="button"
                          class="btn-close text-reset"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        ></button>
                      </div>
                      {openSerach && productList?.length > 0 && (
                        <div className="serach-model" ref={serachRef}>
                          {productList?.map((d,i) => {
                            return (
                              <div
                                key={i}
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setOpenSerach(false);
                                  setSearch('')
                                  navigate.push(`/shop-detail/${d?.product_id}`);
                                }}
                                data-bs-dismiss="offcanvas"
                              >
                                <li className="search-product-box d-flex ">
                                  <Image
                                    src={d?.product_feature_image}
                                    alt="img"
                                    className="search-product-img"
                                  />
                                  <div className="search-product-content text-start ps-2 d-flex align-items-center justify-content-center">
                                    <p className="search-product-title">
                                      {d?.product_name}
                                    </p>
                                  </div>
                                </li>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="d-flex width-md-33 width-100 justify-content-center mb-md-1 mb-0"
            >
              <a class="navbar-brand ps-0 mx-0" onClick={() => {
                navigate.push(`/`)
                setSelectedMenu("home");
              }
              }>
                <img
                  className="logo-icon"
                  style={{ cursor: "pointer" }}
                  src={
                    "https://api.viannejewels.com/wp-content/uploads/2023/03/logo-2-2.png.webp"
                  }
                  alt="img"
                />
              </a>
            </div>
            <div className="d-flex width-md-33 width-100 justify-content-end">
              <button
                className="d-lg-none d-block bg-transparent"
                onClick={() => setToggle(true)}
              >
                <span class="navbar-toggler-icon">
                  <AiOutlineAlignLeft
                    color="#046767"
                    size={20}
                    style={{ cursor: "pointer" }}
                  />
                </span>
              </button>
              <ul className="d-lg-flex d-none pe-3 like-shop-icon">
                <li
                  className="d-lg-block d-none user-icon"
                  onClick={() => navigate.push(`/whish-list`)}
                  style={{ marginRight: "6px" }}
                >
                  <FiHeart
                    color="#046767"
                    size={20}
                    className="icon-name "
                    style={{ cursor: "pointer" }}
                  />
                </li>
                {/* <li
                  className="d-lg-block d-none position-relative user-icon"
                  onClick={() => navigate.push(`/addto-cart`)}
                >
                  <HiOutlineShoppingBag
                    className="icon-name"
                    color="#046767"
                    size={20}
                    style={{ cursor: "pointer" }}
                  />

                  <div className="count-cart-number">
                    {wishList?.length || 0}
                  </div>
                </li> */}
              </ul>
              <div className="ms-3 d-lg-inline-block d-none header-login-account">
                <div
                  className="user-icon"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setOpenModel(true)}
                >
                  <BiUser color="#046767" size={20} className="icon-name" />
                </div>
                {openModel && (
                  <div
                    className="login-modal"
                    ref={boxRef}
                    onMouseEnter={() => setOpenModel(true)}
                    onMouseLeave={() => setOpenModel(false)}
                  >
                    <div className="login-model-data p-4 text-start">
                      <p className="dont-account mb-2">
                        Dont have an Account?
                      </p>
                      <button
                        className="model-create-btn"
                        target="_blank"
                        onClick={() => {
                          navigate.push("/register")
                          // window.open("/register", "_blank");
                          setOpenModel(false);
                        }}
                      >
                        CREATE AN ACCOUNT
                      </button>
                      <p className="signin-account">Sign in to Your Account</p>
                      <div>
                        <input
                          type={"email"}
                          placeholder="email"
                          className="w-100"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                        <input
                          type={"password"}
                          placeholder="Password"
                          className="w-100 mb-0"
                          onChange={(e) => setPass(e.target.value)}
                          value={pass}
                        />
                      </div>
                      {/* <div className='text-start mb-3'>
                                                <a className='forgot-password-model'>Forgot Your Password?</a>
                                            </div> */}
                      <button
                        className="model-signin-btn mt-3"
                        onClick={() => handleSignIn()}
                      >
                        SIGN IN
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
        <div className="container position-relative ">
          <ul class="header-menu d-lg-flex d-none justify-content-center align-items-center me-0 mb-2 mb-lg-0">
            <li
              class="nav-item"
              onClick={() => {
                navigate.push(`/`);
                setSelectedMenu("home");
              }}
            >
              <p
                class={`nav-link ${(selectedMenu === "home" || location == '/') && "selected-menu"}`}
              >
                HOME
              </p>
            </li>
            <li class="nav-item" onClick={() => setSelectedMenu("shop")}>
              <p
                class={`nav-link ${selectedMenu === "shop" && "selected-menu"}`}
                onMouseOver={handleActiveSection}
              // onMouseOut={handleDownActiveSection}
              >
                SHOP
                <LuChevronDown className='heart-icon' color="#046767" />
              </p>
              <ul
                className={`${categoryList?.length > 0 ? "d-block" : "d-none"
                  }  align-items-center hover-list `}
                onMouseOver={handleActiveSection}
              // onMouseOut={handleDownActiveSection}
              >
                {activeIndex && (
                  <>
                    <Slider {...catogerySlider} className="header-slider">
                      {
                        /* activeIndex && */
                        categoryList?.length > 0 &&
                        categoryList?.map((cate,i) => {
                          return (
                            <li
                              key={i}
                              className="nav-sub-category"
                              style={{ opacity: 1 }}
                              onClick={() => {
                                setActiveIndex(false);
                                navigate.push(
                                  `/shop/${cate?.children?.[0]?.id}/${cate?.children?.[0]?.name}/${cate?.id}/${cate?.name}`
                                );
                              }}
                            >
                              <div className="image-container">
                                <img
                                  src={cate?.category_image}
                                  alt="img"
                                  height={289}
                                  width={240}
                                />
                              </div>
                              <h4 className="sub-catogeroy-product">
                                {cate?.name}
                              </h4>
                            </li>
                          );
                        })
                      }
                    </Slider>
                  </>
                )}
              </ul>
            </li>
            <li
              class="nav-item"
              onClick={() => {
                navigate.push(`/about-us`);
                setSelectedMenu("aboutus");
              }}
            >
              <p
                class={`nav-link ${(selectedMenu === "aboutus" || location == '/about-us') && "selected-menu"
                  }`}
              >
                ABOUT US
              </p>
            </li>
            <li
              class="nav-item"
              onClick={() => {
                navigate.push(`/blog`);
                setSelectedMenu("blog");
              }}
            >
              <p
                class={`nav-link ${(selectedMenu === "blog"|| location == '/blog') && "selected-menu"}`}
              >
                NEWS AND ARTICLES
              </p>
            </li>
            <li
              class="nav-item"
              onClick={() => {
                navigate.push(`/contact-us`);
                setSelectedMenu("contactus");
              }}
            >
              <p
                class={`nav-link ${(selectedMenu === "contactus"|| location == '/contact-us') && "selected-menu"
                  }`}
              >
                CONTACT US
              </p>
            </li>
            <li
              class="nav-item"
              onClick={() => {
                navigate.push(`/book-appointment`);
                setSelectedMenu("customized");
              }}
            >
              <p
                class={`nav-link ${(selectedMenu === "customized" || location == '/book-appointment') && "selected-menu"
                  }`}
              >
                CUSTOMIZED JEWELLERY
              </p>
            </li>
          </ul>
          <div
            class={`${toggle === true && "toggle-open"
              } toggle-menu  justify-lg-content-center`}
          >
            <button
              class="navbar-toggler p-3 text-end"
              onClick={() => setToggle(false)}
            >
              <span class="navbar-toggler-icon">
                <IoMdClose color="#046767" size={28} />
              </span>
            </button>
            <ul class="header-menu d-lg-flex justify-content-center align-items-center me-0 mb-2 mb-lg-0">
              <li
                class="nav-item"
                onClick={() => {
                  navigate.push(`/`);
                  setToggle(false);
                }}
              >
                <p class={`nav-link`}>Home</p>
              </li>
              <Accordion defaultActiveKey="0">
                <Accordion.Item className="border-0 p-0 header-accordion">
                  <li class="nav-item">
                    <Accordion.Header className="nav-link toggle-menu-header">
                      Shop
                    </Accordion.Header>
                    <Accordion.Body className="p-0">
                      <ul
                        className={`${categoryList?.length > 0 ? "d-block" : "d-none"
                          }  align-items-center`}
                      >
                        {categoryList?.length > 0 &&
                          categoryList?.map((cate,i) => {
                            return (
                              <li
                                key={i}
                                className=""
                                onClick={() => {
                                  setToggle(false);
                                  navigate.push(
                                    `/shop/${cate?.children?.[0]?.id}/${cate?.children?.[0]?.name}/${cate?.id}/${cate?.name}`
                                  );
                                  // navigate.push(
                                  //   `/shop/${cate?.children?.[0]?.id}/${cate?.children?.[0]?.name}/${cate?.id}/${cate?.name}`
                                  // );
                                }}
                              >
                                <h4 className="sub-catogeroy-product">
                                  {cate?.name}
                                </h4>
                              </li>
                            );
                          })}
                      </ul>
                    </Accordion.Body>
                  </li>
                </Accordion.Item>
              </Accordion>
              <li
                class="nav-item"
                onClick={() => {
                  navigate.push(`/about-us`);
                  setToggle(false);
                }}
              >
                <p class="nav-link">About Us</p>
              </li>
              <li
                class="nav-item"
                onClick={() => {
                  navigate.push(`/blog`);
                  setToggle(false);
                }}
              >
                <p class="nav-link">News and Articles</p>
              </li>
              <li
                class="nav-item"
                onClick={() => {
                  navigate.push(`/contact-us`);
                  setToggle(false);
                }}
              >
                <p class="nav-link">Contact Us</p>
              </li>
              <li
                class="nav-item"
                onClick={() => {
                  navigate.push(`/book-appointment`);
                  setToggle(false);
                }}
              >
                <p class={`nav-link`}>Customized Jewellery</p>
              </li>
              {/* <li
                class="nav-item d-lg-none d-block"
                onClick={() => {
                  navigate.push(`/cart`);
                  setToggle(false);
                }}
              >
                <p class="nav-link">Cart</p>
              </li> */}
              <li
                class="nav-item d-lg-none d-block"
                onClick={() => {
                  navigate.push(`/whish-list`);
                  setToggle(false);
                }}
              >
                <p class="nav-link">Wishlist</p>
              </li>
              <li class="nav-item d-lg-none d-block">
                <div
                  className="ms-0 ps-3 d-flex align-items-center"
                  onClick={() => {
                    navigate.push("/register");
                    setToggle(false);
                  }}
                >
                  <BiUser color="#046767" size={26} />
                  <p className="nav-link">Register</p>
                </div>
              </li>
              <li class="nav-item d-lg-none d-block">
                <div
                  className="ms-0 ps-3 d-flex align-items-center"
                  onClick={() => {
                    navigate.push("/login");
                    setToggle(false);
                  }}
                >
                  <BiUser color="#046767" size={26} />
                  <p className="nav-link">log in</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-none">
          <FiSearch color="#046767" size={26} />
          <input
            className="search-bar-header ms-3 w-100"
            type={"search"}
            placeholder="Search..."
          />
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};
export default Header;
