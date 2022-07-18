import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCountries, update } from "../Redux/action";

export const Editpage = () => {
  
  const navigate=useNavigate();
  const {id}=useParams();
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [city, setcity] = useState("");
  const [population, setpopulation] = useState(0);
  
   useEffect(() => {
    if(countries?.length===0)
    {
       dispatch(getCountries());
    }
   }, [countries?.length,dispatch]);
 
   useEffect(() => {
     if (id) {
        const data = countries?.find((el) => el.id === Number(id));
        if(data)
        {
          setcity(data.city);
          setpopulation(data.population);
        }
     }
   }, [countries, id]);

  const submitHandler=()=>{
    dispatch(update(id,city,population));
    navigate('/');
  }

  
  
  return (
    <Box>
      <Heading>Edit Page</Heading>
      <Box>
        <Text>Capital City</Text>
        <Input
          data-cy="capital-city"
          value={city}
          onChange={(e) => {
            setcity(e.target.value);
          }}
        />
      </Box>
      <Box>
        <Text>Population</Text>
        <Input
          data-cy="population"
          value={population}
          type="number"
          onChange={(e) => {
             
            setpopulation(e.target.value);
             
          }}
        />
      </Box>
      <Button data-cy="update-button" onClick={submitHandler}>Update</Button>
    </Box>
  );
};

export default Editpage;
