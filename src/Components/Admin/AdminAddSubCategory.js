import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import AddSubcategoryHook from './../../hook/subcategory/add-subcategory-hook';
import { getOneCategory } from '../../redux/actions/subcategoryAction';

const AdminAddSubCategory = () => {
    const [id, name, loading, category, subcategory, handelChange, handelSubmit, onChangeName] = AddSubcategoryHook();
    const dispatch = useDispatch();

    useEffect(() => {
        if (id && id !== "0") {
            dispatch(getOneCategory(id));
        }
    }, [id, loading]);

    const subcategoryState = useSelector(state => state.subCategory.subcategory);

    // Find selected category name
    const selectedCategoryName = category && category.data ? category.data.find(cat => cat._id === id)?.name : '';

    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4">إدارة التصنيفات الفرعية - إضافة تصنيف فرعي جديد</div>
                <Col sm="8">
                    <select name="category" id="cat" className="select mt-2 px-2 w-100" onChange={handelChange}>
                        <option value="0">اختر تصنيف رئيسي</option>
                        {
                            category.data ? (category.data.map(item => {
                                return (<option key={item._id} value={item._id}>{item.name}</option>)
                            })) : null
                        }
                    </select>

                    <input
                        value={name}
                        onChange={onChangeName}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="اسم التصنيف الفرعي الجديد"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end ">
                    <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">حفظ التصنيف الفرعي</button>
                </Col>
            </Row>

            {/* List of subcategories for selected category */}
            <Row className="mt-5">
                <Col sm="8">
                    <div className="admin-content-text pb-2">
                        {id && id !== "0"
                            ? `التصنيفات الفرعية التابعة لـ (${selectedCategoryName || 'التصنيف المختار'}):`
                            : "اختر تصنيفاً رئيسياً من القائمة لعرض تصنيفاته الفرعية"}
                    </div>

                    {id && id !== "0" ? (
                        <div className="d-flex flex-wrap gap-2 mt-3 p-3 bg-white rounded shadow-sm border">
                            {subcategoryState && subcategoryState.data && subcategoryState.data.length > 0 ? (
                                subcategoryState.data.map((sub, index) => (
                                    <span 
                                        key={sub._id || index} 
                                        className="badge bg-dark p-2 fs-6 m-1" 
                                        style={{ fontWeight: "normal" }}
                                    >
                                        {sub.name}
                                    </span>
                                ))
                            ) : (
                                <p className="text-muted m-0 p-2">لا توجد تصنيفات فرعية مسجلة لهذا التصنيف حالياً</p>
                            )}
                        </div>
                    ) : null}
                </Col>
            </Row>

            <ToastContainer />
        </div>
    )
}

export default AdminAddSubCategory
