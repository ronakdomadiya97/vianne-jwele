import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { FiMinus, FiPlus } from 'react-icons/fi'
import products from '../Assets/img/products-1.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { createProductInquiry } from '../redux/action/contactUsActions';
import { toast } from 'react-toastify';
import { Link, useParams, useNavigate } from "react-router-dom";
import { delete_cart_items, getCartProduct, setLoader } from '../redux/action/homeAction';

const AddToCart = ({ selectedItem }) => {
    const dispatch = useDispatch();
    const currencyRate = useSelector(state => state.home.currencyRate);
    const currency = useSelector(state => state.home.currency);
    const [cartModal, setCartModal] = useState(false)
    const [isInquiry, setInquiey] = useState(false);
    const [inputform, setInputForm] = useState({
        // product_name: '',
        // product_email: "",
        // product_phone_number: '',
        // product_message: '',
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
    })
    let cartList = useSelector(state => state.home.cartList);
    // cartList = cartList.map((d) => ({ ...d, quantatiy: 1 }))
    const [allAddToCart, setAddToCartList] = useState([]);

    useEffect(() => {
        let userId = JSON.parse(sessionStorage.getItem('userId'))
        dispatch(getCartProduct(userId))
        setAddToCartList(cartList.map((d) => ({ ...d, quantatiy: 1 })))
    }, []);

    useEffect(() => {
        if (cartList) {
            setAddToCartList(cartList?.map(item => { return ({ ...item, quantatiy: 1 }) }))
        }
    }, [cartList]);

    const DecreaseValue = (d) => {
        let wishList = [...allAddToCart] || [];
        let existingProduct = wishList.findIndex((item) => item.product_id === d.product_id);
        wishList[existingProduct].quantatiy = d.quantatiy - 1;
        setAddToCartList(wishList);
        sessionStorage.setItem("addtocart", JSON.stringify(wishList));
    }
    const IncreaseValue = (d) => {
        let wishList = [...allAddToCart] || [];
        let existingProduct = wishList.findIndex((item) => item.product_id === d.product_id);
        wishList[existingProduct].quantatiy = d.quantatiy + 1;
        setAddToCartList(wishList);
        sessionStorage.setItem("addtocart", JSON.stringify(wishList));
        // setQuantatiy(quantatiy + 1)
    }


    const handlRemoveItem = async (itm) => {
        dispatch(setLoader(true));
        let userIds = await sessionStorage.getItem('userId');
        const response = await dispatch(delete_cart_items({ product_id: itm.product_id }, userIds));
        if (response.status == 200) {
            dispatch(setLoader(false));
            toast('Remove Item from the cart');
            dispatch(getCartProduct(userIds))
        } else {
            dispatch(setLoader(false));
            toast(response?.data || response?.data?.message)
        }
    }
    const totalPrice = allAddToCart.reduce((accumulator, product) => {
        // Extract the product_sale_price from each product
        const salePrice = product.product_sale_price ? parseFloat(product.product_sale_price) : 0;

        // Add the salePrice to the accumulator
        return accumulator + salePrice;
    }, 0);

    const handleCheckOut = async () => {

        let params = inputform;
        params.product_id = allAddToCart.map(itm => itm.product_id).join(',')
        const response = await dispatch(createProductInquiry(params));
        if (response) {
            toast('Successfully Add inquiry')
            sessionStorage.removeItem('addtocart');
            setInquiey(false);
            setInputForm({
                product_name: '',
                product_email: "",
                product_phone_number: '',
                product_message: '',
            })
        }
    }

    const handleChange = (e) => {
        setInputForm((prevState) => ({
            ...prevState, [e.target.name]: e.target.value,
        }))
    }

    return (
        <>
            <div className="d-lg-flex d-none dashboard-breadcrumb">
                <button className="dashboard-bradcrumb d-flex align-items-center">
                    {selectedItem === "addtocart" && "Add to Cart"}
                </button>
            </div>
            <div className="cart-page">
                <div className="container">
                    <div className='cart-title pb-4' >
                        <h2 className='py-3' style={{ fontSize: '18px' }}>My Cart</h2>
                    </div>
                    <div className='row pb-4'>
                        <div className={allAddToCart?.length > 0 ? 'col-lg-8' : 'col-lg-12'}>
                            {allAddToCart?.length > 0 ? allAddToCart?.map((d,i) => {
                                let url = d?.product_feature_image?.match(/^https?:\/\/([^/?#]+)/i);
                                return (
                                    <div className="w-100" key={i}>
                                        <div className="d-md-flex d-block justify-content-center mb-4 align-items-center">
                                            <div className="d-md-none d-flex pb-3 justify-content-end ps-0">
                                                <button className="btn btn-close" style={{ opacity: 1 }} onClick={() => handlRemoveItem(d)}></button>
                                            </div>
                                            <div className="col-md-2">
                                                <img src={url?.[0] === "https://api.viannejewels.com" ? d?.product_feature_image : `https://api.viannejewels.com${d?.product_feature_image}`} alt="img" className="w-100 wishlist-imgs" />
                                            </div>
                                            <div className="pt-md-0 pt-4 w-100 ps-md-2">
                                                <div className='row align-items-center justify-content-center'>
                                                    <div className='col-sm-4 col-6'>
                                                        <div className='main-product__detail__box text-sm-start text-center position-relative'>
                                                            <h2 className='product_whishlist_title' style={{ fontSize: '16px' }}>{d?.product_name}</h2>
                                                            <h6 className='product_addtocart_content mb-3' style={{ fontSize: '16px' }}>{d?.description}</h6>
                                                            {/* <Link to='/whish-list' className='move-favorite'>Move to Favorite</Link> */}
                                                        </div>
                                                    </div>
                                                    <div className='col-sm-4 col-6'>
                                                        <div className='quantatity-number mx-auto'>
                                                            <span className='' onClick={() => DecreaseValue(d)}><FiMinus size={26} /></span>
                                                            <input className='number-indicator' style={{ fontSize: '16px' }} type={"number"} value={d?.quantatiy} />
                                                            <span onClick={() => IncreaseValue(d)}><FiPlus size={26} /></span>
                                                        </div>
                                                    </div>
                                                    <div className='col-sm-3 col-6 mt-sm-0 mt-2'><p className='product_addtocart_price' style={{ fontSize: '16px' }}>{`${currency == 'USD' ? '$' : '₹'}${(d.product_sale_price ? currency == 'USD' ? Math.ceil(currencyRate * parseInt(d?.product_sale_price)) : parseInt(d.product_sale_price) : '0')}`}</p></div>
                                                    <div className='col-sm-1 col-6 mt-sm-0 mt-2'>
                                                        <div className="d-md-flex d-flex justify-content-sm-end justify-content-center cancel_product_btn">
                                                            <button className="btn btn-close" style={{ opacity: 1, fontSize: '16px' }} onClick={() => handlRemoveItem(d)}></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) :

                                <h5 style={{ textAlign: 'center' }}>No Data added in the list</h5>}
                        </div>
                        {allAddToCart?.length > 0 && <div className='col-lg-4'>
                            <div className='order-summary p-4'>
                                <h3 className='order-summary-title' style={{ fontSize: '17px' }}>Order Summary</h3>
                                {allAddToCart?.map((itm,i) => {
                                    return (
                                        <div className='d-flex justify-content-between pt-3' key={i}>
                                            <p className='subtotal-title' style={{ fontSize: '16px' }}>Subtotal:</p>
                                            <p className='subtotal-price' style={{ fontSize: '16px' }}>{currency == 'USD' ? '$' : '₹'} {`${(parseInt(itm.product_sale_price ? currency == 'USD' ? Math.ceil(currencyRate * parseInt(itm.product_sale_price)) : itm.product_sale_price : 0) * parseInt(itm?.quantatiy))}`}</p>
                                        </div>
                                    )
                                })}

                                <div className='d-flex justify-content-between'>
                                    <p className='subtotal-title' style={{ fontSize: '16px' }}>Shipping:</p>
                                    <p className='subtotal-type' style={{ fontSize: '16px' }}>Free Shipping</p>
                                </div>
                                <div className='d-flex justify-content-between total-box pt-5'>
                                    <p className='total-title' style={{ fontSize: '17px' }}>Total:</p>
                                    <p className='total-price' style={{ fontSize: '17px' }}>{currency == 'USD' ? '$' : '₹'} {currency == 'USD' ? Math.ceil(currencyRate * parseInt(totalPrice)) : totalPrice}</p>
                                </div>
                                <button className='order-check-out mt-4' onClick={() => {
                                    setInquiey(true)
                                }}>CheckOut</button>
                            </div>
                        </div>}
                    </div>
                </div>
                {cartModal && (
                    <div>
                        <Modal className="px-2 checkout-modal" show={cartModal} centered={true} bsSize="lg"  >
                            <Modal.Body className="p-0">
                                <div className='checkout-modal-content'>
                                    {allAddToCart?.length > 0 && allAddToCart?.map((d,i) => {
                                        return (
                                            <div className="w-100 pt-3" key={i}>
                                                <div className="d-flex d-block mb-4 px-3 align-items-center">
                                                    <img src={d.src} alt="img" className="cart-img" width={200} height={200} />
                                                    <div className="d-flex pt-md-0 pt-4 w-100 justify-content-between px-3">
                                                        <div>
                                                            <div className='main-product__detail__box text-start position-relative p-0'>
                                                                <h2 className='product_whishlist_title'>{d.title}</h2>
                                                                <h6 className='product_addtocart_content mb-3'>{d.description}</h6>
                                                            </div>
                                                            <p className='final-quantatity'>QTY: 1</p>
                                                            <div><p className='product_addtocart_price'>{`${currency == 'USD' ? '$' : '₹'}${currency == 'USD' ? Math.ceil(currencyRate * parseInt(d.amount)) : d.amount}`}</p></div>
                                                        </div>
                                                        <div className="d-flex justify-content-end ps-2">
                                                            <button className="btn btn-close" style={{ opacity: 1 }}></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <div className='p-3 cart-modal-bottom-box mt-5'>
                                        <div className='d-flex justify-content-between'>
                                            <p className='cart-total-title'>Total:</p>
                                            <p className='cart-total-price'>₹ {totalPrice}</p>
                                        </div>
                                        <div className='d-flex justify-content-between mt-5'>
                                            <button className='viewcart-btn bg-transparent w-50 me-3'>View Cart</button>
                                            <button className='checkout-btn w-50'>Checkout</button>
                                        </div>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>
                )}

                <div className="justify-content-center">
                    <Modal className="px-2 inquiry-form-modal " show={isInquiry} centered={true} bsSize="lg" >
                        <Modal.Body className="p-0">
                            <div className="d-flex justify-content-between p-3 pb-4">
                                <h1 style={{ fontSize: '20px', fontWeight: '600' }}>Send the request</h1>
                                <button type="button" className="btn btn-close" onClick={() => setInquiey(false)}>
                                </button>
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
                                <button className="inquiry-submit" onClick={handleCheckOut}>
                                    Submit Now
                                </button>
                            </div>
                            {/* <div className="inuquiry-form">
                                <input
                                    className="inquiry-input w-100 mb-3"
                                    type={"text"}
                                    name="product_name"
                                    placeholder="Name*"
                                    value={inputform?.product_name}
                                    onChange={handleChange}
                                />
                                <input
                                    className="inquiry-input w-100 mb-3"
                                    type={"mail"}
                                    placeholder="Mail*"
                                    name="product_email"
                                    value={inputform?.product_email}
                                    onChange={handleChange}
                                />
                                <input
                                    className="inquiry-input w-100 mb-3"
                                    type={"number"}
                                    placeholder="Phone No*"
                                    name="product_phone_number"
                                    value={inputform?.product_phone_number}
                                    onChange={handleChange}
                                />
                                <textarea
                                    className="inquiry-textarea w-100 mb-3"
                                    style={{ height: 100 }}
                                    type={"message"}
                                    placeholder="Message"
                                    name="product_message"
                                    value={inputform?.product_message}
                                    onChange={handleChange}
                                />
                                <button className="inquiry-submit" onClick={handleCheckOut}>Submit Now</button>
                            </div> */}
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </>
    )
}
export default AddToCart;