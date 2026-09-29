import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import ViewProductsDetalisHook from './../../hook/products/view-products-detalis-hook';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';

import AddToCartHook from './../../hook/cart/add-to-cart-hook';

const ProductText = () => {
  const { id } = useParams();
  const [item, images, cat, brand] = ViewProductsDetalisHook(id);
  const [colorClick, indexColor, addToCartHandel] = AddToCartHook(id, item)

  const colors = item.availableColors || item.colors || [];

  return (
    <div>
      <Row className="mt-2">
        <div className="cat-text">{cat ? cat.name : ''} :</div>
      </Row>
      <Row>
        <Col md="8">
          <div className="cat-title d-inline">
            {item.title}
            <div className="cat-rate d-inline mx-3">{item.ratingsAverage}</div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md="8" className="mt-1 d-flex">
          {
            colors && colors.length > 0 ? (colors.map((color, index) => {
              return (<div
                key={index}
                onClick={() => colorClick(index, color)}
                className="color ms-2"
                style={{ backgroundColor: color, border: indexColor === index ? '3px solid black' : 'none' }}></div>)
            })) : null
          }

          <div className="cat-text d-inline">الكمية المتاحة : {item.quantity} </div>

        </Col>
      </Row>

      <Row className="mt-4">
        <div className="cat-text">المواصفات :</div>
      </Row>
      <Row className="mt-2">
        <Col md="10">
          <div className="product-description d-inline">
            {item.description}
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md="12">
          {item.priceAfterDiscount >= 1 ? (
            <div className="product-price d-inline px-3 py-3 border">
              <span style={{ textDecorationLine: 'line-through' }}> {Number(item.price).toLocaleString()}</span> {Number(item.priceAfterDiscount).toLocaleString()} دينار عراقي
            </div>) : <div className="product-price d-inline px-3 py-3 border"><span> {Number(item.price).toLocaleString()}</span> دينار عراقي </div>
          }
          <div onClick={addToCartHandel} className="product-cart-add px-3 py-3 d-inline mx-3">اضف للعربة</div>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  )
}

export default ProductText
