import { Router } from "express";
import jsonStringifySafe from "json-stringify-safe";
import pool from "../db/pool.js";
import { v4 as uuidv4 } from "uuid";

const binRoutes = Router();

// Get all bins
binRoutes.get("/", async (_req, res) => {
  const sql = "SELECT * FROM bin";
  const results = await pool.query(sql);

  res.send(results.rows).end();
});

// New bin
binRoutes.get("/new", async (_req, res) => {
  const uuid = uuidv4();
  const sql = "INSERT INTO bin (endpoint) VALUES ($1)";
  await pool.query(sql, [uuid]);

  res.send(uuid).end();
});

// Get payloads from bin
binRoutes.get("/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  const getBinId = "SELECT id FROM bin WHERE endpoint=$1";
  const result = await pool.query(getBinId, [uuid]);
  const id = result.rows[0].id;

  const getPayloads =
    "SELECT http_request, http_timestamp FROM payload WHERE bin_id=$1";
  const payloadRequests = await pool.query(getPayloads, [String(id)]);
  res.send(payloadRequests.rows).end();
});

// Delete bin
binRoutes.delete("/:uuid", async (_req, _res) => {
  //
});

// Deliver payload to bin
binRoutes.post("/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  const getBinId = "SELECT id FROM bin WHERE endpoint=$1";
  const result = await pool.query(getBinId, [uuid]);
  const id = result.rows[0].id;

  const timeStamp = new Date();
  req = jsonStringifySafe(req);
  const insertPayload = `INSERT INTO payload (http_request, http_timestamp, bin_id) VALUES ($1, $2, $3) RETURNING http_request`;
  await pool.query(insertPayload, [req, timeStamp, id]);

  res.status(200).end();
});

export default binRoutes;
