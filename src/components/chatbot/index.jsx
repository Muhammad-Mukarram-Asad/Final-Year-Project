import React, { useState, useEffect } from "react";
import styles from "./chatbot.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import back_icon from "../../images/back_icon_white.svg";

const Chatbot = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [userName, setUserName] = useState(null);

  const extractUsername = (message) => {
    const match = message.match(
      /(?:my name is|I am|hello its me|Hello, its me|call me|it's me|It's me|It is me) (\w+)/i
    );

    if (match) {
      return match[1] || match[2] || match[3] || match[4];
    } else {
      return null;
    }
  };

  const botResponse = (name) => {
    console.log("username in botResponse = ", name);
    return name
      ? `Hi ${name}, how can I assist you?`
      : "Hello! How can I assist you?";
  };
  const sendMessage = () => {
    const extractedName = extractUsername(inputMessage);
    console.log("username in sendMessage = ", extractedName);
    setUserName(extractedName);
    const reply = botResponse(extractedName);
    console.log("reply = ", reply);

    

    let input = inputMessage && inputMessage.trim();
    console.log("Input Message ", input);
    input !== "" && output(input);
    setInputMessage("");
  };

  
  const userMessages = [
    ["my name is mukii"], 
    ["Hello its me Ashar"], 
    ["call me funsab"], 
    ["hello its me Ashar"], 
    ["It is me naim"],
    ["It's me huzaifa"],
    ["it's me uzair"],
    ["I am hammad"],

    ["hi", "hy", "hello", "hey", "salam", "there", "hi there", "hello there"],
    ["what is your name", "your name", "who is this", "there", "who are you"],
    ["What is the latest cricket score"],
    ["Tell me the current rankings of the cricket teams"],
    ["Who are the top 5 or 6 players in the cricket world cup"],
    ["When is the next cricket match scheduled"],

    ["Give me highlights of the last cricket match"],
    ["Who is the leading run-scorer in international cricket right now"],
    ["Which team has won the most cricket World Cups"],
    ["Tell me about the upcoming cricket tournaments"],
    ["What are the rules of T20 cricket"],
    ["Who is the captain of the Indian cricket team"],
    ["Which player has the highest batting average in ODIs"],
    ["Can you recommend a cricket training routine"],
    ["How can I buy tickets for the next cricket match"],
    ["Give me updates on the Indian Premier League (IPL)"],
    ["Tell me about the latest cricket controversies"],
    ["What are the basic rules of cricket"],
    ["Who holds the record for the fastest century in T20 internationals"],
    ["When is the next cricket World Cup scheduled"],
    ["How many overs are there in a T20 cricket match"],
    ["What is the Duckworth-Lewis method in cricket"],
    ["Which cricket player has the most centuries in Tests"],
    ["What are the different formats of cricket"],
    ["Tell me about famous cricket stadiums around the world"],
    ["Who is considered the best cricket all-rounder of all time"],
    ["How can I join a local cricket club"],
    ["Tell me about the history of the Ashes series"],
    ["Which cricket team has the best win-loss ratio"],
    ["Who won the last edition of the ICC Champions Trophy"],
    ["What is the role of the third umpire in cricket"],
    ["How are cricket rankings calculated"],
    ["Tell me about the different cricket shot techniques"],
    ["Which country has the most cricket fans"],
    ["What is the significance of the toss in cricket"],
    ["Who won the last cricket match between India and Australia"],
    ["How can I improve my cricket bowling skills"],
    ["Tell me about famous cricket rivalries"],
    ["What is the Super Over in T20 cricket"],
    ["Who is the fastest bowler in the history of cricket"],
    ["What is the IPL auction and how does it work"],
    ["Which cricket player has the most sixes in T20 internationals"],
    ["How are cricket balls made"],
    ["What is the role of a cricket captain on the field"],
    ["Tell me about cricket legends from the past"],
    ["How can I get live cricket updates on my phone"],
    ["What is the role of the match referee in cricket"],
    ["Who is the most successful captain in international cricket"],
    ["How can I start playing fantasy cricket on a sports app"],
    ["What is the difference between a no-ball and a wide in cricket"],
    ["Tell me about the fielding positions in cricket"],
    ["Which cricket team has the best win percentage in T20s"],
    ["Who holds the record for the highest individual score in Test cricket"],
  ];

  const botReplies = [
    [ `${userName ? `Hi ${userName},` : 'Hello!'}` + ` How can I assist you?`],
    [ `${userName ? `Hi ${userName},` : 'Hello!'}` + ` How can I assist you?`],
    [ `${userName ? `Hi ${userName},` : 'Hello!'}` + ` How can I assist you?`],
    [ `${userName ? `Hi ${userName},` : 'Hello!'}` + ` How can I assist you?`],
    [ `${userName ? `Hi ${userName},` : 'Hello!'}` + ` How can I assist you?`],
    [ `${userName ? `Hi ${userName},` : 'Hello!'}` + ` How can I assist you?`],
   
    [
      "Hi this is Sportify Chatbot, your cricketing buddy! How can I assist you",
    ],
    [
      "Hi this is Sportify Chatbot, your cricketing partner! How can I assist you",
    ],
    [
      "To get the latest cricket score, you can check the live score section on the app's homepage.",
    ],
    ["You can find the current rankings of cricket teams in the Google."],

    [
      "Babar Azam, Virat Kohli, Ben Stokes, Adam Zampa, Rashid khan, Jos Buttler, etc",
    ],

    [
      "The next cricket match is scheduled for tomorrow. You can find more details in the 'Fixtures' section.",
    ],
    [
      "Highlights of the last cricket match can be viewed in the 'Highlights' tab of the app.",
    ],
    [
      "The leading run-scorer in international cricket currently is Babar Azam.",
    ],
    ["The team with the most cricket World Cup wins is Australia."],
    [
      "Upcoming cricket tournaments can be found in the 'Tournaments' section of the app.",
    ],
    [
      "The rules of T20 cricket are available in the 'Rules' section. It's a fast-paced format with each team playing 20 overs.",
    ],
    ["The current captain of the Indian cricket team is [captain name]."],
    ["The player with the highest batting average in ODIs is [player name]."],
    [
      "For a cricket training routine, consider consulting the 'Training' section of the app or seeking a coach.",
    ],
    [
      "Tickets for the next cricket match can be purchased on the app in the 'Tickets' section.",
    ],
    [
      "For IPL updates, navigate to the 'IPL' section to get the latest news, scores, and team standings.",
    ],
    [
      "To stay informed about cricket controversies, check the 'News' section for the latest updates.",
    ],
    [
      "Basic rules of cricket include runs, wickets, and overs. Detailed rules can be found in the 'Rules' section.",
    ],
    [
      "The record for the fastest century in T20 internationals is held by [player name].",
    ],
    ["The next cricket World Cup is scheduled for October,2024."],
    ["A T20 cricket match consists of 20 overs per side."],
    [
      "The Duckworth-Lewis method is used in rain-affected matches to adjust the target for the chasing team.",
    ],
    ["The player with the most centuries in Tests is [player name]."],
    [
      "Cricket has different formats: Test, One Day International (ODI), and Twenty20 (T20).",
    ],
    [
      "Famous cricket stadiums include Lord's (England), MCG (Australia), and Eden Gardens (India).",
    ],
    [
      "The top three best cricket all-rounders of all time are  Garfield Sobers, Jack Kallis, and Imran Khan.",
    ],
    [
      "To join a local cricket club, check community boards, sports centers, or use the app's 'Clubs' feature.",
    ],
    [
      "The Ashes series is a historic Test cricket rivalry between England and Australia.",
    ],
    ["The team with the best win-loss ratio is Australia."],
    ["The last ICC Champions Trophy was won by Australia."],
    [
      "The third umpire in cricket reviews on-field decisions using technology and assists the on-field umpires.",
    ],
    [
      "Cricket rankings consider performance in matches, including wins, losses, and individual player statistics.",
    ],
    [
      "Different cricket shot techniques include drives, cuts, pulls, and sweeps. Learn more in the 'Techniques' section.",
    ],
    [
      "Cricket fans are widespread, but countries like India, Australia, and England have large fanbases.",
    ],
    [
      "The toss in cricket determines which team bats or bowls first. It can influence the game, especially in Tests.",
    ],
    [
      "The last cricket match between India and Australia was won by Australia.",
    ],
    [
      "To improve your bowling skills, consider practicing different deliveries and seeking guidance from a coach.",
    ],
    [
      "Famous cricket rivalries include India vs. Pakistan, Australia vs. England, and South Africa vs. New Zealand.",
    ],
    [
      "The Super Over in T20 cricket is a tie-breaker, allowing each team to bat and bowl one over to determine the winner.",
    ],
    [
      "The fastest bowler in the history of cricket is often considered to be Shoaib Akhtar.",
    ],
    [
      "The IPL auction is where teams bid for players. It takes place before each season",
    ],
  ];

  const alternative = [
    "Same here, dude.",
    "That's cool! Go on...",
    "Dude...",
    "Ask something else...",
    "Hey, I'm listening...",
  ];
  const [conversation, setConversation] = useState([
    { type: "bot", message: "Hello.. I'm listening! Go on.." },
  ]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Enter") {
        let input = inputMessage;
        input !== "" && output(input);
        setInputMessage("");
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [inputMessage]);

  const compare = (questionsArray, replyArray, string) => {
    let item;
    for (let x = 0; x < questionsArray.length; x++) {
      if (questionsArray[x].length > 0) {
        for (let y = 0; y < questionsArray[x].length; y++) {
          if (questionsArray[x][y] === string) {
            let items = replyArray[x];
            console.log(
              `Match found! in the sub-array of questionsArray:`,
              items
            );
            item = items[Math.floor(Math.random() * items.length)];
          }
        }
      } else {
        console.log("Comparing:", questionsArray[x], string);
        if (questionsArray[x] === string) {
          let items = replyArray[x];
          console.log("Match found! Items:", items);
          item = items[Math.floor(Math.random() * items.length)];
          console.log("Final item:", item);
        }
      }
    }
    if (item) return item;
    else return containMessageCheck(string);
  };

  const containMessageCheck = (string) => {
    let expectedMessage = [
      ["bye", "tc", "take care"],
      ["night", "good night"],
      ["evening", "good evening"],
      ["morning", "good morning"],
      ["noon"],
    ];
    let expectedReply = [
      [
        "Good Bye, dude",
        "Bye, See you!",
        "Dude, Bye. Take care of your health in this situation.",
      ],
      ["Good Night, dude", "Have a sound sleep", "Sweet dreams"],
      ["Have a pleasant evening!", "Good evening too", "Evening!"],
      ["Good morning, Have a great day!", "Morning, dude!"],
      ["Good Afternoon", "Noon, dude!", "Afternoon, dude!"],
    ];

    let item;
    for (let x = 0; x < expectedMessage.length; x++) {
      if (expectedMessage[x].includes(string)) {
        let items = expectedReply[x];
        item = items[Math.floor(Math.random() * items.length)];
      }
    }
    return item;
  };

  const output = (input) => {

    let finalAnswer;
    let text = input;
    console.log("Input Text in  output function = ", text);

    text = text
      .replace(/[\W_]/g, " ")
      .replace(/ a /g, " ")
      .replace(/i feel /g)
      .replace(/whats/g, "what is")
      .replace(/please /g)
      .replace(/ please/g)
      .trim();

    let comparedText = compare(userMessages, botReplies, text);
    console.log("Text = ", text);
    console.log("ComparedText = ", comparedText);

    finalAnswer = comparedText
      ? comparedText
      : alternative[Math.floor(Math.random() * alternative.length)];

    addChat(input, finalAnswer);
  };

  const addChat = (input, answer) => {
    setConversation([
      ...conversation,
      { type: "user", message: input },
      { type: "bot", message: answer },
    ]);
  };

  return (
    <div className={styles["card"]}>
      <div id={styles["header"]}>
        <img src={back_icon} alt="back" onClick={() => window.history.back()} />
        <h1>Sportify Chatbot!</h1>
        <p>{""}</p>
      </div>
      <div id={styles["message-section"]}>
        {conversation.map((msg, index) => (
          <div key={index} className={styles[`message-${msg.type}`]}>
            <span id={styles[`${msg.type}-response`]}>{msg.message}</span>
          </div>
        ))}
      </div>
      <div id={styles["input-section"]}>
        <input
          id={styles["input"]}
          type="text"
          placeholder="Type a message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <FontAwesomeIcon
          style={{ color: "#ffffff", fontSize: "25px" }}
          icon={faPaperPlane}
          onClick={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chatbot;
