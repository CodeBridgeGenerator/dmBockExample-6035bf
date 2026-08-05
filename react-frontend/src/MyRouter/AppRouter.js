import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SingleProductsPage from "../components/app_components/ProductsPage/SingleProductsPage";
import ProductProjectLayoutPage from "../components/app_components/ProductsPage/ProductProjectLayoutPage";
import SingleCategoryPage from "../components/app_components/CategoryPage/SingleCategoryPage";
import CategoryProjectLayoutPage from "../components/app_components/CategoryPage/CategoryProjectLayoutPage";
import SingleOrdersPage from "../components/app_components/OrdersPage/SingleOrdersPage";
import OrderProjectLayoutPage from "../components/app_components/OrdersPage/OrderProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
<Route path="/products/:singleProductsId" exact element={<SingleProductsPage />} />
<Route path="/products" exact element={<ProductProjectLayoutPage />} />
<Route path="/category/:singleCategoryId" exact element={<SingleCategoryPage />} />
<Route path="/category" exact element={<CategoryProjectLayoutPage />} />
<Route path="/orders/:singleOrdersId" exact element={<SingleOrdersPage />} />
<Route path="/orders" exact element={<OrderProjectLayoutPage />} />
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>{/* ~cb-add-protected-route~ */}</Route>
        </Routes>
    );
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);
