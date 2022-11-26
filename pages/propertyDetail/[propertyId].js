import React, { useState } from "react";
import axios from "axios";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import classes from "../../styles/propertyDetail.module.css";
import Image from "next/image";
import { motion } from "framer-motion"

const propertyDetail = ({ propertyData }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const rightArrow = () => {
    const lastImageIndex = propertyData.photos.length - 1;
    if (imageIndex <= lastImageIndex) {
      setImageIndex((prevIndex) => (prevIndex += 1));
    }
  };
  const leftArrow = () => {
    if (imageIndex > 0) {
      setImageIndex((prevIndex) => (prevIndex -= 1));
    }
  };

  propertyData.photos.forEach((photo) => console.log(`'${photo.url}'`));
  return (
    <div className={classes.propertyDetailContainer}>
      <div className={classes.horizontalImageScrollContainer}>
        <BsFillArrowLeftCircleFill
          size={30}
          color="white"
          onClick={leftArrow}
          style={{cursor:'pointer'}}
        />
        <motion.div className={classes.imageContainer} initial={{x:-10}} animate={{x:0}}>
          <Image
            src={propertyData.photos[imageIndex].url}
            alt="image"
            height={500}
            width={1000}
            placeholder='blur'
            blurDataURL={propertyData.photos[imageIndex].url}

          />
        </motion.div>
        <BsFillArrowRightCircleFill
          size={30}
          color="white"
          onClick={rightArrow}
          style={{cursor:'pointer'}}
        />
      </div>
    </div>
  );
};

export default propertyDetail;

export async function getServerSideProps(context) {
  const propertyId = context.params.propertyId;
  const propertyDetail = await axios.get(
    "https://bayut.p.rapidapi.com/properties/detail",
    {
      params: { externalID: propertyId },
      headers: {
        "X-RapidAPI-Key": "d400401864mshc5b75476ba566cep1dd54ajsn62b5f7f8b231",
        "X-RapidAPI-Host": "bayut.p.rapidapi.com",
      },
    }
  );
  const propertyData = propertyDetail.data;
  return {
    props: {
      propertyData: propertyData,
    },
  };
}
