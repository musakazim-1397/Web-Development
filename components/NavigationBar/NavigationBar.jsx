import React, { useState } from "react";
import classes from "./NavigationBar.module.css";
import Link from "next/link";
import { HiOutlineMenuAlt3 } from "react-icons/hi";


const NavigationBar = () => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <React.Fragment>
    <div className={classes.navigationBarContainer}>
      <h1 className={classes.navigationBarLogo}>Realtor</h1>
      <div className={classes.menuIconContainer}>
        <div className={classes.menuIcon}>
        <HiOutlineMenuAlt3
          color="white"
          size={30}
          onClick={() => setMenuVisible((prevState) => !prevState)}
        />
        </div>
        {menuVisible && <div className={classes.menuContainer}>
                            <Link href='/'><a className={classes.menuLinks} onClick={()=>setMenuVisible(false)}>Home</a></Link>
                            <Link href='/filterPage'><a className={classes.menuLinks} onClick={()=>setMenuVisible(false)}>Search</a></Link>
                            <Link href='/'><a className={classes.menuLinks} onClick={()=>setMenuVisible(false)}>Buy Property</a></Link>
                            <Link href='/'><a className={classes.menuLinks} onClick={()=>setMenuVisible(false)}>Rent Property</a></Link>
                        </div>}
      </div>
    </div>
    </React.Fragment>
  );
};

export default NavigationBar;
