import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import express from "express";
import { ShortURL } from "./entities/ShortUrl";

const main = async () => {
  const orm = await MikroORM.init();

  const app = express();
  const PORT = process.env.PORT || 8000;

  app.use(express.json());

  app.get("/", (_req, res) => {
    res.json({
      msg: "Hello From URL Shortener By Vidur Khanal",
    });
  });

  app.get("/get/alllinks", async (_req, res) => {
    return res.send(await orm.em.find(ShortURL, {}));
  });

  app.get("/:shorturl", async (req, res) => {
    const providedURL = req.params.shorturl;
    const requiredURL = await orm.em.findOne(ShortURL, {
      shortURL: providedURL,
    });
    if (!requiredURL) {
      return res.status(400).send("NOT FOUND");
    }
    requiredURL.visits++;
    orm.em.persistAndFlush(requiredURL);
    return res.redirect(requiredURL?.longURL);
  });

  app.listen(PORT, () => {
    console.log("SERVER HAS BEEN STARTED");
  });
};

main().catch((err) => console.log(err.message));
