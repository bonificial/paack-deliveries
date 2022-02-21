import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { globalStore } from "./redux";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Details } from "./pages";
import { CurrentlyActiveDelivery, HeaderNav } from "./components";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={globalStore}>
      <div className={"container"}>
        <HeaderNav /> {/*Output the Header */}
        <div className="">
          <CurrentlyActiveDelivery />{" "}
          {/*Show information of the current active delivery*/}
          {/*Handle Page Routes*/}
          <BrowserRouter>
            <Routes>
              {/*Default Home Page*/}
              <Route path="/" element={<App />}></Route>
              <Route path="details" element={<Details />}>
                <Route path=":id" element={<Details />} />
              </Route>
              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <Link
                      style={{
                        display: "block",
                        margin: "1rem 0",
                        textDecoration: "none",
                      }}
                      to={"/"}
                    >
                      Got lost ? Click Here to Navigate Back to Deliveries
                      Listing
                    </Link>
                  </main>
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
