import React, { useState } from "react";
import styles from "./createAccount.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faContactBook } from "@fortawesome/free-solid-svg-icons";
import apiHit from "../../util/AxiosURL";
// import axios from "axios";
// import cityOptions from "cities.json";

const SignUp = () => {

  // const apiHit = axios.create({
  //   baseURL: process.env.API_BASE_URL
  // });

  const countryOptions = [
    { value: "Afghanistan", label: "Afghanistan" },
    { value: "Åland Islands", label: "Åland Islands" },
    { value: "Albania", label: "Albania" },
    { value: "Algeria", label: "Algeria" },
    { value: "American Samoa", label: "American Samoa" },
    { value: "Andorra", label: "Andorra" },
    { value: "Angola", label: "Angola" },
    { value: "Anguilla", label: "Anguilla" },
    { value: "Antarctica", label: "Antarctica" },
    { value: "Antigua and Barbuda", label: "Antigua and Barbuda" },
    { value: "Argentina", label: "Argentina" },
    { value: "Armenia", label: "Armenia" },
    { value: "Aruba", label: "Aruba" },
    { value: "Australia", label: "Australia" },
    { value: "Austria", label: "Austria" },
    { value: "Azerbaijan", label: "Azerbaijan" },
    { value: "Bahamas", label: "Bahamas" },
    { value: "Bahrain", label: "Bahrain" },
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "Barbados", label: "Barbados" },
    { value: "Belarus", label: "Belarus" },
    { value: "Belgium", label: "Belgium" },
    { value: "Belize", label: "Belize" },
    { value: "Benin", label: "Benin" },
    { value: "Bermuda", label: "Bermuda" },
    { value: "Bhutan", label: "Bhutan" },
    { value: "Bolivia", label: "Bolivia" },
    { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
    { value: "Botswana", label: "Botswana" },
    { value: "Bouvet Island", label: "Bouvet Island" },
    { value: "Brazil", label: "Brazil" },
    {
      value: "British Indian Ocean Territory",
      label: "British Indian Ocean Territory",
    },
    { value: "Brunei Darussalam", label: "Brunei Darussalam" },
    { value: "Bulgaria", label: "Bulgaria" },
    { value: "Burkina Faso", label: "Burkina Faso" },
    { value: "Burundi", label: "Burundi" },
    { value: "Cambodia", label: "Cambodia" },
    { value: "Cameroon", label: "Cameroon" },
    { value: "Canada", label: "Canada" },
    { value: "Cape Verde", label: "Cape Verde" },
    { value: "Cayman Islands", label: "Cayman Islands" },
    { value: "Central African Republic", label: "Central African Republic" },
    { value: "Chad", label: "Chad" },
    { value: "Chile", label: "Chile" },
    { value: "China", label: "China" },
    { value: "Christmas Island", label: "Christmas Island" },
    { value: "Cocos (Keeling) Islands", label: "Cocos (Keeling) Islands" },
    { value: "Colombia", label: "Colombia" },
    { value: "Comoros", label: "Comoros" },
    { value: "Congo", label: "Congo" },
    {
      value: "Congo, The Democratic Republic of The",
      label: "Congo, The Democratic Republic of The",
    },
    { value: "Cook Islands", label: "Cook Islands" },
    { value: "Costa Rica", label: "Costa Rica" },
    { value: "Cote D'ivoire", label: "Cote D'ivoire" },
    { value: "Croatia", label: "Croatia" },
    { value: "Cuba", label: "Cuba" },
    { value: "Curaçao", label: "Curaçao" },
    { value: "Cyprus", label: "Cyprus" },
    { value: "Czech Republic", label: "Czech Republic" },
    { value: "Denmark", label: "Denmark" },
    { value: "Djibouti", label: "Djibouti" },
    { value: "Dominica", label: "Dominica" },
    { value: "Dominican Republic", label: "Dominican Republic" },
    { value: "Ecuador", label: "Ecuador" },
    { value: "Egypt", label: "Egypt" },
    { value: "El Salvador", label: "El Salvador" },
    { value: "Equatorial Guinea", label: "Equatorial Guinea" },
    { value: "Eritrea", label: "Eritrea" },
    { value: "Estonia", label: "Estonia" },
    { value: "Ethiopia", label: "Ethiopia" },
    {
      value: "Falkland Islands (Malvinas)",
      label: "Falkland Islands (Malvinas)",
    },
    { value: "Faroe Islands", label: "Faroe Islands" },
    { value: "Fiji", label: "Fiji" },
    { value: "Finland", label: "Finland" },
    { value: "France", label: "France" },
    { value: "French Guiana", label: "French Guiana" },
    { value: "French Polynesia", label: "French Polynesia" },
    {
      value: "French Southern Territories",
      label: "French Southern Territories",
    },
    { value: "Gabon", label: "Gabon" },
    { value: "Gambia", label: "Gambia" },
    { value: "Georgia", label: "Georgia" },
    { value: "Germany", label: "Germany" },
    { value: "Ghana", label: "Ghana" },
    { value: "Gibraltar", label: "Gibraltar" },
    { value: "Greece", label: "Greece" },
    { value: "Greenland", label: "Greenland" },
    { value: "Grenada", label: "Grenada" },
    { value: "Guadeloupe", label: "Guadeloupe" },
    { value: "Guam", label: "Guam" },
    { value: "Guatemala", label: "Guatemala" },
    { value: "Guernsey", label: "Guernsey" },
    { value: "Guinea", label: "Guinea" },
    { value: "Guinea-bissau", label: "Guinea-bissau" },
    { value: "Guyana", label: "Guyana" },
    { value: "Haiti", label: "Haiti" },
    {
      value: "Heard Island and Mcdonald Islands",
      label: "Heard Island and Mcdonald Islands",
    },
    {
      value: "Holy See (Vatican City State)",
      label: "Holy See (Vatican City State)",
    },
    { value: "Honduras", label: "Honduras" },
    { value: "Hong Kong", label: "Hong Kong" },
    { value: "Hungary", label: "Hungary" },
    { value: "Iceland", label: "Iceland" },
    { value: "India", label: "India" },
    { value: "Indonesia", label: "Indonesia" },
    { value: "Iran, Islamic Republic of", label: "Iran, Islamic Republic of" },
    { value: "Iraq", label: "Iraq" },
    { value: "Ireland", label: "Ireland" },
    { value: "Isle of Man", label: "Isle of Man" },
    { value: "Israel", label: "Israel" },
    { value: "Italy", label: "Italy" },
    { value: "Jamaica", label: "Jamaica" },
    { value: "Japan", label: "Japan" },
    { value: "Jersey", label: "Jersey" },
    { value: "Jordan", label: "Jordan" },
    { value: "Kazakhstan", label: "Kazakhstan" },
    { value: "Kenya", label: "Kenya" },
    { value: "Kiribati", label: "Kiribati" },
    {
      value: "Korea, Democratic People's Republic of",
      label: "Korea, Democratic People's Republic of",
    },
    { value: "Korea, Republic of", label: "Korea, Republic of" },
    { value: "Kuwait", label: "Kuwait" },
    { value: "Kyrgyzstan", label: "Kyrgyzstan" },
    {
      value: "Lao People's Democratic Republic",
      label: "Lao People's Democratic Republic",
    },
    { value: "Latvia", label: "Latvia" },
    { value: "Lebanon", label: "Lebanon" },
    { value: "Lesotho", label: "Lesotho" },
    { value: "Liberia", label: "Liberia" },
    { value: "Libyan Arab Jamahiriya", label: "Libyan Arab Jamahiriya" },
    { value: "Liechtenstein", label: "Liechtenstein" },
    { value: "Lithuania", label: "Lithuania" },
    { value: "Luxembourg", label: "Luxembourg" },
    { value: "Macao", label: "Macao" },
    {
      value: "Macedonia, The Former Yugoslav Republic of",
      label: "Macedonia, The Former Yugoslav Republic of",
    },
    { value: "Madagascar", label: "Madagascar" },
    { value: "Malawi", label: "Malawi" },
    { value: "Malaysia", label: "Malaysia" },
    { value: "Maldives", label: "Maldives" },
    { value: "Mali", label: "Mali" },
    { value: "Malta", label: "Malta" },
    { value: "Marshall Islands", label: "Marshall Islands" },
    { value: "Martinique", label: "Martinique" },
    { value: "Mauritania", label: "Mauritania" },
    { value: "Mauritius", label: "Mauritius" },
    { value: "Mayotte", label: "Mayotte" },
    { value: "Mexico", label: "Mexico" },
    {
      value: "Micronesia, Federated States of",
      label: "Micronesia, Federated States of",
    },
    { value: "Moldova, Republic of", label: "Moldova, Republic of" },
    { value: "Monaco", label: "Monaco" },
    { value: "Mongolia", label: "Mongolia" },
    { value: "Montenegro", label: "Montenegro" },
    { value: "Montserrat", label: "Montserrat" },
    { value: "Morocco", label: "Morocco" },
    { value: "Mozambique", label: "Mozambique" },
    { value: "Myanmar", label: "Myanmar" },
    { value: "Namibia", label: "Namibia" },
    { value: "Nauru", label: "Nauru" },
    { value: "Nepal", label: "Nepal" },
    { value: "Netherlands", label: "Netherlands" },
    { value: "New Caledonia", label: "New Caledonia" },
    { value: "New Zealand", label: "New Zealand" },
    { value: "Nicaragua", label: "Nicaragua" },
    { value: "Niger", label: "Niger" },
    { value: "Nigeria", label: "Nigeria" },
    { value: "Niue", label: "Niue" },
    { value: "Norfolk Island", label: "Norfolk Island" },
    { value: "Northern Mariana Islands", label: "Northern Mariana Islands" },
    { value: "Norway", label: "Norway" },
    { value: "Oman", label: "Oman" },
    { value: "Pakistan", label: "Pakistan" },
    { value: "Palau", label: "Palau" },
    {
      value: "Palestinian Territory, Occupied",
      label: "Palestinian Territory, Occupied",
    },
    { value: "Panama", label: "Panama" },
    { value: "Papua New Guinea", label: "Papua New Guinea" },
    { value: "Paraguay", label: "Paraguay" },
    { value: "Peru", label: "Peru" },
    { value: "Philippines", label: "Philippines" },
    { value: "Pitcairn", label: "Pitcairn" },
    { value: "Poland", label: "Poland" },
    { value: "Portugal", label: "Portugal" },
    { value: "Puerto Rico", label: "Puerto Rico" },
    { value: "Qatar", label: "Qatar" },
    { value: "Reunion", label: "Reunion" },
    { value: "Romania", label: "Romania" },
    { value: "Russia", label: "Russia" },
    { value: "Rwanda", label: "Rwanda" },
    { value: "Saint Helena", label: "Saint Helena" },
    { value: "Saint Kitts and Nevis", label: "Saint Kitts and Nevis" },
    { value: "Saint Lucia", label: "Saint Lucia" },
    { value: "Saint Pierre and Miquelon", label: "Saint Pierre and Miquelon" },
    {
      value: "Saint Vincent and The Grenadines",
      label: "Saint Vincent and The Grenadines",
    },
    { value: "Samoa", label: "Samoa" },
    { value: "San Marino", label: "San Marino" },
    { value: "Sao Tome and Principe", label: "Sao Tome and Principe" },
    { value: "Saudi Arabia", label: "Saudi Arabia" },
    { value: "Senegal", label: "Senegal" },
    { value: "Serbia", label: "Serbia" },
    { value: "Seychelles", label: "Seychelles" },
    { value: "Sierra Leone", label: "Sierra Leone" },
    { value: "Singapore", label: "Singapore" },
    { value: "Slovakia", label: "Slovakia" },
    { value: "Slovenia", label: "Slovenia" },
    { value: "Solomon Islands", label: "Solomon Islands" },
    { value: "Somalia", label: "Somalia" },
    { value: "South Africa", label: "South Africa" },
    {
      value: "South Georgia and The South Sandwich Islands",
      label: "South Georgia and The South Sandwich Islands",
    },
    { value: "Spain", label: "Spain" },
    { value: "Sri Lanka", label: "Sri Lanka" },
    { value: "Sudan", label: "Sudan" },
    { value: "Suriname", label: "Suriname" },
    { value: "Svalbard and Jan Mayen", label: "Svalbard and Jan Mayen" },
    { value: "Eswatini", label: "Eswatini" },
    { value: "Sweden", label: "Sweden" },
    { value: "Switzerland", label: "Switzerland" },
    { value: "Syrian Arab Republic", label: "Syrian Arab Republic" },
    { value: "Taiwan (ROC)", label: "Taiwan (ROC)" },
    { value: "Tajikistan", label: "Tajikistan" },
    {
      value: "Tanzania, United Republic of",
      label: "Tanzania, United Republic of",
    },
    { value: "Thailand", label: "Thailand" },
    { value: "Timor-leste", label: "Timor-leste" },
    { value: "Togo", label: "Togo" },
    { value: "Tokelau", label: "Tokelau" },
    { value: "Tonga", label: "Tonga" },
    { value: "Trinidad and Tobago", label: "Trinidad and Tobago" },
    { value: "Tunisia", label: "Tunisia" },
    { value: "Turkey", label: "Turkey" },
    { value: "Turkmenistan", label: "Turkmenistan" },
    { value: "Turks and Caicos Islands", label: "Turks and Caicos Islands" },
    { value: "Tuvalu", label: "Tuvalu" },
    { value: "Uganda", label: "Uganda" },
    { value: "Ukraine", label: "Ukraine" },
    { value: "United Arab Emirates", label: "United Arab Emirates" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "United States", label: "United States" },
    {
      value: "United States Minor Outlying Islands",
      label: "United States Minor Outlying Islands",
    },
    { value: "Uruguay", label: "Uruguay" },
    { value: "Uzbekistan", label: "Uzbekistan" },
    { value: "Vanuatu", label: "Vanuatu" },
    { value: "Venezuela", label: "Venezuela" },
    { value: "Vietnam", label: "Vietnam" },
    { value: "Virgin Islands, British", label: "Virgin Islands, British" },
    { value: "Virgin Islands, U.S.", label: "Virgin Islands, U.S." },
    { value: "Wallis and Futuna", label: "Wallis and Futuna" },
    { value: "Western Sahara", label: "Western Sahara" },
    { value: "Yemen", label: "Yemen" },
    { value: "Zambia", label: "Zambia" },
    { value: "Zimbabwe", label: "Zimbabwe" },
  ];

  const [emailMsg, setEmailMsg] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    player_type: "",
    country: "",
    city: "",
    area: "",
    wathsapp: 0,
    status: "Available",
    gender: "",
  });

  const toggleForm = () => {
    setTimeout(() => {
      setShowForm(true);
    }, 3000);
  };
  toggleForm();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "email") {
      const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        value
      );
      if ( value.length > 0 && !isValidEmail) {
        setEmailMsg("Please enter a valid email address");
        setShowEmailError(true);
      } else {
        setEmailMsg("");
        setShowEmailError(false);
      }
    }
    if (name === "password") {
      // Check if the entered password matches the regex
      const isValidPassword =
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*_)(?!.* ).{8,16}$/.test(value);

      // If the password is not valid, you can handle it accordingly (e.g., show an error message)
     
      if ( value.length > 0 && !isValidPassword) {
        setErrorMsg(`Password must contain at least one digit, one lowercase letter,\n 
        one uppercase letter, one underscore, and be 8-16 characters long.`);
        setShowError(true);
      } else {
        setShowError(false);
      }
      
    }
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      player_type: data.player_type,
      country: data.country,
      city: data.city,
      area: data.area,
      gender: data.gender,
      wathsapp: data.wathsapp,
    };
    apiHit
      .post("/register", userData)
      .then((response) => {
        console.log("Sent data = ", response.data);
        navigate("/signInScreen");
      })
      .catch((error) => {
        console.log("Axios Error = ", error);
      });
  };

  // console.log("World Cities = ", cityOptions);

  return (
    <main
      className={
        styles[`${showForm ? "signUp_main_div" : "signUp_with_full_bg"}`]
      }
    >
      <section
        className={
          styles[`${showForm ? "label_input_main_div" : "spinner_div"}`]
        }
      >
        {showForm === false ? (
          <>
            <h1>Get ready for registeration</h1>
            <span className={styles["loader"]}></span>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={styles["information_div"]}>
              <h1>Personal Information</h1>
              <FontAwesomeIcon
                icon={faContactBook}
                style={{ color: "white", fontSize: 30, marginRight: "5px" }}
              />
            </div>

            <div className={styles["label_input_div"]}>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="write your full name here"
                name="name"
                onChange={handleChange}
              />
            </div>

            <div className={styles["label_input_div"]}>
              <label>Email</label>
              <input
                type="email"
                placeholder="write your email here"
                name="email"
                onChange={handleChange}
              />
            </div>

            {showEmailError && (
              <p className={styles["error_msg"]}>{emailMsg}</p>
            )}

            <div className={styles["label_input_div"]}>
              <label>Password</label>
              <input
                type="password"
                placeholder="write your password here"
                minLength={8}
                maxLength={16}
                name="password"
                onChange={handleChange}
              />
            </div>
            {showError && <p className={styles["error_msg"]}>{errorMsg}</p>}

            <div className={styles["label_input_div"]}>
              <label>Contact Number</label>
              <input
                type="number"
                placeholder="03453217900"
                maxLength={11}
                name="wathsapp"
                onChange={handleChange}
              />
            </div>

            <h6 className={styles["h6"]}>Player Type</h6>
            <div className={styles["gender_main_div"]}>
              <div className={styles["gender_inner_div"]}>
                <input
                  type="radio"
                  name="player_type"
                  value="Batsman"
                  onChange={handleChange}
                />
                <p>Batsman</p>
              </div>

              <div className={styles["gender_inner_div"]}>
                <input
                  type="radio"
                  name="player_type"
                  value="Bowler"
                  onChange={handleChange}
                />
                <p>Bowler</p>
              </div>

              <div className={styles["gender_inner_div"]}>
                <p>{""}</p>
              </div>
            </div>

            <h6 className={styles["h6"]}>Gender</h6>
            <div className={styles["gender_main_div"]}>
              <div className={styles["gender_inner_div"]}>
                <input
                  type="radio"
                  name="gender"
                  value={"Male"}
                  onChange={handleChange}
                />
                <p>Male</p>
              </div>

              <div className={styles["gender_inner_div"]}>
                <input
                  type="radio"
                  name="gender"
                  value={"FeMale"}
                  onChange={handleChange}
                />
                <p>Female</p>
              </div>

              <div className={styles["gender_inner_div"]}>
                <input
                  type="radio"
                  name="gender"
                  value={"Other"}
                  onChange={handleChange}
                />
                <p>Other</p>
              </div>
            </div>

            <div className={styles["label_input_div"]}>
              <label>Residential Area</label>
              <input
                type="string"
                placeholder="Enter your current residential area"
                maxLength={40}
                name="area"
                onChange={handleChange}
              />
            </div>

            <div className={styles["custom_select"]}>
              <label>Country</label>
              <select
                id="country"
                name="country"
                required
                onClick={handleChange}
                onChange={handleChange}
              >
                {countryOptions.map((country) => {
                  return <option value={country.value}>{country.label}</option>
                })}
              </select>
            </div>

            <div className={styles["label_input_div"]}>
              <label>City</label>
              <input
                type="string"
                placeholder="Enter your city name"
                maxLength={20}
                name="city"
                onChange={handleChange}
              />
            </div>

            <div className={styles["btn_div"]}>
              <button type="submit">Submit</button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
};

export default SignUp;
