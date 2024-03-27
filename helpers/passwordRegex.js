const passwordRegex = (password)=>{
   const verifyRegexPassword = password.match( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,15}$/)
   if(verifyRegexPassword){
    return verifyRegexPassword
   }

}
module.exports = passwordRegex