import axios from "axios";
export default async function handler(req, res) {
  const {
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
  } = req.query;
  console.log(req.query);
  try{
    const response = await axios.get(
      "https://bayut.p.rapidapi.com/properties/list",
      {
        params: {
          locationExternalIDs: "5002",
          purpose: purpose,
          hitsPerPage: "25",
          rentFrequency: rentFrequency,
          categoryExternalID:propertyType,
          sort: sort,
          bathsMin: baths,
          roomsMin: rooms,
          priceMin: minPrice,
          priceMax: maxPrice,
          areaMax: maxArea,
          furnishingStatus: furnishingStatus
        },
        headers: {
          "X-RapidAPI-Key": "d400401864mshc5b75476ba566cep1dd54ajsn62b5f7f8b231",
          "X-RapidAPI-Host": "bayut.p.rapidapi.com",
        },
      }
    );
    const data= response.data;
    res.status(200).json({data: data});
  }catch(e){
    console.log(e);
  }
}
