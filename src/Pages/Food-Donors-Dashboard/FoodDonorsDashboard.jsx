import React, { useEffect, useState } from "react";
import "./FoodDonorsDashboard.scss";
import { auth } from "../../firebase-config";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { GrCircleInformation } from "react-icons/gr";
import { doc, setDoc, getDoc, orderBy } from "firebase/firestore";
import { db } from "../../firebase-config";
import { serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const formInitialData = {
  donationName: "food",
  type_of_food: "",
  oldFood: "",
  address: "",
  specialNote: "",
};

const changePasswordFormInitialData = {
  password: "",
  newPassword: "",
  confirmPassword: "",
};
function FoodDonorsDashboard({ user }) {
  const [donations, setDonations] = useState();
  const [donateForm, setDonateForm] = useState(formInitialData);
  const [donateNow, setDonateNow] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [changePasswordForm, setChangePasswordForm] = useState(
    changePasswordFormInitialData
  );
  const [currentDonation, setCurrentDonation] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [charityInfo, setCharityInfo] = useState(null);

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
      where("donorUid", "==", user.uid),
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
  const onChangeHandler = (e) => {
    const latest = {};
    latest[e.target.name] = e.target.value;
    setDonateForm((prev) => {
      return { ...prev, ...latest };
    });
  };

  const donateHandler = () => {
    if (!isDonateFormValid()) {
      return;
    }
    const docData = {
      donationName: donateForm["donationName"],
      type_of_food: donateForm["type_of_food"],
      oldFood: donateForm["oldFood"],
      address: donateForm["address"],
      specialNote: donateForm["specialNote"],
      donorEmail: user.email,
      donorUid: user.uid,
      assigned: false,
      createdAt: serverTimestamp(),
    };

    console.log("doc data", docData);
    setDoc(doc(db, "donations", uuidv4()), docData)
      .then((data) => {
        toast.success("Donation Successfull");

        setCurrentDonation(docData);
        console.log("data", data);
      })
      .catch((err) => {
        console.log(err);
      });

    setDonateForm(formInitialData);
  };

  const isDonateFormValid = () => {
    if (!donateForm?.["donationName"]) {
      toast.error("Select a donation name");
      return false;
    }
    if (!donateForm?.["type_of_food"]) {
      toast.error("Select a type of food");
      return false;
    }
    if (!donateForm?.["oldFood"]) {
      toast.error("Enter how old food is");
      return false;
    }
    if (!donateForm?.["address"]) {
      toast.error("Enter an address");
      return false;
    }

    return true;
  };

  const sideNavHandler = (flag) => {
    setCurrentDonation(null);
    setShowChangePassword(false);
    setDonateNow(flag);
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

  const changePasswordOnChangeHandler = (e) => {
    const latest = {};
    latest[e.target.name] = e.target.value;
    setChangePasswordForm((prev) => {
      return { ...prev, ...latest };
    });
  };

  const changePasswordSideNavHandler = () => {
    setCurrentDonation(null);
    setDonateNow(false);
    setShowChangePassword(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const infoClickHandler = (donation) => {
    console.log("donation", donation["donatedTo"]);
    getCharityDetails(donation["donatedTo"]);
    setShowModal(true);
  };

  const getCharityDetails = async (id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    setCharityInfo(docSnap.data());
    console.log("user", docSnap.data());
  };

  const donationUpdateHandler = async (donation) => {
    console.log(donation);
    const docRef = doc(db, "donations", donation.id);
    try {
      await updateDoc(docRef, { donatedStatus: true });
      toast.success(`Updated Donated Status`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="donors-page">
      <div className="side-nav">
        <span
          onClick={() => sideNavHandler(true)}
          className={`${(donateNow || currentDonation) && "active"}`}
        >
          Donate Now
        </span>
        <span
          onClick={() => sideNavHandler(false)}
          className={`${
            !donateNow && !currentDonation && !showChangePassword && "active"
          }`}
        >
          Your donations
        </span>
        <span
          onClick={() => changePasswordSideNavHandler(true)}
          className={`${showChangePassword && "active"}`}
        >
          Change Password
        </span>
      </div>
      <div className="main">
        {donateNow && !currentDonation && (
          <div className="form">
            <h2>Donate Now</h2>
            <div className="field">
              <label>Donation Name </label>
              <select
                name="donationName"
                value={donateForm?.["donationName"]}
                onChange={onChangeHandler}
              >
                <option value="food">Food</option>
              </select>
            </div>
            <div className="radio-buttons">
              <input
                type="radio"
                id="non-veg"
                name="type_of_food"
                value="non-veg"
                onChange={onChangeHandler}
              />
              <label htmlFor="non-veg">Non-veg food</label>
              <input
                type="radio"
                id="veg"
                name="type_of_food"
                value="veg"
                onChange={onChangeHandler}
              />
              <label htmlFor="veg">Veg food</label>
              <input
                type="radio"
                id="both"
                name="type_of_food"
                value="both"
                onChange={onChangeHandler}
              />
              <label htmlFor="both">Both</label>
            </div>
            <div className="field">
              <label>How old food is? </label>
              <input
                type="text"
                name="oldFood"
                value={donateForm?.["oldFood"]}
                onChange={onChangeHandler}
              />
            </div>
            <div className="field">
              <label>Donation collection Address </label>
              <input
                type="text"
                name="address"
                value={donateForm?.["address"]}
                onChange={onChangeHandler}
              />
            </div>
            <div className="field">
              <label>Special Note</label>
              <textarea
                name="specialNote"
                rows="4"
                cols="50"
                onChange={onChangeHandler}
                value={donateForm?.["specialNote"]}
              ></textarea>
            </div>
            <button className="donate" onClick={donateHandler}>
              Donate Happiness
            </button>
          </div>
        )}
        {currentDonation && donateNow && (
          <div className="thank-you">
            <div>
              <h2>
                <span>Thank</span> you
              </h2>
              <span>Thanks for your support</span>

              <p>Thank You for the donation!</p>
            </div>

            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Donation Name</th>
                  <th>Donation Pickup Location</th>
                  <th>Special Note</th>
                  <th>Food Condition</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{1}</td>
                  <td>{currentDonation["donationName"]}</td>
                  <td>{currentDonation["address"]}</td>
                  <td>{currentDonation["specialNote"]}</td>
                  <td>{currentDonation["oldFood"]}</td>
                  <td
                    className={`${
                      currentDonation["assigned"] ? "green" : "red"
                    }`}
                  >
                    {currentDonation["assigned"]
                      ? "Approved"
                      : "Not yet Confirm"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {!donateNow && !showChangePassword && (
          <div className="view">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Donation Name</th>
                  <th>Donation Pickup Location</th>
                  <th>Special Note</th>
                  <th>Food Condition</th>
                  <th>Donation Date</th>
                  <th>Status</th>
                  <th>Donated Status</th>
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
                        <td>{item["address"]}</td>
                        <td>{item["specialNote"]}</td>
                        <td>{item["oldFood"]}</td>
                        <td>
                          {`${new Date(
                            item["createdAt"]?.["seconds"] * 1000
                          ).toDateString()}
                         ${new Date(item["createdAt"]?.["seconds"] * 1000)
                           .toLocaleTimeString()
                           .slice(0, -3)}`}
                        </td>
                        <td className={`${item["assigned"] ? "green" : "red"}`}>
                          {item["assigned"] ? (
                            <div>
                              Approved{" "}
                              <GrCircleInformation
                                onClick={() => infoClickHandler(item)}
                              />
                            </div>
                          ) : (
                            "Not yet Approved"
                          )}
                        </td>

                        <td>
                          {item["donatedStatus"] ? (
                            <span style={{ color: "green" }}> Donated</span>
                          ) : (
                            <button onClick={() => donationUpdateHandler(item)}>
                              Update{" "}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
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
      </div>
      {showModal && (
        <div className="modal">
          <button className="close" onClick={closeModalHandler}>
            {" "}
            Close
          </button>
          <div className="content">
            <span>Name: {charityInfo?.["name"]}</span>
            <span>Email: {charityInfo?.["email"]}</span>
            <span>Phone: {charityInfo?.["phone"]}</span>
            <span>Address: {charityInfo?.["address"]}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodDonorsDashboard;
