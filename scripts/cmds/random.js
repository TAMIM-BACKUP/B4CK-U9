const fs = require("fs");
const path = __dirname + "/random-videos.json";

module.exports = {
  config: {
    name: "random",
    aliases: [],
    version: "1.0",
    author: "SAIF",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Send a random video"
    },
    longDescription: {
      en: "Send a random video from the saved list"
    },
    category: "fun",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ api, event }) {
    if (!fs.existsSync(path)) fs.writeFileSync(path, "[]");
    const data = JSON.parse(fs.readFileSync(path));

    if (data.length === 0)
      return api.sendMessage("📁 The video list is empty.", event.threadID);

    const randomIndex = Math.floor(Math.random() * data.length);
    const randomUrl = data[randomIndex];

    api.sendMessage(
      {
        body: "🎥 Here's a random video:",
        attachment: await global.utils.getStreamFromURL(randomUrl)
      },
      event.threadID
    );
  }
};
