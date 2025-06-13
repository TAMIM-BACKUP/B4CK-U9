module.exports = {
  config: {
    name: "chicken",
    version: "1.0",
    author: "SAIF",
    countDown: 0,
    role: 0,
    shortDescription: {
      en: "Responds to 🐤,🐥"
    },
    longDescription: {
      en: "Sends a reply when 🐤,🐥 is sent"
    },
    category: "fun",
    guide: {
      en: "Just send 🐤,🐥"
    }
  },

  onStart: async function () {},

  onChat: async function ({ message, event }) {
    const content = event.body;
    if (content && content.includes("🐤,🐥")) {
      return message.reply("শাহিন মুরগির বাচ্চাটাকে ধরে ফেল 🐤");
    }
  }
};
