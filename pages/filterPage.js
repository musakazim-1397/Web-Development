import React, { useEffect, useState } from "react";
import classes from "../styles/FilterPage.module.css";
import { HiFilter } from "react-icons/hi";
import { filterData } from "../components/FilterData";
import millify from "millify";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import { RiHotelBedFill } from "react-icons/ri";
import { FaBath } from "react-icons/fa";
import { FaVectorSquare } from "react-icons/fa";
import axios from "axios";
import CircleLoader from 'react-spinners/CircleLoader';


const FilterPage = () => {
  const [isLoading, setIsLoading]= useState(false);
  const [purpose, setPurpose] = useState("for-sale");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [maxArea, setMaxArea] = useState(1000);
  const [sort, setSort] = useState("price-asc");
  const [baths, setBaths] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [propertyType, setPropertyType] = useState("Townhouses");
  const [furnishingStatus, setFurnishingStatus] = useState("unfurnished");
  const [rentFrequency, setRentFrequency] = useState("monthly");
  const [showFilters, setShowFilters] = useState(false);
  const [properties, setProperties]= useState([]);

  function optionsChangeHandler(queryName, value) {
    console.log(queryName, "\n", value);
    if (queryName == "purpose") {
      setPurpose(value);
    }
    if (queryName == "minPrice") {
      setMinPrice(value);
    }
    if (queryName == "maxPrice") {
      setMaxPrice(value);
    }
    if (queryName == "areaMax") {
      setMaxArea(value);
    }
    if (queryName == "rentFrequency") {
      setRentFrequency(value);
    }
    if (queryName == "sort") {
      setSort(value);
    }
    if (queryName == "bathsMin") {
      setBaths(value);
    }
    if (queryName == "roomsMin") {
      setRooms(value);
    }
    if (queryName == "propertyType") {
      setPropertyType(value);
    }
    if (queryName == "furnishingStatus") {
      setFurnishingStatus(value);
    }
    if (queryName == "rentFrequency") {
      setRentFrequency(value);
    }
  }

  useEffect(() => {
    const getData = async () => {
        try {
          setIsLoading(true);
            const response = await axios("/api/fetchData",{
                params:{
                    purpose,
                    minPrice,
                    maxPrice,
                    maxArea,
                    propertyType,
                    sort,
                    baths,
                    rooms,
                    furnishingStatus,
                    rentFrequency,
                }
            });
            setIsLoading(false);
            const data= response.data;
            // console.log(data, data.data);
            console.log('useEffect triggered');
            setProperties(data.data.hits);
        }catch(e){
            setIsLoading(false);
            console.log(e);
        }
    };
    getData();
  }, [
    purpose,
    minPrice,
    maxArea,
    maxPrice,
    sort,
    baths,
    rooms,
    propertyType,
    furnishingStatus,
    rentFrequency,
  ]);
  return (
    <div className={classes.fiterPageContainer}>
      <div
        className={classes.fiterContainer}
        style={{ height: !showFilters ? "10vh" : "20vh" }}
      >
        <div
          className={classes.fiterHeader}
          onClick={() => {
            setShowFilters((prevState) => !prevState);
          }}
        >
          <h2>Search Property By Filters</h2>
          <div>
            <HiFilter size={30} />
          </div>
        </div>
        <div style={{position:'absolute', top:'20%'}}>
        <CircleLoader
                color="#36d7b7"
                loading={isLoading}
                cssOverride={{
                  display: "block",
                  margin: "2rem auto",
                }}
                size={120}
              />
        </div>
        {showFilters && (
          <div className={classes.filterSelectionContainer}>
            {filterData.map((item) => (
              <div key={item.queryName} className={classes.optionContainer}>
                <select
                  id={item.queryName}
                  placeholder={item.queryName}
                  className={classes.selectContainer}
                  onChange={(e) =>
                    optionsChangeHandler(item.queryName, e.target.value)
                  }
                >
                  {item.items.map((eachOption) => (
                    <>
                      <option
                        disabled
                        selected
                        hidden
                        value={item.queryName}
                        label={item.placeholder}
                      >
                        {item.queryName}
                      </option>
                      <option
                        value={eachOption.value}
                        key={eachOption.value}
                        className={classes.option}
                        style={{fontSize:'1rem'}}
                      >
                        {eachOption.value}
                      </option>
                    </>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={classes.filterContentContainer}>
      <h1 style={{marginTop:'5rem'}}>
            {properties && `Properties for ${purpose}`}
          </h1>
          <div className={classes.rentalSectionHouses}>
            {properties && properties.map((house) => {
              return (
                <div className={classes.houseContainer} key={house.id}>
                  <div className={classes.houseImageContainer}>
                 { house && <img
                    src={`${house?.coverPhoto?.url}`}
                    alt="cover picture of the houe"
                    style={{height:160, width:256}}
                    className={classes.coverPhoto}
                  />}
                  </div>
                  <div className={classes.houseDetailSection}>
                    <div className={classes.housePriceContainer}>
                      <div className={classes.housePrice}>
                        {house.isVerified && <GoVerified color={"green"} />}
                        <h3 style={{marginLeft:'10px'}}>AED</h3>
                        <h3>
                          {millify(house.price)}
                          {house.rentFrequency && <><span>/</span>{house.rentFrequency}</>}
                        </h3>
                      </div>
                      <div className={classes.houseSpecsContainer}>
                          {house.rooms}{'   '}<RiHotelBedFill color={"#a9e2eb"} size={12}/>{' '}
                          |{'  '}
                          {house.baths}{"   "}   
                            <FaBath color={"#a9e2eb"} size={12}/>{' '}
                          |{' '}
                          {millify(house.area)}{' '}sqft{'    '}<FaVectorSquare color="#a9e2eb" size={12}/>
                      </div>
                      <p style={{fontSize:'13px'}}>
                        {house.title.lenght>25 ? house.title.substring(0,30) + '...': house.title}
                      </p>
                    </div>
                  <img
                    src={`${house?.agency?.logo.url}`}
                    alt="agency logo"
                    style={{objectFit:'cover', marginTop:'1rem', marginLeft:'1rem', maxWidth:'50px', maxHeight:'50px'}}
                  />
                  </div>
                </div>
              );
            })}
          </div>
      </div>
    </div>
  );
};

export default FilterPage;

