import { Country } from "@/types";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const GET_COUNTRIES = gql`
  query ExampleQuery {
    countries {
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

export default function Home() {
  const [countries, setCountries] = useState([]);

  const { loading, error } = useQuery(GET_COUNTRIES, {
    onCompleted: (data) => {
      setCountries(data.countries);
    },
  });

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>Error</h1>;

  return (
    <>
      <h1>Countries</h1>
      <section className="countries">
        {countries &&
          countries.map((country: Country) => (
            <div className="country" key={country.id}>
              <h3>{country.name}</h3>
              <span>{country.emoji}</span>
            </div>
          ))}
      </section>
    </>
  );
}

