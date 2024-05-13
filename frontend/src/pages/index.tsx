import Header from "@/components/Header";
import { Continent, CountryType, NewCountryInputType } from "@/types";
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
  const [continents, setContinents] = useState<Continent[]>();

  const [addCountry] = useMutation(NEW_COUNTRY);

  const [getCountries, { loading, error }] = useLazyQuery(GET_COUNTRIES);

  const {} = useQuery(GET_CONTINENT, {
    onCompleted: (data) => {
      setContinents(data.continents);
    },
  });

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

          const formData = new FormData(event.target as HTMLFormElement);

          const entries = Object.fromEntries(formData.entries());

          const newCountry = {
            code: entries.code,
            name: entries.name,
            emoji: entries.emoji,
            continent: {
              id: Number(entries.continent),
            },
          };

          console.log(newCountry);

          addCountry({
            variables: { data: newCountry },
            onCompleted: () => {
              fetchCountries();
            },
          });
        }}>
        <label htmlFor="name">
          Name
          <input type="text" name="name" id="name" />
        </label>
        <label htmlFor="code">
          Code
          <input type="text" name="code" id="code" />
        </label>
        <label htmlFor="emoji">
          Emoji
          <input type="text" name="emoji" id="emoji" />
        </label>
        <label htmlFor="continent">
          Continent
          <select name="continent" id="continent">
            {continents &&
              continents.map((continent: Continent) => (
                <option key={continent.id} value={continent.id}>
                  {continent.name}
                </option>
              ))}
          </select>
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

