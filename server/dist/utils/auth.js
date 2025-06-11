"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const graphql_1 = require("graphql");
const secret = process.env.JWT_SECRET || 'mysecretsshhhhh';
const expiration = '2h';
const signToken = (user) => {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    };
    return jsonwebtoken_1.default.sign({ data: payload }, secret, { expiresIn: expiration });
};
exports.signToken = signToken;
const authMiddleware = async ({ req }) => {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }
    if (!token) {
        return req;
    }
    try {
        const { data } = jsonwebtoken_1.default.verify(token, secret, { maxAge: expiration });
        req.user = data;
    }
    catch {
        throw new graphql_1.GraphQLError('Invalid token');
    }
    return req;
};
exports.authMiddleware = authMiddleware;
