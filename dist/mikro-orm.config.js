"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShortUrl_1 = require("./entities/ShortUrl");
const mongo_highlighter_1 = require("@mikro-orm/mongo-highlighter");
const constants_1 = require("./constants");
exports.default = {
    migrations: {
        path: "./migrations",
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    clientUrl: `mongodb+srv://admin:admin123@cluster0.uksec.mongodb.net/shortURL?retryWrites=true&w=majority`,
    type: "mongo",
    entities: [ShortUrl_1.ShortURL],
    highlighter: new mongo_highlighter_1.MongoHighlighter(),
    debug: !constants_1.__prod__,
};
//# sourceMappingURL=mikro-orm.config.js.map