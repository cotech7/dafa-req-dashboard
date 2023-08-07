import { useState } from "react";
import axios from "axios";

const UserData = ({ users, token }) => {
  const [showAlert, setShowAlert] = useState(false);

  const showSuccessAlertAndReload = () => {
    setShowAlert(true);

    window.location.reload();
  };
  const acceptRequests = async (id, user_id, utrNumber, amount, token) => {
    try {
      // let token = await login();
      let data = JSON.stringify({
        uid: user_id,
        balance: amount,
        withdraw_req_id: id,
        remark: "sat",
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
        "https://adminapi.bestlive.io/api/app-user/action/deposit-balance",
        data,
        config
      );
      if (response.status !== 200) {
        throw new Error("Request failed with status: " + response.status);
      } else if (response.data.status === 1) {
        // console.log(response.data);
        alert("success");
        showSuccessAlertAndReload();
        // processUTRNumber(utrNumber, amount);
      } else {
        throw new Error("Invalid response data format");
      }
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  return (
    <>
      {users.map((user) => {
        const {
          id,
          username,
          user_id,
          account_number,
          ifsc_code,
          utr_number,
          amount,
          balance,
          pl_balance,
        } = user;

        return (
          <tr key={id}>
            <td>{username}</td>
            <td>{account_number}</td>
            <td>{ifsc_code}</td>
            <td>{utr_number}</td>
            <td>{amount}</td>
            {/* <td>{balance}</td> */}
            {/* <td>{pl_balance}</td> */}
            <td>
              <button
                className="action-button"
                onClick={() =>
                  acceptRequests(id, user_id, utr_number, amount, token)
                }
              >
                Accept
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
};
export default UserData;
