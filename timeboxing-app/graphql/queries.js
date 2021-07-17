import { gql } from '@apollo/client';

const GET_ALL_NOTES = gql`
    query Notes {
        notes {
          id
          title
          description
        }
    }`;

export { GET_ALL_NOTES };
