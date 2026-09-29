import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getOneCategory, updateCategory } from '../../redux/actions/categoryAction';
import notify from './../useNotifaction';
import avatar from '../../images/avatar.png';

const EditCategoryHook = (id) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [img, setImg] = useState(avatar);
    const [name, setName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(true);

    const oneCategory = useSelector(state => state.allCategory.oneCategory);

    useEffect(() => {
        const get = async () => {
            setLoadingData(true);
            await dispatch(getOneCategory(id));
            setLoadingData(false);
        };
        get();
    }, [id]);

    useEffect(() => {
        if (loadingData === false) {
            if (oneCategory && oneCategory.data) {
                setName(oneCategory.data.name || '');
                let catImg = oneCategory.data.image;
                if (catImg && typeof catImg === 'string' && catImg.includes('/categories/http')) {
                    const parts = catImg.split('/categories/');
                    catImg = parts[parts.length - 1];
                }
                setImg(catImg || avatar);
            }
        }
    }, [loadingData, oneCategory]);

    const onChangeName = (event) => {
        event.persist();
        setName(event.target.value);
    };

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImg(URL.createObjectURL(event.target.files[0]));
            setSelectedFile(event.target.files[0]);
        }
    };

    const onSubmit = async (event) => {
        if (event) event.preventDefault();
        if (name === "") {
            notify("من فضلك أدخل اسم التصنيف", "warn");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        if (selectedFile) {
            formData.append("image", selectedFile);
        }

        setLoading(true);
        await dispatch(updateCategory(id, formData));
        setLoading(false);
    };

    const res = useSelector(state => state.allCategory.updateCategory);

    useEffect(() => {
        if (loading === false) {
            if (res && (res.status === 200 || res.status === 201)) {
                notify("تم تعديل التصنيف بنجاح", "success");
                setTimeout(() => {
                    navigate('/admin/addcategory');
                }, 1000);
            } else {
                notify("فشل تعديل التصنيف", "error");
            }
        }
    }, [loading, res, navigate]);

    return [name, img, onChangeName, onImageChange, onSubmit, loading];
};

export default EditCategoryHook;
