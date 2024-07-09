import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { createProductInquiry } from '@/src/redux/action/contactUsActions';

const AddToCart = () => {
    const dispatch = useDispatch();
    const [cartModal, setCartModal] = useState(false)
    const [allAddToCart, setAddToCartList] = useState([]);
    const [isInquiry, setInquiey] = useState(false);
    const [inputform, setInputForm] = useState({
        product_name: '',
        product_email: "",
        product_phone_number: '',
        product_message: '',
    })

    useEffect(() => {
        let wishList = JSON.parse(sessionStorage.getItem("addtocart")) || [];
        setAddToCartList(wishList)
    }, []);

    const DecreaseValue = (d) => {
        let wishList = [...allAddToCart] || [];
        let existingProduct = wishList.findIndex((item) => item.product_id === d.product_id);
        wishList[existingProduct].quantatiy = d.quantatiy - 1;
        setAddToCartList(wishList);
        sessionStorage.setItem("addtocart", JSON.stringify(wishList));

        // setQuantatiy(quantatiy !== 0 ? quantatiy - 1 : 0)
    }
    const IncreaseValue = (d) => {
        let wishList = [...allAddToCart] || [];
        let existingProduct = wishList.findIndex((item) => item.product_id === d.product_id);
        wishList[existingProduct].quantatiy = d.quantatiy + 1;
        setAddToCartList(wishList);
        sessionStorage.setItem("addtocart", JSON.stringify(wishList));
        // setQuantatiy(quantatiy + 1)
    }

    const handlRemoveItem = (itm) => {
        let wishList = [...allAddToCart] || [];
        const existingProduct = wishList.findIndex((item) => item.product_id === itm.product_id);
        wishList.splice(existingProduct, 1);
        sessionStorage.setItem("addtocart", JSON.stringify(wishList));
        setAddToCartList(wishList);
    }
    const totalPrice = allAddToCart.reduce((accumulator, product) => {
        // Extract the product_sale_price from each product
        const salePrice = parseFloat(product.product_sale_price);

        // Add the salePrice to the accumulator
        return accumulator + salePrice;
    }, 0);

    const handleCheckOut = async () => {
        
        let params = inputform;
        params.product_id = allAddToCart.map(itm => itm.product_id).join(',')
        const response = await dispatch(createProductInquiry(params));
        if(response){
            toast('jshjshds')
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
        <div className="cart-page">
            <div className="container">
                <div className='cart-title pb-4'>
                    <h2 className='py-3'>My Cart</h2>
                </div>
                <div className='row pb-4'>
                    <div className={allAddToCart?.length > 0 ? 'col-lg-8' : 'col-lg-12'}>
                        {allAddToCart?.length > 0 ? allAddToCart?.map((d,i) => {
                            return (
                                <div className="w-100" key={i}>
                                    <div className="d-md-flex d-block justify-content-center mb-4 align-items-center">
                                        <div className="d-md-none d-flex pb-3 justify-content-end ps-0">
                                            <button className="btn btn-close" style={{ opacity: 1 }} onClick={() => handlRemoveItem(d)}></button>
                                        </div>
                                        <div className="col-md-2">
                                            <img src={d.product_feature_image} alt="img" className="w-100 wishlist-imgs" loading="lazy"/>
                                        </div>
                                        <div className="pt-md-0 pt-4 w-100 ps-md-3">
                                            <div className='d-md-flex d-block align-items-center'>
                                                <div className='main-product__detail__box text-md-start text-center position-relative'>
                                                    <h2 className='product_whishlist_title'>{d?.product_name}</h2>
                                                    <h6 className='product_addtocart_content mb-3'>{d?.description}</h6>
                                                    <Link href='/whish-list' className='move-favorite'>Move to Favorite</Link>
                                                </div>
                                                <div className='quantatity-number mx-md-4 mx-auto mt-md-2 mt-3 mb-md-0 mb-3'>
                                                    <span className='' onClick={() => DecreaseValue(d)}><FiMinus size={26} /></span>
                                                    <input className='number-indicator' type={"number"} value={d?.quantatiy} />
                                                    <span onClick={() => IncreaseValue(d)}><FiPlus size={26} /></span>
                                                </div>
                                                <div><p className='product_addtocart_price'>{`₹${d?.product_sale_price ? (parseInt(d.product_sale_price)) : "0"}`}</p></div>
                                                <div className="d-md-flex d-none justify-content-end ps-2">
                                                    <button className="btn btn-close" style={{ opacity: 1 }} onClick={() => handlRemoveItem(d)}></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }):
                        
                        <h5 style={{textAlign:'center'}}>No Data added in the list</h5>}
                    </div>
                    {allAddToCart?.length > 0 && <div className='col-lg-4'>
                        <div className='order-summary p-4'>
                            <h3 className='order-summary-title'>Order Summary</h3>
                            {allAddToCart?.map((itm,i) => {
                                return (
                                    <div className='d-flex justify-content-between pt-3' key={i}>
                                        <p className='subtotal-title'>Subtotal:</p>
                                        <p className='subtotal-price'>₹ {`${itm?.product_sale_price ? (parseInt(itm.product_sale_price) * parseInt(itm?.quantatiy)) : '0'}`}</p>
                                    </div>
                                )
                            })}

                            <div className='d-flex justify-content-between'>
                                <p className='subtotal-title'>Shipping:</p>
                                <p className='subtotal-type'>Free Shipping</p>
                            </div>
                            <div className='d-flex justify-content-between total-box pt-5'>
                                <p className='total-title'>Total:</p>
                                <p className='total-price'>₹ {totalPrice}</p>
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
                                                <img src={d.src} alt="img" className="cart-img" width={200} height={200} loading="lazy"/>
                                                <div className="d-flex pt-md-0 pt-4 w-100 justify-content-between px-3">
                                                    <div>
                                                        <div className='main-product__detail__box text-start position-relative p-0'>
                                                            <h2 className='product_whishlist_title'>{d.title}</h2>
                                                            <h6 className='product_addtocart_content mb-3'>{d.description}</h6>
                                                        </div>
                                                        <p className='final-quantatity'>QTY: 1</p>
                                                        <div><p className='product_addtocart_price'>{`₹${d.amount}`}</p></div>
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
                        <div className="d-flex justify-content-end p-3 pb-0">
                            <button type="button" className="btn btn-close" onClick={() => setInquiey(false)}>
                            </button>
                        </div>
                        <div className="inuquiry-form">
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
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}
export default AddToCart;