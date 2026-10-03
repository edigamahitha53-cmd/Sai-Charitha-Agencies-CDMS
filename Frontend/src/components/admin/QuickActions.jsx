import "../../assets/styles/quickactions.css";

function QuickActions() {
  const actions = [
    {
      title: "Add Brand",
      icon: "bi bi-tags-fill",
    },
    {
      title: "Add Product",
      icon: "bi bi-box-seam-fill",
    },
    {
      title: "Add Shop",
      icon: "bi bi-shop",
    },
    {
      title: "Update Stock",
      icon: "bi bi-boxes",
    },
  ];

  return (
    <div className="quick-actions">

      <h3>⚡ Quick Actions</h3>

      <div className="action-grid">

        {actions.map((action, index) => (

          <div className="action-card" key={index}>

            <div className="action-icon">
              <i className={action.icon}></i>
            </div>

            <h5>{action.title}</h5>

          </div>

        ))}

      </div>

    </div>
  );
}

export default QuickActions;