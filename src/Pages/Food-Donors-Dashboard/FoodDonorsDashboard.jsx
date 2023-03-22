import React, { useEffect, useState } from "react";
import "./FoodDonorsDashboard.scss";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
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

function FoodDonorsDashboard({ user }) {
  const [donations, setDonations] = useState();
  const [donateForm, setDonateForm] = useState(formInitialData);
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
      where("donorUid", "==", user.uid)
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
        console.log("data", data);
      })
      .catch((err) => {
        console.log(err);
      });

    setDonateForm(formInitialData);
  };

  // const updateStatusHandler = async (id) => {
  //   console.log("update", id);
  //   const docRef = doc(db, "donations", id);
  //   try {
  //     await updateDoc(docRef, { assigned: true });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const deleteHandler = async (id) => {
  //   console.log("delete", id);
  //   const docRef = doc(db, "donations", id);
  //   try {
  //     await deleteDoc(docRef);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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
  return (
    <div className="donors-page">
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
      <div className="view">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Donation Name</th>
              <th>Donation Pickup Location</th>
              <th>Special Note</th>
              <th>Donation Date</th>
              <th>Status</th>
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
                    <td>
                      {new Date(
                        item["createdAt"]?.["seconds"] * 1000
                      ).toDateString()}
                    </td>
                    <td>{item["assigned"] ? "Approved" : "NA"}</td>
                    {/* <th>
                      <button
                        onClick={() => {
                          updateStatusHandler(item.id);
                        }}
                      >
                        Update status
                      </button>
                    </th>
                    <th>
                      <button
                        onClick={() => {
                          deleteHandler(item.id);
                        }}
                      >
                        Delete Donation
                      </button>
                    </th> */}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FoodDonorsDashboard;
