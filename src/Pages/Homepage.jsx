import {
  Box,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
  Button
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getCountries } from "../Redux/action";
import { Link } from "react-router-dom";

const Homepage = () => {
 
  const dispatch = useDispatch();
  var countries = useSelector((state) => state.countries);
  const [data, setdata] = useState([]);
  const [sort, setsort] = useState("")
  useEffect(() => {
    if(sort==="")
    {
      setdata([...countries]);
    }
    
   else if(sort==="asc")
  {
     var Ascending = countries.slice(0);
      Ascending.sort(function (a, b) {
      var x = a.country.toLowerCase();
      var y = b.country.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
    setdata([...Ascending]);
   
  }
   else if (sort === "desc") {
     var Descending = countries.slice(0);
       Descending.sort(function (a, b) {
       var x = a.country.toLowerCase();
       var y = b.country.toLowerCase();
       return x > y ? -1 : x < y ? 1 : 0;
     });
       setdata([...Descending]);
   }
  }, [sort,countries])
  
  const Ondelete = (id) => {
    fetch(`http://localhost:8080/countries/${id}`, {
      method: "DELETE",
    });
    dispatch(getCountries());
  };
  useEffect(() => {
      dispatch(getCountries());
  }, [dispatch]);
  
  
  return (
    <Box width={700}>
      <Flex padding="0 1rem" mb="2rem">
        <Text fontWeight="700" paddingRight="1rem">
          Sort by country population
        </Text>
        <RadioGroup>
          <Stack direction="row">
            <Radio data-cy="asc" value="asc" onChange={(e)=>{setsort(e.target.value)}}>
              Ascending
            </Radio>
            <Radio data-cy="desc" value="desc" onChange={(e)=>{setsort(e.target.value)}}>
              Descending
            </Radio>
          </Stack>
        </RadioGroup>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Country</Th>
              <Th>Capital</Th>
              <Th>Population</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody data-cy="table-body">
            {data.map((el) => (
              <Tr key={el.id}>
                <Td>{el.country}</Td>
                <Td>{el.city}</Td>
                <Td>{el.population}</Td>
                <Td>
                  <Link to={`/country/${el.id}`} >
                     <Button >edit</Button>
                  </Link>
                </Td>
                <Td>
                  <Button onClick={()=>{Ondelete(el.id)}}>delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Homepage;
