// import back_icon from "../../images/back_icon_white.svg";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import axios from "axios";
import { storage } from "./config";
import { ref, uploadBytes } from "firebase/storage";
import apiHit from "../../util/AxiosURL";
import Swal from "sweetalert2";

const ImageUploader = () => {
  const navigate = useNavigate();

  const [imageUpload, setImageUpload] = useState(null);
  const [userData, setUserData] = useState();
  useEffect(() => {
    async function getLoginUserDetails() {
      try {
        await apiHit.get("/getloginuser").then((res) => {
          console.log("res.data in userPicture = ", res.data);
          setUserData(res.data);
        });
      } catch (err) {
        console.log("GET Error in accessing userProfile Details: \n", err);
      }
    }
    getLoginUserDetails();
  }, []);

  //   upload image
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `userimage/${userData._id}`);
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        Swal.fire({
          title: "Image Uploaded!",
          text: "Your image has been successfully uploaded.",
          icon: "success",
          confirmButtonText: "OK",
          position: "center", // Center the alert
        });
      })

      .catch((error) => {
        console.error("Error uploading image: ", error);
      });
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: "lightgrey",
      }}
    >
      <h1
        style={{
          color: "black",
          fontSize: "24px",
          marginBottom: "20px",
          width: "100%",
          height: "auto",
          fontWeight: "900",
        }}
      >
        Kindly Upload your profile picture:
      </h1>
      <input
        style={{
          marginBottom: "10px 0",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          width: "90%",
          height: "40px",
          fontSize: "20px",
          color: "black",
          backgroundColor: "white",
        }}
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />

      <div
        style={{
          width: "100%",
          height: "auto",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <button
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            width: "80%",
            height: "60px",
            borderRadius: "10px",
            marginTop: "20px",
            fontSize: "20px",
          }}
          onClick={uploadImage}
        >
          Upload
        </button>
        <button
          style={{
            color: "black",
            backgroundColor: "#ffffff",
            border: "1px solid #ccc",
            padding: "10px 20px",
            marginBottom: "10px",
            cursor: "pointer",
            width: "80%",
            height: "60px",
            borderRadius: "10px",
            marginTop: "20px",
            fontSize: "20px",
          }}
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </main>
  );
};

export default ImageUploader;
