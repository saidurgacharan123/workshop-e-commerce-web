import { jwtDecode } from "jwt-decode";
import ConfigProductList from "./config-product-list";
import ProductList from "./product-list";

const Product=()=>{
    let token= localStorage.getItem("token");
    let tokenData=jwtDecode(token);
    
    return <>{tokenData?.role?.toLowerCase()==="admin"?<ConfigProductList/>:<ProductList/>}</>
}

export default Product;