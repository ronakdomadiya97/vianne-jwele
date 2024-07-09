import { ConfigProvider, Radio } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';
import { registerUser, setLoader } from '@/src/redux/action/homeAction';
import { useRouter } from 'next/navigation';
import { regex } from '@/src/utils/enum';



const Register = () => {
    const [role, setRole] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const navigate = useRouter();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
    });


    const onChange = (field, value) => {
        form[field] = value;
        errors[field] = checkValidation(field);
        setForm({ ...form });
        setErrors({ ...errors });
    };

    const checkValidation = (field) => {
        let errorMessage = "";
        const { email, customerName, password, address, companyName, uploadDoc,
            phoneNumber, contactPersonName, city, state, country, postalCode, customerSegment,
            attachment, taxIdentificationGSTBusinessNo, userEmail, confirmPassword } = form;

        if (field === "email" && isEmpty(email)) {
            errorMessage = "Email is required";
        } else if (field === "userEmail" && isEmpty(userEmail)) {
            errorMessage = "UserEmail is required";
        } else if (field === "customerName" && isEmpty(customerName)) {
            errorMessage = "Customer Name is required";
        } else if (field === "address" && isEmpty(address)) {
            errorMessage = "Address is required";
        }
        // else if (field === "uploadDoc" && Object.keys(uploadDoc).length === 0) {
        //     errorMessage = "Upload Doc is required";
        // }
        else if (field === "companyName" && isEmpty(companyName)) {
            errorMessage = "CompanyName is required";
        } else if (field === "contactPersonName" && isEmpty(contactPersonName)) {
            errorMessage = "Contact Person Name is required";
        } else if (field === "city" && isEmpty(city)) {
            errorMessage = "City is required";
        } else if (field === "state" && isEmpty(state)) {
            errorMessage = "State is required";
        } else if (field === "country" && isEmpty(country)) {
            errorMessage = "Country is required";
        } else if (field === "postalCode" && isEmpty(postalCode)) {
            errorMessage = "Postal Code is required";
        } else if (field === "customerSegment" && isEmpty(customerSegment)) {
            errorMessage = "Customer Segment is required";
        }
        //  else if (field === "attachment" && Object.keys(attachment).length === 0) {
        //     errorMessage = "Attachment is required";
        // } 
        else if (field === "taxIdentificationGSTBusinessNo" && isEmpty(taxIdentificationGSTBusinessNo)) {
            errorMessage = "TaxIdentificationGSTBusinessNo is required";
        } else if (
            field === "email" &&
            !isEmpty(email) &&
            regex.email.test(email) === false
        ) {
            errorMessage = "Invalid Email";
        } else if (field === "phoneNumber" && isEmpty(phoneNumber)) {
            errorMessage = "phoneNumber is required";
        } else if (
            (field === "phoneNumber") & !isEmpty(phoneNumber) &&
            (phoneNumber?.length > 10 || phoneNumber?.length < 10)
        ) {
            errorMessage = "Invalid phoneNumber number";
        } else if (field === "password" && isEmpty(password)) {
            errorMessage = "Password is required";
        } else if (
            field === "password" &&
            !isEmpty(password) &&
            password.length < 10
        ) {
            errorMessage = "minimum 10 character required";
        } else if (
            field === "password" &&
            !isEmpty(password) &&
            regex.atLeastOne.test(password) === false
        ) {
            errorMessage = "At least one number and letter required";
        } else if (field === "confirmPassword" && isEmpty(confirmPassword)) {
            errorMessage = "Confirm Password is required";
        } else if (
            field === "confirmPassword" &&
            !isEmpty(password) &&
            !isEmpty(confirmPassword) &&
            password !== confirmPassword
        ) {
            errorMessage = "Password mismatch";
        }
        return errorMessage;
    };

    const valifayionForm = () => {
        let errors = {};
        const { email, customerName, password, address, companyName, uploadDoc,
            phoneNumber, contactPersonName, city, state, country, postalCode, customerSegment,
            attachment, taxIdentificationGSTBusinessNo, userEmail, confirmPassword } = form;

        if (isEmpty(email)) {
            errors["email"] = "Email is required";
        }
        if (isEmpty(userEmail)) {
            errors["userEmail"] = "User Email is required";
        }
        if (isEmpty(taxIdentificationGSTBusinessNo)) {
            errors["taxIdentificationGSTBusinessNo"] = "TaxIdentificationGSTBusinessNo is required";
        }
        if (isEmpty(customerName)) {
            errors["customerName"] = "Customer Name is required";
        }
        if (isEmpty(address)) {
            errors["address"] = "Address is required";
        }
        if (isEmpty(companyName)) {
            errors["companyName"] = "Company Name is required";
        }
        // if (Object.keys(uploadDoc).length === 0) {
        //     errors["uploadDoc"] = "Upload Doc is required";
        // }
        if (isEmpty(contactPersonName)) {
            errors["contactPersonName"] = "Contac Person Name is required";
        }
        if (isEmpty(city)) {
            errors["city"] = "City is required";
        }
        if (isEmpty(state)) {
            errors["state"] = "State is required";
        }
        if (isEmpty(country)) {
            errors["country"] = "Country is required";
        }
        if (isEmpty(postalCode)) {
            errors["postalCode"] = "Postal Code is required";
        }
        if (isEmpty(customerSegment)) {
            errors["customerSegment"] = "CustomerSegment is required";
        }
        // if (Object.keys(attachment).length === 0) {
        //     errors["attachment"] = "Attachment is required";
        // }
        if (!isEmpty(email) && regex.email.test(email) === false) {
            errors["email"] = "Invalid Email";
        }
        if (isEmpty(phoneNumber)) {
            errors["phoneNumber"] = "Phone Number is required";
        } else if (
            !isEmpty(phoneNumber) &&
            (phoneNumber?.length > 10 || phoneNumber?.length < 10)
        ) {
            errors["phoneNumber"] = "Invalid mobile number";
        }
        if (isEmpty(password)) {
            errors["password"] = "Password is required";
        } else if (!isEmpty(password) && password.length < 10) {
            errors["password"] = "minimum 10 character required";
        } else if (
            !isEmpty(password) &&
            regex.atLeastOne.test(password) === false
        ) {
            errors["password"] = "At least one number and letter required";
        }
        if (
            !isEmpty(password) &&
            !isEmpty(confirmPassword) &&
            password !== confirmPassword
        ) {
            errors["confirmPassword"] = "Password mismatch";
        }
        if (isEmpty(confirmPassword)) {
            errors["confirmPassword"] = "Confirm Password is required";
        }

        for (var key in errors) {
            if (errors[key] != "") {
                break;
            }
        }

        setErrors({ ...errors });
        return isEmpty(errors);
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        dispatch(setLoader(true));
        const { profileImage, email, customerName, password, address, companyName, uploadDoc,
            phoneNumber, contactPersonName, city, state, country, postalCode, customerSegment,
            attachment, taxIdentificationGSTBusinessNo } = form;
        if (valifayionForm()) {
            const data = new FormData();
            data.append('email', email);
            data.append('firstname', customerName);
            data.append('password', password);
            data.append('user_roles[]', role);
            data.append('address', address);
            data.append('company_name', companyName);
            data.append('phone_number', phoneNumber);
            data.append('contact_person_name', contactPersonName);
            data.append('city', city);
            data.append('state', state);
            data.append('country', country);
            data.append('postal_code', postalCode);
            data.append('customer_segment', customerSegment);
            data.append('other_documents', taxIdentificationGSTBusinessNo);
            if (attachment) {
                data.append('attachment', attachment);
            }
            if (uploadDoc) {
                data.append('upload_other_document', uploadDoc);
            }
            if (profileImage) {
                data.append('profile_image', profileImage);
            }
            const response = await dispatch(registerUser(data));
            if (response?.success) {
                dispatch(setLoader(false));
                toast("User added successfully" || response?.success)
                navigate.push("/");
            } else {
                dispatch(setLoader(false));
                toast(response?.error)
            }
        }

    }
    return (
        <div className="login-form-page registion-page pb-4">
            <div className="row m-0 position-relative">
                {/* <div className="col-lg-5 left-img-register pe-lg-0">
                    <div className="img">
                        <img src={img} alt="imga" />
                    </div>
                </div> */}
                <div className='col-lg-12 ps-lg-0' style={{ backgroundColor: "#e6F0f0" }}>
                    <div className="login-form-data py-lg-0">
                        <div className="login-form register-form mx-lg-0 mx-auto mw-100 my-0 pt-4">
                            <form onSubmit={(e) => handleRegister(e)}>
                                <div className='row'>
                                    <div className='d-lg-block d-none'>
                                        <h1 style={{fontSize:30}}>Create an Account</h1>
                                        {/* <a class="navbar-brand ps-0 mx-0" onClick={() => navigate(`/`)}>
                                            <img className="logo-icon" style={{ cursor: "pointer" }} src={'https://api.viannejewels.com/wp-content/uploads/2023/03/logo-2-2.png.webp'} alt="img" />
                                        </a> */}
                                    </div>
                                    <div className='text-start mt-3 col-lg-4 col-md-6'>
                                        <label className='email-title pb-2'>Customer Name*</label>
                                        <input
                                            className='login-input'
                                            placeholder='Customer name'
                                            type={"text"}
                                            onChange={(e) => onChange('customerName', e.target.value)}
                                            value={form?.customerName}
                                        />
                                        {errors?.customerName && <span style={{ color: 'red' }}>{errors?.customerName}</span>}
                                    </div>
                                    <div className='text-start mt-3 col-lg-4 col-md-6'>
                                        <label className='email-title pb-2'>Address</label>
                                        <input
                                            className='login-input'
                                            placeholder='Address'
                                            type={"text"}
                                            onChange={(e) => onChange('address', e.target.value)}
                                            value={form?.address}
                                        />
                                        {errors?.address && <span style={{ color: 'red' }}>{errors?.address}</span>}
                                    </div>
                                    <div className='text-start mt-3 col-lg-4 col-md-6'>
                                        <label className='email-title pb-2'>Company Name</label>
                                        <input
                                            className='login-input'
                                            placeholder='Company name'
                                            type={"text"}
                                            onChange={(e) => onChange('companyName', e.target.value)}
                                            value={form?.companyName}
                                        />
                                        {errors?.companyName && <span style={{ color: 'red' }}>{errors?.companyName}</span>}
                                    </div>

                                    <div className='text-start mt-3 col-lg-4 col-md-6'>
                                        <label className='email-title pb-2'>Phone Number</label>
                                        <input
                                            className='login-input'
                                            placeholder='Phone number'
                                            type={"number"}
                                            onChange={(e) => {
                                                if (e.target.value?.length <= 10) {
                                                    onChange('phoneNumber', e.target.value)
                                                }
                                            }}
                                            value={form?.phoneNumber}
                                        />
                                        {errors?.phoneNumber && <span style={{ color: 'red' }}>{errors?.phoneNumber}</span>}
                                    </div>
                                    <div className='text-start mt-3 col-lg-4 col-md-6'>
                                        <label className='email-title pb-2'>Contact Person Name</label>
                                        <input
                                            className='login-input'
                                            placeholder='Contact person name'
                                            type={"text"}
                                            onChange={(e) => onChange('contactPersonName', e.target.value)}
                                            value={form?.contactPersonName}
                                        />
                                        {errors?.contactPersonName && <span style={{ color: 'red' }}>{errors?.contactPersonName}</span>}
                                    </div>
                                    <div className='text-start mt-3 col-lg-4 col-md-6'>
                                        <label className='email-title pb-2'>Email</label>
                                        <input
                                            className='login-input'
                                            placeholder='Email'
                                            type={"email"}
                                            onChange={(e) => onChange('email', e.target.value)}
                                            value={form?.email}
                                        />
                                        {errors?.email && <span style={{ color: 'red' }}>{errors?.email}</span>}
                                    </div>
                                    <div className='text-start mt-3 col-lg-4 col-md-6'>
                                        <label className='email-title pb-2'>City</label>
                                        <input
                                            className='login-input'
                                            placeholder='City'
                                            type={"text"}
                                            onChange={(e) => onChange('city', e.target.value)}
                                            value={form?.city}
                                        />
                                        {errors?.city && <span style={{ color: 'red' }}>{errors?.city}</span>}
                                    </div>
                                    <div className='text-start mt-3 col-lg-4 col-md-6'>
                                        <label className='email-title pb-2'>State</label>
                                        <input
                                            className='login-input'
                                            placeholder='State'
                                            type={"text"}
                                            onChange={(e) => onChange('state', e.target.value)}
                                            value={form?.state}
                                        />
                                        {errors?.state && <span style={{ color: 'red' }}>{errors?.state}</span>}
                                    </div>
                                    <div className='text-start mt-3 col-lg-4 col-md-6'>
                                        <label className='email-title pb-2'>Country</label>
                                        <input
                                            className='login-input'
                                            placeholder='Country'
                                            type={"text"}
                                            onChange={(e) => onChange('country', e.target.value)}
                                            value={form?.country}
                                        />
                                        {errors?.country && <span style={{ color: 'red' }}>{errors?.country}</span>}
                                    </div>
                                    <div className='text-start mt-3 col-lg-4 col-md-6'>
                                        <label className='email-title pb-2'>Postal Code</label>
                                        <input
                                            className='login-input'
                                            placeholder='Postal Code'
                                            type="number"
                                            onChange={(e) => onChange('postalCode', e.target.value)}
                                            value={form?.postalCode}
                                        />
                                        {errors?.postalCode && <span style={{ color: 'red' }}>{errors?.postalCode}</span>}
                                    </div>
                                    <div className='text-start mt-3 col-lg-4 col-md-6'>
                                        <label className='email-title pb-2'>User Email</label>
                                        <input
                                            className='login-input'
                                            placeholder='User email'
                                            type={"email"}
                                            onChange={(e) => onChange('userEmail', e.target.value)}
                                            value={form?.userEmail}
                                        />
                                        {errors?.userEmail && <span style={{ color: 'red' }}>{errors?.userEmail}</span>}
                                    </div>
                                    <div className='text-start mt-3 col-lg-4 col-md-6'>
                                        <label className='email-title pb-2'>Customer segment</label>
                                        <input
                                            className='login-input'
                                            placeholder='Customer segment'
                                            type={"text"}
                                            onChange={(e) => onChange('customerSegment', e.target.value)}
                                            value={form?.customerSegment}
                                        />
                                        {errors?.customerSegment && <span style={{ color: 'red' }}>{errors?.customerSegment}</span>}
                                    </div>
                                    <div className='text-start mt-3 col-lg-4 col-md-6'>
                                        <label className='email-title pb-2'>Business Registration Certificate</label>
                                        <input
                                            className='login-input'
                                            placeholder='Attachment'
                                            type={"file"}
                                            onChange={(e) => onChange('attachment', e.target.files[0])}
                                        />
                                        {errors?.attachment && <span style={{ color: 'red' }}>{errors?.attachment}</span>}
                                    </div>
                                    <div className='text-start mt-3 col-lg-4 col-md-6'>
                                        <label className='email-title pb-2'>Password</label>
                                        <input
                                            className='login-input'
                                            placeholder='Password'
                                            type={"Password"}
                                            onChange={(e) => onChange('password', e.target.value)}
                                            value={form?.password}
                                        />
                                        {errors?.password && <span style={{ color: 'red' }}>{errors?.password}</span>}
                                    </div>
                                    <div className='text-start mt-3 col-lg-4 col-md-6'>
                                        <label className='email-title pb-2'>Confirm password</label>
                                        <input
                                            className='login-input'
                                            placeholder='Confirm password'
                                            type={"Password"}
                                            onChange={(e) => onChange('confirmPassword', e.target.value)}
                                            value={form?.confirmPassword}
                                        />
                                        {errors?.confirmPassword && <span style={{ color: 'red' }}>{errors?.confirmPassword}</span>}
                                    </div>
                                    <div className='text-start mt-3 col-lg-4 col-md-6'>
                                        <label className='email-title pb-2'>Tax Identification Number / GST Number / Business registration numbe</label>
                                        <input
                                            className='login-input'
                                            placeholder='Tax Identification Number / GST Number / Business registration numbe'
                                            type={"number"}
                                            onChange={(e) => onChange('taxIdentificationGSTBusinessNo', e.target.value)}
                                            value={form?.taxIdentificationGSTBusinessNo}
                                        />
                                        {errors?.taxIdentificationGSTBusinessNo && <span style={{ color: 'red' }}>{errors?.taxIdentificationGSTBusinessNo}</span>}
                                    </div>
                                    <div className='text-start mt-3 col-lg-4 col-md-6 mb-lg-0 mb-4'>
                                        <label className='email-title pb-2'>Profile image (optional)</label>
                                        <input
                                            className='login-input'
                                            placeholder='Profile image (optional)'
                                            type={"file"}
                                            name="profileImage"
                                            id='profileImage'
                                            onChange={(e) => onChange('profileImage', e.target.files[0])}
                                        />
                                    </div>
                                    <div className='text-start mt-lg-3 col-lg-4 col-md-6 mb-4'>
                                        <label className='email-title pb-2'>Upload document {`(Copy of passport / Driving Licenses/ Director or Proprietor)`}</label>
                                        <input
                                            className='login-input'
                                            placeholder='Upload document'
                                            type={"file"}
                                            onChange={(e) => onChange('uploadDoc', e.target.files[0])}
                                        />
                                        {errors?.uploadDoc && <span style={{ color: 'red' }}>{errors?.uploadDoc}</span>}
                                    </div>
                                    <div className='text-start mt-0 col-lg-12'>
                                        <label className='email-title pb-2'>Role Type</label>
                                        {/* <div className="row"> */}
                                        <div className="d-flex align-items-center justify-content-start flex-wrap pb-3">
                                            <div className="">
                                                <ConfigProvider
                                                    theme={{
                                                        token: {
                                                            colorPrimary: '#07362e',
                                                            borderColor: "#07362e"
                                                        },
                                                    }}
                                                >
                                                    <Radio
                                                        onChange={(e) => {
                                                            setRole(e.target.value)
                                                        }}
                                                        value={'retailer'}
                                                        checked={role === 'retailer'}
                                                        selected={selectedValue}
                                                    >Retailer</Radio>
                                                </ConfigProvider>
                                            </div>
                                            <div className="">
                                                <ConfigProvider
                                                    theme={{
                                                        token: {
                                                            colorPrimary: '#07362e',
                                                            borderColor: "#07362e"
                                                        },
                                                    }}
                                                >
                                                    <Radio
                                                        onChange={(e) => {
                                                            setRole(e.target.value)
                                                        }}
                                                        value={"customer"}
                                                        checked={role === 'customer'}
                                                        selected={selectedValue}
                                                    >Customer</Radio>
                                                </ConfigProvider>
                                            </div>
                                            <div className="">
                                                <ConfigProvider
                                                    theme={{
                                                        token: {
                                                            colorPrimary: '#07362e',
                                                            borderColor: "#07362e"
                                                        },
                                                    }}
                                                >
                                                    <Radio onChange={(e) => setRole(e.target.value)} checked={role === 'wolesaler'} value={"wolesaler"} selected={selectedValue} >Wholesaler</Radio>
                                                </ConfigProvider>
                                            </div>
                                            <div className="">

                                                <ConfigProvider
                                                    theme={{
                                                        token: {
                                                            colorPrimary: '#07362e',
                                                            borderColor: "#07362e"
                                                        },
                                                    }}
                                                >
                                                    <Radio onChange={(e) => setRole(e.target.value)} checked={role === 'distributor'} value={'distributor'} selected={selectedValue} >Distributor</Radio>
                                                </ConfigProvider>
                                            </div>
                                        </div>
                                        {/* </div> */}
                                    </div>
                                </div>
                                <button
                                    type='submit'
                                    className='login-btn'

                                >Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;