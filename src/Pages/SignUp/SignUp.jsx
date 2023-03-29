import "./SignUp.scss";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { toast } from "react-toastify";

function SignUp() {
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let role = localStorage.getItem("role");
    if (!role) {
      navigate("/");
    }
    setRole(role);
  }, []);

  const onChangeHandler = (e) => {
    const latest = {};
    latest[e.target.name] = e.target.value;
    setSignupForm((prev) => {
      return { ...prev, ...latest };
    });
  };

  const signupHandler = () => {
    console.log(signupForm);
    createUserWithEmailAndPassword(auth, signupForm.email, signupForm.password)
      .then((cred) => {
        console.log(cred);
        toast.success("Signed Up Successully");
        navigate("/login");

        setDoc(doc(db, "users", cred.user.uid), {
          ...signupForm,
          role: localStorage.getItem("role"),
        })
          .then((data) => {
            console.log("data", data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Sorry could not sign you up\n${err.message}`);
      });
  };
  return (
    <div className="signup">
      <div className="header">
        <span>Home /</span>{" "}
        {role?.charAt(0).toLocaleUpperCase() + role?.substring(1)} Signup Page
      </div>
      <div className="form">
        <div>
          <span>User Name</span>
          <input name="name" onChange={onChangeHandler} type="text" />
        </div>
        <div>
          <span>Email ID</span>
          <input name="email" onChange={onChangeHandler} type="text" />
        </div>
        <div>
          <span>Mobile Number</span>
          <input name="phone" onChange={onChangeHandler} type="text" />
        </div>
        <div>
          <span>Address</span>
          <input name="address" onChange={onChangeHandler} type="text" />
        </div>
        <div>
          <span>Password</span>
          <input name="password" onChange={onChangeHandler} type="password" />
        </div>
        <div>
          <span>Confirm Password</span>
          <input
            name="confirmPassword"
            onChange={onChangeHandler}
            type="password"
          />
        </div>
        {/* <div>
          <span>City</span>
          <input name="city" onChange={onChangeHandler} type="text" />
        </div>
        <div>
          <span>State</span>
          <input name="state" onChange={onChangeHandler} type="text" />
        </div>
        <div>
          <span>Zip Code</span>
          <input name="zip" onChange={onChangeHandler} type="text" />
        </div>
        <div>
          <span>Type of Donor</span>
          <select
            name="donor"
            value={signupForm?.["donor"]}
            onChange={onChangeHandler}
          >
            <option>Farm</option>
            <option>Grocery</option>
            <option>Restaurant</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <span>Cuisine </span>
          <select
            name="cuisine"
            value={signupForm?.["cuisine"]}
            onChange={onChangeHandler}
          >
            <option>American</option>
            <option>Bakery</option>
            <option>Coffe Shop</option>
            <option>Japaneese</option>
            <option>Mexican</option>
            <option>French</option>
            <option>Other</option>
          </select>
        </div> */}
        <div className="signup-button">
          <button onClick={signupHandler}>Register</button>
        </div>
        <span className="last">
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
}

export default SignUp;
