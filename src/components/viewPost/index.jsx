import React, { useState, useEffect } from "react";
import styles from "./viewPost.module.css";
// import axios from "axios";
import post_image from "../../images/post_image.svg";
import delete_icon from "../../images/DELETE BUTTON.svg";
import empty_post from "../../images/empty_post.svg";
// import { API_BASE_URL } from "../../util/AxiosURL";
import apiHit from "../../util/AxiosURL";


const ViewPost = () => {
  const [userPostData, setUserPostData] = useState();
  const [userData, setUserData] = useState();

  // const apiHit = axios.create({
  //   baseURL: API_BASE_URL
  // });

  useEffect(() => {
    async function getLoginUserDetails() {
      try {
        const storedData = localStorage.getItem("loginUserData");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUserData(parsedData);
          console.log("stored data of login user = ", parsedData._id);
        }
      } catch (err) {
        console.log(
          "Error in getting login user data from session storrage = ",
          err
        );
      }
    }

    getLoginUserDetails();
  }, []);

  useEffect(() => {
    async function getAllPost() {
      try {
        await apiHit.get("/getallpost").then((res) => {
          console.log("Result of posts in viewPost screen = ", res.data);
          setUserPostData(res.data);
        });
      } catch (err) {
        console.log("Error in getting all posts of the user = ", err);
      }
    }
    // Add a check to avoid unnecessary API calls if userPostData is already set
    if (!userPostData) {
      getAllPost();
    }

  }, []);
  // console.log("userPostData = ", userPostData);

  const deletePost = async (postId) => {
    try {
      // Make API call to delete the post
      await apiHit.delete(`/deletepost/${postId}`);

      // Fetch the updated list of posts
      const response = await apiHit.get("/getallpost");
      const updatedPosts = response.data;

      // Update the state with the new list of posts
      updatedPosts && setUserPostData(updatedPosts);
    } catch (err) {
      console.log("Error in deleting post = ", err);
    }
  };
  return (
    <main className={styles["viewPost"]}>
      {userPostData?.length > 0 ? (
        userPostData?.map((post, index) => (
          <section className={styles["post_main_div"]} key={index}>
            <section className={styles["headings_main_div"]}>
              <article className={styles["date_time_main_div"]}>
                <div className={styles["date_time_inner_div"]}>
                  <h1>
                    Date:{" "}
                    {new Date(post?.createdAt).toLocaleDateString("en-US")}{" "}
                  </h1>
                  <h1>
                    Time:{new Date(post?.createdAt).toLocaleTimeString("en-US")}{" "}
                  </h1>
                </div>

                <div className={styles["delete_btn"]}>
                  <img
                    src={delete_icon}
                    alt="delete post"
                    onClick={() => deletePost(post._id)}
                  />
                </div>
              </article>
              <div className={styles["match_format_div"]}>
                <h1>Match Format: {post?.match_format}</h1>
                <h1>
                  {userData?.player_type === "Batsman" ? "RUNS: " : "WICKETS: "}
                   {post?.score_wicket}
                </h1>
              </div>
            </section>

            <div className={styles["image_main_div"]}>
              <img src={post_image} alt="post_image" />
            </div>
          </section>
        ))
      ) : (
        <div className={styles["no_posts_main_div"]}>
          <img src={empty_post} alt="empty_post_placeholder" />
          <h1>You don't have any post to display...</h1>
        </div>
      )}
    </main>
  );
};

export default ViewPost;
