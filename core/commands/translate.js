const translate = require('google-translate-api');



var gear = require("../gearbox.js");
var cmd = 'translate';

var init = function (message,userDB,DB) {

    var args=message.content.substr(cmd.length+message.prefix.length)

    var langua = DB.get(message.guild.id).modules.LANGUAGE
    if (langua == "dev") langua ="pt";

translate(args, {to:langua }).then(res => {
    console.log(res.text);


    var flag
    switch(res.from.language.iso){
        case "en":
            flag = ":flag_gb:";
            break;
        case "pt":
            flag = ":flag_br:";
            break;
        case "fr":
            flag = ":flag_fr:";
            break;
        case "de":
            flag = ":flag_de:";
            break;
        case "ru":
            flag = ":flag_ru:";
            break;
        case "jp":
            flag = ":flag_jp:";
            break;
        case "ja":
            flag = ":flag_jp:";
            break;
          case "ko":
            flag = ":flag_kr:";
            break;
        case "es":
            flag = ":flag_es:";
            break;
        case "it":
            flag = ":flag_it:";
            break;
        case "zh-CN":
            flag = ":flag_cn:";
            break;
                case "ar":
            flag = ":flag_sa:";
            break;
              default:
            flag = ":flag_white:"+res.from.language.iso;
            break;
                            }
     var SVflag
    switch(DB.get(message.guild.id).modules.LANGUAGE){
        case "en":
            SVflag = ":flag_gb:";
            break;
        case "pt":
            SVflag = ":flag_pt:";
            break;
        case "fr":
            SVflag = ":flag_fr:";
            break;
        case "dev":
            SVflag = ":flag_br:";
            break;
        case "ru":
            SVflag = ":flag_ru:";
            break;
        case "jp":
            SVflag = ":flag_jp:";
            break;
        case "ja":
            SVflag = ":flag_ja:";
            break;
        case "ko":
            SVflag = ":flag_ko:";
            break;
        case "es":
            SVflag = ":flag_es:";
            break;
        case "it":
            SVflag = ":flag_it:";
            break;
                   default:
            flag = ":flag_white:";
            break;
                            }


  //  console.error(res.from.language.iso);
    message.channel.sendMessage("**"+args+"** "+flag+">>"+SVflag+" "+res.text)

    //=> nl
}).catch(err => {
    console.error(err);
});



}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'bot'
};
