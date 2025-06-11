"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_path_1 = __importDefault(require("node:path"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const body_parser_1 = require("body-parser");
const connection_1 = __importDefault(require("./config/connection"));
const index_1 = require("./schemas/index");
const auth_1 = require("./utils/auth");
const index_2 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Create Apollo Server
const server = new server_1.ApolloServer({
    typeDefs: index_1.typeDefs,
    resolvers: index_1.resolvers,
});
// Start Apollo Server
const startApolloServer = async () => {
    await server.start();
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    // if we're in production, serve client/build as static assets
    if (process.env.NODE_ENV === 'production') {
        app.use(express_1.default.static(node_path_1.default.join(__dirname, '../client/build')));
    }
    // Apply Apollo Server middleware
    app.use('/graphql', (0, body_parser_1.json)(), (0, express4_1.expressMiddleware)(server, {
        context: auth_1.authMiddleware,
    }));
    // Keep the REST API routes for backward compatibility
    app.use(index_2.default);
    connection_1.default.once('open', () => {
        app.listen(PORT, () => {
            console.log(`🌍 Now listening on localhost:${PORT}`);
            console.log(`🚀 GraphQL server ready at http://localhost:${PORT}/graphql`);
        });
    });
};
startApolloServer();
