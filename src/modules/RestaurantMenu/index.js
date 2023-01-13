import { Card, Table, Button, message, Popconfirm } from 'antd';
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

    const deleteDish = async (item) => {
        await DataStore.delete(Dish, d => d.id.eq(item.id));
        setDishes(dishes.filter((d) => d.id !== item.id));
        message.success('Dish deleted.')
    };

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
            render: (price) => `$${price.toFixed(2)}`
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, item) => (
                <Popconfirm
                    placement='topLeft'
                    title={'Are you sure you want to delete this dish?'}
                    onConfirm={() => deleteDish(item)}
                    okText='Yes'
                    cancelText='No'
                >
                    <Button danger type='primary'>Remove</Button>
                </Popconfirm> 
            )
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