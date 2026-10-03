import "../../assets/styles/topbar.css";

function Topbar() {

    const adminName = "RK";

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="topbar">

            <div className="topbar-left">

                <h2>Dashboard</h2>

                <p>{today}</p>

            </div>

            <div className="topbar-right">

                <button className="notification-btn">

                    🔔

                </button>

                <div className="admin-profile">

                    <div className="profile-circle">

                        RK

                    </div>

                    <div>

                        <h5>{adminName}</h5>

                        <small>Administrator</small>

                    </div>

                </div>

            </div>

        </div>
    );

}

export default Topbar;