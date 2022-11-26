import React, { useCallback, useEffect, useState } from "react";
import NavigationBar from "./NavigationBar/NavigationBar";
import Router from "next/router";
import HashLoader from "react-spinners/HashLoader";
const Layout = (props) => {
  const [isPageLoading, setIsPageLoading]=useState(false);
  Router.events.on('routeChangeStart',useCallback(()=>{setIsPageLoading(true)},[]));
  Router.events.on('routeChangeComplete',useCallback(()=>{setIsPageLoading(false)},[]));
  return (
    <React.Fragment>
      <div style={{position:'absolute', left:'50%', transform:'translateX(-50%)'}}>
      <HashLoader color="#36d7b7"
                loading={isPageLoading}/>
      </div>
      <NavigationBar />
      <div>{props.children}</div>
    </React.Fragment>
  );
};

export default Layout;
