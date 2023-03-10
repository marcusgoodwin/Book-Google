const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const foundUser = await User.findById(user._id);
      if (!foundUser) {
        throw new AuthenticationError("User not found!");
      }

      return foundUser;
    },
  },

  Mutation: {
    addUser: async (_, { email, password, username }) => {
      const createdUser = await User.create({ email, password, username });
      const token = signToken(createdUser);
      return { token, user: createdUser };
    },

    login: async (_, { email, password }) => {
      const foundUser = await User.findOne({ email });

      if (!foundUser) {
        throw new AuthenticationError("No USER found!");
      }

      const isCorrectPassword = await foundUser.isCorrectPassword(password);

      if (!isCorrectPassword) {
        throw new AuthenticationError("Incorrect Credentials!");
      }

      const token = signToken(foundUser);
      return { token, user: foundUser };
    },

    saveBook: async (_, args, { user }) => {
      if (!args.description) {
        args.description = "N/A";
      }
      if (!user) {
        throw new AuthenticationError("You need to be logged in!");
      }
console.log(args);
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $addToSet: { savedBooks: args } },
        { new: true, runValidators: true }
      );
console.log(updatedUser);
      return updatedUser;
    },

    removeBook: async (_, { bookId }, { user }) => {
      if (!user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );

      return updatedUser;
    },
  },
};

module.exports = resolvers;
