module.exports = {
  config: {
    name: "autoreact",
    version: "1.0",
    author: "SAIF",
    countDown: 0,
    role: 0,
    shortDescription: "React automatically to every message",
    longDescription: "Bot will react with a random emoji from a given list",
    category: "fun",
    guide: "This command works automatically via onChat"
  },

  onStart: async function () {
    // Required placeholder for Goat Bot V2
  },

  onChat: async function ({ api, event }) {
    const emojis = ["🙂", "🙁", "🐤", "🕊️", "🌻", "🐳", "🦋"];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    try {
      await api.setMessageReaction(randomEmoji, event.messageID, event.threadID, event.senderID);
    } catch (e) {
      console.error("AutoReact error:", e);
    }
  }
};
