import "../../assets/styles/recentorders.css";

function RecentOrders() {

  return (

    <div className="recent-orders">

      <h3>Recent Orders</h3>

      <table>

        <thead>

          <tr>

            <th>Order ID</th>

            <th>Shop</th>

            <th>Date</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          <tr>

            <td>ORD001</td>

            <td>Sri Lakshmi Stores</td>

            <td>31-07-2026</td>

            <td>Delivered</td>

          </tr>

          <tr>

            <td>ORD002</td>

            <td>Sai Super Market</td>

            <td>31-07-2026</td>

            <td>Pending</td>

          </tr>

        </tbody>

      </table>

    </div>

  );

}

export default RecentOrders;