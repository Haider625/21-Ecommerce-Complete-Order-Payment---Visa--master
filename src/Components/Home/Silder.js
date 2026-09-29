import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import mizwalaHero from '../../images/mizwala-hero.jpg';

const Silder = () => {
    return (
        <div
            className="watch-hero-banner"
            style={{ backgroundImage: `url(${mizwalaHero})` }}
        >
            <div className="watch-hero-overlay"></div>
            <Container>
                <div className="watch-hero-content">
                    <div className="watch-hero-badge">
                        <i className="fa-solid fa-gem"></i>
                        <span>براند مِزْوَلَة العراقي | MIZWALA</span>
                    </div>

                    <h1 className="watch-hero-title">
                        حيث تلتقي الدقة مع <span>تراث العراق</span>
                    </h1>

                    <p className="watch-hero-desc">
                        استمتع بوقتك، عِش أصالتك. نبتكر ساعات يد استثنائية بتصاميم مستوحاة من عراقة برج القشلة البغدادي، هيبة العگال العراقي، وجمال الخط العربي الأصيل.
                    </p>

                    <div className="d-flex flex-wrap align-items-center mb-3">
                        <Link to="/products" className="watch-hero-btn-primary">
                            استكشف الساعات الآن
                        </Link>
                        <Link to="/products" className="watch-hero-btn-secondary">
                            ساعة العگال والقشلة
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Silder;
