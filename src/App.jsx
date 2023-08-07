import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import UserData from "./components/UserData.jsx";
import "./App.css";

const API = "https://jsonplaceholder.typicode.com/users";

const App = () => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState();

  const login = async () => {
    try {
      let data = JSON.stringify({
        username: "Wuwexchange",
        password: "Qwer@1234",
        systemId: 10034,
        // username: "Dafaexch9",
        // password: "Piou1234",
        // systemId: 10001,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        headers: {
          authority: "adminapi.bestlive.io",
          accept: "application/json, text/plain, */*",
          "accept-language": "en-IN,en;q=0.9,mr;q=0.8,lb;q=0.7",
          "cache-control": "no-cache, no-store",
          "content-type": "application/json",
          encryption: "false",
        },
        data: data,
      };
      const response = await axios.post(
        "https://adminapi.bestlive.io/api/login",
        data,
        config
      );
      if (response.status !== 200) {
        response_value = {
          success: false,
          message: response.status,
        };
      } else {
        // console.log(response.data);
        setToken(response.data.data.token);
        return response.data.data.token;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      let token = await login();
      // console.log(token);
      let data = JSON.stringify({
        type: "",
        nType: "deposit",
        start_date: "",
        end_date: "",
        isFirst: 1,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        headers: {
          authority: "adminapi.bestlive.io",
          accept: "application/json, text/plain, */*",
          "accept-language": "en-IN,en;q=0.9,mr;q=0.8,lb;q=0.7",
          authorization: `Bearer ${token}`,
          "cache-control": "no-cache, no-store",
          "content-type": "application/json",
          encryption: "false",
        },
        data: data,
      };
      const response = await axios.post(
        "https://adminapi.bestlive.io/api/bank-account/request",
        data,
        config
      );
      setUsers(response.data.data);
      // console.log(response.data.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div>
        <button
          className="action-button"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Account No.</th>
              <th>IFSC Code</th>
              <th>UTR No.</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <UserData users={users} token={token} />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;