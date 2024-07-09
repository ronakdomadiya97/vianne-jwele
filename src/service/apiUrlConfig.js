const apiUrl="https://api.viannejewels.com/wp-json/custom/v1/"

const url = {
    apiUrl,
  };
const urlEndPoints = {
    login: 'login-check',
    category:'woocommerce/categories',
    allProduct:'products',
    post:'posts',
    allBlogs: 'posts',
    blog: 'post',
    postCategories: 'post-categories',
    productByCategory: 'products-by-category',
    getSingleProduct:'product',
    bookingAppointment: 'insert-appointment',
    product: 'product',
    relatedProducts: 'related-products',
    productInquiry: 'inquiry-product',
    comment: 'write-comment',
    categoryProdcuts: 'products-by-category',
    singleProductVariation: 'single-product',
    subCategory:'woocommerce/category',
    productFilters:'product-filters',
    filteredProducts:'filtered-products',
    // subCategory:'category',
    userDetail: 'user-details',
    userOrder: 'user-orders',
    addToCartItems:'add_cart_items',
    getCartItems:'get_cart_items',
    register: 'add-user-register',
    contactForm: 'contact-form',
    postsByCategory: 'posts-by-category',
    delete_cart_items: 'delete_cart_items',
    post_by_comments: 'post-comments'
};

export {url,urlEndPoints}