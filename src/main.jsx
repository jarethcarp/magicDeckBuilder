import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import App from "./App.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Home from "./pages/Home.jsx";
import Decks from "./pages/Decks.jsx";
import CardBuilder from "./pages/CardBuilder.jsx";
import PublicDecks from "./pages/PublicDecks.jsx";
import Auth from "./pages/Auth.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import axios from "axios";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route
        index
        element={<Home />}
        // loader={async () => {
        //   const res = await axios.get("api/decks");
        //   return { decks: res.data };
        // }}
      />
      <Route
        path="/edit/:id"
        element={<CardBuilder />}
        loader={async ({ params }) => {
          const { id } = params;
          const res = await axios.get(`/api/cardList/${id}`);
          return { cards: res.data};
        }}
      />
      <Route
        path="/public-decks"
        element={<PublicDecks />}
        loader={async () => {
          const res = await axios.get("/api/all-decks");
          return {decks: res.data};
        }}
      />
      <Route
        path="/decks"
        element={<Decks />}
        loader={async () => {
          const res = await axios.get("/api/decks");
          return { decks: res.data };
        }}
      />
      <Route path="/auth" element={<Auth />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
