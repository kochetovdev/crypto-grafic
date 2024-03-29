import styled from "styled-components";
import { backgroundColor2, fontSize2 } from "../Shared/Styles";
import { AppContext } from "../app/Context/AppProvider";
import _ from "lodash";
import fuzzy from "fuzzy";

export default function () {
  const handleFilter = _.debounce((inputValue, coinList, setFilteredCoins) => {
    // Get all the coins symbols
    let coinSymbols = Object.keys(coinList);
    // Get all the coins names, map symbol to name
    let coinNames = coinSymbols.map((sym) => coinList[sym].CoinName);

    let allStringToSearch = coinSymbols.concat(coinNames);
    let fuzzyResults = fuzzy
      .filter(inputValue, allStringToSearch, {})
      .map((result) => result.string);
    let filteredCoins = _.pickBy(coinList, (result, symKey) => {
      let coinName = result.CoinName;
      return (
        _.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName)
      );
    });

    setFilteredCoins(filteredCoins);
  }, 500);

  const filterCoins = (e, setFilteredCoins, coinList) => {
    let inputValue = e.target.value;
    if (!inputValue) {
      setFilteredCoins(null);

      return;
    }
    handleFilter(inputValue, coinList, setFilteredCoins);
  };

  return (
    <AppContext.Consumer>
      {({ setFilteredCoins, coinList }) => (
        <SearchGrid>
          <h2>Search all coins</h2>
          <SearchInput
            onKeyUp={(e) => filterCoins(e, setFilteredCoins, coinList)}
          />
        </SearchGrid>
      )}
    </AppContext.Consumer>
  );
}

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
`;

const SearchInput = styled.input`
  height: 25px;
  ${backgroundColor2};
  ${fontSize2};
  color: #1163c9;
  border: 1px solid;
  place-self: center left;
`;
