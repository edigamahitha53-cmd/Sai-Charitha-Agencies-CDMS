import "../../assets/styles/brands.css";

function Brands() {

    const brands = [
        {
            name: "Galaxy",
            image: "/images/galaxy.png",
            description: "Premium milk chocolate loved by everyone."
        },
        {
            name: "Boomer",
            image: "/images/boomer.png",
            description: "Delicious chewing gum with exciting flavors."
        },
        {
            name: "Orbit",
            image: "/images/orbit.png",
            description: "Sugar-free chewing gum for fresh breath."
        },
        {
            name: "Snickers",
            image: "/images/snickers.png",
            description: "Chocolate bar packed with peanuts and caramel."
        }
    ];

    return (

        <section className="brands-section" id="brands">

            <div className="container">

                <div className="text-center">

                    <h2 className="brands-title">
                        Our Premium Brands
                    </h2>

                    <p className="brands-subtitle">
                        We distribute world-class chocolates and confectionery products to retail stores.
                    </p>

                </div>

                <div className="row">

                    {brands.map((brand, index) => (

                        <div className="col-lg-3 col-md-6 mb-4" key={index}>

                            <div className="brand-card">

                                <img
                                    src={brand.image}
                                    alt={brand.name}
                                    className="brand-image"
                                />

                                <h4>{brand.name}</h4>

                                <p>{brand.description}</p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}

export default Brands;