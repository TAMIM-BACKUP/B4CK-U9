const fs = require("fs-extra");
const axios = require("axios");

module.exports = {
  config: {
    name: 'autolink',
    version: '1.0',
    author: 'Kshitiz & Mr Bayzid',
    countDown: 5,
    role: 0,
    shortDescription: 'auto video downloader',
    longDescription: '',
    category: '𝗠𝗘𝗗𝗜𝗔',
    guide: {
      en: '{p}{n}',
    }
  },

  onStart: async function () {},

  onChat: async function ({ api, event }) {
    const linkCheck = this.checkLink(event.body);
    if (linkCheck) {
      const { type, url } = linkCheck;
      this.downLoad(url, type, api, event);
    }
  },

  downLoad: function (url, type, api, event) {
    const time = Date.now();
    const path = __dirname + `/cache/${time}.${type}`;

    this.getLink(url).then(res => {
      const downloadUrl = res;

      axios({
        method: "GET",
        url: downloadUrl,
        responseType: "arraybuffer"
      }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data));

        const fileSizeMB = fs.statSync(path).size / 1024 / 1024;
        if (fileSizeMB > 25) {
          return api.sendMessage("❌ The file is too large to send (over 25MB)", event.threadID, () => fs.unlinkSync(path), event.messageID);
        }

        api.sendMessage({
          body: `✅ Here's your ${type === 'mp4' ? 'video' : 'audio'}!`,
          attachment: fs.createReadStream(path)
        }, event.threadID, () => fs.unlinkSync(path), event.messageID);

      }).catch(err => {
        console.error(err);
        api.sendMessage("❌ Failed to download the file.", event.threadID, event.messageID);
      });
    }).catch(err => {
      console.error(err);
      api.sendMessage("❌ Failed to fetch the download link.", event.threadID, event.messageID);
    });
  },

  getLink: function (url) {
    if (url.includes("tiktok")) {
      return axios.get(`https://api.nayan-project.repl.co/tiktok/downloadvideo?url=${url}`)
        .then(res => res.data.data.play);
    } else if (url.includes("facebook")) {
      return axios.get(`https://api.samirthakuri.repl.co/api/videofb?url=${url}`)
        .then(res => res.data.video);
    } else if (url.includes("instagram")) {
      return axios.get(`https://for-devs.rishadapis.repl.co/api/instadl?url=${url}&apikey=fuck`)
        .then(res => res.data.video);
    } else if (url.includes("youtu.be") || url.includes("youtube.com")) {
      return axios.get(`https://api.nayan-project.repl.co/nayan/yt?url=${url}`)
        .then(res => res.data.links[1].url);
    } else {
      return Promise.reject("Invalid or unsupported URL.");
    }
  },

  checkLink: function (message) {
    const urlRegex = /(http(s)?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
    const found = message.match(urlRegex);
    const media = ['tiktok', 'facebook', 'douyin', 'youtube', 'youtu', 'twitter', 'instagram', 'kuaishou', 'fb'];

    if (!found) return false;
    const validUrl = found[0];

    if (this.isVaildUrl(validUrl)) {
      if (media.some(item => validUrl.includes(item))) {
        return {
          type: "mp4",
          url: validUrl
        };
      } else if (validUrl.includes("soundcloud") || validUrl.includes("zingmp3")) {
        return {
          type: "mp3",
          url: validUrl
        };
      }
    }

    return false;
  },

  isVaildUrl: function (url) {
    const regex = /^(https?:\/\/)?([\w.-]+\.[a-z]{2,})(\/\S*)?$/i;
    return regex.test(url);
  }
};
