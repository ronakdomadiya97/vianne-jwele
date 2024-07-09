const CommonBanner = ({ src }) => {
    return (
        <div className="common-banner" style={{ backgroundImage: `url(${src})` }}>
            <div className="row m-0 justify-content-end">
                <div className="col-lg-5 col-md-8 col-12">
                    <div className="common-banner-content text-start">
                        <h2 className="common-banner-title">Blog</h2>
                        {/* <p className="common-banner-descrption my-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CommonBanner;