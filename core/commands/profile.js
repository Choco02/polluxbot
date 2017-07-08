
const Jimp = require("jimp");
const Discord = require("discord.js");
const arraySort = require('array-sort')
const fs = require("fs");
const gear = require('../gearbox.js')

var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'profile';

var init = function (message, userDB, DB) {
    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    if (Author.bot) return;
    var Member = Server.member(Author);
    var Target = message.mentions.users.first() || Author;
    var MSG = message.content;
    var bot = message.botUser
    var args = MSG.split(' ').slice(1)[0]


    var tint = (args || "0000FF")
    var LANG = message.lang;

    var nope = mm('CMD.noDM', {
        lngs: LANG
    });
    var gener = mm('builds.genProf', {
        lngs: LANG
    });
    var inf = mm('dict.infinite', {
        lngs: LANG
    });

    //-------MAGIC----------------
    if (message.channel.type == 'dm') {
        message.reply(nope)
        return
    }
    //CHECK PROFS LV ETC ---

    message.reply(gener).then(m => m.delete(5000))

    let img = Target.defaultAvatarURL.substr(0, Target.defaultAvatarURL.length - 10)
    if (Target.avatarURL) {
        img = Target.avatarURL.substr(0, Target.avatarURL.length - 10);
    }

    let tgtData = userDB.get(Target.id).modules;

 //   let adm = gear.checkAdm(message, Target).toLowerCase()

try{
gear.superDefine(Target,"ID",Target.id)

        var ranked = []
        userDB.forEach(j=>{
            var i = JSON.parse(j)
            var rankItem = {}
            rankItem.exp = i.modules.exp
            rankItem.id = i.ID
            rankItem.name = i.name
            ranked.push(rankItem)

        })

        arraySort(ranked, 'exp', {
            reverse: true
        })

       var Sranked = []
        userDB.forEach(j=>{
            var i = JSON.parse(j)
            var SrankItem = {}
            if (Server.members.get(i.ID)==undefined) return;
            SrankItem.exp = i.modules.exp
            SrankItem.id = i.ID
            SrankItem.name = i.name
            Sranked.push(SrankItem)

        })

        arraySort(Sranked, 'exp', {
            reverse: true
        })


    if(userDB.get(Target.id).modules.bgID==undefined){          gear.paramDefine(Target,"bgID","0") }
    if(userDB.get(Target.id).modules.rep==undefined){           gear.paramDefine(Target,"rep",0) }
    if(userDB.get(Target.id).modules.bgInventory==undefined){   gear.paramDefine(Target,"bgInventory",[0]) }


    let join = message.guild.member(Target).joinedAt
    let joinstamp = `${join.getDate()}/${join.getMonth()+1}/${join.getFullYear()} - ${join.toLocaleTimeString()}`;

    var favcolor    = (userDB.get(Target.id).modules.favcolor || "2211EB")
    var backgroundId    = userDB.get(Target.id).modules.bgID
    var medals      = (userDB.get(Target.id).modules.medals || [])
    var persotex    = (userDB.get(Target.id).modules.persotext || "I have no personal text because i'm lazy as a sloth.")
    var nametag     = Target.username + "#" + Target.discriminator
    var nickname    = Server.member(Target).displayName
    var rubys       = (userDB.get(Target.id).modules.goodies.toString() || "00")
    var globalrank  = "#"+(1+ranked.findIndex(i => i.id === Target.id)).toString()
    var serverank   = "#"+(1+Sranked.findIndex(i => i.id === Target.id)).toString()
    var exp         = userDB.get(Target.id).modules.exp.toString()
    var level       = userDB.get(Target.id).modules.level.toString()
    var exptoNex    = Math.trunc(Math.pow((Number(level) + 1) / 0.18, 2)).toString()
    var exptoThis    = Math.trunc(Math.pow((Number(level)) / 0.18, 2)).toString()
    var frameofact = Math.trunc(Math.pow((Number(level) + 1) / 0.18, 2))-Math.trunc(Math.pow((Number(level)) / 0.18, 2))
    console.log(exptoThis)
    console.log(frameofact)
     var percent     = (((Number(exp) - Number(exptoThis)) / frameofact)*100).toFixed(0)
   // var percent     = ((Number(exptoThis) / exptoNex)*100).toFixed(0)
    var membSince   = joinstamp
    var rep         = userDB.get(Target.id).modules.rep
    var propic      = (Target.avatarURL || Target.defaultAvatarURL)
    rep = rep.toString()


    var m = `

favcolor:   ${favcolor}
medals:   ${medals}
persotex:   ${persotex}
nametag:   ${nametag}
nickname:   ${nickname}
rubys:   ${rubys}
globalrank:   ${globalrank}
serverank:   ${serverank}
exp:   ${exp}
level:   ${level}
exptoNex:   ${exptoNex}
percent:   ${percent}
membSince:   ${membSince}
rep:   ${rep}
`

//    message.reply(m)
}catch(e){console.log(e)}

    var skin = userDB.get(Target.id).modules.skin

    Jimp.read(paths.SKINS + skin + '/mainframe.png').then(function (frame) {
    Jimp.read(paths.SKINS + skin + '/mainframe.png').then(function (frameB) {
    Jimp.read(paths.SKINS + skin + '/sidebar.png').then(function (sidebar) {
    Jimp.read(paths.SKINS + skin + '/levbar.png').then(function (levbar) {
    Jimp.read(propic).then(function (photo) {
    Jimp.read(paths.SKINS + skin + '/lenna.png').then(function (lenna) {
    Jimp.read(paths.BUILD + 'profile/BGS/bg_'+backgroundId+'.png').then(function (bg) {

        photo.resize(100,100)
         photo.mask(lenna, 0, 0)

          frame.composite(bg, 43,14 )
          frame.composite(frameB, 0,0 )
          frame.composite(photo, 56,73 )

        levbar.resize(parseInt(Number(percent)),6)
          frame.composite(levbar, 54,276 )

              sidebar.color([

                                            {
                                                apply: 'mix',
                                                params: [favcolor, 50]
                                            }])
          frame.composite(sidebar,0,0 )


          Jimp.loadFont(paths.FONTS + "product_24_black_bold.fnt").then(function (levelf) {
          Jimp.loadFont(paths.FONTS + "visitor_12_black.fnt").then(function (lorem) {
          Jimp.loadFont(paths.FONTS + "product_12_grey_bold.fnt").then(function (tag) {
          Jimp.loadFont(paths.FONTS + "century_16_bold.fnt").then(function (name) {
          Jimp.loadFont(paths.FONTS + "visitor_18_white.fnt").then(function (rfont) {
          Jimp.loadFont(paths.FONTS + "product_12_grey_bold.fnt").then(function (ranks) {







              if (level.length == 4) level = "MAX";
              var ovlat = new Jimp(40, 40, function (err, image) {});
              ovlat.print(levelf, 0, 0, `${level}`, 50);
              ovlat.autocrop(false)
              ovlat.contain(45, 20, Jimp.HORIZONTAL_ALIGN_CENTER)

              frame.composite(ovlat, 350, 25)

              frame.print(name, 160, 140, `${nickname}`);
              frame.print(tag, 173, 167, `${nametag}`);
              frame.print(lorem, 173, 188, `${persotex.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}`,180);
             // kalk.contain(226, 25, Jimp.HORIZONTAL_ALIGN_LEFT);


              var srank = new Jimp(60, 16, function (err, image) {});
              srank.print(ranks, 0, 0, `${serverank}`, 50);
              srank.autocrop(false)
              srank.contain(50, 10, Jimp.HORIZONTAL_ALIGN_RIGHT)

              var grank = new Jimp(60, 16, function (err, image) {});
              grank.print(ranks, 0, 0, `${globalrank}`, 50);
              grank.autocrop(false)
              grank.contain(50, 10, Jimp.HORIZONTAL_ALIGN_RIGHT)

              var rrank = new Jimp(60, 16, function (err, image) {});
              rrank.print(ranks, 0, 0, `${rubys}`, 50);
              rrank.autocrop(false)
              rrank.contain(50, 10, Jimp.HORIZONTAL_ALIGN_RIGHT)

              var reputation = new Jimp(30, 16, function (err, image) {});
              reputation.print(rfont, 0, 0, `${rep}`, 30);
              reputation.autocrop()
             // reputation.contain(30, 10, Jimp.HORIZONTAL_ALIGN_CENTER)


              var paasento = new Jimp(100, 16, function (err, image) {});
              paasento.print(ranks, 0, 0, `${percent}% (${exp})`, 100);
              paasento.autocrop(false)
              paasento.contain(100, 10, Jimp.HORIZONTAL_ALIGN_RIGHT)


              frame.composite(srank, 105, 188) //+25 down
              frame.composite(grank, 105, 213) //+25 down
              frame.composite(rrank, 105, 238) //+25 down
              frame.composite(reputation, 20, 39) //+25 down
              frame.composite(paasento, 50, 263) //+25 down






              frame.getBuffer(Jimp.MIME_PNG, function (err, image) {
                  message.channel.sendFile(image)
              })



    }).catch(e=>console.log(e))
    }).catch(e=>console.log(e))
    }).catch(e=>console.log(e))
    }).catch(e=>console.log(e))
    }).catch(e=>console.log(e))
    }).catch(e=>console.log(e))
    }).catch(e=>console.log(e))
    }).catch(e=>console.log(e))
    }).catch(e=>console.log(e))

    }).catch(e=>console.log(e))
    }).catch(e=>console.log(e))
    }).catch(e=>console.log(e))
    }).catch(e=>console.log(e))



    /*


    let GOODMOJI = ':gem:'
    let GOOD = 'Gem'
    if (DB.get(Server.id).modules) {
        GOODMOJI = DB.get(Server.id).modules
    }
    if (DB.get(Server.id).modules.GOODNAME) {
        GOOD = DB.get(Server.id).modules.GOODNAME
    }



    var skinfo = require("../../" + paths.SKINS + skin + "/skin.js")

    Jimp.read(img).then(function (photo) {
        photo.resize(skinfo.propicHW, skinfo.propicHW)
        Jimp.read(paths.BUILD + "note.png").then(function (lenna) {

            if (skinfo.roundpic) {

                photo.mask(lenna, 0, 0)
            }



            Jimp.read(paths.SKINS + skin + '/cartela.png').then(function (cart) {


                                        cart.color([
                                             {
                                                apply: 'desaturate',
                                                params: [100]
                                            },
                                            {
                                                apply: 'mix',
                                                params: [tint, 40]
                                            }
]);

                Jimp.read(paths.SKINS + skin + '/levbar.png').then(function (bar) {

                    Jimp.read(paths.PROFILE + adm + '.png').then(function (tag) {

                        Jimp.loadFont(paths.FONTS + skinfo.font1).then(function (f1) { // load font from .fnt file
                            Jimp.loadFont(paths.FONTS + skinfo.font2).then(function (f2) {
                                Jimp.loadFont(paths.FONTS + skinfo.font3).then(function (f3) {
                                    Jimp.loadFont(paths.FONTS + skinfo.invisible).then(function (inv) {
                                        try {
                                            var level = tgtData.level.toString()
                                            var money = tgtData.goodies.toString()
                                            var exp = tgtData.exp.toString()
                                            var texp = tgtData.persotext.toString()
                                        } catch (err) {
                                            var level = "00"
                                            var money = "00"
                                            var exp = "0000"
                                            var texp = ""
                                        }

                                        var next = Math.trunc(Math.pow((Number(level) + 1) / 0.18, 2));
                                        var perc = Number(exp) / next
                                        if (level.length == 1) {
                                            level = `0${level}`
                                        } else if (level === undefined) {
                                            level = `XX`
                                        }
                                        console.log('OK ATE QUI')
                                        let join = message.guild.member(Target).joinedAt
                                        let joinstamp = `${join.getDate()}/${join.getMonth()+1}/${join.getFullYear()} - ${join.toLocaleTimeString()}`;
                                        var stret = skinfo.barW * perc
                                        bar.resize(stret + 1, skinfo.barH)
                                        try {

                                            if (Target.id == '271394014358405121') {
                                                level = "XX"
                                                money = tgtData.goodies.toString()
                                                exp = "99999"
                                                next = "99999"
                                                bar.resize(skinfo.barW, skinfo.barH)
                                            } else if (Target.bot) {
                                                level = "XX"
                                                money = inf
                                                exp = "99999"
                                                next = "99999"
                                                bar.resize(skinfo.barW, skinfo.barH)
                                            };
                                        } catch (err) {
                                            level = "XX"
                                            money = inf
                                            exp = "99999"
                                            next = "99999"
                                            bar.resize(skinfo.barW, skinfo.barH)

                                        }
                                        cart.print(eval(skinfo.nameF), skinfo.nameX, skinfo.nameY, message.guild.member(Target).displayName);


                                        cart.print(eval(skinfo.levelF), skinfo.levelX, skinfo.levelY, `${level}`);
                                        cart.print(eval(skinfo.moneyF), skinfo.moneyX, skinfo.moneyY, `${money} ${GOOD}s`);
                                        cart.print(eval(skinfo.expF), skinfo.expX, skinfo.expY, `${exp} / ${next}`);
                                        console.log('OK ATE QUI')
                                        cart.print(eval(skinfo.joinF), skinfo.joinX, skinfo.joinY, `${joinstamp}`);
                                        cart.print(eval(skinfo.persotextF), skinfo.persotextX, skinfo.persotextY, `${texp}`, skinfo.persotextWmax);
                                        cart.composite(bar, skinfo.barX, skinfo.barY)
                                        cart.composite(photo, skinfo.propicX, skinfo.propicY)
                                        cart.composite(tag, skinfo.admtagX, skinfo.admtagY)
                                        //cart.write(`${paths.CARDS}${caller}.png`)
                                        console.log("Success".green)




                                        cart.getBuffer(Jimp.MIME_PNG, function (err, image) {
                                            message.channel.sendFile(image)
                                        })

                                    })
                                });

                            });
                        });
                    });
                });
            });

        });
    });


*/


};
module.exports = {
    pub: true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'misc'
};