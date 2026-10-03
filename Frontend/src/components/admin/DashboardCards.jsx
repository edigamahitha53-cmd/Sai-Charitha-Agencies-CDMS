import "../../assets/styles/dashboardcards.css";

function DashboardCards() {
  const cards = [
    {
      title: "Total Products",
      value: 120,
      icon: "bi bi-box-seam-fill",
    },
    {
      title: "Total Shops",
      value: 18,
      icon: "bi bi-shop",
    },
    {
      title: "Available Stock",
      value: 4200,
      icon: "bi bi-bar-chart-fill",
    },
    {
      title: "Total Orders",
      value: 156,
      icon: "bi bi-cart-fill",
    },
  ];

  return (
    <div className="dashboard-cards">

      {cards.map((card, index) => (
        <div className="dashboard-card" key={index}>

          <div className="card-top">

            <div>
              <p className="card-title">{card.title}</p>
              <h2 className="card-value">{card.value}</h2>
            </div>

            <div className="card-icon">
              <i className={card.icon}></i>
            </div>

          </div>

        </div>
      ))}

    </div>
  );
}

export default DashboardCards;