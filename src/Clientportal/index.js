import { useState } from "react";
import Product from "./Product"
import WrapperContainer from "./WrapperContainer";
import Orders from "./Orders";
import Settings from "./Settings";
import { useSelector, useDispatch } from 'react-redux';
import DashBoard from "./Dashboard";
import AddToCart from "./AddToCart";
import WhishList from "./WhishList";
import Products from "./Products";

const Clientportal = () => {
    const disptach = useDispatch();
    const [isSelectedProd, setIsSelectedProd] = useState(false);
    const [selectedItem, setSelectedItem] = useState('dashboard');
    const [subCategoryId, setSubCategoryId] = useState("");
    const [isCategory, setIsCategory] = useState(false);
    const [categoryId, setCategoryId] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [categoryName, setcategoryName] = useState("");
    const userDetails = useSelector(state => state.home.userDetails);

    
    
    const renderMiddleComponent = () => {
        switch (selectedItem) {
            case 'dashboard':
                return <DashBoard setIsSelectedProd={setIsSelectedProd}
                isSelectedProd={isSelectedProd}/>;
            case 'category':
                return (
                    <Product
                        userDetails={userDetails}
                        subCategoryId={subCategoryId}
                        categoryId={categoryId?.id}
                        categoryName={categoryId?.name}
                        selectedItem={selectedItem}
                        category={categoryName}
                        setIsSelectedProd={setIsSelectedProd}
                        isSelectedProd={isSelectedProd}
                    />
                );
            case 'products':
                return (<Products userDetails={userDetails} subCategoryId={subCategoryId} categoryId={categoryId?.id} categoryName={categoryId?.name} selectedItem={selectedItem} setIsSelectedProd={setIsSelectedProd}
                    isSelectedProd={isSelectedProd}/>);
            case 'orders':
                return (
                    <div className={`order-page-client p-1 pb-0`}>
                        <Orders userDetails={userDetails} selectedItem={selectedItem} />
                    </div>);
            case 'whishlist':
                return (
                    <div className={`order-page-client p-1 pb-0`}>
                        <WhishList userDetails={userDetails} selectedItem={selectedItem} />
                    </div>);
            case 'addtocart':
                return (
                    <div className={`order-page-client p-3 pb-0`}>
                        <AddToCart userDetails={userDetails} selectedItem={selectedItem} />
                    </div>);
            case 'settings':
                return (
                    <div className={`profile-page p-1`}>
                        <Settings userDetails={userDetails} selectedItem={selectedItem} />
                    </div>);
            default:
                return null;
        }
    };

    return (
        <WrapperContainer
            handleSideClick={setSelectedItem}
            setIsSelectedProd={setIsSelectedProd}
            setSidebarOpen={setSidebarOpen}
            sidebarOpen={sidebarOpen}
            setSubCategoryId={setSubCategoryId}
            setcategoryName={setcategoryName}
            categoryId={categoryId?.id}
            categoryName={categoryId?.name}
            setCategoryId={setCategoryId} selectedItem={selectedItem}>
            {renderMiddleComponent()}
        </WrapperContainer>
    )
}

export default Clientportal