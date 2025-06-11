"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const graphql_1 = require("graphql");
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../utils/auth");
exports.resolvers = {
    Query: {
        me: async (_, __, context) => {
            if (context.user) {
                return await User_1.default.findOne({ _id: context.user._id });
            }
            throw new graphql_1.GraphQLError('You need to be logged in!');
        },
    },
    Mutation: {
        addUser: async (_, { username, email, password }) => {
            const user = await User_1.default.create({ username, email, password });
            const token = (0, auth_1.signToken)(user);
            return { token, user };
        },
        login: async (_, { email, password }) => {
            const user = await User_1.default.findOne({ email });
            if (!user) {
                throw new graphql_1.GraphQLError('No user found with this email address');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new graphql_1.GraphQLError('Incorrect credentials');
            }
            const token = (0, auth_1.signToken)(user);
            return { token, user };
        },
        saveBook: async (_, { bookData }, context) => {
            if (context.user) {
                return await User_1.default.findByIdAndUpdate({ _id: context.user._id }, { $addToSet: { savedBooks: bookData } }, { new: true, runValidators: true });
            }
            throw new graphql_1.GraphQLError('You need to be logged in!');
        },
        removeBook: async (_, { bookId }, context) => {
            if (context.user) {
                return await User_1.default.findByIdAndUpdate({ _id: context.user._id }, { $pull: { savedBooks: { bookId } } }, { new: true });
            }
            throw new graphql_1.GraphQLError('You need to be logged in!');
        },
    },
};
