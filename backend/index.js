const express = require("express");
const cors = require("cors");
const {default: axios} = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
    const { username } = req.body;
  
    try {
      const r = await axios.put(
          "https://api.chatengine.io/users/",
          {username: username, secret: username, first_name: username},
          {headers: {"private-key": "75912855-bb30-4a27-af3f-3d33e41c1ff6"}}
      );
      return res.status(r.status).json(r.data);
    } catch (e) {
      // Corrected typo here: e.response instead of e.reponse
      return res.status(e.response.status).json(e.response.data);
    }
  });
  

app.listen(3001);