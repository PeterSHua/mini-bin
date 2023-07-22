import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : process.env.BACKEND_URL;

const getAllPayloads = async (uuid) => {
  const response = await axios.get(`${baseURL}/bin/${uuid}`);

  return response.data;
};

const getAllBins = async () => {
  const response = await axios.get(`${baseURL}/bin`);

  return response.data;
};

const createBin = async () => {
  const response = await axios.get(`${baseURL}/bin/new`);

  return response.data;
};

const deleteBin = async (uuid) => {
  await axios.delete(`${baseURL}/${uuid}`);
};

const binService = {
  getAllPayloads,
  createBin,
  deleteBin,
  getAllBins,
};

export default binService;
