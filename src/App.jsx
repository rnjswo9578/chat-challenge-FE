import logo from "./logo.svg";
import "./App.css";
import Router from "./shared/Router";
import { QueryClient, QueryClientProvider } from "react-query";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import queryString from "query-string";

const queryClient = new QueryClient();

function App() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    // URL에서 토큰을 파싱하고 쿠키에 저장
    const parsed = queryString.parse(window.location.search);
    // console.log(window.location.search)
    // console.log(parsed)
    if (parsed.Authorization) {
      const token = parsed.Authorization.split(" ")[1];
      Cookies.set("Authorization", token);
    }

    if (parsed["Authorization-refresh"]) {
      const refreshToken = parsed["Authorization-refresh"].split(" ")[1];
      Cookies.set("Authorization-refresh", refreshToken);
    }

    // 쿠키에서 토큰 가져와서 저장
    // const token = Cookies.get("Authorization");
    // if (token) {
    //   try {
    //     const decoded = jwt_decode(token);
    //     // 일반로그인시 decoded.email 아닐수도 !
    //     dispatch(setUserId(decoded.email));
    //     dispatch(setIsAuthenticated(true));
    //   } catch (error) {
    //     console.error("토큰 오류", error);
    //     dispatch(setIsAuthenticated(false));
    //   }
    // }
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
