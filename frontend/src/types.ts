export type CountryType = {
  id: number;
  code: string;
  name: string;
  emoji: string;
  continent?: Continent;
};

export type Continent = {
  id: number;
  name: string;
  countries?: CountryType[];
};

