import React from 'react'
import HomeCategory from '../../Components/Home/HomeCategory';
import CardProductsContainer from '../../Components/Products/CardProductsContainer';
import NavBarLogin from '../../Components/Uitily/NavBarLogin';
import Silder from './../../Components/Home/Silder';
import Footer from '../../Components/Uitily/Footer';
import ViewHomeProductsHook from './../../hook/products/view-home-products-hook';
const HomePage = () => {

    const [items] = ViewHomeProductsHook();
    return (
        <div className='font' style={{ minHeight: '670px' }}>

            <Silder />
            <HomeCategory />
            <CardProductsContainer products={items} title="منتجاتنا" btntitle="عرض الكل " pathText="/products" />

        </div>
    )
}

export default HomePage
