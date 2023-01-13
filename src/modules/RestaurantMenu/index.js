import { Card, Table, Button } from 'antd';
import { DataStore } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { useRestaurantContext } from '../../context/RestaurantContext';
import { Dish } from '../../models';
import { Link } from 'react-router-dom';

const RestaurantMenu = () => {

    const [dishes, setDishes] = useState([]);
    const { restaurant } = useRestaurantContext();

    useEffect(() => {
        if (!restaurant?.id) {
            return;
        }
        DataStore.query(Dish, d => d.restaurantID.eq(restaurant.id)).then(setDishes);
    }, [restaurant?.id]);

    const tableColumns = [
        {
            title: 'Menu Item',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `$${price}`
        },
        {
            title: 'Action',
            key: 'action',
            render: () => <Button danger type='primary'>Remove</Button>
        }
    ];

    const renderNewItemButton = () => {
        return (
            <Link to={'create'}>
                <Button type='primary'>New Item</Button>
            </Link>
        );
    };

    return (
        <Card title={'Menu'} style={{margin: 20}} extra={renderNewItemButton()}>
            <Table 
                dataSource={dishes}
                columns={tableColumns}
                rowKey='id'
            />
        </Card>
    );
};

export default RestaurantMenu;