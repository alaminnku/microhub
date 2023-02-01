import pool from "@config/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  pool.query("SELECT * FROM recipes", function (err, results, fields) {
    if (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    } else {
      res.status(200).send(results);
    }
  });
}
