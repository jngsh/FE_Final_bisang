import { Link, useParams } from "react-router-dom";

export default function Dashboard() {
  const userId = localStorage.getItem("userId");

  return (
    <div className="col-lg-9">
      <div className="page-content my-account__dashboard">
        <p>
          Hello <strong>{userId}</strong> (not <strong>{userId}?</strong>
          <Link to="/login_register">Log out</Link>)
        </p>
        <p>
          From your account dashboard you can view your
          <Link className="unerline-link" to={`/account_orders/${userId}`}>
            recent orders
          </Link>
          , manage your
          <Link className="unerline-link" to={`/account_edit_address/${userId}`}>
            shipping and billing addresses
          </Link>
          , and
          <Link className="unerline-link" to={`/account_edit/${userId}`}>
            edit your password and account details.
          </Link>
        </p>
      </div>
    </div>
  );
}
