import express from "express";
import 'dotenv/config'
const app = express();

const getData = async () => {
  const data = await fetch("https://api.api-ninjas.com/v1/dadjokes", {
    headers: { "X-Api-Key": process.env.DAD_JOKE_API_KEY },
  });
  const res = await data.json();
  // console.log(res);
  return res;
};

const getRandomImage = async () => {
  let data = await fetch(
    `https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_API_KEY}&count=1`
  );
  let res = await data.json();
  return res[0].urls;
};

app.get("/api/joke/random", async (req, res) => {
  try {
    const data = await getData();
    // console.log(data[0].joke);
    if (data.error) {
      res.status(500).json(data);
    } else {
      res.send(`
        <html>
        <head></head>
        <body>
        <p>${data[0].joke}</p>
        </body>
        </html>
      `);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/image/random", async (req, res) => {
  try {
    const data = await getRandomImage();
    if (data.error) {
      res.status(500).json(data);
    } else {
      res.send(`
        <html>
        <head></head>
        <body>
        <img style="width: 630px;" src=${data.thumb}/>
        </body>
        </html>
      `);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/joke&&image/random", async (req, res) => {
  try {
    const data1 = await getData();
    const data2 = await getRandomImage();
    res.send(`
      <html>
      <head></head>
      <body>
      <h3>${data1[0].joke}<h3>
      <img style="width: 630px;" src=${data2.thumb}/>
      </body>
      </html>
    `);

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(1000, () => {
  console.log("server is running on port 1000");
});