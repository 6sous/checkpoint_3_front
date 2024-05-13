import { NewCountryInputType } from "@/types";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

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

function NewCountry() {
  const [newCountry, setNewCountry] = useState<NewCountryInputType>({
    code: "",
    name: "",
    emoji: "",
  });
  const router = useRouter();

  const [addCountry] = useMutation(NEW_COUNTRY, {
    variables: { data: newCountry },
    onCompleted: (data) => router.push("/"),
  });

  const fillForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCountry({ ...newCountry, [event.target.name]: event.target.value });
  };

  console.log(newCountry);

  return (
    <form>
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
    </form>
  );
}

export default NewCountry;

