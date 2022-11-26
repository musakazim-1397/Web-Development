import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
// const axios= require('axios').default;
import { GoVerified } from "react-icons/go";
import { RiHotelBedFill } from "react-icons/ri";
import { FaBath } from "react-icons/fa";
import { FaVectorSquare } from "react-icons/fa";
import millify from "millify";
import Link from "next/link";

export default function Home({ housesForRent, housesForSale }) {
 
  return <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.rentalSection}>
          <div className={styles.rentalTopSection}>
            <div className={styles.rentalTitleImageContainer}>
            <Image
              src="/houseImages/house.jpg"
              alt="a rental home"
              width={300}
              height={200}
            />
            </div>
            <div className={styles.rentalTitleSection}>
              <p className={styles.rentalParas}>Rent A Home</p>
              <h1 className={styles.rentalHeadings}>
                Rental Homes for Everyone
              </h1>
              <p className={styles.rentalParas}>
                Explore from Apartments, builder, floors, villas and more
              </p>
              <button className={styles.btn}>Explore Renting</button>
            </div>
          </div>
          <h1 style={{marginTop:'5rem'}}>
            Properties for-rent
          </h1>
          <div className={styles.rentalSectionHouses}>
            {housesForRent.map((house) => {
              return (
                <Link href={`/propertyDetail/${house.externalID}`} key={house.id}>
                <div className={styles.houseContainer} >
                  <div className={styles.houseImageContainer}>
                  <Image
                    src={`${house?.coverPhoto?.url}`}
                    alt="cover picture of the houe"
                    height={160}
                    width={256}
                    className={styles.coverPhoto}
                  />
                  </div>
                  <div className={styles.houseDetailSection}>
                    <div className={styles.housePriceContainer}>
                      <div className={styles.housePrice}>
                        {house.isVerified && <GoVerified color={"green"} />}
                        <h3 style={{marginLeft:'10px'}}>AED</h3>
                        <h3>
                          {millify(house.price)}
                          {house.rentFrequency && <><span>/</span>{house.rentFrequency}</>}
                        </h3>
                      </div>
                      <div className={styles.houseSpecsContainer}>
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
                </Link>
              );
            })}
          </div>
        </div>
        <div className={styles.sellerSection}>
          <div className={styles.sellerTopSection}>
            <div className={styles.rentalTitleImageContainer}>
            <Image
              src="/houseImages/house-interior.jpg"
              alt="a rental home"
              width={300}
              height={200}
            />
            </div>
            <div className={styles.rentalTitleSection}>
              <p className={styles.rentalParas}>Buy A Home</p>
              <h1 className={styles.rentalHeadings}>
                Find, buy and own it
              </h1>
              <p className={styles.rentalParas}>
              Explore from Apartments, land, builder floors villas and more
              </p>
              <button className={styles.btn}>Explore Buying</button>
            </div>
          </div>
          <h1 style={{marginTop:'5rem'}}>
            Properties for-sale
          </h1>
          <div className={styles.rentalSectionHouses}>
            {housesForSale.map((house) => {
              return (
                <div className={styles.houseContainer} key={house.id}>
                  <div className={styles.houseImageContainer}>
                  <Image
                    src={`${house?.coverPhoto?.url}`}
                    alt="cover picture of the houe"
                    height={160}
                    width={256}
                    style={{minHeight:'100%', minWidth:'100%', objectFit:'cover'}}
                    className={styles.coverPhoto}
                  />
                  </div>
                  <div className={styles.houseDetailSection}>
                    <div className={styles.housePriceContainer}>
                      <div className={styles.housePrice}>
                        {house.isVerified && <GoVerified color={"green"} />}
                        <h3 style={{marginLeft:'10px'}}>AED</h3>
                        <h3>
                          {millify(house.price)}
                          {house.rentFrequency && <><span>/</span>{house.rentFrequency}</>}
                        </h3>
                      </div>
                      <div className={styles.houseSpecsContainer}>
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
    </div>
}

export async function getStaticProps(context) {
  const dataForRent = await axios.get(
    "https://bayut.p.rapidapi.com/properties/list",
    {
      params: {
        locationExternalIDs: "5002",
        purpose: "for-rent",
        hitsPerPage: "6",
      },
      headers: {
        "X-RapidAPI-Key": "d400401864mshc5b75476ba566cep1dd54ajsn62b5f7f8b231",
        "X-RapidAPI-Host": "bayut.p.rapidapi.com",
      },
    }
  );
  const housesForRent = dataForRent.data;
  const dataForSale = await axios.get(
    "https://bayut.p.rapidapi.com/properties/list",
    {
      params: {
        locationExternalIDs: "5002",
        purpose: "for-sale",
        hitsPerPage: "6",
      },
      headers: {
        "X-RapidAPI-Key": "d400401864mshc5b75476ba566cep1dd54ajsn62b5f7f8b231",
        "X-RapidAPI-Host": "bayut.p.rapidapi.com",
      },
    }
  );
  const housesForSale = dataForSale.data;
  return {
    props: {
      housesForRent: housesForRent.hits,
      housesForSale: housesForSale.hits,
    },
  };
}
