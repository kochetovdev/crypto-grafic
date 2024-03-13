import { AppContext } from "../app/Context/AppProvider";

export default function ({ children }) {
  return (
    <AppContext.Consumer>
      {({ coinList }) => {
        if (!coinList || coinList.length === 0) {
          return <div>Loading Coins...</div>;
        }
        return <div>{children}</div>;
      }}
    </AppContext.Consumer>
  );
}
