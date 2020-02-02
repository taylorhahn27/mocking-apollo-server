const { ApolloServer, gql, MockList } = require("apollo-server");
const faker = require("faker");

const typeDefs = gql`
  type Query {
    message: String!
    allCats: [Cat!]!
    allHorses: [Horse!]!
    allSchools: [School!]!
  }

  type Cat {
    id: ID!
    name: String!
    age: Int!
    nice: Boolean
  }
  type Horse {
    id: ID!
    name: String!
    netWorth: Float!
    description: String
  }

  type School {
    name: String!
    location: String!
  }
`;

const horseDescriptions = ["majestic", "honorable", "street smart"];

const schoolNames = [
  "MIT",
  "UCB",
  "Harvard",
  "San Jose State",
  "Stanford",
  "USC",
  "NYU",
  "University of Georgia",
  "Florida State"
];

const schoolLocations = [
  "Berkeley, Ca",
  "Cambridge, Mass",
  "Palo Alto, Ca",
  "Santa Cruz, Ca",
  "NYC, Ny",
  "Miami, Florida"
];

const mocks = {
  Horse: () => ({
    description: () => faker.random.arrayElement(horseDescriptions)
  }),
  School: () => ({
    name: () => faker.random.arrayElement(schoolNames),
    location: () => faker.random.arrayElement(schoolLocations)
  }),
  Query: () => ({
    allSchools: () => new MockList(8)
  })
};

// const mocks = {
//   Query: () => ({
//     allCats: () => new MockList(5)
//   }),
//   Int: () => 6,
//   String: () => "Placeholder School Name",
// };

const server = new ApolloServer({
  typeDefs,
  mocks
});

server.listen().then(({ url }) => console.log(`Server running on ${url}`));
