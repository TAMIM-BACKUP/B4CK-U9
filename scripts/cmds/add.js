const fs = require("fs");
const path = __dirname + "/random-videos.json";

module.exports = {
  config: {
    name: "add",
    version: "1.0",
    author: "SAIF",
    shortDescription: {
      en: "Add video URL to list"
    },
    category: "tools",
    guide: {
      en: ".add (reply to video)"
    }
  },

  onStart: async function ({ message, event }) {
    if (!event.messageReply || event.messageReply.attachments.length === 0) {
      return message.reply("⚠️ দয়া করে কোনো ভিডিও reply করুন।");
    }

    const attachment = event.messageReply.attachments[0];

    if (attachment.type !== "video") {
      return message.reply("⚠️ শুধুমাত্র ভিডিও reply করতে হবে!");
    }

    const videoUrl = attachment.url;

    // Check if file exists; if not create
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, "[]");
    }

    let data = JSON.parse(fs.readFileSync(path, "utf-8"));

    if (data.includes(videoUrl)) {
      return message.reply("⚠️ এই ভিডিও আগেই যুক্ত করা হয়েছে।");
    }

    data.push(videoUrl);
    fs.writeFileSync(path, JSON.stringify(data, null, 2));

    return message.reply("✅ ভিডিও সফলভাবে যোগ করা হয়েছে!");
  }
};
