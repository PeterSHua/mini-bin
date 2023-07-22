import axios from "axios";
const baseURL = "https://psh.pp.ua";

const getAllPayloads = async (uuid) => {
  const response = await axios.get(`${baseURL}/hook/${uuid}`);

  return response.data;
};

const getAllBins = async () => {
  const response = await axios.get(`${baseURL}/hook`);

  return response.data;
};

const createBin = async () => {
  const response = await axios.get(`${baseURL}/hook/new`);

  return response.data;
};

const deleteBin = async (uuid) => {
  await axios.delete(`${baseURL}/${uuid}`);
};

const exported = {
  getAllPayloads,
  createBin,
  deleteBin,
  getAllBins,
};

export default exported;
