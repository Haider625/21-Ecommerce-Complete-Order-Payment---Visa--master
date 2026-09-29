import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getOneProduct, getProductLike, getProductYouLike } from '../../redux/actions/productsAction';
import mobile from '../../images/mobile.png'
import { getOneCategory } from '../../redux/actions/categoryAction';
import { getOneBrand } from '../../redux/actions/brandAction';
const ViewProductsDetalisHook = (prodID) => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOneProduct(prodID))
    }, [])

    const oneProducts = useSelector((state) => state.allproducts.oneProduct)
    const oneCategory = useSelector((state) => state.allCategory.oneCategory)
    const oneBrand = useSelector((state) => state.allBrand.oneBrand)
    const productLike = useSelector((state) => state.allproducts.productLike)

    //to show products item
    let item = [];
    if (oneProducts && oneProducts.data)
        item = oneProducts.data;
    else
        item = []

    useEffect(() => {
        if (item && item.category) {
            if (typeof item.category === 'string') {
                dispatch(getOneCategory(item.category))
                dispatch(getProductLike(item.category))
            } else if (item.category._id) {
                dispatch(getOneCategory(item.category._id))
                dispatch(getProductLike(item.category._id))
            }
        }
        if (item && item.brand) {
            if (typeof item.brand === 'string') {
                dispatch(getOneBrand(item.brand))
            } else if (item.brand._id) {
                dispatch(getOneBrand(item.brand._id))
            }
        }
    }, [item])


    //to view images gallery
    let images = []
    if (item && item.images && item.images.length > 0)
        images = item.images.map((img) => { return { original: img } })
    else if (item && item.imageCover)
        images = [{ original: item.imageCover }]
    else {
        images = [{ original: `${mobile}` }]
    }


    //to show category item
    let cat = [];
    if (oneCategory && oneCategory.data)
        cat = oneCategory.data;
    else if (item && item.category && typeof item.category === 'object')
        cat = item.category;
    else
        cat = []

    //to show brand item
    let brand = [];
    if (oneBrand && oneBrand.data)
        brand = oneBrand.data;
    else if (item && item.brand && typeof item.brand === 'object')
        brand = item.brand;
    else
        brand = []

    let prod = []
    if (productLike && productLike.data)
        prod = productLike.data;
    else
        prod = []
    return [item, images, cat, brand, prod]
}

export default ViewProductsDetalisHook