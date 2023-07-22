import { Router } from "express";
import jsonStringifySafe from "json-stringify-safe";
import pool from "../pool.js";
import { v4 as uuidv4 } from "uuid";

const binRoutes = Router();

binRoutes.get("/hook", async (req, res) => {
  const sql = "SELECT * FROM bin";
  const results = await pool.query(sql);
  res.send(results.rows).end();
});

binRoutes.get("/hook/new", async (req, res) => {
  const uuid = uuidv4();
  const sql = "INSERT INTO bin (endpoint) VALUES ($1)";
  await pool.query(sql, [uuid]);
  res.send(uuid).end();
});

binRoutes.get("/hook/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  const sql = "SELECT id FROM bin WHERE endpoint=$1";
  const result = await pool.query(sql, [uuid]);
  const id = result.rows[0].id;
  const sql2 =
    "SELECT http_request, http_timestamp FROM payload WHERE bin_id=$1";
  const payloadRequests = await pool.query(sql2, [String(id)]);
  res.send(payloadRequests.rows).end();
});

binRoutes.delete("/hook/:uuid", async (req, res) => {
  //
});

binRoutes.post("/hook/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  const sql = "SELECT id FROM bin WHERE endpoint=$1";
  const result = await pool.query(sql, [uuid]);
  const id = result.rows[0].id;
  const timeStamp = new Date();
  req = jsonStringifySafe(req);
  const sql2 = `INSERT INTO payload (http_request, http_timestamp, bin_id) VALUES ($1, $2, $3) RETURNING http_request`;
  await pool.query(sql2, [req, timeStamp, id]);

  res.status(200).end();
});

export default binRoutes;
