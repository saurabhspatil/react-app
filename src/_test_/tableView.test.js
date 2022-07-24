import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act } from "react-dom/test-utils";
import StickyHeadTable from '../components/tableView';

const mockData = [{
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    "current_price": 22313,
    "market_cap": 426466036905,
    "market_cap_rank": 1,
    "fully_diluted_valuation": 468870948785,
    "total_volume": 38122044816,
    "high_24h": 23247,
    "low_24h": 22145,
    "price_change_24h": -510.52211332276784,
    "price_change_percentage_24h": -2.23679,
    "market_cap_change_24h": -11164230083.27362,
    "market_cap_change_percentage_24h": -2.55106,
    "circulating_supply": 19100750,
    "total_supply": 21000000,
    "max_supply": 21000000,
    "ath": 59717,
    "ath_change_percentage": -62.61156,
    "ath_date": "2021-11-10T14:24:11.849Z",
    "atl": 51.3,
    "atl_change_percentage": 43424.14118,
    "atl_date": "2013-07-05T00:00:00.000Z",
    "roi": null,
    "last_updated": "2022-07-23T07:43:49.374Z"
}];

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with or without data", () => {
  act(() => {
    render(<StickyHeadTable tableData={mockData}/>, container);
  });
  expect(container.textContent).toBe("NameSymbolCurrent PriceHigh 24 hour priceLow 24 hour priceRows per page:1011–1 of 1");
});

it("renders user data", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData)
      })
    );
  
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
        const root = createRoot(container); 
        root.render(<StickyHeadTable tableData={mockData}/>, container);
    });
  
    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  });
