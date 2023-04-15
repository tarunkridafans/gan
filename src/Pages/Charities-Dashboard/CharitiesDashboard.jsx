import React, { useState, useEffect, useRef } from "react";
import "./CharitiesDashboard.scss";
import { db } from "../../firebase-config";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth } from "../../firebase-config";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BiEdit } from "react-icons/bi";
const changePasswordFormInitialData = {
  password: "",
  newPassword: "",
  confirmPassword: "",
};

function CharitiesDashboard({ user }) {
  const [donations, setDonations] = useState();
  const [todaysDonation, setTodaysDonation] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [changePasswordForm, setChangePasswordForm] = useState(
    changePasswordFormInitialData
  );
  const [currentDonation, setCurrentDonation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const name = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    // const colRef = collection(db, "donations");
    const q = query(
      collection(db, "donations"),
      where("donatedTo", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      let donations = [];
      snapshot.docs.forEach((doc) => {
        donations.push({ ...doc.data(), id: doc.id });
      });
      setDonations(donations);
    });
  };

  const allDonationsHandler = () => {
    setShowChangePassword(false);
    setTodaysDonation(false);
    fetchDonations();
  };

  const todayDonationHandler = () => {
    setShowChangePassword(false);
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

  const changePasswordOnChangeHandler = (e) => {
    const latest = {};
    latest[e.target.name] = e.target.value;
    setChangePasswordForm((prev) => {
      return { ...prev, ...latest };
    });
  };

  const changePasswordHandler = async () => {
    if (
      changePasswordForm["newPassword"] !==
      changePasswordForm["confirmPassword"]
    ) {
      toast.error("Passwords do not match");
    }
    try {
      let user = auth.currentUser;
      let credential = EmailAuthProvider.credential(
        user.email,
        changePasswordForm["password"]
      );
      console.log(
        credential,
        credential._getReauthenticationResolver,
        changePasswordForm["password"]
      );
      let res = await reauthenticateWithCredential(user, credential);
      if (res?.user) {
        await updatePassword(
          auth.currentUser,
          changePasswordForm["confirmPassword"]
        );
      }
      setChangePasswordForm(changePasswordFormInitialData);
      toast.success("Password Changed Succesfully");
    } catch (error) {
      console.error(error);
    }
  };

  const changePasswordSideNavHandler = () => {
    setShowChangePassword(true);
  };

  const updatePickUpHandler = async (donation) => {
    const docRef = doc(db, "donations", donation.id);
    try {
      await updateDoc(docRef, { pickUpStatus: true });
      toast.success(`Updated Pickup Status`);
    } catch (err) {
      console.error(err);
    }
  };

  const editStatusHandler = (item) => {
    console.log(item);
    setCurrentDonation(item);
    setShowModal(true);
  };
  const closeModalHandler = () => {
    setShowModal(false);
    setCurrentDonation(null);
  };

  const statusClickHandler = async (e) => {
    const docRef = doc(db, "donations", currentDonation.id);
    console.log(e.target.value);
    try {
      await updateDoc(docRef, { charityStatus: e.target.value });
      toast.success(`Updated Pickup Status`);
    } catch (err) {
      console.error(err);
    }
    setShowModal(false);
    setCurrentDonation(null);
  };

  const getDonorName = (id) => {
    const docRef = doc(db, "users", id);
    let n;
    let name = (async () => {
      const docSnap = await getDoc(docRef);
      n = docSnap.data()?.name;
      return docSnap.data()?.name;
    })();
    console.log("name outside", n, name);

    let p = 5;
    name.then((res) => {
      p = res;
      console.log(p, res);
    });
    console.log("outside", p);
    return p;
  };

  return (
    <div className="charity-dash">
      <div className="side-nav">
        <span
          className={`${!showChangePassword && !todaysDonation && "active"}`}
          onClick={allDonationsHandler}
        >
          All donations
        </span>
        <span
          className={`${!showChangePassword && todaysDonation && "active"}`}
          onClick={todayDonationHandler}
        >
          Todays Donations
        </span>
        <span
          onClick={() => changePasswordSideNavHandler(true)}
          className={`${showChangePassword && "active"}`}
        >
          Change Password
        </span>
      </div>
      <div className="main">
        {!showChangePassword && (
          <>
            <h2>Charities Dashboard</h2>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Donation Name</th>
                  <th>Donor Name</th>
                  <th>Donation Pickup Location</th>
                  <th>Special Note</th>
                  <th>Donation Date</th>
                  <th>Status</th>
                  <th>Picked Up Status</th>
                </tr>
              </thead>
              <tbody>
                {donations &&
                  donations.map((item, index) => {
                    // console.log("item", index, item);

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item["donationName"]}</td>
                        <td>{item["donorName"]}</td>
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
                        {/* <td>
                          {item["pickUpStatus"] ? (
                            <span style={{ color: "green" }}>Picked Up</span>
                          ) : (
                            <button
                              onClick={() => {
                                updatePickUpHandler(item);
                              }}
                            >
                              Update
                            </button>
                          )}
                        </td> */}
                        <td style={{ display: "flex", alignItems: "center" }}>
                          {item?.["charityStatus"]
                            ? item?.["charityStatus"]
                            : "Edit"}
                          {item?.["charityStatus"] === "Donated" || (
                            <BiEdit
                              onClick={() => editStatusHandler(item)}
                              style={{ cursor: "pointer", marginLeft: "5px" }}
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </>
        )}
        {showChangePassword && (
          <div className="change-password">
            <div>
              <span>Current Password</span>
              <input
                name="password"
                onChange={changePasswordOnChangeHandler}
                type="password"
              />
            </div>
            <div>
              <span>New Password</span>
              <input
                name="newPassword"
                onChange={changePasswordOnChangeHandler}
                type="password"
              />
            </div>
            <div>
              <span>Confirm Password</span>
              <input
                name="confirmPassword"
                onChange={changePasswordOnChangeHandler}
                type="password"
              />
            </div>
            <button onClick={changePasswordHandler}> Change Password</button>
          </div>
        )}
        {showModal && (
          <div className="modal">
            <button className="close" onClick={closeModalHandler}>
              {" "}
              Close
            </button>
            <div className="content">
              <button value="Picked Up" onClick={statusClickHandler}>
                Picked Up
              </button>
              <button value="Donated" onClick={statusClickHandler}>
                Donated
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CharitiesDashboard;
