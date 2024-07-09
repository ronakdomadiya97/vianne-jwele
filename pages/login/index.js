import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getUserDetail, setLoader } from '@/src/redux/action/homeAction';
import { signInUser } from '@/src/redux/action/contactUsActions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
    const disptach = useDispatch();
    const navigate = useRouter();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState('');
    const [loginId, setLoginId] = useState(null);

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
    return (
        <div className="login-form-page pb-4">
            <div className="row m-0">
                <div className="col-lg-5 pe-lg-0">
                    <div className="img">
                        <img src={"/img/img/login.webp"} alt="imga" />
                    </div>
                </div>
                <div className='col-lg-7 ps-lg-0' style={{backgroundColor:"#e6F0f0"}}>
                    <div className="login-form-data py-lg-0 py-4">
                        <div className="login-form mx-lg-0 mx-auto my-0 pt-4">
                            <div className='d-flex align-items-center justify-content-between'>
                                <h3 className="login-title">Sign in</h3>
                                {/* <p className='create-account'>Create Account</p> */}
                            </div>
                            <div className='text-start mt-3'>
                                <label className='email-title pb-2'>Email*</label>
                                <input 
                                    className='login-input' 
                                    placeholder='Your Email' 
                                    type={"email"} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                            <div className='text-start mt-3'>
                                <label className='email-title pb-2'>Password*</label>
                                <input 
                                    className='login-input' 
                                    placeholder='Your password' 
                                    type={"password"} 
                                    onChange={(e) => setPass(e.target.value)}
                                    value={pass}
                                />
                            </div>
                            <div className='d-flex align-items-center justify-content-between pt-4'>
                                <div>
                                    <label class="checkboxDiv remeber-me" style={{ color: "#222" }}>Remeber me
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                                <Link href='/' className='forgot-password'>Forgot Password</Link>
                            </div>
                            <button 
                                className='login-btn'
                                onClick={() => handleSignIn()}
                            >Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;