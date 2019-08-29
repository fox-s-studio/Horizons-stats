require('dotenv').config({
    path: 'config/.env'
})

const   axios = require('axios'),
        botToken = process.env.TOKEN, // Bot Token from config/.env
        header = {
            Authorization: `Bot ${botToken}`
        },
        baseUrl = "https://discordapp.com/api", // API URL from config.env
        guildID = process.env.GUILD_ID, // Guild ID from config.env
        fs   = require('fs'),
        envPath = 'config/.env';


function fileExist(filePath) {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.F_OK, (err) => {
            if (err) {
                return resolve(false);
            }
            return resolve(true);
        })
    });
}

module.exports = {
    /**
     * 
     * @param {String} token 
     * @param {BigInteger} guildID
     * returned status : 
     *      0 -> file exist
     *      1 -> incorrect parameter(s)
     *      2 -> File created
     */
    /*
    async newConfig(token, guildID){
        let envExist;
        await fileExist(envPath).then(res => envExist = res);
        if(envExist){
            return ({status: 0, message: 'File already exist !'});
        }
        if( !token || !guildID){
            return ({status: 1, message: 'Token or guildID Incorrect !'});
        }
        fs.writeFile('config/.env',`TOKEN = '${token}' \rGUILD_ID = '${guildID}'`, err => {
            if (err) throw err;
            return({status: 2, message: 'Env File Created !'});
        });
    },*/

    async checkConfig(token){
        return axios.get(
            `${baseUrl}/users/@me`,
            {headers: {Authorization: `Bot ${token}`}},
        )
        .then(async (res) => {
            
            return res;
        })
        .catch(err => {
            return err;
        });
    }
}
