export type CountryType = {
  id: number;
  code: string;
  name: string;
  emoji: string;
  continent?: Continent;
};

export type NewCountryInputType = {
  code: string;
  name: string;
  emoji: string;
  continent?: number;
};

export type Continent = {
  id: number;
  name: string;
  countries: CountryType[];
};

