const { SlashCommandBuilder } = require('discord.js');
const request = require("request");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mcserver')
        .setDescription('マイクラサーバーの状態を表示します')
        .addStringOption(option =>
            option.setName('ip')
                .setDescription('サーバーアドレスを指定')
                .setRequired(true)),
    async execute(interaction) {
        let getResult = await getServerStatus(interaction.options.getString("ip"));
        if (getResult.online) {
            await interaction.reply({ content: `ONLINE ${getResult.players.list}` });
        } else {
            await interaction.reply({ content: "OFFLINE" });
        }
        function getServerStatus(ipAddress) {
            return new Promise((resolve, reject) => {
                request({
                    url: "https://api.mcsrvstat.us/2/" + encodeURIComponent(ipAddress),
                    json: true
                }, function (error, response, body) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(body);
                    }
                });
            });
        }
    },
};