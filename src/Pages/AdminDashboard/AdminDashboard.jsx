import React, { useEffect, useState } from "react";
import "./AdminDashboard.scss";
import {
  collection,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../firebase-config";

function AdminDashboard({ user }) {
  const [donations, setDonations] = useState();
  const [charities, setCharities] = useState();
  const [selectedCharity, setSelectedCharity] = useState(charities?.[0]);
  const [todaysDonation, setTodaysDonation] = useState(true);
  const [showDonors, setShowDonors] = useState(false);
  const [showCharities, setShowCharities] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    fetchDonations();
    fetchCharities();
  }, []);

  const fetchDonations = async () => {
    const colRef = collection(db, "donations");
    const q = query(colRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      let donations = [];
      snapshot.docs.forEach((doc) => {
        donations.push({ ...doc.data(), id: doc.id });
      });
      setDonations(donations);
    });
  };

  const fetchCharities = async () => {
    const q = query(collection(db, "users"), where("role", "==", "charity"));
    onSnapshot(q, (snapshot) => {
      let charities = [];
      snapshot.docs.forEach((doc) => {
        charities.push({ ...doc.data(), id: doc.id });
      });
      setCharities(charities);
    });
  };

  const onChangeHandler = (id, value) => {
    let latestobj = {};
    latestobj[id] = value;
    setSelectedCharity((prev) => {
      return { ...prev, ...latestobj };
    });
  };

  const updateStatusHandler = async (id) => {
    let charityName = selectedCharity?.[id];
    let charity = charities.find((charity) => {
      return charity["name"] == charityName;
    });
    if (!charity) {
      charity = charities[0];
    }
    const docRef = doc(db, "donations", id);
    try {
      await updateDoc(docRef, { assigned: true, donatedTo: charity["id"] });
      toast.success("Donation Assigned");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteHandler = async (id) => {
    const docRef = doc(db, "donations", id);
    try {
      await deleteDoc(docRef);
      toast.success("Donation Rejected");
    } catch (err) {
      console.error(err);
    }
  };

  const getCharityName = (id) => {
    let charity = charities?.find((charity) => {
      return charity["id"] == id;
    });
    return charity["name"];
  };

  const todayDonationHandler = () => {
    setTodaysDonation(true);
    let todaysDate = new Date();
    setDonations((prev) => {
      return prev.filter((item) => {
        let donationDate = new Date(item["createdAt"]["seconds"] * 1000);
        return (
          donationDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)
        );
      });
    });
  };

  const allDonationsHandler = () => {
    setTodaysDonation(false);
    setShowCharities(false);
    setShowDonors(false);
    fetchDonations();
  };

  const showDonorsHandler = () => {
    setTodaysDonation(false);
    setShowCharities(false);
    setShowDonors(true);
  };
  const showCharitiesHandler = () => {
    setTodaysDonation(false);
    setShowDonors(false);
    setShowCharities(true);
  };

  return (
    <div className="admin-dash">
      <div className="side-nav">
        <span
          onClick={todayDonationHandler}
          className={`${todaysDonation && "active"}`}
        >
          Todays Donations
        </span>
        <span
          onClick={allDonationsHandler}
          className={`${
            !todaysDonation && !showCharities && !showDonors && "active"
          }`}
        >
          All donations
        </span>
        <span
          onClick={showDonorsHandler}
          className={`${showDonors && "active"}`}
        >
          Donor Management
        </span>
        <span
          onClick={showCharitiesHandler}
          className={`${showCharities && "active"}`}
        >
          Charities Management
        </span>
      </div>
      <div className="main">
        {!showCharities && !showDonors && (
          <>
            <h2>AdminDashboard</h2>
            <div className="view">
              <h3>Pending Requests</h3>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Donation Name</th>
                    <th>Donation Pickup Location</th>
                    <th>Special Note</th>
                    <th>Donation Date</th>
                    <th>Status</th>
                    <th>Assign To</th>
                  </tr>
                </thead>
                <tbody>
                  {donations &&
                    donations.map((item, index) => {
                      return (
                        !item["assigned"] && (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item["donationName"]}</td>
                            <td>{item["address"]}</td>
                            <td>{item["specialNote"]}</td>
                            <td>
                              {`${new Date(
                                item["createdAt"]?.["seconds"] * 1000
                              ).toDateString()}
                    ${new Date(item["createdAt"]?.["seconds"] * 1000)
                      .toLocaleTimeString()
                      .slice(0, -3)}`}
                            </td>
                            <td>{item["assigned"] ? "Approved" : "NA"}</td>
                            <td>
                              {" "}
                              <select
                                onChange={(e) =>
                                  onChangeHandler(item.id, e.target.value)
                                }
                              >
                                {charities &&
                                  charities.map((charity) => {
                                    return <option>{charity["name"]}</option>;
                                  })}
                              </select>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  updateStatusHandler(item.id);
                                }}
                              >
                                Assign
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  deleteHandler(item.id);
                                }}
                              >
                                Reject Donation
                              </button>
                            </td>
                          </tr>
                        )
                      );
                    })}
                </tbody>
              </table>

              <h3>Accepted Requests</h3>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Donation Name</th>
                    <th>Donation Pickup Location</th>
                    <th>Special Note</th>
                    <th>Donation Date</th>
                    <th>Assigned To</th>
                  </tr>
                </thead>
                <tbody>
                  {donations &&
                    donations.map((item, index) => {
                      return (
                        item["assigned"] && (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item["donationName"]}</td>
                            <td>{item["address"]}</td>
                            <td>{item["specialNote"]}</td>
                            <td>
                              {`${new Date(
                                item["createdAt"]?.["seconds"] * 1000
                              ).toDateString()}
                    ${new Date(item["createdAt"]?.["seconds"] * 1000)
                      .toLocaleTimeString()
                      .slice(0, -3)}`}
                            </td>
                            {/* <td>{item["assigned"] ? "Approved" : "NA"}</td> */}
                            <td>{getCharityName(item["donatedTo"])}</td>
                          </tr>
                        )
                      );
                    })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {showDonors && <h1>Show Donors</h1>}
        {showCharities && <h1>Show Charities</h1>}
      </div>
    </div>
  );
}

export default AdminDashboard;
