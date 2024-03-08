import "./App.css";
import IntroScreen from "./components/introScreen";
import SignIn from "./components/signInScreen";
import SignUp from "./components/createAccount";
import UserProfile from "./components/userProfile";
import EditProfile from "./components/editUserProfile";
import Footer from "./components/navigationFooter";
import PlayerSearch from "./components/userSearch";
import NewMatch from "./components/newMatch";
import CreatePost from "./components/createPost";
import ImageUploader from "./components/editUserPicture/ImageUploader";
import ViewPost from "./components/viewPost";
import Chatbot from "./components/chatbot";
import NotFound from "./components/notFoundPage";

import MessageScreen from "./components/messageScreen";
// import SearchUserViewPost from "./components/searchViewPost"
// "proxy": "https://sportify-plyj.onrender.com",

import ScoreBoard from "./scoreCardComponents/ScoreBoard";
import StepperContainer from "./scoreCardComponents/StepperContainer";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./scoreCardComponents/ui/Theme";
import Container from "./main/Container";
import SearchedUserProfile from "./components/searchUserProfile";

import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      let storedToken = localStorage.getItem("userToken");
     //  console.log("storedToken", storedToken)
      return !!storedToken; // Convert to boolean
    };
  
    setIsToken(checkToken());
  }, [isToken]);
  
  console.log("isToken", isToken);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container />
      </ThemeProvider>
      <Routes>
        <Route index path="/" element={<IntroScreen />} />
        <Route
          path="/signInScreen"
          element={isToken ? <UserProfile /> : <SignIn />}
        />
        <Route
          path="/createAccount"
          element={isToken ? <UserProfile /> :<SignUp />}
        />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/editUserProfile" element={<EditProfile />} />
        <Route path="/searchedUserProfile" element={<SearchedUserProfile />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/viewPost" element={<ViewPost />} />
        <Route path="/editUserPicture" element={<ImageUploader />} />

        <Route path="/userSearch" element={<PlayerSearch />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/newMatch" element={<NewMatch />} />
        <Route path="/footer" element={<Footer />} />

        <Route path="/stepperContainer" element={<StepperContainer />} />
        <Route path="/score" element={<ScoreBoard />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/messageScreen" element={<MessageScreen />} />
        {/* <Route path='*' element={<NotFound />} /> */}
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
