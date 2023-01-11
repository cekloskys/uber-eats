import { Card, Table, Tag } from 'antd';
import orders from '../../data/dashboard/orders.json';
import { useNavigate } from 'react-router-dom';

const Orders = () => {

    const navigate = useNavigate();

    const renderOrderStatus = (orderStatus) => {
        let color = '';

        if (orderStatus === 'Accepted') {
            color = 'green';
        } else if (orderStatus === 'Pending') {
            color = 'orange';
        } else {
            color = 'red';
        }

        return <Tag color={color}>{orderStatus}</Tag>
    }

    const tableColumns = [
        {
            title: 'Id',
            dataIndex: 'orderID',
            key: 'orderID',
        },
        {
            title: 'Delivery Address',
            dataIndex: 'deliveryAddress',
            key: 'deliveryAddress',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `$${price}`
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
                    onClick: () => navigate(`order/${order.orderID}`)
                })}
            />
        </Card>
    );
};

export default Orders;