import { useState, useEffect } from 'react';
import { Card, Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DataStore } from 'aws-amplify';
import { Order } from '../../models'; // look at index.js in this folder
import { useRestaurantContext } from '../../context/RestaurantContext';

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const { restaurant } = useRestaurantContext();

    useEffect(() => {
        if (!restaurant){
            return;
        }
        // DataStore.query(Order).then(setOrders);
        DataStore.query(Order, (order) =>
            order.orderRestaurantId.eq(restaurant.id)).then(setOrders);
    }, [restaurant]);

    // console.log(orders);

    const navigate = useNavigate();

    const renderOrderStatus = (orderStatus) => {
        const statusToColor = {
            PENDING: 'blue',
            COMPLETED: 'green',
            ACCEPTED: 'orange',
            DECLINED: 'red',
        }

        return <Tag color={statusToColor[orderStatus]}>{orderStatus}</Tag>
    }

    const tableColumns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Price',
            dataIndex: 'total',
            key: 'total',
            render: (total) => `$${total.toFixed(2)}`
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: renderOrderStatus
        },
    ];

    return (
        <Card title='Orders' style={{margin: 20}}>
            <Table 
                dataSource={orders}
                columns={tableColumns}
                rowKey='orderID'
                onRow={(order) => ({
                    onClick: () => navigate(`order/${order.id}`)
                })}
            />
        </Card>
    );
};

export default Orders;