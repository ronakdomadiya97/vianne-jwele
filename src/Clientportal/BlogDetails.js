import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useSelector, useDispatch } from 'react-redux';
import { addCommentBlog, fetchCommentsByBlog, fetchPostCategories, fetchSingleBlog } from "../redux/action/blogAction";
import Aos from "aos";
import 'aos/dist/aos.css';
import { toast } from 'react-toastify';

const BlogDetails = ({selectedBlog}) => {
    const disptach = useDispatch();
    const [inputform, setInputForm] = useState({
        author: '',
        email: "",
        content: '',
    })
    const blogDetails = useSelector(state => state.blog.blog);
    const blogList = useSelector(state => state.blog.blogList?.posts);
    const postCategories = useSelector(state => state.blog.postCategories);
    const bannersSlider = {
        dots: true,
        arrows: false,
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

    const handleChange = (e) => {
        setInputForm((prevState) => ({
            ...prevState, [e.target.name]: e.target.value,
        }))
    }

    const handleAddComment = () => {
        let params = inputform
        params.post_id = selectedBlog?.post_id
        disptach(addCommentBlog(params))
        toast('Comment added succesfully...')
        setInputForm({
            author: '',
            email: "",
            content: '',
        })
    }
    useEffect(() => {
        disptach(fetchSingleBlog(selectedBlog?.post_id))
        disptach(fetchCommentsByBlog(selectedBlog?.post_id))
    }, [])

    useEffect(() => {
        Aos.init({
            duration: 1500,
            once: true
        });
        disptach(fetchPostCategories())
    }, [disptach])

    const handleRecentPost = (post) => {
        disptach(fetchSingleBlog(post?.post_id))
    }
    return (
        <div className="blog-page pb-5">
            <h2 className="pagemain-title py-5">BlogDetails</h2>
            <div className="row justify-content-center m-0">
            <div className="col-lg-8 col-sm-10 col-12 px-sm-2 px-3">
                    <div className="row">
                    <div className="single-blog-img">
                            <img src={`https://api.viannejewels.com/${blogDetails?.post_feature_image}`} class="d-block w-100" alt="..." style={{ height: 455, objectFit: 'cover' }} />
                        </div>
                        <div className="col-lg-7 col-md-6 col-12">
                            <div className="left-data">
                                <div className="content-data-products">
                                    <div className="shadow-content">
                                        <ul className="d-flex align-items-center blog-detail-list mb-2 mt-5">
                                            <p className="me-4">{blogDetails?.post_created_date}</p>
                                            <a href=".">By {blogDetails?.author_name}</a>
                                        </ul>
                                        <p className="clerity-method-desc text-start">{blogDetails?.post_title}</p>
                                        <div className="product-detail-content mt-3" dangerouslySetInnerHTML={{ __html: blogDetails?.post_content }}>
                                        </div>
                                    </div>
                                    <div className="commenter-box">
                                        <h3 className="my-4">Comment</h3>
                                        <div className="mb-3">
                                            <Slider {...bannersSlider} className="m-0 p-0 blog-banner-slider">
                                                <div className="comment-data">
                                                    <p className="commenter-comment">Commodo porttitor dictum dictum ultrices at cras. Ultrices cras donec lacus donec aenean vulputate eget condimentum. Ut at faucibus massa pellentesque purus. Laoreet donec sed elementum ultrices id tellus.</p>
                                                    <div className="d-flex align-items-center justify-content-end">
                                                        <a href="#" className="commenter-name">Goldish</a>
                                                        <a href="#" className="commenter-date ms-3"> September 15, 2021</a>
                                                    </div>
                                                </div>
                                                <div className="comment-data">
                                                    <p className="commenter-comment">Commodo porttitor dictum dictum ultrices at cras. Ultrices cras donec lacus donec aenean vulputate eget condimentum. Ut at faucibus massa pellentesque purus. Laoreet donec sed elementum ultrices id tellus.</p>
                                                    <div className="d-flex align-items-center justify-content-end">
                                                        <a href="#" className="commenter-name">Goldish</a>
                                                        <a href="#" className="commenter-date ms-3"> September 15, 2021</a>
                                                    </div>
                                                </div>
                                                <div className="comment-data">
                                                    <p className="commenter-comment">Commodo porttitor dictum dictum ultrices at cras. Ultrices cras donec lacus donec aenean vulputate eget condimentum. Ut at faucibus massa pellentesque purus. Laoreet donec sed elementum ultrices id tellus.</p>
                                                    <div className="d-flex align-items-center justify-content-end">
                                                        <a href="#" className="commenter-name">Goldish</a>
                                                        <a href="#" className="commenter-date ms-3"> September 15, 2021</a>
                                                    </div>
                                                </div>
                                            </Slider>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-form mt-5">
                                    <h3>Leave A Reply</h3>
                                    <div className="mt-3">
                                        <input className="name-form w-100 mb-3" placeholder="Name*" name="author"  value={inputform?.author} onChange={handleChange} />
                                        <input className="name-form w-100 mb-3" placeholder="Email*" name="email"  value={inputform?.email} onChange={handleChange} />
                                        <textarea className="name-form w-100" placeholder="Message" style={{ height: 100 }} name="content"  value={inputform?.content} onChange={handleChange}  />
                                    </div>
                                    <button className="post-comment-btn" onClick={() => handleAddComment()}>SUBMIT NOW</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-6 col-12">
                            <div className="cateogory-title-data">
                                <h2 className="title-blog-post">Categories</h2>
                                <div class="accordion accordion-flush" id="accordionFlushExample">
                                    {postCategories?.length > 0 && postCategories?.filter(pos =>  pos?.count !== 0)?.map((d, index) => {
                                        return (
                                            <div class="accordion-item border-0" key={index}>
                                                <h2 class="accordion-header" id="flush-headingOne">
                                                    <button className="accordion-button collapsed faq-title" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapseOne${index}`} aria-expanded="false" aria-controls={`flush-collapseOne${index}`}>
                                                        {d?.name}
                                                    </button>
                                                </h2>
                                                <div id={`flush-collapseOne${index}`} className="accordion-collapse text-start collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                                    <div className="py-2 px-0 accordion-body"> {d?.slug}</div>
                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>



                                <h2 className="title-blog-post mt-5">Recent Post</h2>
                                <ul className="latest-post-list">
                                    {blogList?.slice(0, 5)?.map((d,i) => {
                                        return (
                                            <li key={i} className="latest-post-box" onClick={() => handleRecentPost(d)}>
                                                <img src={d?.post_feature_image} alt="img" />
                                                <div className="post-box">
                                                    <p className="posted-date">{d?.post_created_date}</p>
                                                    <a
                                                        onClick={() => {
                                                            disptach(fetchSingleBlog(d?.post_id));
                                                        }}
                                                        className="post-title"
                                                    >
                                                        <h5 className="post-title">{d?.post_title}</h5>
                                                    </a>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BlogDetails;