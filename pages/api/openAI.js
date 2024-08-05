/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default async function post(req, res) {
  console.log(req.method);
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { messageArr, pUid } = req.body;
  const api_url = `${process.env.NEXT_PUBLIC_URL}/openAI/consulting_emotion_pupu`;
  let parseMessageArr;
  console.log(messageArr);
  try {
    if (typeof messageArr === "string") {
      parseMessageArr = JSON.parse(messageArr);
    } else parseMessageArr = [...messageArr];

    const response = await axios
      .post(
        api_url,
        {
          EBTData: { messageArr, pUid },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data);
    // console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Next.js Serverlss(openAI) Error" });
  }
}
