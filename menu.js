const moment = require("moment-timezone");
const PhoneNumber = require("awesome-phonenumber");
const fs = require("fs");
const fetch = require("node-fetch");
const os = require("os");
const freeMemory = os.freemem();
const totalMemory = os.totalmem();
const usedMemory = totalMemory - freeMemory;

module.exports = {
 help: ["menu"].map((a) => a + " *[view main menu]*"),
 tags: ["main"],
 command: ["menu"],
 code: async (m, { conn, usedPrefix, command, args }) => {
  const perintah = args[0] || "tags";
  const tagCount = {};
  const tagHelpMapping = {};
  const user = global.db.data.users[m.sender];

  Object.keys(global.plugins)
    .filter((plugin) => !plugin.disabled)
    .forEach((plugin) => {
      const tagsArray = Array.isArray(global.plugins[plugin].tags)
        ? global.plugins[plugin].tags
        : [];

      if (tagsArray.length > 0) {
        const helpArray = Array.isArray(global.plugins[plugin].help)
          ? global.plugins[plugin].help
          : [global.plugins[plugin].help];

        tagsArray.forEach((tag) => {
          if (tag) {
            if (tagCount[tag]) {
              tagCount[tag]++;
              tagHelpMapping[tag].push(...helpArray);
            } else {
              tagCount[tag] = 1;
              tagHelpMapping[tag] = [...helpArray];
            }
          }
        });
      }
    });

  let help = Object.values(global.plugins)
    .filter((plugin) => !plugin.disabled)
    .map((plugin) => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: "customPrefix" in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      };
    });

  if (perintah === "tags") {
    const daftarTag = Object.keys(tagCount)
      .sort()
      .join(`\n│  ◦ ${usedPrefix + command} `);
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(4001);
    let _mpt;
    if (process.send) {
      process.send("uptime");
      _mpt =
        (await new Promise((resolve) => {
          process.once("message", resolve);
          setTimeout(resolve, 1000);
        })) * 1000;
    }
    let mpt = clockString(_mpt);
    let name = m.pushName || conn.getName(m.sender);
    let prn = thumb;
    let fitur = Object.values(plugins)
      .filter((v) => v.help && !v.disabled)
      .map((v) => v.help)
      .flat(1);
    let  wan = `${
      global.menu === "button"
        ? `${Func.Styles(`╭───────────────╮
│       *Konnichiwa🙌*         │   ╰───────────────╯`)}

${Func.Styles(`Hi`)} @${m.sender.split("@")[0]}
${Func.Styles(`${namebot} Adalah sistem otomatis whatsApp yang dapat membantu anda dalam hal apapun di WhatsApp!`)}

${Func.Styles(`╠═【 _Information Developer_ 】╣
╠ *Name Dev* : *alyadziruスジ💫*
╠ *Contact Dev* : *@6285973056944👤*
╠ *Device* : *Android📱*
╠ *Status* : *Developer👤*
╠ *Bot Type* : *Plugins⚙️*
╠══════════════════╣

 ═╣【 *_© alyadzirudevスジ_* 】╠═`)}

${Func.Styles(`saya di desain oleh Seorang Developer hebat yang mengembangkan bot whatsApp berbasis Javascript ini dengan menyajikan beberapa fitur seperti *AI*, *DOWNLOADER*, *GAME*, *TOOLS* dan *lainnya*`)}

${Func.Styles(`
╭─ •  「 *\`</> INFO BOT </>\`* 」
│  ◦ *Name Bot :* ${namebot}
│  ◦ *Total User :* ${Func.formatNumber(Object.keys(db.data.users).length)}
│  ◦ *Total Chat:* ${Object.keys(conn.chats).length}
│  ◦ *Uptime :* *[ ${Func.toTime(process.uptime() * 1000)} ]*
│  ◦ *Total Memory :* ${Func.formatSize(totalMemory)}
│  ◦ *Free Memory :* ${Func.formatSize(freeMemory)}
│  ◦ *Used Memory :* ${Func.formatSize(usedMemory)}
╰──── •`)}

${Func.Styles(`
╭─ •  「 *\`</> INFO USER </>\`* 」
│  ◦ *Name User :* ${m.name}
│  ◦ *Tag User :*`)} @${m.sender.split("@")[0]}
${Func.Styles(`│  ◦ *Limit User  :* ${user.limit}
│  ◦ *Premium :* ${user.premium ? "✓" : "x"}
│  ◦ *Saldo User :* ${Func.formatNumber(user.saldo)} Rp
╰──── •`)}`
        : `${Func.Styles(`╭───────────────╮
│       *Konnichiwa🙌*         │   ╰───────────────╯`)}

${Func.Styles(`Hi`)} @${m.sender.split("@")[0]}
${Func.Styles(`${namebot} Adalah sistem otomatis whatsApp yang dapat membantu anda dalam hal apapun di WhatsApp!`)}

${Func.Styles(`╠═【 _Information Developer_ 】╣
╠ *Name Dev* : *alyadziruスジ💫*
╠ *No Dev* : *@6285973056944👤*
╠ *Device* : *Android📱*
╠ *Status* : *Developer👤*
╠ *Bot Type* : *Plugins⚙️*
╠══════════════════╣

 ═╣【 *_© alyadzirudevスジ_* 】╠═`)}

${Func.Styles(`saya di desain oleh Seorang Developer hebat yang mengembangkan bot whatsApp berbasis Javascript ini dengan menyajikan beberapa fitur seperti *AI*, *DOWNLOADER*, *GAME*, *TOOLS* dan *lainnya*`)}

${Func.Styles(`
╭─ •  「 *\`</> INFO BOT </>\`* 」
│  ◦ *Name Bot :* ${namebot}
│  ◦ *Total User :* ${Func.formatNumber(Object.keys(db.data.users).length)}
│  ◦ *Total Chat:* ${Object.keys(conn.chats).length}
│  ◦ *Uptime :* *[ ${Func.toTime(process.uptime() * 1000)} ]*
│  ◦ *Total Memory :* ${Func.formatSize(totalMemory)}
│  ◦ *Free Memory :* ${Func.formatSize(freeMemory)}
│  ◦ *Used Memory :* ${Func.formatSize(usedMemory)}
╰──── •`)}

${Func.Styles(`
╭─ •  「 *\`</> INFO USER </>\`* 」
│  ◦ *Name User :* ${m.name}
│  ◦ *Tag User :*`)} @${m.sender.split("@")[0]}
${Func.Styles(`│  ◦ *Limit User  :* ${user.limit}
│  ◦ *Premium :* ${user.premium ? "✓" : "x"}
│  ◦ *Saldo User :* ${Func.formatNumber(user.saldo)} Rp
╰──── •`)}

╭─ •  「 *\`</> LIST MENU </>\`* 」
│  ◦ ${usedPrefix + command} all
│  ◦ ${usedPrefix + command} ${daftarTag}
╰──── •`
    }

`;

    if (global.menu === "simple") {
      conn.reply(m.chat,  wan, fkontak);
    } else if (global.menu === "doc") {
      conn.sendMessage(
        m.chat,
        {
          document: {
            url: "https://wa.me/" + conn.user.jid.split("@")[0],
          },
          caption:  wan,
          mimetype: "text/html",
          fileName: `© S H I R O K O  M D`,
          contextInfo: {
            mentionedJid: conn.parseMention( wan),
            isForwarded: true,
            businessMessageForwardInfo: {
              businessOwnerJid: conn.user.jid,
            },
            externalAdReply: {
              title: `© S H I R O K O  M D`,
              body: null,
              thumbnailUrl: thumb,
              sourceUrl: sgc,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: fkontak },
      );
    } else if (global.menu === "gif") {
      conn.sendMessage(
        m.chat,
        {
          video: { url: gif },
          gifPlayback: true,
          gifAttribution: ~~(Math.random() * 2),
          caption:  wan,
          contextInfo: {
            mentionedJid: conn.parseMention( wan),
            externalAdReply: {
              title: `S H I R O K O  M D`,
              body: null,
              thumbnailUrl: thumb,
              sourceUrl: sgc,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: fkontak },
      );
    } else if (global.menu === "payment") {
      await conn.relayMessage(
        m.chat,
        {
          requestPaymentMessage: {
            currencyCodeIso4217: "USD",
            amount1000:
              Object.values(plugins)
                .filter((v) => v.help && !v.disabled)
                .map((v) => v.help)
                .flat(1).length * 1000,
            requestFrom: m.sender,
            noteMessage: {
              extendedTextMessage: {
                text:  wan,
                contextInfo: {
                  mentionedJid: conn.parseMention( wan),
                  externalAdReply: {
                    showAdAttribution: true,
                  },
                },
              },
            },
          },
        },
        {
          usedJid: conn.user.jid,
          quoted: fkontak,
          upload: conn.waUploadToServer,
        },
      );
    } else if (global.menu === "edit") {
      const arr = [
        "➳ *L*",
        "➳ *L O*",
        "➳ *L O A*",
        "➳ *L O A D*",
        "➳ *L O A D I*",
        "➳ *L O A D I N*",
        "➳ *L O A D I N G*",
        "➳ *L O A D I N G .*",
        "➳ *L O A D I N G . .*",
        "➳ *L O A D I N G . . .*",
        "➳ *L O A D I N G . .*",
        "➳ *L O A D I N G .*",
        "➳ *L O A D I N G*",
        "➳ *W E L C O M E  T O  S H I R O K O  M D*",
         wan,
      ];

      let { key } = await conn.sendMessage(
        m.chat,
        {
          image: {
            url: thumb,
          },
          caption: `➳ *Please Waif...*`,
          contextInfo: {
            mentionedJid: conn.parseMention( wan),
            isForwarded: true,
            businessMessageForwardInfo: {
              businessOwnerJid: conn.user.jid,
            },
          },
        },
        { quoted: fkontak },
      );
      for (let i = 0; i < arr.length; i++) {
        await conn.sendMessage(
          m.chat,
          {
            image: {
              url: "https://wa.me",
            },
            caption: arr[i],
            edit: key,
            contextInfo: {
              mentionedJid: conn.parseMention( wan),
              isForwarded: true,
              businessMessageForwardInfo: {
                businessOwnerJid: conn.user.jid,
              },
            },
          },
          { quoted: fkontak },
        );
      }
    } else if (global.menu === "button") {
      const list = Object.keys(tagCount);
      let array = [];
      for (let i of list) {
        array.push({
              title: "( Menu " + i + " )",  
              body: "Click to view command " + i,
              command: `${usedPrefix + command} ${i}`,
           });
      }
       let sections = [{
          headers: "• INFORMATION BOT",
          rows: [
            {
              title: "• Contact owner",
              body: `Report bug or request feature`,
              command: `${usedPrefix}owner`,
            },
            {
              title: "• Server Info",
              body: `View server information`,
              command: `${usedPrefix}ping`,
            },
            {
              title: "• Script Bot",
              body: `Click for get source code`,
              command: `${usedPrefix}sc`,
            }]
          },{
             headers: "LIST CATEGORY",
             rows: [...array]
          },{
          headers: "• INFORMATION BOT",
          rows: [
            {
              title: "• Menu All",
              body: `View All features`,
              command: `${usedPrefix + command} all`,
            },
            {
              title: "• Shop Bot",
              body: `get price shop boy`,
              command: `${usedPrefix}shopbot`,
            },
            {
              title: "• Credits Bot",
              body: `Who contributed to this bot?`,
              command: `${usedPrefix}tqto`,
            }]
          }];
  conn.sendList(m.chat, wm, sections, fkontak, {
         body:  wan,
         footer: wm,
         url: thumb
    })
    } else {
      conn.sendMessage(
        m.chat,
        {
          text:  wan,
          contextInfo: {
            mentionedJid: conn.parseMention( wan),
            externalAdReply: {
              title: `S H I R O K O  M D`,
              body: null,
              thumbnailUrl: thumb,
              sourceUrl: sgc,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: fkontak },
      );
    }
  } else if (tagCount[perintah]) {
    const daftarHelp = tagHelpMapping[perintah]
      .map((helpItem, index) => {
        return `${helpItem}`;
      })
      .join(`\n│  ◦ ` + "");
    let  wan =
      Func.Styles(`╭─ •  「 *\`</> MENU ${perintah.toUpperCase()} </>\`* 」
│  ◦ ${daftarHelp}
╰──── •	
`);

    if (global.menu === "simple") {
      conn.reply(m.chat,  wan, fkontak);
    } else if (global.menu === "doc") {
      conn.sendMessage(
        m.chat,
        {
          document: {
            url: "https://wa.me/" + conn.user.jid,
          },
          caption:  wan,
          mimetype: "text/html",
          fileName: `© S H I R O K O  M D`,
          contextInfo: {
            mentionedJid: conn.parseMention( wan),
            isForwarded: true,
            businessMessageForwardInfo: {
              businessOwnerJid: conn.user.jid,
            },
            externalAdReply: {
              title: `© S H I R O K O  M D`,
              body: null,
              thumbnailUrl: thumb,
              sourceUrl: sgc,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: fkontak },
      );
    } else if (global.menu === "gif") {
      conn.sendMessage(
        m.chat,
        {
          video: { url: gif },
          gifPlayback: true,
          gifAttribution: ~~(Math.random() * 2),
          caption:  wan,
          contextInfo: {
            mentionedJid: conn.parseMention( wan),
            externalAdReply: {
              title: `S H I R O K O  M D`,
              body: null,
              thumbnailUrl: thumb,
              sourceUrl: sgc,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: fkontak },
      );
    } else if (global.menu === "payment") {
      await conn.relayMessage(
        m.chat,
        {
          requestPaymentMessage: {
            currencyCodeIso4217: "USD",
            amount1000:
              Object.values(plugins)
                .filter((v) => v.help && !v.disabled)
                .map((v) => v.help)
                .flat(1).length * 1000,
            requestFrom: m.sender,
            noteMessage: {
              extendedTextMessage: {
                text:  wan,
                contextInfo: {
                  mentionedJid: conn.parseMention( wan),
                  stanzaId: m.key.id,
                  remoteJid: m.isGroup ? m.sender : m.key.remoteJid,
                  participant: m.key.participant || m.sender,
                  fromMe: m.fromMe,
                  quotedMessage: m.message,
                  externalAdReply: {
                    showAdAttribution: true,
                  },
                },
              },
            },
          },
        },
        {},
      );
    } else if (global.menu === "edit") {
      const arr = [
        "➳ *L*",
        "➳ *L O*",
        "➳ *L O A*",
        "➳ *L O A D*",
        "➳ *L O A D I*",
        "➳ *L O A D I N*",
        "➳ *L O A D I N G*",
        "➳ *L O A D I N G .*",
        "➳ *L O A D I N G . .*",
        "➳ *L O A D I N G . . .*",
        "➳ *L O A D I N G . .*",
        "➳ *L O A D I N G .*",
        "➳ *L O A D I N G*",
        "➳ *W E L C O M E  T O  S H I R O K O  M D*",
         wan,
      ];

      let { key } = await conn.sendMessage(
        m.chat,
        {
          image: {
            url: thumb,
          },
          caption: `➳ *Please Waif...*`,
          contextInfo: {
            mentionedJid: conn.parseMention( wan),
            isForwarded: true,
            businessMessageForwardInfo: {
              businessOwnerJid: conn.user.jid,
            },
          },
        },
        { quoted: fkontak },
      );
      for (let i = 0; i < arr.length; i++) {
        await conn.sendMessage(
          m.chat,
          {
            image: {
              url: thumb,
            },
            caption: arr[i],
            edit: key,
            contextInfo: {
              mentionedJid: conn.parseMention( wan),
              isForwarded: true,
              businessMessageForwardInfo: {
                businessOwnerJid: conn.user.jid,
              },
            },
          },
          { quoted: fkontak },
        );
      }
    } else if (menu === "button") {
      conn.sendButton(
        m.chat,
        [
          ["Creator bot", ".owner"],
          ["Script Info", ".sc"],
          ["Group Bot", ".gcbot"],
        ],
        fkontak,
        {
          body:  wan,
          url: thumb,
        },
      );
    } else {
      conn.sendMessage(
        m.chat,
        {
          text:  wan,
          contextInfo: {
            mentionedJid: conn.parseMention( wan),
            externalAdReply: {
              title: `S H I R O K O  M D`,
              body: null,
              thumbnailUrl: thumb,
              sourceUrl: sgc,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: fkontak },
      );
    }
  } else if (perintah === "all") {
    let name = m.pushName || conn.getName(m.sender);
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(4001);
    let number = 0;
    const allTagsAndHelp = Object.keys(tagCount)
      .map((tag) => {
        const daftarHelp = tagHelpMapping[tag]
          .map((helpItem, index, i) => {
            return `${usedPrefix + helpItem}`;
          })
          .join("\n│  ◦ " + "");
        return Func.Styles(`╭─ •  「 *\`</> MENU ${tag.toUpperCase()} </>\`* 」
│  ◦ ${daftarHelp}
╰──── •	
`);
      })
      .join("\n");
    let  wan = `${Func.Styles(`╭───────────────╮
│       *Konnichiwa🙌*         │   ╰───────────────╯`)}

${Func.Styles(`Hi`)} @${m.sender.split("@")[0]}
${Func.Styles(`${namebot} Adalah sistem otomatis whatsApp yang dapat membantu anda dalam hal apapun di WhatsApp!`)}

${Func.Styles(`╠═【 _Information Developer_ 】╣
╠ *Name Dev* : *alyadziruスジ*
╠ *No Dev* : *@6285973056944*
╠ *Device* : *Android*
╠ *Status* : *Developer*
╠ *Bot Type* : *Plugins*
╠══════════════════╣

 ═╣【 *_© alyadzirudevスジ_* 】╠═`)}

${Func.Styles(`saya di desain oleh Seorang Developer hebat yang mengembangkan bot whatsApp berbasis Javascript ini dengan menyajikan beberapa fitur seperti *AI*, *DOWNLOADER*, *GAME*, *TOOLS* dan lainnya`)}

${Func.Styles(`╭─ •  「 *\`</> INFO BOT </>\`* 」
│  ◦ *Name Bot :* ${namebot}
│  ◦ *Total User :* ${Func.formatNumber(Object.keys(db.data.users).length)}
│  ◦ *Total Chat:* ${Object.keys(conn.chats).length}
│  ◦ *Uptime :* *[ ${Func.toTime(process.uptime() * 1000)} ]*
│  ◦ *Total Memory :* ${Func.formatSize(totalMemory)}
│  ◦ *Free Memory :* ${Func.formatSize(freeMemory)}
│  ◦ *Used Memory :* ${Func.formatSize(usedMemory)}
╰──── •`)}

${Func.Styles(`╭─ •  「 *\`</> INFO USER </>\`* 」
│  ◦ *Name User :* ${m.name}
│  ◦ *Tag User :*`)} @${m.sender.split("@")[0]}
${Func.Styles(`│  ◦ *Limit User  :* ${user.limit}
│  ◦ *Premium :* ${user.premium ? "✓" : "x"}
│  ◦ *Saldo User :* ${Func.formatNumber(user.saldo)} Rp
╰──── •`)}

${allTagsAndHelp}`;

    if (global.menu === "simple") {
      conn.reply(m.chat,  wan, fkontak);
    } else if (global.menu === "doc") {
      conn.sendMessage(
        m.chat,
        {
          document: {
            url: "https://wa.me/" + conn.user.jid,
          },

          caption:  wan,
          mimetype: "text/html",
          fileName: `© S H I R O K O  M D`,
          contextInfo: {
            mentionedJid: conn.parseMention( wan),
            isForwarded: true,
            businessMessageForwardInfo: {
              businessOwnerJid: conn.user.jid,
            },
            externalAdReply: {
              title: `© S H I R O K O  M D`,
              body: null,
              thumbnailUrl: thumb,
              sourceUrl: sgc,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: fkontak },
      );
    } else if (global.menu === "gif") {
      conn.sendMessage(
        m.chat,
        {
          video: { url: gif },
          gifPlayback: true,
          gifAttribution: ~~(Math.random() * 2),
          caption:  wan,
          contextInfo: {
            mentionedJid: conn.parseMention( wan),
            externalAdReply: {
              title: `S H I R O K O  M D`,
              body: null,
              thumbnailUrl: thumb,
              sourceUrl: sgc,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: fkontak },
      );
    } else if (global.menu === "payment") {
      await conn.relayMessage(
        m.chat,
        {
          requestPaymentMessage: {
            currencyCodeIso4217: "USD",
            amount1000:
              Object.values(plugins)
                .filter((v) => v.help && !v.disabled)
                .map((v) => v.help)
                .flat(1).length * 1000,
            requestFrom: m.sender,
            noteMessage: {
              extendedTextMessage: {
                text:  wan,
                contextInfo: {
                  mentionedJid: conn.parseMention( wan),
                  stanzaId: m.key.id,
                  remoteJid: m.isGroup ? m.sender : m.key.remoteJid,
                  participant: m.key.participant || m.sender,
                  fromMe: m.fromMe,
                  quotedMessage: m.message,
                  externalAdReply: {
                    showAdAttribution: true,
                  },
                },
              },
            },
          },
        },
        {},
      );
    } else if (global.menu === "edit") {
      const arr = [
        "➳ *L*",
        "➳ *L O*",
        "➳ *L O A*",
        "➳ *L O A D*",
        "➳ *L O A D I*",
        "➳ *L O A D I N*",
        "➳ *L O A D I N G*",
        "➳ *L O A D I N G .*",
        "➳ *L O A D I N G . .*",
        "➳ *L O A D I N G . . .*",
        "➳ *L O A D I N G . .*",
        "➳ *L O A D I N G .*",
        "➳ *L O A D I N G*",
        "➳ *W E L C O M E  T O  S H I R O K O  M D*",
         wan,
      ];

      let { key } = await conn.sendMessage(
        m.chat,
        {
          document: {
            url: "https://wa.me/" + conn.user.jid,
          },
          caption: `➳ *Please Waif...*`,
          mimetype: "text/html",
          fileName: `© S H I R O K O  M D`,
          contextInfo: {
            mentionedJid: conn.parseMention( wan),
            isForwarded: true,
            businessMessageForwardInfo: {
              businessOwnerJid: conn.user.jid,
            },
            externalAdReply: {
              title: `© S H I R O K O  M D`,
              body: null,
              thumbnailUrl: thumb,
              sourceUrl: sgc,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: fkontak },
      );
      for (let i = 0; i < arr.length; i++) {
        await conn.sendMessage(
          m.chat,
          {
            image: {
              url: thumb,
            },
            caption: arr[i],
            mimetype: "text/html",
            fileName: `© S H I R O K O  M D`,
            edit: key,
            contextInfo: {
              mentionedJid: conn.parseMention( wan),
              isForwarded: true,
              businessMessageForwardInfo: {
                businessOwnerJid: conn.user.jid,
              },
              externalAdReply: {
                title: `© S H I R O K O  M D`,
                body: null,
                thumbnailUrl: thumb,
                sourceUrl: sgc,
                mediaType: 1,
                renderLargerThumbnail: true,
              },
            },
          },
          { quoted: fkontak },
        );
      }
    } else if (menu === "button") {
      conn.sendButton(
        m.chat,
        [
          ["OWNER", ".owner"],
          ["INFO SCRIPT", "sc"],
          ["GROUP BOT", "gcbot"],
        ],
        fkontak,
        {
          body:  wan,
          footer: done,
          url: thumb
        },
      );
    } else {
      conn.sendMessage(
        m.chat,
        {
          text:  wan,
          contextInfo: {
            mentionedJid: conn.parseMention( wan),
            externalAdReply: {
              title: `S H I R O K O  M D`,
              body: null,
              thumbnailUrl: thumb,
              sourceUrl: sgc,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: fkontak },
      );
    }
  } else {
    await conn.reply(
      m.chat,
      `*[ MENU ${perintah.toUpperCase()} NOT FOUND ]*\n> • _Ketik *.menu* untuk melihat semua kategori menu atau keitk *.menu all* untuk melihat semua fitur_`,
         m,
      );
    }
  }
}

function clockString(ms) {
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}