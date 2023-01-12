import { Menu } from 'antd';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { useRestaurantContext } from '../../context/RestaurantContext';

const SideMenu = () => {

    const navigate = useNavigate();
    const { restaurant } = useRestaurantContext();

    const mainMenuItems = [
        {
            key: '/',
            label: 'Orders'
        },
        {
            key: 'menu',
            label: 'Restaurant Menu'
        },
    ];

    const menuItems = [
        ...(restaurant ? mainMenuItems: []),
        {
            key: 'restaurant',
            label: 'Create Restaurant'
        },
        {
            key: 'signout',
            label: 'Sign Out',
        },
    ];

    const onMenuItemClick = async (menuItem) => {
        if (menuItem.key === 'signout'){
            await Auth.signOut();
            window.location.reload();
        } else {
            navigate(menuItem.key);
        }        
    }

    return (
        <>
            {restaurant && (<h2>{restaurant.name}</h2>)}
            <Menu items={menuItems} onClick={onMenuItemClick}/>
        </>
    );
};

export default SideMenu;