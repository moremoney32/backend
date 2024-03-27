const bcrypt = require("bcrypt");
const    hasPassword = async(password)=>{
    const hasPassword = await bcrypt.hash(password,10);
    return hasPassword
}
module.exports = hasPassword
