/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default async function get(req, res) {
  console.log(req.method);
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    res.json({ message: "Success GET Request" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Next.js Serverlss(openAI) Error" });
  }
}
