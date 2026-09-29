import React, { useState, useEffect } from 'react'
import { Col, Row, Spinner, Card, Modal, Button } from 'react-bootstrap'
import AddCategoryHook from '../../hook/category/add-category-hook'
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, deleteCategory } from '../../redux/actions/categoryAction';
import { Link } from 'react-router-dom';
import deleteicon from '../../images/delete.png';
import editicon from '../../images/edit.png';
import avatar from '../../images/avatar.png';
import notify from '../../hook/useNotifaction';

const cleanCategoryImageUrl = (url) => {
    if (!url) return avatar;
    if (typeof url === 'string' && url.includes('/categories/http')) {
        const parts = url.split('/categories/');
        return parts[parts.length - 1];
    }
    return url;
};

const AdminAddCategory = () => {
    const [img, name, loading, isPress, handelSubmit, onImageChange, onChangeName] = AddCategoryHook();
    const dispatch = useDispatch();

    // Fetch all categories
    useEffect(() => {
        dispatch(getAllCategory(100));
    }, [loading]);

    const categories = useSelector(state => state.allCategory.category);

    // Delete Modal State
    const [showDelete, setShowDelete] = useState(false);
    const [selectedCatId, setSelectedCatId] = useState('');
    const [selectedCatName, setSelectedCatName] = useState('');

    const handleCloseDelete = () => {
        setShowDelete(false);
        setSelectedCatId('');
        setSelectedCatName('');
    };

    const handleShowDelete = (id, catName) => {
        setSelectedCatId(id);
        setSelectedCatName(catName);
        setShowDelete(true);
    };

    const confirmDelete = async () => {
        if (selectedCatId) {
            await dispatch(deleteCategory(selectedCatId));
            setShowDelete(false);
            notify("تم حذف التصنيف بنجاح", "success");
            dispatch(getAllCategory(100));
        }
    };

    return (
        <div>
            {/* Delete Confirmation Modal */}
            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header>
                    <Modal.Title><div className='font'>تأكيد الحذف</div></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='font'>
                        هل أنت متأكد من حذف التصنيف ({selectedCatName})؟
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        تراجع
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        حذف نهائي
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add Category Form */}
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4">إدارة التصنيفات - إضافة تصنيف جديد</div>
                <Col sm="8">
                    <div className="text-form pb-2">صورة التصنيف</div>
                    <div>
                        <label htmlFor="upload-photo">
                            <img
                                src={img}
                                alt="category preview"
                                height="100px"
                                width="120px"
                                style={{ cursor: "pointer", objectFit: "cover", borderRadius: "8px", border: "1px solid #ddd" }}
                            />
                        </label>
                        <input
                            type="file"
                            name="photo"
                            onChange={onImageChange}
                            id="upload-photo"
                        />
                    </div>

                    <input
                        onChange={onChangeName}
                        value={name}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="اسم التصنيف"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end ">
                    <button onClick={handelSubmit} className="btn-save d-inline mt-2">
                        حفظ التصنيف
                    </button>
                </Col>
            </Row>

            {
                isPress ? loading ? <Spinner animation="border" variant="primary" /> : null : null
            }

            {/* List and Management of current categories */}
            <Row className="mt-5">
                <div className="admin-content-text pb-3">
                    قائمة التصنيفات الحالية ({categories && categories.data ? categories.data.length : 0})
                </div>
                <Col sm="12">
                    <Row>
                        {
                            categories && categories.data && categories.data.length > 0 ? (
                                categories.data.map((cat, index) => (
                                    <Col key={cat._id || index} xs="6" sm="4" md="3" className="mb-3">
                                        <Card className="p-2 h-100 shadow-sm border-0 position-relative" style={{ borderRadius: "10px", backgroundColor: "#ffffff" }}>
                                            
                                            {/* Action Buttons: Edit and Delete */}
                                            <div className="d-flex justify-content-between align-items-center mb-1 px-1">
                                                <Link to={`/admin/editcategory/${cat._id}`} style={{ textDecoration: 'none' }} title="تعديل">
                                                    <div className="d-flex align-items-center" style={{ cursor: "pointer" }}>
                                                        <img src={editicon} alt="edit" width="15px" height="15px" />
                                                        <span className="ms-1" style={{ fontSize: "12px", color: "#666" }}>تعديل</span>
                                                    </div>
                                                </Link>

                                                <div 
                                                    onClick={() => handleShowDelete(cat._id, cat.name)} 
                                                    className="d-flex align-items-center" 
                                                    style={{ cursor: "pointer" }}
                                                    title="حذف"
                                                >
                                                    <img src={deleteicon} alt="delete" width="14px" height="15px" />
                                                    <span className="ms-1" style={{ fontSize: "12px", color: "#e11d48" }}>حذف</span>
                                                </div>
                                            </div>

                                            <div style={{ height: "90px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <img 
                                                    src={cleanCategoryImageUrl(cat.image)} 
                                                    alt={cat.name} 
                                                    onError={(e) => { e.target.onerror = null; e.target.src = avatar; }}
                                                    style={{ maxHeight: "80px", maxWidth: "100%", objectFit: "contain", borderRadius: "8px" }} 
                                                />
                                            </div>
                                            <Card.Body className="p-2 text-center">
                                                <Card.Title style={{ fontSize: "14px", fontWeight: "bold", color: "#333", margin: 0 }}>
                                                    {cat.name}
                                                </Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <p className="text-muted">لا توجد تصنيفات حالياً</p>
                            )
                        }
                    </Row>
                </Col>
            </Row>

            <ToastContainer />
        </div>
    )
}

export default AdminAddCategory
