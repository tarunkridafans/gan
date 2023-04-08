import React, { useState, useEffect } from "react";
import "./CharitiesDashboard.scss";
import { db } from "../../firebase-config";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CharitiesDashboard({ user }) {
  const [donations, setDonations] = useState();

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
  return (
    <div className="view">
      <h2>Charities Dashboard</h2>
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
                    {`${new Date(
                      item["createdAt"]?.["seconds"] * 1000
                    ).toDateString()}
                    ${new Date(item["createdAt"]?.["seconds"] * 1000)
                      .toLocaleTimeString()
                      .slice(0, -3)}`}
                  </td>
                  <td>{item["assigned"] ? "Approved" : "NA"}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default CharitiesDashboard;
