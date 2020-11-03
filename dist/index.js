"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@mikro-orm/core");
const express_1 = __importDefault(require("express"));
const ShortUrl_1 = require("./entities/ShortUrl");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const orm = yield core_1.MikroORM.init();
    const app = express_1.default();
    const PORT = process.env.PORT || 8000;
    app.use(express_1.default.json());
    app.get("/", (_req, res) => {
        res.json({
            msg: "Hello From URL Shortener By Vidur Khanal",
        });
    });
    app.get("/get/alllinks", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res.send(yield orm.em.find(ShortUrl_1.ShortURL, {}));
    }));
    app.get("/:shorturl", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const providedURL = req.params.shorturl;
        const requiredURL = yield orm.em.findOne(ShortUrl_1.ShortURL, {
            shortURL: providedURL,
        });
        if (!requiredURL) {
            return res.status(400).send("NOT FOUND");
        }
        requiredURL.visits++;
        orm.em.persistAndFlush(requiredURL);
        return res.redirect(requiredURL === null || requiredURL === void 0 ? void 0 : requiredURL.longURL);
    }));
    app.listen(PORT, () => {
        console.log("SERVER HAS BEEN STARTED");
    });
});
main().catch((err) => console.log(err.message));
//# sourceMappingURL=index.js.map