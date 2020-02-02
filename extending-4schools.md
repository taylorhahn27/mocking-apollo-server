---
title: Extending Eve Porcellos 'GraphQL Mocking Techniques with Apollo Server
description: incorporate 4U data for school desktop
---

## Extending [Eve Porcello's 'GraphQL Mocking Techniques with Apollo Server'](https://moonhighway.com/mocking-apollo-server)


### Goal
Use article to: 
>    1. Develop a basic understanding of mock data.
>    2. Learn how to supply mock data for schools 4U to get a head start on the front-end development before the back-end server is in place.

The article demonstrates a straightfoward/minimalist approach to building an Apollo server locally and how to create fake data to query from.

I would like to extend this article a bit by showing how we can take the information provided and plug in mock data relevant to 4U.

#### Note - when following the article make sure to include all types within the backtics of the typeDefs function:

```
const typeDefs = gql`
  type Query {
    message: String!
  }
`;
```

This is Apollo's graphQL query langauge, not actual Javascript, so placing it within the gql backtics allows it to be read properly.

All const's belong outside of the backtics as this is plain Javascript.

### ...Follow article until you reach the faker section...

This is where things get interesting!

#### Note - make sure to not only install faker with npm but also to add a separate require statement:

```
const faker = require("faker");
```

First we'll want to create a type School:
 To simplify things we will include only a 'name' and a 'location'. Will extend later.

```
type School {
    name: String!
    location: String!
  }
```

We want to be able to query randomized school names and locations, to do this we will create two arrays (our fake 'databases').

One array 'schoolNames':

```
const schoolNames = [
  "MIT",
  "UCB",
  "Harvard",
  "San Jose State",
  "Stanford",
  "USC",
  "NYU",
  "University of Georgia"
];
```

Another array 'schoolLocations':
```
const schoolLocations = [
  "Berkeley, Ca",
  "Cambridge, Mass",
  "Palo Alto, Ca",
  "Santa Cruz, Ca",
  "NYC, Ny"
];
```

Especially pay attention to the existing custom mocks object:

```
const mocks = {
  Horse: () => ({
    description: () => faker.random.arrayElement(horseDescriptions)
  })
};
```

We need to add the following to the mocks object in order to return the appropriate randomized data:

```
  School: () => ({
    name: () => faker.random.arrayElement(schoolNames),
    location: () => faker.random.arrayElement(schoolLocations)
  }),
  Query: () => ({
    allSchools: () => new MockList(8)
  })
```

Final custom mocks object should look like this:

```
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
```

#### Note - I am purposefully keeping the original animal data that was provided in the tutorial for reference, feel free to delete if it is easier to understand and keep things clean.

Run the server! You should now be able to query on allSchools like this:

```
query {
    allSchools {
        name
        location
    }
}
```

and have results return with randomized school data:

```
{
  "data": {
    "allSchools": [
      {
        "name": "USC",
        "location": "Palo Alto, Ca"
      },
      {
        "name": "USC",
        "location": "Berkeley, Ca"
      },
      {
        "name": "MIT",
        "location": "NYC, Ny"
      },

      ...etc
```
We will eventually want to be able to save this data in some sort of makeshit memory database instead of having the data randomized everytime however, this is a good place to start playing with mock data and figuring out which data we will need.