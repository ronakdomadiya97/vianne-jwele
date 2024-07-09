import React, { useEffect, useState } from "react";
import { GoChevronRight } from "react-icons/go";
import { useSelector, useDispatch } from 'react-redux';
import Aos from "aos";
import 'aos/dist/aos.css';
import moment from 'moment';
import { useParams, useRouter } from "next/navigation";
import { fetchPostsByCategory, fetchSingleBlog } from "@/src/redux/action/blogAction";
import CommonBanner from "@/src/Component/CommonBanner";

const BlogByCategory = ({id}) => {
    const navigate = useRouter();
    const disptach = useDispatch();
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // S
    const postByCategory = useSelector(state => state.blog.postByCategory);

    const ReadMore = (data) => {
        navigate.push('/blog-detail')
        disptach(fetchSingleBlog(data?.post_id))
    }
    useEffect(() => {
        Aos.init({
            duration: 1500,
            once: true
        });
        // 👇️ scroll to top on page load
        window.scrollTo(0, 0)

    }, [disptach]);

    useEffect(() => {
        disptach(fetchPostsByCategory(params?.id ? params?.id : id))
    }, [currentPage]);

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const renderPaginationNumbers = () => {
        const paginationNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            paginationNumbers.push(
                <li key={i}>
                    <a
                        className={`pagination-number ${currentPage === i ? 'active' : ''}`}
                        onClick={() => handlePageClick(i)}
                        style={{
                            textDecoration: 'none',
                            color: 'blue',
                            cursor: 'pointer'
                        }}
                    >
                        {i}
                    </a>
                </li>
            );
        }
        return paginationNumbers;
    };


    return (
        <div className="blog-page pb-5">
            <div className="container">
                <CommonBanner src={"/img/img/blog-banner.png"} />
                <div className="blog-row">
                    <div className="row">
                        {/* {console.log("postByCategory ====== ", postByCategory)} */}
                        {postByCategory?.posts?.length > 0 && postByCategory?.posts.map((d) => {
                            return (
                                <div className="col-md-4 mt-5 pt-4" key={i}>
                                    <div className="blog-data-box text-start">
                                        <img src={d?.post_feature_image} alt="img" className="w-100 object-fit-cover" style={{ height: '300px' }} loading="lazy"/>
                                        <p className="blog-date text-start pt-3">{moment(d?.post_created_date).format("DD MMMM")}</p>
                                        <p className="blog-sort-descrption text-start pt-3">{d?.post_title}</p>
                                        <p className="blog-descrption text-start mt-3">{d?.post_excerpt}</p>
                                        <button className="read-more mt-3" onClick={() => ReadMore(d)}>Read More</button>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>

                <div className="pagination-blog pt-5">
                    <ul className="d-flex align-items-center justify-content-center">
                        {renderPaginationNumbers()}
                        <li className="ps-4">
                            <GoChevronRight />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default BlogByCategory;