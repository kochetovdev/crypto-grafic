import { createContext, useEffect, useState } from "react";
import cc from "cryptocompare";

cc.setApiKey(
  "278e907ae022732c4c4bf2de7e9a0b175fe365e4dba32b4dee8f06d15b418b1e"
);

export const AppContext = createContext({
  page: {},
  setPage: () => {},
  confirmFavorites: () => {},
});

export const AppContextProvider = ({ children }) => {
  const [pageData, setPageData] = useState({
    page: "",
    firstVisit: true,
  });
  const [coinList, setCoinList] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [defaultCoinList, setDefaultCoinList] = useState({});

  const MAX_FAVORITES = 10;

  const savedSettings = () => {
    let cryptoDashData = JSON.parse(localStorage.getItem("cryptoDash"));
    if (!cryptoDashData) {
      setPageData((prevData) => ({
        ...prevData,
        page: "settings",
        firstVisit: true,
      }));
    } else {
      let { favorites } = cryptoDashData;
      setFavorites(favorites);
      setPageData((prevData) => ({
        ...prevData,
        page: "settings",
        firstVisit: false,
      }));
    }
  };

  const confirmFavorites = () => {
    setPageData({
      page: "",
      firstVisit: false,
    });
    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({ favorites: favorites })
    );
  };

  const fetchCoins = async () => {
    const coinList = (await cc.coinList()).Data;
    setCoinList(coinList);
  };

  const fetchDefaultCoins = async () => {
    const coinDefaultList = (await cc.coinList()).Data;
    setDefaultCoinList(coinDefaultList);
  };

  const addCoin = (key) => {
    let copyFavorites = [...favorites];
    if (favorites.length < MAX_FAVORITES) {
      copyFavorites.push(key);
      setFavorites(copyFavorites);
    }
  };

  const isInFavorites = (key) => {
    return favorites.includes(key);
  };

  const removeCoin = (key) => {
    let copyFavorites = [...favorites];

    copyFavorites = copyFavorites.filter(
      (favoritesKey) => favoritesKey !== key
    );
    setFavorites(copyFavorites);
  };

  const setFilteredCoins = (filteredCoins) => setCoinList(filteredCoins);

  useEffect(() => {
    savedSettings();
    fetchCoins();
    fetchDefaultCoins();
  }, []);

  const value = {
    page: pageData.page,
    firstVisit: pageData.firstVisit,
    coinList,
    defaultCoinList,
    favorites,
    setPage: setPageData,
    confirmFavorites,
    addCoin,
    removeCoin,
    isInFavorites,
    setFilteredCoins,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
