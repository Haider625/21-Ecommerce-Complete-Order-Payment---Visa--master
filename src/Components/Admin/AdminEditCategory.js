import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import EditCategoryHook from '../../hook/category/edit-category-hook';
import avatar from '../../images/avatar.png';

const AdminEditCategory = () => {
    const { id } = useParams();
    const [name, img, onChangeName, onImageChange, onSubmit, loading] = EditCategoryHook(id);

    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4">تعديل بيانات التصنيف</div>
                <Col sm="8">
                    <div className="text-form pb-2">صورة التصنيف (انقر لتغيير الصورة)</div>
                    <div>
                        <label htmlFor="upload-photo">
                            <img
                                src={img}
                                alt="category preview"
                                onError={(e) => { e.target.onerror = null; e.target.src = avatar; }}
                                height="110px"
                                width="130px"
                                style={{ cursor: "pointer", objectFit: "cover", borderRadius: "8px", border: "2px dashed #979797" }}
                            />
                        </label>
                        <input
                            type="file"
                            name="photo"
                            onChange={onImageChange}
                            id="upload-photo"
                        />
                    </div>

                    <div className="text-form pb-2 mt-3">اسم التصنيف</div>
                    <input
                        onChange={onChangeName}
                        value={name}
                        type="text"
                        className="input-form d-block px-3"
                        placeholder="اسم التصنيف"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end ">
                    <button onClick={onSubmit} className="btn-save d-inline mt-3">
                        حفظ التعديلات
                    </button>
                </Col>
            </Row>

            <ToastContainer />
        </div>
    );
};

export default AdminEditCategory;
