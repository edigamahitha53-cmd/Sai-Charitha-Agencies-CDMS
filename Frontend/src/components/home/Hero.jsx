import "../../assets/styles/hero.css";

function Hero() {
  return (
    <section className="hero-section">

      <div className="container-fluid">

        <div className="row align-items-center">

          {/* Left Side */}

          <div className="col-lg-6 hero-left">

            <h5 className="welcome-text">
              WELCOME TO
            </h5>

            <h1 className="company-title">
              Sai Charitha <br />
              Agencies
            </h1>

            <p className="hero-description">
              Your trusted chocolate distribution partner.
              Delivering premium chocolates to retail shops with
              quality, reliability and fast service.
            </p>

            <div className="hero-buttons">

              <button className="shop-btn">
                Shop Now
              </button>

              <button className="product-btn">
                View Products
              </button>

            </div>

          </div>

          {/* Right Side */}

          <div className="col-lg-6 text-center">

            <img
              src="/images/hero.jpg"
              alt="Chocolate Banner"
              className="hero-image"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;