import { CountryType } from "@/types";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";

const GET_COUNTRY = gql`
  query Country($code: String!) {
    country(code: $code) {
      code
      continent {
        id
        name
      }
      emoji
      id
      name
    }
  }
`;

function Country() {
  const [country, setCountry] = useState<CountryType>({
    id: 0,
    code: "",
    name: "",
    emoji: "",
    continent: {
      id: 0,
      name: "",
      countries: [],
    },
  });
  const router = useRouter();
  const { code } = router.query;

  const { loading, error } = useQuery(GET_COUNTRY, {
    variables: { code: code },
    onCompleted: (data) => {
      setCountry(data.country);
    },
  });

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>Error</h1>;

  console.log(country);

  return (
    <div className="country-card">
      <h1>{country.name}</h1>
      <p>{country.emoji}</p>
      <p>{country.code}</p>
      <p>{country.continent?.name}</p>
    </div>
  );
}

export default Country;

