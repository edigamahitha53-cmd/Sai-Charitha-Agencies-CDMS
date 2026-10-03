import "../../assets/styles/features.css";

function Features() {

    const features = [

        {
            icon: "🚚",
            title: "Fast Delivery",
            description: "We deliver chocolates quickly to every registered shop with reliable transportation."
        },

        {
            icon: "🍫",
            title: "Premium Quality",
            description: "We supply only genuine and high-quality chocolate brands from trusted companies."
        },

        {
            icon: "💰",
            title: "Best Wholesale Prices",
            description: "Affordable wholesale prices help retailers maximize their profits."
        },

        {
            icon: "📞",
            title: "24 × 7 Support",
            description: "Our support team is always available to help with orders and product inquiries."
        }

    ];

    return (

        <section className="features-section" id="features">

            <div className="container">

                <div className="text-center">

                    <h2 className="features-title">
                        Why Choose Sai Charitha Agencies?
                    </h2>

                    <p className="features-subtitle">
                        We provide quality products, fast delivery, and excellent customer service for every retailer.
                    </p>

                </div>

                <div className="row">

                    {

                        features.map((feature, index) => (

                            <div className="col-lg-3 col-md-6 mb-4" key={index}>

                                <div className="feature-card">

                                    <div className="feature-icon">
                                        {feature.icon}
                                    </div>

                                    <h4>{feature.title}</h4>

                                    <p>{feature.description}</p>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default Features;