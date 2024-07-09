import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import insta from '../../public/img/img/about-1.png';
import insta2 from '../../public/img/img/about-2.png';
import insta3 from '../../public/img/img/about-3.png';
import insta4 from '../../public/img/img/about-4.png';
import collection from '../../public/img/img/collection-4.jpg';
import collection1 from '../../public/img/img/collection-5.jpg';
import { useDispatch, useSelector } from "react-redux";
import { getInstagranPost } from "../redux/action/homeAction";

const instaList = [
    {
        src: insta
    },
    {
        src: insta2
    },
    {
        src: insta3
    },
    {
        src: insta4
    },
    {
        src: collection
    },
    {
        src: collection1
    },
    {
        src: collection
    },
    {
        src: collection1
    }
];
const Instagram = () => {
    const dispatch=useDispatch();
    const instagramList = useSelector(state => state.home.instagramList);

    useEffect(() =>{
        dispatch(getInstagranPost())
    },[]);

    const bannerSlider = {
        dots: false,
        arrows: false,
        autoplay: true,
        centerMode: true,
        centerPadding: '150px',
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerPadding: '80px',
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerPadding: '50px',
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerMode: false,
                    centerPadding: 0
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                    centerPadding: 0
                },
            },
        ],
    };
    return (
        <div className="instagram p-4">
            <div className="container">
                <div className="d-sm-flex d-block align-items-center justify-content-between">
                    <h3 className="instagram-title">Follow Us On Instagram</h3>
                    <a href="https://www.instagram.com/viannejewels" className="instagram-title instagram-id" target="_blank">@VianneJewels</a>
                </div>
            </div>
            <div className="mt-5">
                <Slider {...bannerSlider}>
                    {instagramList?.filter(m => m?.media_type !== 'VIDEO')?.slice([0], [10])?.map((item,i) => {
                        return (
                            <div key={i}>
                                <img src={item?.media_url} style={{ height: 270, objectFit: 'unset', width: '100%' }} alt="img" />
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </div>
    )
}
export default Instagram;