import { Routes, Route } from 'react-router-dom';
import CreateMenuItem from '../../modules/CreateMenuItem';
import CreateRestaurant from '../../modules/CreateRestaurant';
import DetailedOrder from '../../modules/DetailedOrder';
import Orders from '../../modules/Orders';
import RestaurantMenu from '../../modules/RestaurantMenu';

const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<Orders />} />
            <Route path='order/:id' element={<DetailedOrder />} />
            <Route path='menu' element={<RestaurantMenu />} />
            <Route path='menu/create' element={<CreateMenuItem />} />
            <Route path='restaurant' element={<CreateRestaurant />} />
        </Routes>
    );
};

export default AppRoutes;