// src/context/BiddingContext.jsx
import React, { createContext, useContext, useState } from "react";

const BiddingContext = createContext();

export const BiddingProvider = ({ children }) => {
  const [bids, setBids] = useState([]);

  // Example: place a bid
  const placeBid = (itemId, bidAmount) => {
    setBids((prevBids) => [...prevBids, { itemId, bidAmount }]);
  };

  // Example: get bids for an item
  const getBidsForItem = (itemId) => {
    return bids.filter((bid) => bid.itemId === itemId);
  };

  return (
    <BiddingContext.Provider value={{ bids, placeBid, getBidsForItem }}>
      {children}
    </BiddingContext.Provider>
  );
};

// Hook to use the bidding context
export const useBidding = () => {
  return useContext(BiddingContext);
};
