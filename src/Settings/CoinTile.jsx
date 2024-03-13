import CoinImage from "../Shared/CoinImage";
import { SelectableTile, DeletableTile, DisableTile } from "../Shared/Tile";
import { AppContext } from "../app/Context/AppProvider";
import CoinHeaderGrid from "./CoinHeaderGrid";

export default function ({ coinKey, topSection }) {
  const clickCoinHandler = (topSection, coinKey, addCoin, removeCoin) => {
    return topSection
      ? () => {
          removeCoin(coinKey);
        }
      : () => {
          addCoin(coinKey);
        };
  };
  return (
    <AppContext.Consumer>
      {({ defaultCoinList, addCoin, removeCoin, isInFavorites }) => {
        let coin = defaultCoinList[coinKey];
        let TileClass = SelectableTile;
        if (topSection) {
          TileClass = DeletableTile;
        } else if (isInFavorites(coinKey)) {
          TileClass = DisableTile;
        }
        return (
          <TileClass
            onClick={clickCoinHandler(topSection, coinKey, addCoin, removeCoin)}
          >
            <CoinHeaderGrid
              topSection={topSection}
              name={coin?.CoinName}
              symbol={coin?.Symbol}
            />
            <CoinImage coin={coin} />
          </TileClass>
        );
      }}
    </AppContext.Consumer>
  );
}
