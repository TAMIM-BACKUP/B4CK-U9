module.exports = {
  config: {
    name: "autotime",
    version: "1.1",
    author: "ChatGPT x saif",
    countDown: 5,
    role: 0,
    shortDescription: "Send time to all threads every 10 minutes",
    longDescription: "Sends current time automatically to all inbox/groups every 10 minutes",
    category: "𝗔𝗨𝗧𝗢",
    guide: {
      en: "Auto sends current time to all chats every 10 minutes"
    }
  },

  // চালু হবার সময় বট সব থ্রেডে টাইম পাঠাতে শুরু করবে
  onStart: async function ({ api }) {
    // প্রতি ১০ মিনিটে টাইম পাঠানো ফাংশন
    setInterval(async () => {
      try {
        const allThreads = await api.getThreadList(100, null, ["INBOX"]);
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;

        const timeString = `⏰ এখন সময়: ${hours}:${minutes} ${ampm}`;

        // সব থ্রেডে মেসেজ পাঠানো
        for (const thread of allThreads) {
          api.sendMessage(timeString, thread.threadID);
        }
      } catch (err) {
        console.error("AutoTime Error:", err);
      }
    }, 10 * 60 * 1000); // প্রতি ১০ মিনিটে
  }
};
