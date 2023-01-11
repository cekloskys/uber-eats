import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {

    const navigate = useNavigate();

    const menuItems = [
        {
            key: '/',
            label: 'Orders'
        },
        {
            key: 'menu',
            label: 'Restaurant Menu'
        },
        {
            key: 'restaurant',
            label: 'Create Restaurant'
        },
    ];

    const onMenuItemClick = (menuItem) => {
        navigate(menuItem.key);
    }

    return (
        <Menu items={menuItems} onClick={onMenuItemClick}/>
    );
};

export default SideMenu;