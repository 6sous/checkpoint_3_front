import Header from "@/components/Header";
import { CountryType, NewCountryInputType } from "@/types";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";

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

const NEW_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      code
      emoji
      id
      name
    }
  }
`;

const GET_CONTINENT = gql`
  query Query {
    continents {
      id
      name
    }
  }
`;

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [newCountry, setNewCountry] = useState<NewCountryInputType>({
    code: "",
    name: "",
    emoji: "",
  });

  const [addCountry] = useMutation(NEW_COUNTRY);

  const fillForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCountry({ ...newCountry, [event.target.name]: event.target.value });
  };

  const [getCountries, { loading, error }] = useLazyQuery(GET_COUNTRIES);

  const { getContinents } = useQuery(GET_CONTINENT);

  const fetchCountries = () => {
    getCountries({
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        setCountries(data.countries);
      },
    });
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>Error</h1>;

  return (
    <>
      <h1>Countries</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          addCountry({
            variables: { data: newCountry },
            onCompleted: () => {
              fetchCountries();
            },
          });
        }}>
        <label htmlFor="name">
          Name
          <input type="text" name="name" id="name" onChange={fillForm} />
        </label>
        <label htmlFor="code">
          Code
          <input type="text" name="code" id="code" onChange={fillForm} />
        </label>
        <label htmlFor="emoji">
          Emoji
          <input type="text" name="emoji" id="emoji" onChange={fillForm} />
        </label>
        <button type="submit">Add new country</button>
      </form>

      <section className="countries">
        {countries &&
          countries.map((country: CountryType) => (
            <Link
              href={`/country/${country.code}`}
              className="country"
              key={country.id}>
              <h3>{country.name}</h3>
              <span>{country.emoji}</span>
            </Link>
          ))}
      </section>
    </>
  );
}

