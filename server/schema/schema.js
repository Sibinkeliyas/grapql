const { clients, projects } = require("../sampledata");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLInt } = require("graphql");
const projectSchema = require("../models/Projects");
const clientSchema = require("../models/Client");
// client type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

const projectType = new GraphQLObjectType({
  name: "projects",
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent) {
        return clients.find((c) => c.id === parent.clientId);
      },
    },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      args: { email: { type: GraphQLString } },
      resolve() {
        return clients;
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return clientSchema.findOne({ _id: args.id });
      },
    },
    projects: {
      type: new GraphQLList(projectType),
      resolve() {
        return projectSchema.find();
      },
    },
    project: {
      type: projectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return projectSchema.find({ _id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
});
