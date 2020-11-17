import { gql } from 'apollo-server-express';

export default gql`
    type Author {
        id: ID!
        name: String
        email: String
        password: String
    }

    type Article {
        id: ID!
        authorId: ID
        title: String
    }

    type Query {
        articles(authorId: ID!): [Article]
        article(id: ID!): Article
    }

    type Mutation {
        login(email: String!, password: String!): String
    }
`;
