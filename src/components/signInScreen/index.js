import React, { useState } from "react";
import styles from "./signIn.module.css";
import Icon from "../../images/password_icon.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
// import axios from "axios";
// import { API_BASE_URL } from "../../util/AxiosURL";
import apiHit from "../../util/AxiosURL";
import Swal from "sweetalert2";
// import Cookies from "js-cookie";
library.add(fab);

const SignIn = () => {
  const navigate = useNavigate();
  const [emailData, setEmailData] = useState("");
  const [pwdData, setPwdData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCreateAccount = () => {
    let storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      Swal.fire({
        icon: "warning",
        title: "Already Logged In!",
        text: "You are already logged in!",
        confirmButtonText: "OK",
        position: "center",
        confirmButtonColor: "#F6C90E",
      });
      navigate("/userProfile");
    } else {
      navigate("/createAccount");
    }
  };

  // const apiHit = axios.create({
  //   baseURL: API_BASE_URL
  // });

 
  const handleSubmit = async () => {
      setIsLoading(true);
      console.log(emailData, pwdData);
      await apiHit
        .post("/login", {
          email: emailData,
          password: pwdData,
        })
        .then((res) => {
          console.log("res.data =", res.data);
          if (res.data) {
            localStorage.setItem("userToken", res.data.token);
            setEmailData("");
            setPwdData("");
            setTimeout(() => {
              setIsLoading(false);
              navigate("/userProfile");
            }, 3000);
          }
        })
        .catch((err) => {
          console.log("Post Error in logging user:\n", err);
          Swal.fire({
            icon: "error",
            title: "Aah Shit! Something went wrong!",
            text: `${err.response.data}`,
            confirmButtonText: "OK",
            position: "center",
            confirmButtonColor: "red",
          });
          setIsLoading(false);
        });
  };
  
  return (
    <main className={styles["signIn_loader_div"]}>
      {isLoading ? (
        <div className={styles["custom-loader"]}></div>
      ) : (
        <main className={styles["signIn_main_div"]}>
          <h1>USER LOGIN</h1>
          <div className={styles["input_main_div"]}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Write your email here"
              onChange={(e) => setEmailData(e.target.value)}
            />
          </div>
          <div className={styles["input_main_div"]}>
            <label>Password</label>
            <div className={styles["password_image_div"]}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Write your password here"
                minLength={8}
                maxLength={16}
                onChange={(e) => setPwdData(e.target.value)}
              />
              <img src={Icon} alt="passwor_icon" onClick={togglePasswordVisibility} />
            </div>
          </div>

          <div className={styles["login_btn_div"]}>
            <button id={styles["login_btn"]} onClick={handleSubmit}>
              Login
            </button>
          </div>
          <section className={styles["social_btns_main_div"]}>
            <h3>or Connect With Social Media</h3>
            <div className={styles["social_btns_div"]}>
              <div className={styles["google_btn_div"]}>
                <img
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                  alt="google_icon"
                />
                <p>Sign in with Google </p>
              </div>
              <div className={styles["facebook_btn_div"]}>
                <FontAwesomeIcon
                  icon="fab fa-facebook-f"
                  style={{ color: "#ffffff", marginLeft: "10px" }}
                />
                <p>Sign in with Facebook </p>
              </div>
            </div>
          </section>
          <div className={styles["create_account_div"]}>
            <p>If you don't have an account, kindly create it</p>
            <button onClick={handleCreateAccount}>Create Account </button>
          </div>
        </main>
      )}
    </main>
  );
};

export default SignIn;
