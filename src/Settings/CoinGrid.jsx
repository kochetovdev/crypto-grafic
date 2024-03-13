import styled from "styled-components";
import { AppContext } from "../app/Context/AppProvider";
import CoinTile from "./CoinTile";

export default function ({ topSection }) {
  const getLowerSectionCoins = (coinList, filteredCoins) => {
    return (
      (filteredCoins && Object.keys(filteredCoins)) ||
      Object.keys(coinList).slice(0, 100)
    );
  };

  const getCoinsToDisplay = (coinList, topSection, favorites, filterCoins) => {
    return topSection ? favorites : getLowerSectionCoins(coinList, filterCoins);
  };

  return (
    <AppContext.Consumer>
      {({ coinList, favorites, filterCoins }) => (
        <CoinGridStyled>
          {getCoinsToDisplay(coinList, topSection, favorites, filterCoins).map(
            (coinKey) => (
              <CoinTile
                key={coinKey}
                topSection={topSection}
                coinKey={coinKey}
              />
            )
          )}
        </CoinGridStyled>
      )}
    </AppContext.Consumer>
  );
}

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-gap: 15px;
  margin-top: 40px;
`;
