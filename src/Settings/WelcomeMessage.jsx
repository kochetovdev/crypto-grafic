import React from "react";
import { AppContext } from "../app/Context/AppProvider";

const WelcomeMessage = () => {
  return (
    <AppContext.Consumer>
      {({ firstVisit }) =>
        firstVisit ? (
          <div>
            Welcome to CryptoDash, please select your favorite coins to began.{" "}
          </div>
        ) : null
      }
    </AppContext.Consumer>
  );
};

export default WelcomeMessage;
