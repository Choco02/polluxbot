var locale = require('../../../utils/multilang_b');
var mm = locale.getT();
const gear = require("../../gearbox.js")
var cmd = 'cash';

var init = function (message,userDB,DB) {
    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    if (Author.bot) return;
    var Member = Server.member(Author);
    var Target = message.mentions.users.first() || Author;
    var MSG = message.content;
    var bot = message.botUser
    var args = MSG.split(' ').slice(1)
    var LANG = message.lang;

    //-------MAGIC----------------

//HELP TRIGGER
    let helpkey = mm("helpkey",{lngs:message.lang})
if (MSG.split(" ")[1]==helpkey || MSG.split(" ")[1]=="?"|| MSG.split(" ")[1]=="help"){
    return gear.usage(cmd,message,this.cat);
}
//------------

var emoj = bot.emojis.get('343314186765336576')

     let GOODMOJI = DB.get(Server.id).modules.GOODMOJI || emoj
     let GOOD = DB.get(Server.id).modules.GOODNAME || 'Rubine'


    if (DB.get(Server.id).modules) {
        GOODMOJI = DB.get(Server.id).modules
    }
    if (DB.get(Server.id).modules) {
        GOOD = DB.get(Server.id).modules.GOODNAME
    }


    var vocab = {
        c1: mm("$.cash10", {
            lngs: LANG
        }),
        c2: mm("$.cash100", {
            lngs: LANG
        }),
        c3: mm("$.cash500", {
            lngs: LANG
        }),
        c4: mm("$.cash1000", {
            lngs: LANG
        }),
        c5: mm("$.cash5000", {
            lngs: LANG
        }),
        c6: mm("$.cash10000", {
            lngs: LANG
        }),
        c7: mm("$.cashInfinite", {
            lngs: LANG
        }),
        heHas: mm("$.hasAmount", {
            lngs: LANG,
            goodname: GOOD,
            goods: userDB.get(Target.id).modules.goodies
        }),
        youHave: mm("$.youAmount", {
            lngs: LANG,
            goodname: GOOD,
            goods: userDB.get(Author.id).modules.goodies
        })

    }
    vocab.c1

    if (message.mentions.users.size === 0) {
        var r = userDB.get(Target.id).modules.goodies
        var fam = ''
        switch (true) {
            case (r < 10):
                fam = vocab.c1
                break;
            case (r < 100):
                fam = vocab.c2
                break;
            case (r < 500):
                fam = vocab.c3
                break;
            case (r < 1000):
                fam = vocab.c4
                break;
            case (r < 5000):
                fam = vocab.c5
                break;
            case (r < 10000):
                fam = vocab.c6
                break;
            case (r > 10000):
                fam = vocab.c7
                break;

        }
        return message.reply(vocab.youHave + fam)

    }

    return message.channel.send(vocab.heHas)
}

 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: '$'
};