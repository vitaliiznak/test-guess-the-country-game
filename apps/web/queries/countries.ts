import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
      code
    }
  }
`;