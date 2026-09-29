import React from 'react'
import { Col } from 'react-bootstrap'
import rate from "../../images/rate.png";
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ProductCardHook from './../../hook/products/product-card-hook';

const ProductCard = ({ item, favProd }) => {
    const [removeToWishListData, addToWishListData, handelFav, favImg] = ProductCardHook(item, favProd)

    const formatPrice = (price) => {
        if (!price && price !== 0) return '0';
        return Number(price).toLocaleString('en-US');
    };

    const hasDiscount = item.priceAfterDiscount && item.priceAfterDiscount >= 1 && item.priceAfterDiscount < item.price;
    const discountPercent = hasDiscount ? Math.round(((item.price - item.priceAfterDiscount) / item.price) * 100) : 0;

    return (
        <Col xs="6" sm="6" md="4" lg="3" className="d-flex mb-3">
            <div className="product-card-custom w-100">
                <div className="product-card-img-wrapper">
                    <Link to={`/products/${item._id}`} style={{ width: '100%', height: '100%' }}>
                        <img 
                            className="product-card-img" 
                            src={item.imageCover} 
                            alt={item.title || "ساعة مِزْوَلَة"} 
                        />
                    </Link>

                    <button 
                        onClick={handelFav} 
                        className="product-card-fav-btn"
                        title="إضافة للمفضلة"
                    >
                        <img src={favImg} alt="fav" style={{ width: "18px", height: "18px" }} />
                    </button>

                    {hasDiscount && (
                        <div className="product-card-discount-badge">
                            خصم {discountPercent}%
                        </div>
                    )}
                </div>

                <div className="product-card-info">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <Link to={`/products/${item._id}`} style={{ textDecoration: 'none' }}>
                            <h6 className="product-card-title" title={item.title}>
                                {item.title}
                            </h6>
                        </Link>
                        <div className="product-card-rating">
                            <img src={rate} alt="rate" width="13px" height="13px" />
                            <span>{item.ratingsAverage || 0}</span>
                        </div>
                    </div>

                    <div className="product-card-price-box">
                        {hasDiscount ? (
                            <div className="d-flex align-items-baseline flex-wrap">
                                <span className="product-price-current">
                                    {formatPrice(item.priceAfterDiscount)} <small>دينار عراقي</small>
                                </span>
                                <span className="product-price-old">
                                    {formatPrice(item.price)}
                                </span>
                            </div>
                        ) : (
                            <div className="d-flex align-items-baseline">
                                <span className="product-price-current">
                                    {formatPrice(item.price)} <small>دينار عراقي</small>
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Col>
    )
}

export default ProductCard
