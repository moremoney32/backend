const verifyRegexEmail = (email)=>{
    const regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const verifyRegexEmail = regexEmail.test(email)
    if(verifyRegexEmail){
        return verifyRegexEmail
    }
    

}
module.exports = verifyRegexEmail