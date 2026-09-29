import React, { useEffect, useState } from 'react';
import { Navbar, Container, FormControl, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../images/mizwala-logo.png';
import NavbarSearchHook from './../../hook/search/navbar-search-hook';
import GetAllUserCartHook from './../../hook/cart/get-all-user-cart-hook';
import { getProductWishList } from './../../redux/actions/wishListAction';

const NavBarLogin = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const [OnChangeSearch, searchWord] = NavbarSearchHook();
    let word = "";
    if (localStorage.getItem("searchWord") != null)
        word = localStorage.getItem("searchWord");

    const [user, setUser] = useState('');
    useEffect(() => {
        if (localStorage.getItem("user") != null)
            setUser(JSON.parse(localStorage.getItem("user")));
    }, []);

    const logOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser('');
    };

    // Cart items
    const [itemsNum] = GetAllUserCartHook();

    // Wishlist items
    useEffect(() => {
        if (localStorage.getItem("token") != null) {
            dispatch(getProductWishList());
        }
    }, [dispatch]);

    const favRes = useSelector(state => state.addToWishListReducer ? state.addToWishListReducer.allWishList : null);
    const favCount = favRes && favRes.data && Array.isArray(favRes.data) ? favRes.data.length : 0;

    // Active route helper
    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <Navbar className="sticky-top mizwala-navbar" variant="dark" expand="lg">
            <Container className="d-flex align-items-center justify-content-between">
                
                {/* Brand Logo & Name */}
                <Navbar.Brand className="p-0 m-0 me-3">
                    <Link to="/" className="mizwala-brand-link">
                        <img 
                            src={logo} 
                            className="mizwala-brand-logo" 
                            alt="براند مزولة للساعات" 
                        />
                        <div className="d-flex flex-column ms-2">
                            <span className="mizwala-brand-title">مِزْوَلَة</span>
                            <span className="mizwala-brand-sub">MIZWALA LUXURY</span>
                        </div>
                    </Link>
                </Navbar.Brand>

                {/* Mobile Toggle Button */}
                <Navbar.Toggle aria-controls="mizwala-navbar-nav" className="border-0 shadow-none text-light" />

                {/* Collapsible Content */}
                <Navbar.Collapse id="mizwala-navbar-nav" className="mt-2 mt-lg-0">
                    
                    {/* Primary Navigation Links */}
                    <Nav className="me-lg-3 my-2 my-lg-0 align-items-lg-center">
                        
                        {/* الرئيسية */}
                        <Nav.Link 
                            as={Link} 
                            to="/" 
                            className={`mizwala-nav-link ${isActive('/') ? 'active-link' : ''}`}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            <span>الرئيسية</span>
                        </Nav.Link>

                        {/* المنتجات */}
                        <Nav.Link 
                            as={Link} 
                            to="/products" 
                            className={`mizwala-nav-link ${isActive('/products') ? 'active-link' : ''}`}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="7"></circle>
                                <polyline points="12 9 12 12 13.5 13.5"></polyline>
                                <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.34a2 2 0 0 1 2 1.82l.35 3.83"></path>
                            </svg>
                            <span>المنتجات</span>
                        </Nav.Link>

                        {/* التصنيفات */}
                        <Nav.Link 
                            as={Link} 
                            to="/allcategory" 
                            className={`mizwala-nav-link ${isActive('/allcategory') ? 'active-link' : ''}`}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                            </svg>
                            <span>التصنيفات</span>
                        </Nav.Link>
                    </Nav>

                    {/* Search Bar */}
                    <div className="mizwala-search-box my-2 my-lg-0 mx-lg-auto">
                        <FormControl
                            value={word}
                            onChange={OnChangeSearch}
                            type="search"
                            placeholder="ابحث عن ساعة فاخرة..."
                            className="mizwala-search-input"
                            aria-label="Search"
                        />
                        <span className="mizwala-search-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </span>
                    </div>

                    {/* Action Items: Favorites, Cart, Account */}
                    <Nav className="ms-lg-3 my-2 my-lg-0 d-flex flex-row align-items-center justify-content-between justify-content-lg-end">
                        
                        {/* المفضلة */}
                        <Nav.Link 
                            as={Link} 
                            to="/user/favoriteproducts" 
                            className={`mizwala-action-link ${isActive('/user/favoriteproducts') ? 'active-action' : ''}`}
                            title="المفضلة"
                        >
                            <div className="position-relative d-inline-flex align-items-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                                {favCount > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill mizwala-badge">
                                        {favCount}
                                    </span>
                                )}
                            </div>
                            <span className="d-none d-sm-inline">المفضلة</span>
                        </Nav.Link>

                        {/* العربة */}
                        <Nav.Link 
                            as={Link} 
                            to="/cart" 
                            className={`mizwala-action-link ${isActive('/cart') ? 'active-action' : ''}`}
                            title="سلة المشتريات"
                        >
                            <div className="position-relative d-inline-flex align-items-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                                </svg>
                                {itemsNum > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill mizwala-badge">
                                        {itemsNum}
                                    </span>
                                )}
                            </div>
                            <span className="d-none d-sm-inline">السلة</span>
                        </Nav.Link>

                        {/* الحساب / تسجيل الدخول */}
                        {user !== '' ? (
                            <NavDropdown 
                                title={
                                    <span className="d-inline-flex align-items-center">
                                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#c8a252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-1">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        {user.name}
                                    </span>
                                } 
                                id="user-nav-dropdown"
                                className="mizwala-user-dropdown ms-1"
                            >
                                {user.role === "admin" ? (
                                    <NavDropdown.Item as={Link} to="/admin/allproducts">لوحة التحكم</NavDropdown.Item>
                                ) : (
                                    <NavDropdown.Item as={Link} to="/user/profile">الصفحة الشخصية</NavDropdown.Item>
                                )}
                                <NavDropdown.Item as={Link} to="/user/allorders">طلباتي</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/user/favoriteproducts">قائمة المفضلة</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logOut} as={Link} to="/" className="text-danger fw-bold">
                                    تسجيل خروج
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Link to="/login" className="mizwala-login-btn ms-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                    <polyline points="10 17 15 12 10 7"></polyline>
                                    <line x1="15" y1="12" x2="3" y2="12"></line>
                                </svg>
                                <span>دخول</span>
                            </Link>
                        )}

                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBarLogin;
