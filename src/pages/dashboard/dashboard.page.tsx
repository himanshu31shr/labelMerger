import React, { useEffect } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    CircularProgress,
} from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
} from 'recharts';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProducts } from '../../store/slices/productsSlice';
import { fetchOrders } from '../../store/slices/ordersSlice';
import { HiddenProducts } from './components/hiddenProducts';
import { ProductSummary } from '../../pages/home/services/base.transformer';

// Mock data for demonstration
const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 2000 },
    { name: 'Apr', sales: 2780 },
    { name: 'May', sales: 1890 },
    { name: 'Jun', sales: 2390 },
];

const orderData = [
    { name: 'Mon', orders: 24 },
    { name: 'Tue', orders: 13 },
    { name: 'Wed', orders: 98 },
    { name: 'Thu', orders: 39 },
    { name: 'Fri', orders: 48 },
    { name: 'Sat', orders: 38 },
    { name: 'Sun', orders: 43 },
];

export const DashboardPage = () => {
    const dispatch = useAppDispatch();
    const { items: products, loading: productsLoading } = useAppSelector(state => state.products);
    const { items: orders, loading: ordersLoading } = useAppSelector(state => state.orders);

    useEffect(() => {
        dispatch(fetchProducts({}));
        dispatch(fetchOrders());
    }, [dispatch]);

    const totalOrders = orders.length;
    const activeOrders = orders.filter(order => order.product?.visibility === 'visible').length;
    const totalProducts = products.length;
    const revenue = orders.reduce((sum, order: ProductSummary) => {
        const price = order.product?.sellingPrice || 0;
        const quantity = parseInt(order.quantity) || 0;
        return sum + (price * quantity);
    }, 0);

    if (productsLoading || ordersLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Orders
                            </Typography>
                            <Typography variant="h5">{totalOrders}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Active Orders
                            </Typography>
                            <Typography variant="h5">{activeOrders}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Products
                            </Typography>
                            <Typography variant="h5">{totalProducts}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Revenue
                            </Typography>
                            <Typography variant="h5">₹{revenue.toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Charts */}
            <Grid container spacing={3}>
                {/* <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Sales Overview
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="sales" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Daily Orders
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={orderData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid> */}
                <Grid item xs={12} md={12} lg={12}>
                    <Typography variant="h6" gutterBottom>
                        Hidden Products
                    </Typography>
                    <HiddenProducts />
                </Grid>
            </Grid>
        </Box>
    );
}; 