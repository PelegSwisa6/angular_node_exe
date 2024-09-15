import express from "express";
import { publishers } from "../server.js";
const domainsRouter = express.Router();
import fs from "fs";

domainsRouter.post("/:publisherName", (req, res) => {
  const publisherName = req.params.publisherName;
  const newDomain = req.body;
  console.log(publisherName);
  console.log(newDomain);

  const publisher = publishers.find(
    (existsPublisher) =>
      existsPublisher.publisher.toLowerCase() === publisherName.toLowerCase()
  );

  if (!publisher) {
    return res.status(404).json({ errorMessage: "Publisher not found" });
  }

  publisher.domains.push(newDomain);

  fs.writeFile("./db.json", JSON.stringify(publishers, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ errorMessage: "Failed to save domain" });
    }
    res.status(200).json(publisher);
  });
});

export default domainsRouter;
