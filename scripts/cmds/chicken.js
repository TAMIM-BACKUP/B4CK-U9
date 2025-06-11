module.exports = {
  config: {
    name: "chicken",
    version: "1.0",
    author: "SAIF",
    countDown: 1,
    role: 0,
    shortDescription: "🐤 trigger",
    longDescription: "Triggers a funny chicken message when someone types 🐤",
    category: "fun",
    guide: "Just type 🐤 without any prefix"
  },

  onChat: async function ({ event, message }) {
    const content = event.body.toLowerCase();
    if (content === "🐤") {
      return message.reply("মুরগির বাচ্চাটারে ধর 🐥");
    }
  }
};
