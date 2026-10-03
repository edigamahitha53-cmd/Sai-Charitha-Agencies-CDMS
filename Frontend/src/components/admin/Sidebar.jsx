
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../assets/styles/sidebar.css";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin-login");
  };

  return (
    <aside className="sidebar">

      {/* Company Header */}
      <div className="sidebar-header">

        <div className="company-logo">
          <span>SA</span>
        </div>

        <h2>Sai Charitha Agencies</h2>

        <p>Chocolate Distribution Management System</p>

      </div>

      {/* Navigation */}
      <ul className="sidebar-menu">

        <li>
          <Link
            to="/admin-dashboard"
            className={
              location.pathname === "/admin-dashboard"
                ? "active"
                : ""
            }
          >
            <span>🏠</span>
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/admin/brands"
            className={
              location.pathname === "/admin/brands"
                ? "active"
                : ""
            }
          >
            <span>🍫</span>
            Brands
          </Link>
        </li>

        <li>
          <Link
            to="/admin/products"
            className={
              location.pathname === "/admin/products"
                ? "active"
                : ""
            }
          >
            <span>📦</span>
            Products
          </Link>
        </li>

        <li>
          <Link
            to="/admin/stock"
            className={
              location.pathname === "/admin/stock"
                ? "active"
                : ""
            }
          >
            <span>📊</span>
            Stock
          </Link>
        </li>

        <li>
          <Link
            to="/admin/shops"
            className={
              location.pathname === "/admin/shops"
                ? "active"
                : ""
            }
          >
            <span>🏪</span>
            Shops
          </Link>
        </li>

        <li>
          <Link
            to="/admin/orders"
            className={
              location.pathname === "/admin/orders"
                ? "active"
                : ""
            }
          >
            <span>🛒</span>
            Orders
          </Link>
        </li>

        <li>
          <Link
            to="/admin/reports"
            className={
              location.pathname === "/admin/reports"
                ? "active"
                : ""
            }
          >
            <span>📈</span>
            Reports
          </Link>
        </li>

        <li>
          <Link
            to="/admin/settings"
            className={
              location.pathname === "/admin/settings"
                ? "active"
                : ""
            }
          >
            <span>⚙️</span>
            Settings
          </Link>
        </li>

      </ul>

      {/* Logout */}
      <div className="logout">

        <button
          onClick={handleLogout}
          type="button"
        >
          🚪 Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
