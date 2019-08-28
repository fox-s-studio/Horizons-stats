require('dotenv').config({
    path: './config/.env'
})

const   axios = require('axios'),
        botToken = process.env.TOKEN, // Bot Token from config/.env
        header = {
            Authorization: `Bot ${botToken}`
        },
        baseUrl = process.env.API_URL, // API URL from config.env
        guildID = process.env.GUILD_ID; // Guild ID from config.env

/**
 * Function to get Users
 */

function getUsers() {
    return axios.get(
        `${baseUrl}/guilds/${guildID}/members`,
        {headers: header, params: {limit: 999}},
    )
    .then(async res => {
        return res;
    })
    .catch(err => {
        return err;
    });
}

/**
 * Function to get Roles
 */

function getRoles() {
    return axios.get(
        `${baseUrl}/guilds/${guildID}/roles`,
        {headers: header},
    )
    .then(async res => {
        return res;
    })
    .catch(err => {
        return err;
    });
}

/**
 * Function to filter user by Roles
 */

async function filterByRoles(){
    const sectionsRole = require('./config/sections').sectionsRole; // Import sections Roles

    let roles = [],                 // Array of Roles
        users = [],                 // Array of users
        howMuchUsers = 0,           // Initialization for number of users
        noMemberUser = 0;           // Initialization for number of non-member users

    await getRoles()                // Call function to get Roles
      .then(async res => {
          await res;
          res.data.map(n => {
              roles.push({          // Add Role in array roles[]
                  name: n.name,
                  id: n.id,
                  membersHaveThis : 0   // Initialization for members that have this role
              })
          })
      })
      .catch(err => {
          console.log(err);
      });

    
    await getUsers()                // Call function to get Users
      .then(async res => {
          await res;
          res.data.map(n => {
              howMuchUsers = howMuchUsers + 1   // Increment howMuchUsers of 1
              users.push({                      // Add User in array Users[]
                  user: n.user,
                  roles: n.roles
              })
          })
      })
      .catch(err => {
          console.log(err);
      });

    await users.map(user => {           // Filter member by role, and 
        user.roles.map(role => {        
            roles.map(n => {
                if (n.id === role){
                    n.membersHaveThis = n.membersHaveThis + 1   // Increment of 1, the value 'membersHaveThis' of role when user have this
                }
            })
        });
    });

    /**
     * Sort the roles by Descent
    */
    roles.sort(function (a, b) {
        return b.membersHaveThis - a.membersHaveThis;
    });

    /**
     *  Calcul how much non-Member users we have
     */
    noMemberUser = howMuchUsers - roles[0].membersHaveThis;

    /**
     * return the section's roles with them number of users
     */
    let sectionStats = [];

    roles.map(role => {
        sectionsRole.map(sectionRole => {
            if(role.id === sectionRole){
                sectionStats.push({ 
                    name : role.name,
                    members : role.membersHaveThis
                });
            };
        });
    });

    return sectionStats
};

module.exports = filterByRoles;