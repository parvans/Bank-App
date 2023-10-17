import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [AdminlogIn, setAdminLogIn] = useState(false);
  const [data, setData] = React.useState([]);
  const navigate = useNavigate();
  var url = "http://localhost:8000";

  useEffect(() => {
    if (localStorage.getItem("Admin")) {
      setAdminLogIn(true);
    }
    if (!localStorage.getItem("Admin")) {
      navigate("/");
    }
    axios.get(url + "/api/user/profiles").then((response) => {
      setData(response.data);
    }, []);
  }, []);
  const logOut = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      {AdminlogIn && (
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-3">
              <Button variant="danger" onClick={logOut}>
                Logout
              </Button>
            </div>
            <div className="col-md-6 m-3">
              <Button variant="success" onClick={() => navigate("/admin/register")}>
                New Admin
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">Address</th>
                    <th scope="col">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr>
                      <td>{item.Name}</td>
                      <td>{item.Email}</td>
                      <td>{item.PhoneNumber}</td>
                      <td>{item.Dob}</td>
                      <td>{item.Address}</td>
                      <td>{item.Balance} ₹</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div> )}
    </div>
  );
}
