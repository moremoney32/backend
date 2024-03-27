const codeAleatoireConfirm = (number)=>{
    let elements = "ABCDEFGHIJKLMNOPQRSTWXYZ/@?abcdefghijklmnopqrstwxyz"
    let code = "";

    for(let i =0;i<number;i++){
    let onePortionCode = Math.floor(Math.random()*elements.length);
    code +=  elements.charAt(onePortionCode)
    }
    return code 
}
module.exports = codeAleatoireConfirm
//mongodb+srv://social-network:PbtDvbKzZ4SQdKH1@cluster0.dmud6ju.mongodb.net/