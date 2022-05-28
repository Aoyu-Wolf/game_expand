game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"高达宇宙(同人作)",content:function (config,pack){
    
},precontent:function (){
    
},help:{},config:{},package:{
    character:{
        character:{
            "gd1":["male","qun",25,["gd40cc","gd40cl","gd40cm"],["forbidai"]],
            "gd2":["male","wu",28,["gd41gw","gd41gq"],["forbidai"]],
            "gd3":["male","qun",2,["gd42yz","gd42zh","gd42rj"],["forbidai"]],
            "gd4":["male","qun",3,["gd43yn","gd43zh","gd43yr"],["forbidai"]],
            "gd5":["male","shu",15,["gd45yy","gd45zs2"],["forbidai"]],
            "gd6^":["male","shu",30,["gd46lg","gd46js"],["forbidai"]],
            "gd7":["male","wu","1/30",["gd7bq","gd7fj","gd7yz"],["forbidai"]],
            "gd8":["male","qun",15,["gd8pj"],["forbidai"]],
            "gd9":["female","qun",15,["gd9sx","gd9hm"],["forbidai"]],
            "gd10":["male","wei",10,["gd10cc","gd10xf","gd10td"],["forbidai"]],
            "gd11":["male","wu",12,["gd11dm","gd11hs","gd11jm_player"],["forbidai"]],
            "<samp id='傲宇'><small><strong>傲宇</strong></small></samp></body><style>#傲宇{animation:change 10s linear 0s infinite;}@keyframes change{0% {color:#FF0000;}10%{color:#FF7F00;}20%{color: #FFFF00;}30%{color:#00FF00;}40% {color:#00FFFF;}50%{color: #0000FF;}60%{color: #8B00FF;}70%{color: #0000FF;}75%{color: #00FFFF ;}80%{color:#00FF00;}85%{color:#FFFF00 ;}90%{color:  #FF7F00;}100%{color: #FF0000;}}</style>":["none","shen",Infinity,["Aoyu"],["forbidai","des:本扩最弱,切勿叨扰本狼"]],
            "gd12":["male","qun",20,["gd12px","gd12yl","gd12jy"],[]],
            "gd13":["male","shu",12,[],["forbidai"]],
        },
        translate:{
            "gd1":"高达一号",
            "gd2":"高达二号",
            "gd3":"高达三号",
            "gd4":"高达四号",
            "gd5":"高达五号",
            "gd6^":"高达六号",
            "gd7":"高达七号",
            "gd8":"高达八号",
            "gd9":"高达九号",
            "gd10":"高达十号",
            "gd11":"高达十一号",
            "傲宇":"傲宇",
            "gd12":"高达十二号",
            "gd13":"高达十三号",
        },
    },
    card:{
        card:{
            mlsb:{
                type:"equip",
                subtype:"equip5",
                skills:["mlsb"],
                ai:{
                    basic:{
                        equipValue:13,
                        order:function (card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        value:function (card,player,index,method){
                if(player.isDisabled(get.subtype(card))) return 0.01;
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function'){
                    if(method=='raw') return equipValue(card,player);
                    if(method=='raw2') return equipValue(card,player)-value;
                    return Math.max(0.1,equipValue(card,player)-value);
                }
                if(typeof equipValue!='number') equipValue=0;
                if(method=='raw') return equipValue;
                if(method=='raw2') return equipValue-value;
                return Math.max(0.1,equipValue-value);
            },
                    },
                    result:{
                        target:function (player,target,card){
                return get.equipResult(player,target,card.name);
            },
                    },
                },
                enable:true,
                selectTarget:-1,
                filterTarget:function (card,player,target){
        return target==player;
    },
                modTarget:true,
                allowMultiple:false,
                content:function (){
        if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
    },
                toself:true,
                fullimage:true,
            },
            sb:{
                type:"basic",
                enable:true,
                filterTarget:function (card,player,target){
        return target==player;
    },
                selectTarget:-1,
                modTarget:true,
                content:function (){
        'step 0'
        event.num=4;
        var list=[];
        event.list=list;
        for(var i=0;i<lib.inpile.length;i++){
            if(lib.filter.filterCard({name:lib.inpile[i]},target)){
                var info=lib.card[lib.inpile[i]];
                if(info.type=='trick'||info.type=='basic'&&!info.multitarget&&!info.notarget){
                    if(Array.isArray(info.selectTarget)){
                        if(info.selectTarget[0]>0&&info.selectTarget[1]>=info.selectTarget[0]){
                            list.push(lib.inpile[i]);
                        }
                    }
                    else if(typeof info.selectTarget=='number'){
                        list.push(lib.inpile[i]);
                    }
                }
            }
        }
        'step 1'
        var list=event.list;
        while(list.length){
            var card={name:list.randomRemove()};
            var info=get.info(card);
            var targets=game.filterPlayer(function(current){
                return lib.filter.filterTarget(card,target,current);
            });
            if(targets.length){
                targets.sort(lib.sort.seat);
                if(info.selectTarget==-1){
                    target.chooseUseTarget(game.createCard(card),true);
                }
                else{
                    var num=info.selectTarget;
                    if(Array.isArray(num)){
                        if(targets.length<num[0]) continue;
                        num=num[0]+Math.floor(Math.random()*(num[1]-num[0]+1));
                    }
                    else{
                        if(targets.length<num) continue;
                    }
                    target.useCard(game.createCard(card),targets.randomGets(num),'noai',false);
                    player.say('用之不竭,取之不尽');
                }
                if(--event.num>0){
                    event.redo();
                }
                break;
            }
        }
    },
                ai:{
                    order:9,
                    value:13,
                    useful:3,
                    result:{
                        target:1,
                    },
                },
                fullimage:true,
            },
            zmdy:{
                type:"basic",
                fullimage:true,
                vanish:true,
                enable:true,
                gainable:false,
                filterTarget:function (card,player,target){
        return target==player;
    },
                selectTarget:-1,
                value:13,
                content:function (){
        'step 0'//步骤0
        player.say("神仙难救,神仙难救啊")
        player.chooseTarget('请选择一名角色',function(card,player,target){
        return player!=target&&!target.hasSkill('dz');
    }).ai=function(target){
            if(target.hasSkill('hongyan')) return 0;
            return get.damageEffect(target,_status.event.player,_status.event.player,'thunder');
        };
     'step 1'//步骤1
    if(result.bool){//如果有选择角色
        event.target=result.targets[0];
        var cards=event.target.getCards();
        if(cards.length){
            event.target.lose(cards)._triggered=null;
        }
        if(event.target.countCards('h')<1){
            var m=0;
            var n=7;
            while(m<n){
                event.target.gain(game.createCard('du'),event.target);
                m++;
            }
        }
        event.target.gain(event.target.getCards('e'),'gain2');
        event.num=cards.length;
        var cards=[];
        var list=[];
        if(lib.characterPack.hearth){
            for(var i=0;i<lib.cardPack.mode_derivation.length;i++){
                var name=lib.cardPack.mode_derivation[i];
                var info=lib.card[name];
                if(info.gainable==false) continue;
                if(lib.characterPack.hearth[info.derivation]){
                    list.push(name);
                }
            }
        }
        if(!list.length){
            list=lib.inpile.slice(0);
        }
        if(list.length){
            for(var i=0;i<event.num;i++){
                cards.push(game.createCard('du'));
            }
            event.target.directgain(cards);
            event.target.addTempSkill('dz',{player:"phaseEnd"});
        }
    }   
    },
                ai:{
                    order:10,
                    result:{
                        player:function (player){
                if(player.countCards('h')>1) return 10;
                if(player.hp==1) return 10;
                return 1;
            },
                    },
                    useful:10,
                    value:10,
                },
            },
            fzdb:{
                type:"trick",
                vanish:true,
                enable:function (card,player){
        return game.hasPlayer(function(current){
            return !current.isUnseen();
        });
    },
                notarget:true,
                contentBefore:function (){
        player.$skill('复杂多变','legend','metal');
        game.delay(2);
    },
                content:function (){
        'step 0'
        event.current=player.next;                
                 var list=[];
                 for(var i=0;i<game.dead.length;i++){
                     list.push(game.dead[i].name);
                 }      
                 player.chooseButton(ui.create.dialog('选择一名已阵亡的角色令其复活',[list,'character']),function(button){
                 for(var i=0;i<game.dead.length&&game.dead[i].name!=button.link;i++);
                     return ai.get.attitude(_status.event.player,game.dead[i]);
                 }); 
                'step 1'                    
                 if(result.bool){
                     for(var i=0;i<game.dead.length&&game.dead[i].name!=result.buttons[0].link;i++);
                     var dead=game.dead[i];          
                     if(get.mode()=='identity'){     
                     var myid=player.identity;
            if(player.identity=='zhu'){myid='zhong'};                          
                dead.identity=myid;
                dead.setIdentity();          
                }              
                     player.logSkill('fzdb',dead);
                     dead.revive(999999999);
                     dead.draw(4);
                 }    
        'step 2'
        var target=get.max(game.filterPlayer(function(current){
            return !current.isUnseen();
        },'list').randomSort(),function(current){
            var att=get.attitude(player,current);
            if(att<0&&current.isDamaged()&&current.hp<=3){
                return -10;
            }
            var rank=get.rank(current,true);
            if(current.maxHp>=3){
                if(current.hp<=1){
                    if(att>0) return att*3+2;
                    return att*3;
                }
                else if(current.hp==2){
                    if(att>0){
                        att*=1.5;
                    }
                    else{
                        att/=1.5;
                    }
                }
            }
            if(rank>=7){
                if(att>0){
                    return att/10;
                }
                return -att/5;
            }
            else if(rank<=4){
                if(att<0){
                    return -att/10;
                }
                return att;
            }
            return Math.abs(att/2);
        },'item');
        event.aitarget=target;
        var list=[];
        for(var i in lib.character){
                list.push(i);
        }
        var players=game.players.concat(game.dead);
        for(var i=0;i<players.length;i++){
            list.remove(players[i].name);
            list.remove(players[i].name1);
            list.remove(players[i].name2);
        }
        var dialog=ui.create.dialog('选择一张武将牌','hidden');
        dialog.add([list.randomGets(Infinity),'character']);
        player.chooseButton(dialog,true).ai=function(button){
            if(get.attitude(player,event.aitarget)>0){
                return get.rank(button.link,true);
            }
            else{
                return -get.rank(button.link,true);
            }
        };
        'step 3'
        event.nametarget=result.links[0];
        player.chooseTarget(true,'使用'+get.translation(event.nametarget)+'替换一名角色的武将牌',function(card,player,target){
            return !target.isUnseen()&&!target.isMin();
        }).ai=function(target){
            if(target==event.aitarget){
                return 1;
            }
            else{
                return 0;
            }
        }
        'step 4'
        var target=result.targets[0];
        target.reinit(target.name,event.nametarget);
        target.hp=target.hp*2;
        target.maxHp=target.maxHp*2;
        target.update();
        player.line(target,'green');
        'step 5'
        game.triggerEnter(target);
    },
                contentAfter:function (){
        var evt=_status.event.getParent('phaseUse');
        if(evt&&evt.name=='phaseUse'){
            evt.skipped=true;
        }
    },
                ai:{
                    value:999,
                    useful:[6,1],
                    result:{
                        player:1,
                    },
                    order:0.5,
                },
                fullimage:true,
            },
            wgfd:{
                audio:true,
                type:"trick",
                enable:true,
                cardcolor:"red",
                selectTarget:-1,
                filterTarget:true,
                contentBefore:function (){
        "step 0"
        if(!targets.length){
            event.finish();
            return;
        }
        if(get.is.versus()){
            player.chooseControl('顺时针','逆时针',function(event,player){
                if(player.next.side==player.side) return '逆时针';
                return '顺时针';
            }).set('prompt','选择'+get.translation(card)+'的结算方向');
        }
        else{
            event.goto(2);
        }
        "step 1"
        if(result&&result.control=='顺时针'){
            var evt=event.getParent();
            evt.fixedSeat=true;
            evt.targets.sortBySeat();
            evt.targets.reverse();
            if(evt.targets[evt.targets.length-1]==player){
                evt.targets.unshift(evt.targets.pop());
            }
        }
        "step 2"
        ui.clear();
        var num;
        if(event.targets){
            num=event.targets.length*2;
        }
        else{
            num=game.countPlayer();
        }
        var cards=get.cards(num);
        game.cardsGotoOrdering(cards).relatedEvent=event.getParent();
        var dialog=ui.create.dialog('五谷丰登',cards,true);
        _status.dieClose.push(dialog);
        dialog.videoId=lib.status.videoId++;
        game.addVideo('cardDialog',null,['五谷丰登',get.cardsInfo(cards),dialog.videoId]);
        event.getParent().preResult=dialog.videoId;
        game.broadcast(function(cards,id){
            var dialog=ui.create.dialog('五谷丰登',cards,true);
            _status.dieClose.push(dialog);
            dialog.videoId=id;
        },cards,dialog.videoId);
        game.log(event.card,'亮出了',cards);
    },
                content:function (){
        "step 0"
        for(var i=0;i<ui.dialogs.length;i++){
            if(ui.dialogs[i].videoId==event.preResult){
                event.dialog=ui.dialogs[i];break;
            }
        }
        if(!event.dialog){
            event.finish();
            return;
        }
        if(event.dialog.buttons.length>1){
            var next=target.chooseButton(true,function(button){
                return get.value(button.link,_status.event.player);
            });
            next.set('dialog',event.preResult);
            next.set('closeDialog',false);
            next.set('dialogdisplay',true);
        }
        else{
            event.directButton=event.dialog.buttons[0];
        }
        "step 1"
        var dialog=event.dialog;
        var card;
        if(event.directButton){
            card=event.directButton.link;
        }
        else{
            card=result.links[0];
        }

        var button;
        for(var i=0;i<dialog.buttons.length;i++){
            if(dialog.buttons[i].link==card){
                button=dialog.buttons[i];
                button.querySelector('.info').innerHTML=function(target){
                    if(target._tempTranslate) return target._tempTranslate;
                    var name=target.name;
                    if(lib.translate[name+'_ab']) return lib.translate[name+'_ab'];
                    return get.translation(name);
                }(target);
                dialog.buttons.remove(button);
                break;
            }
        }
        var capt=get.translation(target)+'选择了'+get.translation(button.link);
        if(card){
            target.gain(card,'visible');
            target.gain(game.createCard2(card));
            target.$gain2(card);
            game.broadcast(function(card,id,name,capt){
                var dialog=get.idDialog(id);
                if(dialog){
                    dialog.content.firstChild.innerHTML=capt;
                    for(var i=0;i<dialog.buttons.length;i++){
                        if(dialog.buttons[i].link==card){
                            dialog.buttons[i].querySelector('.info').innerHTML=name;
                            dialog.buttons.splice(i--,1);
                            break;
                        }
                    }
                }
            },card,dialog.videoId,function(target){
                if(target._tempTranslate) return target._tempTranslate;
                var name=target.name;
                if(lib.translate[name+'_ab']) return lib.translate[name+'_ab'];
                return get.translation(name);
            }(target),capt);
        }
        dialog.content.firstChild.innerHTML=capt;
        game.addVideo('dialogCapt',null,[dialog.videoId,dialog.content.firstChild.innerHTML]);
        game.log(target,'选择了',button.link);
        game.delay();
    },
                contentAfter:function (){
        for(var i=0;i<ui.dialogs.length;i++){
            if(ui.dialogs[i].videoId==event.preResult){
                var dialog=ui.dialogs[i];
                dialog.close();
                _status.dieClose.remove(dialog);
                if(dialog.buttons.length){
                    event.remained=[];
                    for(var i=0;i<dialog.buttons.length;i++){
                        event.remained.push(dialog.buttons[i].link);
                    }
                    event.trigger('wuguRemained');
                }
                break;
            }
        }
        game.broadcast(function(id){
            var dialog=get.idDialog(id);
            if(dialog){
                dialog.close();
                _status.dieClose.remove(dialog);
            }
        },event.preResult);
        game.addVideo('cardDialog',null,event.preResult);
    },
                ai:{
                    wuxie:function (){
            if(Math.random()<0.5) return 0;
        },
                    basic:{
                        order:3,
                        useful:1,
                    },
                    result:{
                        target:function (player,target){
                if(get.is.versus()){
                    if(target==player) return 1.5;
                    return 1;
                }
                if(player.hasUnknown(2)){
                    return 0;
                }
                return (1-get.distance(player,target,'absolute')/game.countPlayer())*get.attitude(player,target)>0?0.5:0.7;
            },
                    },
                    tag:{
                        draw:1,
                        multitarget:1,
                    },
                },
                fullimage:true,
            },
            tyjy:{
                audio:true,
                type:"trick",
                enable:true,
                selectTarget:-1,
                cardcolor:"red",
                reverseOrder:true,
                "yingbian_prompt":"当你使用此牌选择目标后，你可为此牌减少一个目标",
                yingbian:function (event){
        event.yingbian_removeTarget=true;
    },
                filterTarget:function (card,player,target){
        //return target.hp<target.maxHp;
        return true;
    },
                ignoreTarget:function (card,player,target){
        return target.isHealthy();
    },
                content:function (){
        target.recover();
        target.$gain2();
        target.gain(game.createCard2('tao'));
        target.changeHujia();
    },
                ai:{
                    basic:{
                        order:function (){
                return 11;
            },
                        useful:[3,1],
                        value:0,
                    },
                    result:{
                        target:function (player,target){
                return (target.hp<target.maxHp)?2:0;
            },
                    },
                    tag:{
                        recover:0.5,
                        multitarget:1,
                    },
                },
                fullimage:true,
            },
            "yuxi_card":{
                type:"equip",
                subtype:"equip5",
                ai:{
                    basic:{
                        equipValue:7.5,
                        order:function (card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        value:function (card,player,index,method){
                if(player.isDisabled(get.subtype(card))) return 0.01;
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function'){
                    if(method=='raw') return equipValue(card,player);
                    if(method=='raw2') return equipValue(card,player)-value;
                    return Math.max(0.1,equipValue(card,player)-value);
                }
                if(typeof equipValue!='number') equipValue=0;
                if(method=='raw') return equipValue;
                if(method=='raw2') return equipValue-value;
                return Math.max(0.1,equipValue-value);
            },
                    },
                    result:{
                        target:function (player,target,card){
                return get.equipResult(player,target,card.name);
            },
                    },
                },
                skills:["cgyx_skill"],
                enable:true,
                fullimage:true,
                image:"ext:合纵抗秦/chuanguoyuxi.jpg",
                selectTarget:-1,
                filterTarget:function (card,player,target){
        return target==player;
    },
                modTarget:true,
                allowMultiple:false,
                content:function (){
        if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
    },
                toself:true,
            },
            nmrq:{
                audio:true,
                type:"trick",
                enable:true,
                selectTarget:-1,
                "yingbian_prompt":"当你使用此牌选择目标后，你可为此牌减少一个目标",
                yingbian:function (event){
        event.yingbian_removeTarget=true;
    },
                filterTarget:function (card,player,target){
        return target!=player;
    },
                reverseOrder:true,
                content:function (){
        "step 0"
        if(typeof event.baseDamage!='number') event.baseDamage=1;
        if(event.directHit) event._result={bool:false};
        else{
            var next=target.chooseToRespond({name:'sha'});
            next.set('ai',function(card){
                var evt=_status.event.getParent();
                if(get.damageEffect(evt.target,evt.player,evt.target)>=0) return 0;
                if(evt.player.hasSkillTag('notricksource')) return 0;
                if(evt.target.hasSkillTag('notrick')) return 0;
                return 11-get.value(card);
            });
            next.autochoose=lib.filter.autoRespondSha;
        }
        "step 1"
        if(result.bool==false){
            target.damage(event.baseDamage,event.customSource||player,'noSource');
            target.randomDiscard(2,'he',true);
            
        }
    },
                ai:{
                    wuxie:function (target,card,player,viewer){
            if(get.attitude(viewer,target)>0&&target.countCards('h','sha')){
                if(!target.countCards('h')||target.hp==1||Math.random()<0.7) return 0;
            }
        },
                    basic:{
                        order:9,
                        useful:[5,1],
                        value:5,
                    },
                    result:{
                        "target_use":function (player,target){
                if(player.hasUnknown(2)&&get.mode()!='guozhan') return 0;
                var nh=target.countCards('h');
                if(get.mode()=='identity'){
                    if(target.isZhu&&nh<=2&&target.hp<=1) return -100;
                }
                if(nh==0) return -2;
                if(nh==1) return -1.7
                return -1.5;
            },
                        target:function (player,target){
                var nh=target.countCards('h');
                if(get.mode()=='identity'){
                    if(target.isZhu&&nh<=2&&target.hp<=1) return -100;
                }
                if(nh==0) return -2;
                if(nh==1) return -1.7
                return -1.5;
            },
                    },
                    tag:{
                        respond:1,
                        respondSha:1,
                        damage:1,
                        multitarget:1,
                        multineg:1,
                    },
                },
                fullimage:true,
            },
            wjqf:{
                audio:true,
                type:"trick",
                enable:true,
                selectTarget:-1,
                reverseOrder:true,
                "yingbian_prompt":"当你使用此牌选择目标后，你可为此牌减少一个目标",
                yingbian:function (event){
        event.yingbian_removeTarget=true;
    },
                filterTarget:function (card,player,target){
        return target!=player;
    },
                content:function (){
        "step 0"
        if(typeof event.baseDamage!='number') event.baseDamage=1;
        if(event.directHit) event._result={bool:false};
        else{
            var next=target.chooseToRespond({name:'shan'});
            next.set('ai',function(card){
                var evt=_status.event.getParent();
                if(get.damageEffect(evt.target,evt.player,evt.target)>=0) return 0;
                if(evt.player.hasSkillTag('notricksource')) return 0;
                if(evt.target.hasSkillTag('notrick')) return 0;
                if(evt.target.hasSkillTag('noShan')){
                    return -1;
                }
            return 11-get.value(card);
            });
            next.autochoose=lib.filter.autoRespondShan;
        }
        "step 1"
        if(result.bool==false){
            if(target.countCards('e')<1||target.countCards('h')<1){
              target.damage(2,'noSource');   
            }
            else
                target.damage('noSource');
        }
    },
                ai:{
                    wuxie:function (target,card,player,viewer){
            if(get.attitude(viewer,target)>0&&target.countCards('h','shan')){
                if(!target.countCards('h')||target.hp==1||Math.random()<0.7) return 0;
            }
        },
                    basic:{
                        order:9,
                        useful:1,
                        value:5,
                    },
                    result:{
                        "target_use":function (player,target){
                if(player.hasUnknown(2)&&get.mode()!='guozhan') return 0;
                var nh=target.countCards('h');
                if(get.mode()=='identity'){
                    if(target.isZhu&&nh<=2&&target.hp<=1) return -100;
                }
                if(nh==0) return -2;
                if(nh==1) return -1.7
                return -1.5;
            },
                        target:function (player,target){
                var nh=target.countCards('h');
                if(get.mode()=='identity'){
                    if(target.isZhu&&nh<=2&&target.hp<=1) return -100;
                }
                if(nh==0) return -2;
                if(nh==1) return -1.7
                return -1.5;
            },
                    },
                    tag:{
                        respond:1,
                        respondShan:1,
                        damage:1,
                        multitarget:1,
                        multineg:1,
                    },
                },
                fullimage:true,
            },
            lljq:{
                audio:true,
                fullskin:true,
                enable:true,
                type:"trick",
                filterTarget:function (card,player,target){
        for(var i=1;i<6;i++){
            if(target.isEmpty(i)) return true;
        }
        return false;
    },
                filter:function (event,player){
        return game.hasPlayer((current)=>lib.skill.rongbei.filterTarget(null,player,current));
    },
                content:function (){
        'step 0'
        event.num=0;
        'step 1'
        while(!target.isEmpty(event.num)){
            event.num++;
            if(event.num>5){
                event.goto(2);
                return;
            }
        }
         var list=[];
        for(var i in lib.card){
  if(!lib.translate[i+'_info']) continue;
    if(lib.card[i].mode&&lib.card[i].mode.contains(lib.config.mode)==false) continue;
    if(lib.config.hiddenCardPack.indexOf(i)==0) continue;
                   var info=lib.card[i];
                   if(info.type&&info.type=='equip')
                   list.push(i);
                                        }
            target.chooseUseTarget(game.createCard2(list.randomGet()),true,'nopopup'&&!target.isEmpty(event.num));
        'step 2'
        var card=get.cardPile2(function(card){
        return get.subtype(card)=='equip'+event.num&&target.canUse(card,target);
        });
        if(card){
            target.chooseUseTarget(game.createCard2(card),true,'nopopup');
        }
            event.num++;
            if(event.num<=5) event.redo();
    },
                ai:{
                    order:7,
                    useful:4,
                    value:10,
                    tag:{
                        draw:2,
                    },
                    result:{
                        target:function (player,target){
                if(target.hasJudge('lebu')) return 0;
                return Math.max(1,2-target.countCards('h')/10);
            },
                    },
                },
                selectTarget:1,
            },
            zgmj:{
                audio:true,
                fullskin:true,
                type:"trick",
                enable:true,
                selectTarget:-1,
                cardcolor:"red",
                toself:true,
                filterTarget:function (card,player,target){
        return target==player;
    },
                modTarget:true,
                content:function (){
       var list=[];
        for(var i in lib.card){
        if(!lib.translate[i+'_info']) continue;
        if(lib.card[i].mode&&lib.card[i].mode.contains(lib.config.mode)==false) continue;
        if(lib.config.hiddenCardPack.indexOf(i)==0) continue;
        var info=lib.card[i];
        if(info.type&&info.type=='trick')
        list.push(i);
        var n=0                                }
        while(n<3){
            target.$draw(); 
            target.gain(game.createCard2(list.randomGet()));;
        n++;
        }
        player.addTempSkill('zgmj_skill',{player:"phaseEnd"});
    },
                ai:{
                    basic:{
                        order:7.2,
                        useful:4.5,
                        value:9.2,
                    },
                    result:{
                        target:2,
                    },
                    tag:{
                        draw:2,
                    },
                },
            },
            fjym:{
                fullskin:true,
                type:"trick",
                enable:true,
                filterTarget:function (card,player,target){
        return target==player;
    },
                selectTarget:-1,
                modTarget:true,
                content:function (){
        'step 0'
        event.current=target;
        event.num=game.countPlayer();
        if(event.num%2==0){
            event.num*2;
        }
        else
            player.draw(3);
        'step 1'
        if(event.num){
            var enemies=event.current.getEnemies();
            enemies.remove(player);
            for(var i=0;i<enemies.length;i++){
                if(!enemies[i].countCards('h')){
                    enemies.splice(i--,1);
                }
            }
            var list=[];
                                    for(var i in lib.card){
                                        if(!lib.translate[i+'_info']) continue;
                                        if(lib.card[i].mode&&lib.card[i].mode.contains(lib.config.mode)==false) continue;
                                        if(lib.config.hiddenCardPack.indexOf(i)==0) continue;
                                        var info=lib.card[i];
                                        list.push(i);
                                    }
            if(enemies.length){
                var enemy=enemies.randomGet();
                event.current.line(enemy);
                enemy.gain(game.createCard(list.randomGet(),'heart'));
                enemy.loseHp();
                event.current=enemy;
                event.num--;
                event.redo();
            }
        }
    },
                ai:{
                    order:8.5,
                    wuxie:function (){
            return 0;
        },
                    result:{
                        player:1,
                    },
                    tag:{
                        multineg:1,
                        multitarget:1,
                    },
                },
            },
            xrhh:{
                type:"basic",
                vanish:true,
                enable:true,
                gainable:false,
                filterTarget:function (card,player,target){
        return target==player;
    },
                selectTarget:-1,
                value:13,
                content:function (){
                                      "step 0"
                                    var player = _status.event.player;
                                    var num1 = target.getSkills(true, false).length;
                                    var num2 = player.getSkills(true, false).length;
player.chooseTarget(true,'请选择一名角色令其技能随机替换成[1-10]个技能',function(card,player,target){
        return true;
    }).ai=function(target){
        return get.attitude(player,target);//告诉ai选择队友
    };//选择一名其他角色
                                "step 1"
                                if (result.bool) {
                                    var list = [];
                                    if (!_status.characterskill) {
                                        _status.characterskill = [];
                                        for (var i in lib.character) {
                                            if (Array.isArray(lib.character[i][3])) _status.characterskill.addArray(lib.character[i][3]);
                                        }
                                    }
                                    for (var i in lib.skill) {
                                        if (!get.translation(i, 'info') || get.translation(i + '_info').length === 0) continue;
                                        if (_status.characterskill.contains(i)) list.add(i);
                                    }
                                    var num = player.getSkills().length;
                                    for (var i = 0; i < player.getSkills().length; i++) {
                                        if (!list.contains(player.getSkills()[i])) num--;
                                    }
                                    var num_skill=[1,2,3,4,5,6,7,8,9,10].randomGet();
                                    var skill = list.randomGets(num = num_skill);
                                    var skill1 = result.targets[0].getSkills(true, false);
                                    for (var i = 0; i < skill1.length; i++) {
                                        if (get.translation(skill1[i], 'info') && get.translation(skill1[i] + '_info').length != 0) result.targets[0].removeSkill(skill1[i], true);
                                    }
                                    for (var i = 0; i < skill.length; i++) {
                                        result.targets[0].addSkill(skill[i]);
                                    }
                                    game.log(result.targets[0], '的技能被替换成了', `#g【${get.translation(skill)}】`);
                                    result.targets[0].say('我的技能被替换成了'+'['+get.translation(skill)+']');
                                }
    },
                ai:{
                    order:10,
                    result:{
                        player:function (player){
                if(player.countCards('h')>1) return 10;
                if(player.hp==1) return 10;
                return 1;
            },
                    },
                    useful:10,
                    value:10,
                },
                image:"ext:高达宇宙(同人作)/zmdy.jpg",
                fullskin:true,
            },
            hsty:{
                audio:true,
                fullskin:true,
                type:"trick",
                enable:true,
                selectTarget:-1,
                cardcolor:"red",
                toself:true,
                filterTarget:function (card,player,target){
        return target==player;
    },
                modTarget:true,
                content:function (){
        "step 0"
        if(event.cards==undefined) event.cards=[];
        var next=player.judge(function(card){
            return -1.5;
        });
        if(!player.hasSkillTag('rejudge')) next.set('callback',function(){
            if(get.position(card,true)=='o') player.gain(card,'gain2');
        });
        else next.set('callback',function(){
            event.getParent().orderingCards.remove(card);
        });
        "step 1"
        player.chooseUseTarget(result.card,'请使用通过[慧识天谕]得到的牌,若使用则重复此流程,使用的牌不计入使用次数');
        'step 2'
        if(result.bool) {
            event.cards.push(result.card);
            event.goto(0);
        }
    },
                ai:{
                    basic:{
                        order:7.2,
                        useful:4.5,
                        value:9.2,
                    },
                    result:{
                        target:2,
                    },
                    tag:{
                        draw:2,
                    },
                },
            },
            zzjm:{
                audio:true,
                fullskin:true,
                type:"trick",
                enable:true,
                selectTarget:-1,
                cardcolor:"red",
                toself:true,
                filterTarget:function (card,player,target){
        return target==player;
    },
                modTarget:true,
                content:function (){
        "step 0"
                               player.chooseTarget(true,'请选择一名角色令其将手牌补至五且获得其手牌随机五张复制',function(card,player,target){
        return player!=target;
    }).ai=function(target){
        return get.attitude(player,target);//告诉ai选择队友
    };//选择一名其他角色
                                "step 1"
                                if (result.bool) {
                                    player.logSkill(event.name, result.targets);
                                    result.targets[0].drawTo(5);
                                    var card = result.targets[0].getCards('he').randomGets(5);
                                    event.cards = [];
                                    for (var i = 0; i < card.length; i++) {
                                        event.cards.push(game.createCard({
                                            name: card[i].name,
                                            suit: card[i].suit,
                                            number: card[i].number,
                                            nature: card[i].nature
                                        }))
                                    }
                                    result.targets[0].gain(event.cards, 'gain2');
                                }
    },
                ai:{
                    basic:{
                        order:7.2,
                        useful:4.5,
                        value:9.2,
                    },
                    result:{
                        target:2,
                    },
                    tag:{
                        draw:2,
                    },
                },
            },
            cccx:{
                audio:true,
                fullskin:true,
                type:"trick",
                enable:true,
                selectTarget:-1,
                cardcolor:"red",
                toself:true,
                filterTarget:function (card,player,target){
        return target==player;
    },
                modTarget:true,
                content:function (){
        "step 0"
                    event.cards=get.cards(12);
                    game.cardsGotoOrdering(event.cards);
                    event.videoId=lib.status.videoId++;
                    game.broadcastAll(function(player,id,cards,num){
                        var str;
                        if(player==game.me&&!_status.auto){
                            str='称象：选择任意张点数不大于'+num+'的牌';
                        }
                        else{
                            str='称象';
                        }
                        var dialog=ui.create.dialog(str,cards);
                        dialog.videoId=id;
                    },player,event.videoId,event.cards,event.name=='chengxiang'?13:12);
                    event.time=get.utc();
                    game.addVideo('showCards',player,['称象',get.cardsInfo(event.cards)]);
                    game.addVideo('delay',null,2);
                    "step 1"
                    var next=player.chooseButton([0,4]);
                    next.set('dialog',event.videoId);
                    next.set('filterButton',function(button){
                        var num=0
                        for(var i=0;i<ui.selected.buttons.length;i++){
                            num+=get.number(ui.selected.buttons[i].link);
                        }
                        return (num+get.number(button.link)<=_status.event.maxNum);
                    });
                    next.set('maxNum',event.name=='chengxiang'?13:12);
                    next.set('ai',function(button){
                        return get.value(button.link,_status.event.player);
                    });
                    "step 2"
                    if(result.bool&&result.links){
                        //player.logSkill('chengxiang');
                        var cards2=[];
                        for(var i=0;i<result.links.length;i++){
                            cards2.push(result.links[i]);
                            cards.remove(result.links[i]);
                        }
                        event.cards2=cards2;
                    }
                    else{
                        event.finish();
                    }
                    var time=1000-(get.utc()-event.time);
                    if(time>0){
                        game.delay(0,time);
                    }
                    "step 3"
                    game.broadcastAll('closeDialog',event.videoId);
                    var cards2=event.cards2;
                    player.gain(cards2,'log','gain2');
    },
                ai:{
                    basic:{
                        order:7.2,
                        useful:4.5,
                        value:9.2,
                    },
                    result:{
                        target:2,
                    },
                    tag:{
                        draw:2,
                    },
                },
            },
            yxsr:{
                audio:true,
                fullskin:true,
                type:"trick",
                enable:true,
                selectTarget:1,
                postAi:function (targets){
        return targets.length==1&&targets[0].countCards('j');
    },
                filterTarget:function (card,player,target){
        if(player==target) return false;
        return target.countDiscardableCards(player,get.is.single()?'he':'hej');
    },
                "yingbian_prompt":"当你使用此牌选择目标后，你可为此牌增加一个目标",
                yingbian:function (event){
        event.yingbian_addTarget=true;
    },
                content:function (){
        'step 0'
                    event.card=target.getCards('h').randomGet();
                    var cards;
                    cards=get.cards(4);
                    event.cards=cards.concat([event.card]);
                    while(cards.length){
                        ui.cardPile.insertBefore(cards.pop().fix(),ui.cardPile.firstChild);
                    }
                    if(get.mode()=='guozhan'){
                        var num=ui.cardPile.childElementCount;
                        var num1=get.rand(1,num-1),num2=get.rand(1,num-1);
                        if(num1==num2){
                            if(num1==0) num2++;
                            else num1--;
                        }
                        event.cards=[event.card,ui.cardPile.childNodes[num1],ui.cardPile.childNodes[num2]];
                    }
                    game.updateRoundNumber();
                    event.cards.randomSort();
                    game.log(player,'展示了',event.cards);
                    event.videoId=lib.status.videoId++;
                    var str=get.translation(player)+'对'+get.translation(target)+'发动了【宴戏】';
                    game.broadcastAll(function(str,id,cards){
                        var dialog=ui.create.dialog(str,cards);
                        dialog.videoId=id;
                    },str,event.videoId,event.cards);
                    game.addVideo('showCards',player,[str,get.cardsInfo(event.cards)]);
                    game.delay(2);
                    'step 1'
                    var func=function(id,target){
                        var dialog=get.idDialog(id);
                        if(dialog) dialog.content.firstChild.innerHTML='猜猜哪张是'+get.translation(target)+'的手牌？';
                    };
                    if(player==game.me) func(event.videoId,target);
                    else if(player.isOnline()) player.send(func,event.videoId,target);
                    'step 2'
                    var next=player.chooseButton(true);
                    next.set('dialog',event.videoId);
                    next.set('ai',function(button){
                        if(_status.event.answer) return button.link==_status.event.answer?1:0;
                        return get.value(button.link,_status.event.player);
                    });
                    if(player.hasSkillTag('viewHandcard',null,target,true)) next.set('answer',card);
                    'step 3'
                    game.broadcastAll('closeDialog',event.videoId);
                    player.addTempSkill('yanxi2');
                    var card2=result.links[0];
                    if(card2==card){
                        player.popup('猜对了');
                        cards.remove(card2);
                        player.$gain2(cards);
                        player.gain(cards,'log').gaintag.add('yanxi');
                        player.gain(card,target,'bySelf','give').gaintag.add('yanxi');
                    }
                    else{
                        player.popup('猜错了');
                        player.gain(card2,'gain2').gaintag.add('yanxi');
                    }
    },
                ai:{
                    basic:{
                        order:9,
                        useful:1,
                        value:5,
                    },
                    yingbian:function (card,player,targets,viewer){
            if(get.attitude(viewer,player)<=0) return 0;
            if(game.hasPlayer(function(current){
                return !targets.contains(current)&&lib.filter.targetEnabled2(card,player,current)&&get.effect(current,card,player,player)>0;
            })) return 6;
            return 0;
        },
                    result:{
                        target:function (player,target){
                var att=get.attitude(player,target);
                var nh=target.countCards('h');
                if(att>0){
                    var js=target.getCards('j');
                    if(js.length){
                        var jj=js[0].viewAs?{name:js[0].viewAs}:js[0];
                        if(jj.name=='guohe'||js.length>1||get.effect(target,jj,target,player)<0){
                            return 3;
                        }
                    }
                    if(target.getEquip('baiyin')&&target.isDamaged()&&
                        get.recoverEffect(target,player,player)>0){
                        if(target.hp==1&&!target.hujia) return 1.6;
                        if(target.hp==2) return 0.01;
                        return 0;
                    }
                }
                var es=target.getCards('e');
                var noe=(es.length==0||target.hasSkillTag('noe'));
                var noe2=(es.filter(function(esx){
                    return get.value(esx,target)>0;
                }).length==0);
                var noh=(nh==0||target.hasSkillTag('noh'));
                if(noh&&(noe||noe2)) return 0;
                if(att<=0&&!target.countCards('he')) return 1.5;
                return -1.5;
            },
                    },
                    tag:{
                        loseCard:1,
                        discard:1,
                    },
                },
            },
            tjdr:{
                audio:true,
                fullskin:true,
                type:"trick",
                enable:true,
                selectTarget:-1,
                cardcolor:"red",
                toself:true,
                filterTarget:function (card,player,target){
        return target==player;
    },
                modTarget:true,
                content:function (){
        var list=['pyzhuren_heart','pyzhuren_club','pyzhuren_diamond','pyzhuren_spade','pyzhuren_shandian'];
        var n=0;
        while(n<3){ 
        player.gain(game.createCard(list.randomGet()),'gain2')
        n++;   
    }
    },
                ai:{
                    basic:{
                        order:7.2,
                        useful:4.5,
                        value:9.2,
                    },
                    result:{
                        target:2,
                    },
                    tag:{
                        draw:2,
                    },
                },
            },
        },
        translate:{
            mlsb:"马良的神笔",
            "mlsb_info":"①当你装备时\\你的回合开始时,获得两张随机衍生牌(包括牌库外),并回复一点体力,获得一点护甲,然后将一张马良神笔和随机衍生牌洗入牌堆②当你受到致命伤害时,防止之,然后你回复满体力,并摸两张牌③你打出的牌无距离和次数限制④你可以将一张牌当做另外一张任意牌使用",
            sb:"马良的神笔",
            "sb_info":"随机使用4张普通锦囊牌/基本（随机指定目标）",
            zmdy:"致命毒药",
            "zmdy_info":"你选择一名角色,收回其所有装备牌,将其的手牌全变为'毒'如果其没手牌,则其获得7张'毒',然后其获得[毒瘴]直至其回合结束,",
            fzdb:"复杂多变",
            "fzdb_info":"选择一名角色，随机观看所有武将牌，选择一张替代其武将牌，并令其的体力和体力上限翻倍，然后结束出牌阶段",
            wgfd:"五谷丰登",
            "wgfd_info":"出牌阶段，对所有角色使用。（选择目标后）你从牌堆顶亮出等同于目标数量两倍的牌，每名目标角色获得这些牌中（剩余的）的任意一张并获得一张此牌的复制牌。",
            tyjy:"桃园结义",
            "tyjy_info":"出牌阶段，对所有角色使用。每名目标角色回复1点体力,获得一张桃和一点护甲。",
            "yuxi_card":"玉玺",
            "yuxi_card_info":"出牌阶段开始时，你可以视为使用一张【南蛮入侵】【万箭齐发】/【桃园结义】/【五谷丰登】。②你死不了的",
            nmrq:"南蛮入侵",
            "nmrq_info":"出牌阶段，对所有其他角色使用。每名目标角色需打出一张【杀】，否则受到1点无来源的伤害并随机弃置2张牌。",
            wjqf:"万箭齐发",
            "wjqf_info":"出牌阶段，对所有其他角色使用。每名目标角色需打出一张【闪】，否则受到1点无来源的伤害,如果其装备区或者手牌区没有牌,则伤害加一。",
            lljq:"玲珑机巧",
            "lljq_info":"出牌阶段,你对一名角色使用,令其装备随机五个(牌库内/外)的装备牌,若其还有空装备栏,则系统为其挑选并装备之",
            zgmj:"诸葛妙计",
            "zgmj_info":"出牌阶段，对你使用。你获得七张随机锦囊牌,并在本回合打出的普通锦囊牌可以额外结算一次。",
            fjym:"福锦延绵",
            "fjym_info":"出牌阶段对自己使用，依次按敌方-友方-敌方-的顺序随机令阵营内一名随机角色获得一张红桃牌然后流失一点体力（目标不包含你），共结算X次，X为存活角色数，若X为偶数，改为2X",
            xrhh:"仙人幻化",
            "xrhh_info":"出牌阶段,你选择一名角色令其技能替换成[1-10]个随机的技能",
            hsty:"慧识天谕",
            "hsty_info":"<span style=font-family:yuanli><font color=#DE1644>设计来源B站Up_Eissenhauer</font></span><br>出牌阶段，你进行判定并获得判定牌，然后你可对自己使用之（不计入本回合出牌阶段次数），若使用则重复此流程。",
            zzjm:"忠贞节命",
            "zzjm_info":"出牌阶段，你选择一名角色令其将手牌补至五张,然后其获得他自己五张随机手牌的复制。",
            cccx:"曹冲称象",
            "cccx_info":"出牌阶段，你可以发动一次曹冲的[称象],将亮出的牌数改为十三张,其余效果不变。",
            yxsr:"宴戏识人",
            "yxsr_info":"出牌阶段，对区域里有牌的一名其他角色使用,然后你对其发动一次晋王元姬的[宴戏],将亮出的牌改为五张,其余效果不变。",
            tjdr:"天匠锻刃",
            "tjdr_info":"出牌阶段，对你使用,你获得随机三张专铸阴兵的打铁匠的阴刀。",
        },
        list:[["heart","1","lljq"],["heart","1","zgmj"],["heart","1","mlsb"],["heart","1","sb"],["heart","1","zmdy"],["heart","1","fzdb"],["heart","1","wgfd"],["heart","1","tyjy"],["heart","1","yuxi_card"],["heart","1","nmrq"],["heart","1","wjqf"],["heart","1","lljq"],["heart","1","zgmj"],["heart","1","lljq"],["heart","1","zgmj"],["heart","1","mlsb"],["heart","1","sb"],["heart","1","zmdy"],["heart","1","fzdb"],["heart","1","wgfd"],["heart","1","tyjy"],["heart","1","yuxi_card"],["heart","1","nmrq"],["heart","1","wjqf"],["heart","1","lljq"],["heart","1","zgmj"],["heart","1","fjym"],["heart","1","zzjm"],["heart","1","cccx"],["heart","1","xrhh"],["heart","1","xrhh"],["heart","1","xrhh"],["heart","1","xrhh"],["heart","1","xrhh"],["heart","1","yxsr"],["heart","1","yxsr"],["heart","1","yxsr"],["heart","1","tjdr"],["heart","1","tjdr"],["heart","1","yxsr"],["heart","1","hsty"],["heart","1","hsty"],["heart","1","lljq"],["heart","1","zgmj"],["heart","1","mlsb"],["heart","1","sb"],["heart","1","zmdy"],["heart","1","fzdb"],["heart","1","wgfd"],["heart","1","tyjy"],["heart","1","yuxi_card"],["heart","1","nmrq"],["heart","1","wjqf"],["heart","1","lljq"],["heart","1","zgmj"],["heart","1","lljq"],["heart","1","zgmj"],["heart","1","mlsb"],["heart","1","sb"],["heart","1","zmdy"],["heart","1","fzdb"],["heart","1","wgfd"],["heart","1","tyjy"],["heart","1","yuxi_card"],["heart","1","nmrq"],["heart","1","wjqf"],["heart","1","lljq"],["heart","1","zgmj"],["heart","1","fjym"],["heart","1","zzjm"],["heart","1","cccx"],["heart","1","xrhh"],["heart","1","xrhh"],["heart","1","xrhh"],["heart","1","xrhh"],["heart","1","xrhh"],["heart","1","yxsr"],["heart","1","yxsr"],["heart","1","yxsr"],["heart","1","tjdr"],["heart","1","tjdr"],["heart","1","yxsr"],["heart","1","hsty"],["heart","1","hsty"]],
    },
    skill:{
        skill:{
            "121":{
                audio:"shuishi",
                enable:"phaseUse",
                usable:1,
                filter:function (event,player){
        return player.maxHp<10;
    },
                content:function (){
        'step 0'
        event.cards=[];
        event.suits=[];
        'step 1'
        player.judge(function(result){
            var evt=_status.event.getParent('reshuishi');
            if(evt&&evt.suits&&evt.suits.contains(get.suit(result))) return 0;
            return 1;
        }).set('callback',function(){
            event.getParent().orderingCards.remove(event.judgeResult.card);
        }).judge2=function(result){
            return result.bool?true:false;
        };
        'step 2'
        event.cards.push(result.card);
        if(result.bool&&player.maxHp<10){
            event.suits.push(result.suit);
            player.gainMaxHp();
            event.goto(1);
        }
        else{
            cards=cards.filterInD();
            if(cards.length) player.chooseTarget('将'+get.translation(cards)+'交给一名角色',true).set('ai',function(target){
                var player=_status.event.player;
                var att=get.attitude(player,target)/Math.sqrt(1+target.countCards('h'));
                if(target.hasSkillTag('nogain')) att/=10;
                return att;
            });
            else event.finish();
        }
        'step 3'
        if(result.bool){
            var target=result.targets[0];
            event.target=target;
            player.line(target,'green');
            target.gain(cards,'gain2');
        }
        'step 4'
        if(target.isMaxHandcard()) player.loseMaxHp();
    },
                ai:{
                    order:1,
                    result:{
                        player:1,
                    },
                },
            },
            "gd40cc":{
                superCharlotte:true,
                audio:"nzry_shicai_2",
                ai:{
                    reverseOrder:true,
                    skillTagFilter:function (player){
            if(player.getHistory('useCard',function(evt){
                return get.type(evt.card)=='equip';
            }).length>0) return false;
        },
                    effect:{
                        target:function (card,player,target){
                if(player==target&&get.type(card)=='equip'&&!player.getHistory('useCard',function(evt){
                    return get.type(evt.card)=='equip'
                }).length==0) return [1,3];
            },
                    },
                    threaten:2.4,
                },
                subSkill:{
                    "2":{
                        audio:2,
                        sub:true,
                    },
                },
                trigger:{
                    player:["useCardAfter"],
                    target:"useCardToTargeted",
                },
                filter:function (event,player,name){
        if(name=='useCardToTargeted'&&('equip'!=get.type(event.card)||event.player!=player)) return false;
        if(name=='useCardAfter'&&['equip','delay'].contains(get.type(event.card))) return false;
        if(event.cards.filterInD().length<=0) return false;
        var history=player.getHistory('useCard');
        var evt=name=='useCardAfter'?event:event.getParent();
        for(var i=0;i<history.length;i++){
            if(history[i]!=evt&&get.type(history[i].card)==get.type(event.card)) return true;
            else if(history[i]==evt) return true;
        }
        return false;
    },
                content:function (){
        "step 0"
        event.cards=trigger.cards.filterInD();
        if(event.cards.length>1){
            player.chooseButton(true,event.cards.length,['按顺序将卡牌置于牌堆顶（先选择的在上）',event.cards]).set('ai',function(button){
                var value=get.value(button.link);
                if(_status.event.reverse) return value;
                return -value;
            }).set('reverse',((_status.currentPhase&&_status.currentPhase.next)?get.attitude(player,_status.currentPhase.next)>0:false))
        }
        "step 1"
        if(result.bool&&result.links&&result.links.length) cards=result.links.slice(0);
        while(cards.length){
            var card=cards.pop();
            if(get.position(card,true)=='o'){
                card.fix();
                ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
                game.log(player,'将',card,'置于牌堆顶');
            }
        }
        game.updateRoundNumber();
        player.draw();
    },
            },
            "gd40cl":{
                superCharlotte:true,
                mark:true,
                locked:false,
                zhuanhuanji:true,
                marktext:"成",
                intro:{
                    content:function (storage,player,skill){
            var str=player.storage.nzry_chenglve?'出牌阶段限一次，你可以摸两张牌，然后弃置一张手牌。若如此做，直到本回合结束，你使用与弃置牌花色相同的牌无距离和次数限制':'出牌阶段限一次，你可以摸一张牌，然后弃置两张手牌。若如此做，直到本回合结束，你使用与弃置牌花色相同的牌无距离和次数限制';
            if(player.storage.nzry_chenglve1){
                str+='<br><li>当前花色：';
                str+=get.translation(player.storage.nzry_chenglve1);
            }
            return str;
        },
                },
                enable:"phaseUse",
                usable:1,
                audio:"ext:高达宇宙(续写):2",
                content:function (){
        'step 0'
        if(player.storage.nzry_chenglve==true){
            player.storage.nzry_chenglve=false;
            player.draw(4);
            player.chooseToDiscard(2,'h',true);
        }else{
            player.storage.nzry_chenglve=true;
            player.draw(2);
            player.chooseToDiscard(4,'h',true);
        };
        'step 1'
        if(result.bool){
            player.storage.nzry_chenglve1=[];
            for(var i=0;i<result.cards.length;i++){
                player.storage.nzry_chenglve1.add(get.suit(result.cards[i],player));
            }
            player.markSkill('nzry_chenglve');
            player.addTempSkill('nzry_chenglve1');
        };
    },
                ai:{
                    order:2.7,
                    result:{
                        player:function (player){
                if((player.storage.nzry_chenglve==undefined||player.storage.nzry_chenglve==false)&&player.countCards('h')<3) return 0;
                return 1;
            },
                    },
                },
            },
            "gd40cm":{
                superCharlotte:true,
                audio:"ext:高达宇宙(续写):2",
                group:["gd40cm2","gd40cm3"],
                trigger:{
                    player:"drawBegin",
                },
                forced:true,
                content:function (){
        trigger.bottom=true;
        trigger.num=trigger.num*2;
    },
            },
            "gd40cm2":{
                audio:"ext:高达宇宙(续写):2",
                trigger:{
                    global:"drawBegin",
                },
                filter:function (trigger,player){
        return trigger.player!=player;
    },
                forced:true,
                content:function (trigger){
        trigger.num--;
        trigger.player.chooseToDiscard('he',true);
        
    },
            },
            "gd40cm3":{
                audio:"ext:高达宇宙(续写):2",
                group:["gd40cm2"],
                trigger:{
                    global:"damageBefore",
                },
                filter:function (trigger,player){
        return trigger.player!=player&&trigger.player.countCards('h')==0;
    },
                forced:true,
                content:function (){
        trigger.num++;
    },
            },
            "gd41gw":{
                audio:"ext:高达宇宙(续写):2",
                superCharlotte:true,
                trigger:{
                    global:"phaseUseEnd",
                },
                filter:function (event,player){
        var history=event.player.getHistory('useCard',function(evt){
            return evt.getParent('phaseUse')==event;
        });
        var num=0;
        var suit=false;
        for(var i=0;i<history.length;i++){
            var suit2=get.suit(history[i].card);
            if(!suit2) continue;
            if(suit&&suit!=suit2) return true;
            suit=suit2;
            num++;
        }
        return num>0;
        var list=[];
        var skills=trigger.player.getOriginalSkills();
        for(var i=0;i<skills.length;i++){
            if(lib.skill[skills[i]].limited&&trigger.player.awakenedSkills.contains(skills[i])){
                list.push(skills[i]);
            }
        }
    },
                direct:true,
                content:function (){
        'step 0'
        player.chooseToDiscard('he',get.prompt('xinfu_guanwei',trigger.player),'弃置一张牌，令其摸两张牌并进行一个额外的回合。').set('ai',function(card){
            if(get.attitude(_status.event.player,_status.currentPhase)<1) return 0;
            return 9-get.value(card);
        }).set('logSkill','xinfu_guanwei');
        'step 1'
        var list=[];
        var skills=trigger.player.getOriginalSkills();
        for(var i=0;i<skills.length;i++){
            if(lib.skill[skills[i]].limited&&trigger.player.awakenedSkills.contains(skills[i])){
                list.push(skills[i]);
            }
        }
        if(list.length==1){
            trigger.player.storage.xiongsuan_restore=list[0];
            trigger.player.addTempSkill('xiongsuan_restore','phaseZhunbeiBegin');
        }
        else if(list.length>1){
            trigger.player.chooseControl(list).set('prompt','选择一个限定技在回合结束后重置之');
        }
        if(result.bool){
            player.line(trigger.player,'green');
            player.draw();
            trigger.player.restoreSkill(list[0]);
            trigger.player.addTempSkill('gd41gw1',{player:"phaseUseEnd"});
            trigger.player.addTempSkill('gd41zh',{player:"phaseUseEnd"});
            trigger.player.draw(2);
            trigger.player.turnOver(false);
            trigger.player.link(false);
        }else{
            event.finish();
        }
        'step 2'
        trigger.player.insertPhase();
    },
                ai:{
                    expose:0.5,
                },
            },
            "gd41gq":{
                audio:"ext:高达宇宙(续写):true",
                superCharlotte:true,
                group:["gd41gq2","gd41gq3"],
                trigger:{
                    player:["damageBegin3","damageBegin4"],
                },
                forced:true,
                filter:function (event,player,name){
        if(!event.source) return false;
        var range=event.source.getAttackRange();
        if(name=='damageBegin3') return range>3;
        return event.num>1&&range<3;
    },
                content:function (){
        trigger.num=event.triggername=='damageBegin4'?1:trigger.cancel();player.recover(player.maxHp-player.hp);
        trigger.source.addSkill('gd41gq5');
    },
                mod:{
                    targetEnabled:function (card,player,target,now){
            if(get.type(card)=='delay') return false;
        },
                },
                ai:{
                    noCompare:true,
                    noequip:true,
                    filterDamage:true,
                    skillTagFilter:function (player,tag,arg){
            if(arg&&arg.player){
                if(arg.player.hasSkillTag('jueqing',false,player)) return false;
                if(arg.player.getAttackRange()<3) return true;
            }
            return false;
        },
                },
            },
            "gd41gq2":{
                audio:"ext:高达宇宙(续写):2",
                trigger:{
                    player:"damageEnd",
                },
                forced:true,
                filter:function (event,trigger,player){
        return trigger.source!=player||trigger.source!=undefined;
    },
                content:function (){
        trigger.source.addSkill('gd41gq5');
    },
            },
            "gd41gw1":{
                superCharlotte:true,
                noRemove:true,
                noDisabled:true,
                trigger:{
                    player:"useCard",
                },
                forced:true,
                mark:true,
                intro:{
                    content:"使用牌时，令高达41号获得1点护甲,该技能在出牌结束时失效",
                },
                content:function (){
        game.countPlayer(function(current){
            if(current.name!='gd2') return false;
            current.changeHujia();
            return true;
        });
    },
                mod:{
                    cardUseable:function (card,player,num){
            if(card.name=='sha') return Infinity;
        },
                },
            },
            "gd41gq5":{
                superCharlotte:true,
                noRemove:true,
                noDisabled:true,
                trigger:{
                    player:["useCard","loseEnd"],
                },
                forced:true,
                mark:true,
                intro:{
                    content:"使用牌时或者失去牌的时候，令高达2号增加一点护甲,你流失一点体力",
                },
                content:function (){
        game.countPlayer(function(current){
            if(current.name!='gd2') return false;
            current.changeHujia();
            player.loseHp();
            return true;
        });
    },
            },
            "gd42yz2":{
                mark:true,
                intro:{
                    content:"跳过下回合的所有阶段",
                },
            },
            "gd42yz":{
                audio:"ext:高达宇宙(续写):2",
                superCharlotte:true,
                enable:"phaseUse",
                group:["gd42yz3","gd42yz4","gd42yz5"],
                usable:1,
                selectTarget:[1,Infinity],
                filter:function (event,player){
        return game.hasPlayer(function(current){
            return current.hp<=player.hp&&player.canCompare(current)||!current.hasSkill('gd42yz2');
        });
    },
                filterTarget:function (card,player,current){
        return player.canCompare(current);
    },
                content:function (){
        'step 0'
        player.chooseToCompare(target);
        'step 1'
        if(result.bool){
            target.skip('phaseBegin')
            target.skip('phaseJudge')
            target.skip('phaseDraw');
            target.skip('phaseUse');
            target.skip('phaseDiscard');
            target.skip('phaseEnd');
            target.addTempSkill('gd42yz2',{player:'phaseBegin'});
        }
        else player.hp*2;
    },
                ai:{
                    order:1,
                    result:{
                        target:function (player,target){
                if(target.skipList.contains('phaseDraw')||target.hasSkill('pingkou')) return 0;
                var hs=player.getCards('h').sort(function(a,b){
                    return b.number-a.number;
                });
                var ts=target.getCards('h').sort(function(a,b){
                    return b.number-a.number;
                });
                if(!hs.length||!ts.length) return 0;
                if(hs[0].number>ts[0].number) return -1;
                return 0;
            },
                    },
                },
            },
            "gd42yz3":{
                audio:"ext:高达宇宙(续写):2",
                enable:"chooseCard",
                check:function (event,player){
        var player=_status.event.player;
        return (!player.hasCard(function(card){
            var val=get.value(card);
            return val<0||(val<=4&&(card.number>=11||get.suit(card)=='heart'));
        },'h'))?20:0;
    },
                filter:function (event){
        return event.type=='compare'&&!event.directresult;
    },
                onCompare:function (player){
        return game.cardsGotoOrdering(get.cards()).cards;
    },
                group:"tianbian_number",
                subSkill:{
                    number:{
                        trigger:{
                            player:"compare",
                            target:"compare",
                        },
                        filter:function (event,player){
                if(event.iwhile) return false;
                if(event.player==player){
                    return get.suit(event.card1)=='heart';//&&event.card1.vanishtag.contains('tianbian');
                }
                else{
                    return get.suit(event.card2)=='heart';//&&event.card2.vanishtag.contains('tianbian');
                }
            },
                        silent:true,
                        content:function (){
                game.log(player,'拼点牌点数视为','#yK');
                if(player==trigger.player){
                    trigger.num1=13;
                }
                else{
                    trigger.num2=13;
                }
            },
                        sub:true,
                        forced:true,
                        popup:false,
                    },
                },
            },
            "gd42zh":{
                audio:"ext:高达宇宙(续写):2",
                superCharlotte:true,
                priority:1,
                group:"gd42zh3",
                trigger:{
                    player:"phaseZhunbeiBegin",
                },
                forced:true,
                content:function (){
            player.hp=player.hp*2;
            player.maxHp=player.maxHp*2;
        player.drawTo(player.countCards('he')+4);
    },
            },
            "gd42rj":{
                audio:"ext:高达宇宙(续写):2",
                forced:true,
                superCharlotte:true,
                trigger:{
                    player:["damageEnd","loseHp"],
                },
                direct:true,
                content:function (){
        'step 0'
        event.count=trigger.num;
        'step 1'
        event.count--;
        'step 2'
                player.moveCard([1,5]);
                player.gain(get.cardPile(function(card){
            return get.type(card,'basic')=='basic';
        }),'gain2');
            player.gain(get.cardPile(function(card){
            return get.type(card,'trick')=='trick';
        }),'gain2');
              player.gain(get.cardPile(function(card){
            return get.type(card,'equip')=='equip';
        }),'gain2');
        'step 3'
        var card=get.cardPile2(function(card){
            return get.type(card,'trick')==result.control;
        });
        if(card) player.gain(card,'gain2','log');
        'step 4'
        if(event.count>0) event.goto(1);
    },
                ai:{
                    maixie:true,
                    "maixie_hp":true,
                    effect:{
                        target:function (card,player,target){
                if(get.tag(card,'damage')){
                    if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
                    if(!target.hasFriend()) return;
                    var num=1;
                    if(get.attitude(player,target)>0){
                        if(player.needsToDiscard()){
                            num=0.7;
                        }
                        else{
                            num=0.5;
                        }
                    }
                    if(target.hp>=4) return [1,num*2];
                    if(target.hp==3) return [1,num*1.5];
                    if(target.hp==2) return [1,num*0.5];
                }
            },
                    },
                },
            },
            "gd41gw3":{
                marktext:"观微",
                trigger:{
                    global:"phaseAfter",
                },
                silent:true,
                content:function (){
        player.restoreSkill(player.storage.xiongsuan_restore);
    },
                sub:true,
                forced:true,
                popup:false,
            },
            "gd41zh":{
                audio:"ext:高达宇宙(续写):2",
                audioname:["shen_caopi"],
                enable:"phaseUse",
                usable:1,
                position:"he",
                filterCard:function (card,player,event){
        event=event||_status.event;
        if(typeof event!='string') event=event.getParent().name;
        var mod=game.checkMod(card,player,event,'unchanged','cardDiscardable',player);
        if(mod!='unchanged') return mod;
        return true;
    },
                discard:false,
                lose:false,
                delay:false,
                selectCard:[1,Infinity],
                check:function (card){
        var player=_status.event.player;
        if(get.position(card)=='h'&&!player.countCards('h','du')&&(player.hp>2||!player.countCards('h',function(card){
            return get.value(card)>=8;
        }))){
            return 1;
        }
        return 6-get.value(card)
    },
                content:function (){
        'step 0'
        player.discard(cards);
        event.num=1;
        var hs=player.getCards('h');
        if(!hs.length) event.num=0;
        for(var i=0;i<hs.length;i++){
            if(!cards.contains(hs[i])){
                event.num=0;break;
            }
        }
        'step 1'
        player.draw((event.num+cards.length)*2);
        player.recover((event.num+cards.length)*2);
    },
                subSkill:{
                    draw:{
                        trigger:{
                            player:"loseEnd",
                        },
                        silent:true,
                        filter:function (event,player){
                if(event.getParent(2).skill!='rezhiheng'&&event.getParent(2).skill!='jilue_zhiheng') return false;
                if(player.countCards('h')) return false;
                for(var i=0;i<event.cards.length;i++){
                    if(event.cards[i].original=='h') return true;
                }
                return false;
            },
                        content:function (){
                player.addTempSkill('rezhiheng_delay',trigger.getParent(2).skill+'After');
            },
                        sub:true,
                        forced:true,
                        popup:false,
                    },
                    delay:{
                        sub:true,
                    },
                },
                ai:{
                    order:1,
                    result:{
                        player:1,
                    },
                    threaten:1.55,
                },
            },
            "gd41gq3":{
                audio:"ext:高达宇宙(续写):2",
                trigger:{
                    player:["loseHpBefore","loseMaxHpBefore"],
                },
                forced:true,
                unique:true,
                content:function (){
        trigger.untrigger();
        trigger.finish();
},
                ai:{
                    noCompareTarget:true,
                },
            },
            "gd42yz4":{
                audioname:["re_jianyong"],
                forced:true,
                trigger:{
                    player:["chooseToCompareAfter","compareMultipleAfter"],
                    target:["chooseToCompareAfter","compareMultipleAfter"],
                },
                filter:function (event,player){
        if(event.preserve) return false;
        if(player==event.player){
            if(event.num1>event.num2){
                return !get.owner(event.card2);
            }
            else{
                return !get.owner(event.card1);
            }
        }
        else{
            if(event.num1<event.num1){
                return !get.owner(event.card1);
            }
            else{
                return !get.owner(event.card2);
            }
        }
    },
                check:function (event,player){
        if(player==event.player){
            if(event.num1>event.num2){
                return event.card2.name!='du';
            }
            else{
                return event.card1.name!='du';
            }
        }
        else{
            if(event.num1<event.num2){
                return event.card1.name!='du';
            }
            else{
                return event.card2.name!='du';
            }
        }
    },
                content:function (){
        if(player==trigger.player){
            if(trigger.num1>trigger.num2){
                player.gain(trigger.card2,'gain2','log');
            }
            else{
                player.gain(trigger.card1,'gain2','log');
            }
        }
        else{
            if(trigger.num1<trigger.num2){
                player.gain(trigger.card1,'gain2','log');
            }
            else{
                player.gain(trigger.card2,'gain2','log');
            }
        }
    },
            },
            "gd42yz5":{
                forced:true,
                trigger:{
                    global:"chooseToCompareBegin",
                },
                filter:function (event,player){
        if(player==event.player) return true;
        if(event.targets) return event.targets.contains(player);
        return player==event.target;
    },
                logTarget:function (event,player){
        if(player!=event.player) return event.player;
        return event.targets||event.target;
    },
                "prompt2":function (event,player){
        return '令其改为使用随机的手牌进行拼点'
    },
                check:function (trigger,player){
        var num=0;
        var targets=player==trigger.player?(trigger.targets?trigger.targets.slice(0):[trigger.target]):[trigger.player];
        while(targets.length){
            var target=targets.shift();
            if(target.getCards('h').length>1) num-=get.attitude(player,target);
        }
        return num>0;
    },
                content:function (){
        var targets=player==trigger.player?(trigger.targets?trigger.targets.slice(0):[trigger.target]):[trigger.player];
        if(!trigger.fixedResult) trigger.fixedResult={};
        while(targets.length){
            var target=targets.shift();
            var hs=target.getCards('h');
            if(hs.length) trigger.fixedResult[target.playerid]=hs.randomGet();
        }
    },
                group:"hanzhan_gain",
                subfrequent:["gain"],
            },
            "gd43zh":{
                audio:"ext:高达宇宙(续写):2",
                audioname:["re_taoqian"],
                priority:1,
                superCharlotte:true,
                trigger:{
                    global:"dying",
                },
                forced:true,
                filter:function (event,player){
        return player.maxHp>1;
    },
                content:function (){
        'step 0'
        event.num=player.maxHp-1;
        player.loseMaxHp(event.num,true);
        'step 1'
        var list=[];
        var typelist=[];
        var getType=function(card){
            var sub=get.subtype(card);
            if(sub) return sub;
            return card.name;
        };
        for(var i=0;i<ui.cardPile.childElementCount;i++){
            var node=ui.cardPile.childNodes[i];
            var typex=getType(node);
            if(!typelist.contains(typex)){
                list.push(node);
                typelist.push(typex);
                if(list.length>=4) break;
            }
        }
        if(list.length<4){
            for(var i=0;i<ui.discardPile.childElementCount;i++){
                var node=ui.discardPile.childNodes[i];
                var typex=getType(node);
                    if(!typelist.contains(typex)){
                    list.push(node);
                    typelist.push(typex);
                    if(list.length>=4) break;
                }
            }
        }
        player.gain(list,'gain2');
        player.tempHide();
        game.updateRoundNumber();
    },
            },
            "gd43yn":{
                audio:"yixiang",
                audioname:["re_taoqian"],
                superCharlotte:true,
                group:["reyixiang_card","gd43yn2","gd43yn3"],
                trigger:{
                    player:"damageBegin1",
                },
                forced:true,
                filter:function (event,player){
        var evt=event.getParent(2);
        if(evt.name!='useCard'||evt.card!=event.card) return false;
        var source=evt.player;
        var phsu=evt.getParent('phaseUse');
        if(!source||source==player||source!=phsu.player) return false;
        return source.getHistory('useCard',function(evt2){
            return evt2.getParent('phaseUse')==phsu;
        })[0]==evt;
    },
                content:function (){
        trigger.cancel();
    },
                subSkill:{
                    card:{
                        trigger:{
                            target:"useCardToTargeted",
                        },
                        forced:true,
                        filter:function (event,player){
                if(get.color(event.card)!='black') return false;
                var evt=event.getParent();
                var source=evt.player;
                var phsu=evt.getParent('phaseUse');
                if(!source||source==player||source!=phsu.player) return false;
                return source.getHistory('useCard',function(evt2){
                    return evt2.getParent('phaseUse')==phsu;
                }).indexOf(evt)==1;
            },
                        content:function (){
                trigger.excluded.add(player);
                player.tempHide();
            },
                        sub:true,
                    },
                },
                ai:{
                    effect:{
                        target:function (card,player,target,current,isLink){
                if(isLink||!player.isPhaseUsing()) return;
                var num;
                var evt=_status.event.getParent('useCard'),evt2=_status.event.getParent('phaseUse');
                if(evt.card==card){
                    num=player.getHistory('useCard',function(evt){
                        return evt.getParent('phaseUse')==evt2;
                    }).indexOf(evt);
                }
                else num=player.getHistory('useCard',function(evt){
                    return evt.getParent('phaseUse')==evt2;
                }).length;
                if(num<0||num>1) return;
                if(num==0&&get.tag(card,'damage')) return 'zerotarget';
                if(num==1&&get.color(card)=='black') return 'zeroplayertarget';
            },
                    },
                },
            },
            "gd43yn2":{
                trigger:{
                    player:"loseEnd",
                },
                forced:true,
                content:function (){
        player.$draw();
        var list=[];
                                    for(var i in lib.card){
                                        if(!lib.translate[i+'_info']) continue;
                                        if(lib.card[i].mode&&lib.card[i].mode.contains(lib.config.mode)==false) continue;
                                        if(lib.config.hiddenCardPack.indexOf(i)==0) continue;
                                        var info=lib.card[i];
                                        if(info.type&&info.type=='basic') list.push(i);
                                    }
                                    player.gain(game.createCard2(list.randomGet()));
    },
            },
            "gd43yr":{
                audio:"ext:高达宇宙(续写):2",
                audioname:["re_taoqian"],
                superCharlotte:true,
                forced:true,
                trigger:{
                    player:"phaseUseBegin",
                    global:"dying",
                },
                direct:true,
                filter:function (event,player){
        return game.hasPlayer(function(current){
            return current.maxHp>=player.maxHp;
        });
    },
                content:function (){
        'step 0'
        player.chooseTarget(get.prompt2('yirang'),function(card,player,target){
            return target.maxHp>player.maxHp;
        }).set('ai',function(target){
            return (get.attitude(_status.event.player,target)-2)*target.maxHp;
        });
        'step 1'
        if(result.bool){
            var cards=player.getCards('he',function(card){
                return get.type(card)!='basic';
            });
            var target=result.targets[0];
            var types=[];
            for(var i=0;i<cards.length;i++){
                types.add(get.type(cards[i],'trick'));
            }
            player.logSkill('yirang',target);
            target.gain(cards,player,'give');
            player.gainMaxHp(target.maxHp-player.maxHp);
            player.recover(Infinity);
            player.update();
            game.delay();
        }
    },
            },
            "gd43yn3":{
                audio:"ext:高达宇宙(续写):2",
                audioname:["re_taoqian"],
                trigger:{
                    target:"useCardToTargeted",
                },
                frequent:true,
                filter:function (event,player){
        var hs=player.getCards('h');
        var names=['sha','shan','tao','jiu','wuxie'];
        if(!names.length) return false;
        for(var i=0;i<ui.cardPile.childElementCount;i++){
            if(names.contains(ui.cardPile.childNodes[i].name)){
                return true;
            }
        }
        return false;
    },
                content:function (){
        var hs=player.getCards('h');
        var list=[];
        var names=['sha','shan','tao','jiu','wuxie'];
        for(var i=0;i<ui.cardPile.childElementCount;i++){
            if(names.contains(ui.cardPile.childNodes[i].name)){
                list.push(ui.cardPile.childNodes[i]);
            }
        }
        if(list.length){
            player.gain(list.randomGet(),'draw');
        }
    },
            },
            "gd45yy":{
                audio:"ext:高达宇宙(续写).3.0:2",
                superCharlotte:true,
                trigger:{
                    player:"useCardAfter",
                },
                direct:true,
                filter:function (event,player){
        if(player.getHistory('custom',function(evt){
            return evt.yingyuan_name==event.card.name;
        }).length>0) return true;
        return event.cards.filterInD().length>0
    },
                content:function (){
        'step 0'
        player.chooseTarget(get.prompt('yingyuan'),'将'+get.translation(trigger.cards)+'交给一名其他角色',function(card,player,target){
            return target!=player;
        }).set('ai',function(target){
            if(target.hasJudge('lebu')) return 0;
            var att=get.attitude(_status.event.player,target);
            if(att<3) return 0;
            if(target.hasSkillTag('nogain')) att/=10;
            if(target.hasSha()&&_status.event.sha){
                att/=5;
            }
            if(event.wuxie&&target.needsToDiscard(1)){
                att/=5;
            }
            return att/(1+get.distance(player,target,'absolute'));
        }).set('sha',trigger.cards[0].name=='sha').set('wuxie',trigger.cards[0].name=='wuxie');
        'step 1'
        if(result.bool){
            player.logSkill('yingyuan',result.targets[0]);
            result.targets[0].gain(game.createCard(trigger.cards.filterInD().randomGet()),'gain2');
            player.getHistory('custom').push({yingyuan_name:trigger.card.name});
        }
        'step 2'
        var list=[];
                                    for(var i in lib.card){
                                        if(!lib.translate[i+'_info']) continue;
                                        if(lib.card[i].mode&&lib.card[i].mode.contains(lib.config.mode)==false) continue;
                                        if(lib.config.hiddenCardPack.indexOf(i)==0) continue;
                                        var info=lib.card[i];
                                        list.push(i);
                                    }
        var card1=game.createCard2(list.randomGet(),null);
        var card2=game.createCard2(list.randomGet(),null);
        var a=[];
        if(ui.cardPile.childElementCount<3){
         game.boss.getCards(4);
        }
        for(var i=0;i<ui.cardPile.childElementCount;i++){
         a.push(i);
        }
        ui.cardPile.insertBefore(card1,ui.cardPile.childNodes[a.randomGet()]);
        a.push(a.length);
        ui.cardPile.insertBefore(card2,ui.cardPile.childNodes[a.randomGet()]);
        game.log('牌堆中添加了',card1,card2);
        game.updateRoundNumber();
    },
            },
            "gd45zs2":{
                audio:"zishu",
                group:["gd45zs","gd45zs3","gd45zs4","mlsb5"],
                superCharlotte:true,
                trigger:{
                    player:"drawAfter",
                },
                forced:true,
                content:function (){
        var list=[];
                                    for(var i in lib.card){
                                        if(!lib.translate[i+'_info']) continue;
                                        if(lib.card[i].mode&&lib.card[i].mode.contains(lib.config.mode)==false) continue;
                                        if(lib.config.hiddenCardPack.indexOf(i)==0) continue;
                                        var info=lib.card[i];
                                        if(info.type&&info.type=='basic'||info.type=='trick'||info.type=='equip') list.push(i);
                                    }
                                          player.gain(game.createCard(list.randomGet()));
                player.recover();
                player.changeHujia();
    },
            },
            "gd45zs":{
                audio:"ext:高达宇宙(续写).3.0:2",
                usable:6,
                trigger:{
                    player:"useCard",
                },
                frequent:true,
                content:function (){
        player.draw();
    },
            },
            mlsb:{
                audio:"zishu",
                group:["mlsb2","mlsb3","mlsb4","mlsb5"],
                superCharlotte:true,
                trigger:{
                    player:["phaseBegin","equipAfter"],
                },
                filter:function (event,card){
        return event.card.name=='mlsb';
    },
                frequent:true,
                content:function (){
        var n=1
        while(n<3){
        var list=[];
                                    for(var i in lib.card){
                                        if(!lib.translate[i+'_info']) continue;
                                        if(lib.card[i].mode&&lib.card[i].mode.contains(lib.config.mode)==false) continue;
                                        if(lib.config.hiddenCardPack.indexOf(i)==0) continue;
                                        var info=lib.card[i];
                                        list.push(i);
                                   }
                                              
                player.gain(game.createCard2(list.randomGet()));
                n++;
        }
                player.recover();
                player.changeHujia();
        var list=[];
                                    for(var i in lib.card){
                                        if(!lib.translate[i+'_info']) continue;
                                        if(lib.card[i].mode&&lib.card[i].mode.contains(lib.config.mode)==false) continue;
                                        if(lib.config.hiddenCardPack.indexOf(i)==0) continue;
                                        var info=lib.card[i];
                                        list.push(i);
                                    }
        var card1=game.createCard2('sb','heart',3,null);
        var card2=game.createCard2('mlsb','heart',4,null);
        var card3=game.createCard2(list.randomGet(),null);
        var a=[];
        if(ui.cardPile.childElementCount<3){
         game.boss.getCards(4);
        }
        for(var i=0;i<ui.cardPile.childElementCount;i++){
         a.push(i);
        }
        ui.cardPile.insertBefore(card1,ui.cardPile.childNodes[a.randomGet()]);
        a.push(a.length);
        ui.cardPile.insertBefore(card2,ui.cardPile.childNodes[a.randomGet()]);
        a.push(a.length);
        ui.cardPile.insertBefore(card3,ui.cardPile.childNodes[a.randomGet()]);
        game.log('牌堆中添加了',card1,card2,card3);
        game.updateRoundNumber();
        player.say('神笔出神入化,五彩斑斓万物来');

    },
            },
            "gd45zs3":{
                audio:"ext:高达宇宙(续写).3.0:2",
                trigger:{
                    player:["phaseZhunbeiBegin","loseEnd"],
                    global:"gameStart",
                },
                forced:true,
                filter:function (event,player,card){
        return !player.getEquip('mlsb');
    },
                content:function (){
        if(trigger.name=='phaseZhunbei'){
            player.useCard(game.createCard('mlsb'),player);

        }
    },
            },
            "mlsb2":{
                equipSkill:true,
                trigger:{
                    player:"damageBegin4",
                },
                filter:function (event,player){
        if(player.hasSkillTag('unequip2')) return false;
        if(event.source&&event.source.hasSkillTag('unequip',false,{
            name:event.card?event.card.name:null,
            target:player,
            card:event.card
        })) return false;
        return event.num>=player.hp;
    },
                content:function (){
        trigger.cancel();
        var e2=player.getEquip('mlsb');
        if(e2){
            player.discard(e2);
            player.recover(Infinity);
            player.draw(2);
        }
    },
            },
            "mlsb3":{
                mod:{
                    cardUsable:function (card){
            if(get.info(card)&&get.info(card).forceUsable) return;
            return Infinity;
        },
                    targetInRange:function (){
            return true;
        },
                },
                audio:"zishu",
            },
            "gd46lg":{
                shaRelated:true,
                forced:true,
                group:["gd46lg2","gd46lg3"],
                mod:{
                    targetInRange:function (card,player,target){
            if(card.name=='sha'&&typeof get.number(card)=='number'){
                if(get.distance(player,target)<=get.number(card)) return true;
            }
        },
                },
                audio:"liegong",
                audioname:["re_huangzhong"],
                trigger:{
                    player:"useCardToTargeted",
                },
                logTarget:"target",
                check:function (event,player){
        return get.attitude(player,event.target)<=0;
    },
                filter:function (event,player){
        if(event.card.name!='sha') return false;
        if(event.target.countCards('h')<=player.countCards('h')) return true;
        if(event.target.hp>=player.hp) return true;
        return false;
    },
                content:function (){
        if(trigger.target.countCards('h')<=player.countCards('h')) trigger.getParent().directHit.push(trigger.target);
        if(trigger.target.hp>=player.hp){
            var id=trigger.target.playerid;
            var map=trigger.getParent().customArgs;
            if(!map[id]) map[id]={};
            if(typeof map[id].extraDamage!='number'){
                map[id].extraDamage=0;
            }
            map[id].extraDamage++;
        }
    },
                ai:{
                    threaten:0.5,
                    "directHit_ai":true,
                    skillTagFilter:function (player,tag,arg){
            if(get.attitude(player,arg.target)<=0&&arg.card.name=='sha'&&player.countCards('h',function(card){
                return card!=arg.card&&(!arg.card.cards||!arg.card.cards.contains(card));
            })>=arg.target.countCards('h')) return true;
            return false;
        },
                },
            },
            "gd46lg2":{
                trigger:{
                    player:"useCard",
                },
                direct:true,
                filter:function (event,card){
        return event.card.name!='sha';
    },
                content:function (){
        player.chooseUseTarget('###是否发动【烈弓】？###视为使用一张没有距离限制的【杀】且不计次数',{name:'sha'},false,'nodistance');
    },
                ai:{
                    threaten:function (player,target){
            return 1.6;
        },
                },
            },
            "gd46lg3":{
                trigger:{
                    global:"phaseAfter",
                },
                frequent:true,
                filter:function (event,player){
        return player.getStat('kill')>0;
    },
                content:function (){
        player.insertPhase();
    },
            },
            "gd46js":{
                audio:"ext:高达宇宙(同人作)写).3.0:2",
                group:["gd46js2","gd46js3","gd46js4","gd46js5"],
                superCharlotte:true,
                locked:true,
                trigger:{
                    source:"damageBefore",
                },
                forced:true,
                filter:function (event,player){
        return event.player!=player;
    },
                check:function (){
        return false;
    },
                content:function (){
        trigger.player.addMark('gd46js',1);
        player.changeHujia(trigger.num*2);
    },
                intro:{
                    "name2":"伤",
                    content:"mark",
                },
            },
            "gd46js2":{
                audio:"ext:高达宇宙(同人作)写).3.0:2",
                priority:1,
                trigger:{
                    source:"damageBefore",
                },
                filter:function (event,player){
        return event.player.storage.gd46js==4;
    },
                forced:true,
                check:function (){
        return false;
    },
                content:function (){
        trigger.player.delete();
        trigger.player.die();
        trigger.player.remove();
    },
            },
            "gd45zs4":{
                audio:"ext:高达宇宙(续写).3.0:2",
                priority:1,
                trigger:{
                    global:["useCard","loseEnd"],
                },
                frequent:true,
                content:function (){
        var list=[];
                                    for(var i in lib.card){
                                        if(!lib.translate[i+'_info']) continue;
                                        if(lib.card[i].mode&&lib.card[i].mode.contains(lib.config.mode)==false) continue;
                                        if(lib.config.hiddenCardPack.indexOf(i)==0) continue;
                                        var info=lib.card[i];
                                        list.push(i);
                                    }
        var card1=game.createCard2(list.randomGet(),null);
        var a=[];
        if(ui.cardPile.childElementCount<3){
         game.boss.getCards(4);
        }
        for(var i=0;i<ui.cardPile.childElementCount;i++){
         a.push(i);
        }
        ui.cardPile.insertBefore(card1,ui.cardPile.childNodes[a.randomGet()]);
        game.log('牌堆中添加了',card1);
        game.updateRoundNumber();
    },
            },
            "gd46js5":{
                priority:2,
                trigger:{
                    source:"damageBefore",
                },
                filter:function (event,player){
        return event.player.storage.gd46js==2;
    },
                forced:true,
                check:function (){
        return false;
    },
                content:function (){
        var num=trigger.player.countCards('he');
        player.gainPlayerCard(trigger.player,'he',true,num);
    },
            },
            "gd46js3":{
                trigger:{
                    source:"damageBefore",
                },
                filter:function (event,player){
        return event.player.storage.gd46js==3;
    },
                forced:true,
                check:function (){
        return false;
    },
                content:function (){
        trigger.player.clearSkills();
    },
            },
            "gd46js4":{
                trigger:{
                    source:"damageEnd",
                },
                forced:true,
                filter:function (event,player){
        if(event._notrigger.contains(event.player)) return false;
        return (event.source!=player&&event.source.isIn())||(event.player!=player&&event.player.isIn());
        return event.player.storage.gd46js==1;
    },
                content:function (){
        var target=trigger.source;
        if(target==player){
            target=trigger.player;
        }
        var list=['ju','kuang','nu','yi','wang','hen','ao'];
        for(var i=0;i<list.length;i++){
            list[i]='ysjqisha_'+list[i];
            if(target.hasSkillTag(list[i])){
                list.splice(i--,1);
            }
        }
        if(list.length){
            target.addSkill(list);
        }
    },
                ai:{
                    threaten:0.8,
                    "maixie_defend":true,
                },
                subSkill:{
                    ju:{
                        mark:true,
                        intro:{
                            content:"锁定技，每当你使用一张牌，需弃置一张牌",
                        },
                        trigger:{
                            player:"useCard",
                        },
                        forced:true,
                        filter:function (event,player){
                return player.countCards('he')>0;
            },
                        content:function (){
                game.delay(0.5);
                player.chooseToDiscard(true,'he');
            },
                        sub:true,
                    },
                    kuang:{
                        mark:true,
                        intro:{
                            content:"锁定技，每当你使用一张牌指定惟一目标，有50%的机率指定错误的目标",
                        },
                        trigger:{
                            player:"useCard",
                        },
                        forced:true,
                        filter:function (event,player){
                return event.getRand()<0.5&&event.targets&&event.targets.length==1&&game.hasPlayer(function(current){
                    return current!=event.targets[0]&&lib.filter.targetEnabled2(event.card,player,current);
                });
            },
                        content:function (){
                'step 0'
                game.delay();
                'step 1'
                var list=game.filterPlayer(function(current){
                    return current!=trigger.targets[0]&&lib.filter.targetEnabled2(trigger.card,player,current);
                });
                if(list.length){
                    var target=list.randomGet();
                    trigger.targets[0]=target;
                    player.line(target,'green');
                }
            },
                        sub:true,
                    },
                    nu:{
                        mark:true,
                        intro:{
                            content:"锁定技，你使用的卡牌造成的伤害+1；每当你使用一张牌，有65%的机率失效",
                        },
                        forced:true,
                        trigger:{
                            source:"damageBegin",
                            player:"useCardToBefore",
                        },
                        filter:function (event,player){
                if(event.name=='damage') return event.notLink()&&(event.card?true:false);
                var info=get.info(event.card);
                if(info.multitarget&&event.targets&&event.targets.contains(player)) return false;
                return event.getRand()<0.65;
            },
                        content:function (){
                if(trigger.name=='damage'){
                    trigger.num++;
                }
                else{
                    trigger.cancel();
                }
            },
                        sub:true,
                    },
                    yi:{
                        mark:true,
                        intro:{
                            content:"锁定技，你不能成为非敌方角色的卡牌目标",
                        },
                        mod:{
                            targetEnabled:function (card,player,target){
                    if(!player.getEnemies().contains(target)) return false;
                },
                        },
                        sub:true,
                    },
                    wang:{
                        mark:true,
                        intro:{
                            content:"锁定技，你的摸牌数始终-1",
                        },
                        priority:5,
                        trigger:{
                            player:"drawBegin",
                        },
                        forced:true,
                        content:function (){
                trigger.num--;
            },
                        sub:true,
                    },
                    hen:{
                        mark:true,
                        intro:{
                            content:"锁定技，每当一名敌方角色回复一点体力，你失去一点体力",
                        },
                        trigger:{
                            global:"recoverAfter",
                        },
                        forced:true,
                        filter:function (event,player){
                return player.getEnemies().contains(event.player);
            },
                        content:function (){
                player.loseHp();
            },
                        sub:true,
                    },
                    ao:{
                        mark:true,
                        intro:{
                            content:"锁定技，你的手牌上限-2",
                        },
                        mod:{
                            maxHandcard:function (player,num){
                    return num-2;
                },
                        },
                        sub:true,
                    },
                },
            },
            "gd42zh3":{
                audio:"ext:高达宇宙(同人作).5.0:2",
                priority:999,
                trigger:{
                    player:"dieBefore",
                },
                ffilter:function (event,player){
        return event.player.maxHp>1&&!player.hasSkill('dz');
    },
                frequent:true,
                content:function (){
        player.loseMaxHp();
        trigger.cancel();
        player.hp=1;
        player.update();
        player.addTempSkill('mianyi',{player:"phaseDrawAfter"});
    },
            },
            "gd8pj":{
                audio:"ext:高达宇宙(同人作).5.0:2",
                superCharlotte:true,
                group:"gd8pj_use",
                trigger:{
                    player:["compare","phaseJudge","loseHpEnd","dying","dyingAfter","phaseBegin","damageEnd","phaseJieshuBegin","phaseUse"],
                },
                initList:function (){
        var list=[];
        if(_status.connectMode) var list=get.charactersOL();
        else{
            var list=[];
            for(var i in lib.character){
                
 if(!lib.translate[i+'_info']) continue;               if(lib.filter.characterDisabled2(i)||lib.filter.characterDisabled(i)) continue;
                list.push(i);
            }
        }
        game.countPlayer2(function(current){
            list.remove(current.name);
            list.remove(current.name1);
            list.remove(current.name2);
            list.remove(current.name3);
            if(current.storage.rehuashen&&current.storage.rehuashen.character) list.removeArray(current.storage.rehuashen.character)
        });
        _status.characterlist=list;
    },
                frequent:true,
                content:function (){
        'step 0'
        event.count=3;
        'step 1'
        event.count--;
        'step 2'
        if(!player.storage.pingjian) player.storage.pingjian=[];
        event._result={bool:true};
        'step 3'
        if(result.bool){
            if(!_status.characterlist){
                lib.skill.pingjian.initList();
            }
            var list=[];
            var skills=[];
            var map=[];
            _status.characterlist.randomSort();
            var name2=event.triggername;
            for(var i=0;i<_status.characterlist.length;i++){
                var name=_status.characterlist[i];
                if(name.indexOf('zuoci')!=-1||name.indexOf('xushao')!=-1) continue;
                var skills2=lib.character[name][3];
                for(var j=0;j<skills2.length;j++){
                    if(player.storage.pingjian.contains(skills2[j])) continue;
                    if(skills.contains(skills2[j])){
                        list.add(name);
                        if(!map[name]) map[name]=[];
                        map[name].push(skills2[j]);
                        skills.add(skills2[j]);
                        continue;
                    }
                    var list2=[skills2[j]];
                    game.expandSkills(list2);
                    for(var k=0;k<list2.length;k++){
                        var info=lib.skill[list2[k]];
                        if(!info||!info.trigger||!info.trigger.player||info.silent||info.limited||info.juexingji||info.zhuanhuanji||info.hiddenSkill) continue;
                        if(info.trigger.player==name2||Array.isArray(info.trigger.player)&&info.trigger.player.contains(name2)){
                            if(info.init||info.ai&&(info.ai.combo||info.ai.notemp||info.ai.neg)) continue;
                            if(info.filter){
                                try{
                                    var bool=info.filter(trigger,player,name2);
                                    if(!bool) continue;
                                }
                                catch(e){
                                    continue;
                                }
                            }
                            list.add(name);
                            if(!map[name]) map[name]=[];
                            map[name].push(skills2[j]);
                            skills.add(skills2[j]);
                            break;
                        }
                    }
                }
                if(list.length>9) break;
            }
            if(!skills.length){
                //player.draw();
                event.finish();
            }
            else{
                //skills.unshift('摸一张牌');
                player.chooseControl(skills).set('dialog',['请选择要发动的技能',[list,'character']]).set('ai',function(){return 0});
            }
        }
        else event.finish();
        'step 4'
        if(result.control=='摸一张牌'){
            player.draw();
            return;
        }
        player.addTempSkill(result.control,event.triggername=='damageEnd'?'damageAfter':'phaseJieshu');
        'step 5'
        if(event.count>0) event.goto(1);
    },
            },
            "gd7bq":{
                audio:"ext:高达宇宙(同人作).5.0:2",
                audioname:["key_yuri"],
                superCharlotte:true,
                trigger:{
                    player:"chooseToUseBefore",
                },
                forced:true,
                filter:function (event,player){return event.type=='dying'&&player.isDying()&&event.dying==player},
                content:function (){
        "step 0"
        player.addMark('gd7yz');
        event.card=get.cards()[0];
        if(player.storage.buqu==undefined) player.storage.buqu=[];
        player.storage.buqu.push(event.card);
        player.syncStorage('buqu');
        //event.trigger("addCardToStorage");
        game.cardsGotoSpecial(event.card);
        player.showCards(player.storage.buqu,'不屈')
        player.markSkill('buqu');
        "step 1"
        for(var i=0;i<player.storage.buqu.length-1;i++){
            if(get.number(event.card)&&get.number(event.card)==get.number(player.storage.buqu[i])){
                player.storage.buqu.remove(event.card);
                player.syncStorage('buqu');
                player.markSkill('buqu');
                game.cardsDiscard(event.card);
                return;
            };
        }
        trigger.cancel();
        trigger.result={bool:true};
        if(player.hp<=0){
            player.recover(1-player.hp);
        }
        "step 2"
        if(player.storage.buqu.length>=13){
            player.unmarkSkill('buqu');
        }
    },
                mod:{
                    maxHandcardBase:function (player,num){
            if(get.mode()!='guozhan'&&player.storage.buqu&&player.storage.buqu.length) return player.storage.buqu.length*2;
        },
                },
                ai:{
                    save:true,
                    mingzhi:true,
                    skillTagFilter:function (player,tag,target){
            if(player!=target) return false;
        },
                },
                intro:{
                    content:"cards",
                    onunmark:function (storage,player){
            if(storage&&storage.length){
                player.$throw(storage,1000);
                game.cardsDiscard(storage);
                delete player.storage.buqu;
            }
        },
                },
            },
            "gd7fj":{
                audio:"ext:高达宇宙(同人作).5.0:2",
                superCharlotte:true,
                trigger:{
                    global:["gainAfter","loseAfter"],
                },
                filter:function (event){
        var evt=event;
        if(event.name=='lose'){
            if(event.type!='discard') return false;
            evt=event.getParent();
        }
        var player=evt[event.name=='gain'?'source':'player'];
        if(!player||player.isDead()) return false;
        if(evt[event.name=='gain'?'bySelf':'notBySelf']!=true) return false;
        if(event.name=='lose') return event.hs.length>0;
        return event.relatedLose&&event.relatedLose.hs&&event.relatedLose.hs.length>0;
    },
                check:function (event,player){
        return get.attitude(player,event[event.name=='gain'?'source':'player'])>2;
    },
                logTarget:function (event){
        return event[event.name=='gain'?'source':'player'];
    },
                content:function (){
        "step 0"
        player.loseHp();
        player.syncStorage('buqu');
        //event.trigger("addCardToStorage");
        game.cardsGotoSpecial(event.card);
        player.showCards(player.storage.buqu,'不屈')
        player.markSkill('buqu');
        player.addMark('gd7yz',1);
        "step 1"
        trigger[trigger.name=='gain'?'source':'player'].draw(4);
    },
            },
            "gd7yz":{
                group:["gd7yz2","gd7yz3","gd7yz4","gd7yz5"],
                superCharlotte:true,
                locked:true,
                forced:true,
                filter:function (event,player){
        return event.player!=player;
    },
                check:function (){
        return false;
    },
                intro:{
                    "name2":"勇",
                    content:"mark",
                },
            },
            "gd7yz2":{
                trigger:{
                    player:"phaseEnd",
                },
                filter:function (event,player){
        return event.player.storage.gd7yz>0;
    },
                forced:true,
                check:function (){
        return false;
    },
                content:function (){
        'step 0'    
        var num=player.storage.gd7yz;
            player.gainMaxHp(num);
            player.recover(num);    
        if(player.storage.buqu){    
        player.gain(player.storage.buqu,'log','gain2','fromStorage');
        }
        player.storage.buqu.length==0;
        player.syncStorage('buqu');
        'step 1'
        player.chooseTarget(true,'请选择一名角色对其造成等同[勇]标记的伤害并且该伤害无来源,然后移除所有[勇]标记',function(card,player,target){
        return player!=target;
    }).ai=function(target){
            return get.damageEffect(target,_status.event.player,_status.event.player,'thunder');
        };
    "step 2"//步骤1
    if(result.bool){//如果有选择角色
        event.target=result.targets[0]; //将选择的角色储存到event.target中
        event.target.damage(3,'noSource');
    }else{//否则
        event.finish();//步骤将于这里终止
    };
    'step 3'
    if(result.bool){
        event.target.damage(3,'noSource')
    };
    player.removeMark('gd7yz',Infinity);
    player.storage.gd7yz==0;
    },
                ai:{
                    result:{
                        target:-1,
                    },
                },
            },
            "gd7yz3":{
                trigger:{
                    player:"dieBefore",
                },
                filter:function (event,player){
        return event.player.storage.gd7yz>0;
    },
                forced:true,
                check:function (){
        return false;
    },
                content:function (){
        trigger.cancel();
        player.draw(2);
        player.hp=1;
        player.removeMark('gd7yz',1);
    },
            },
            "gd7yz4":{
                trigger:{
                    global:"damageBefore",
                },
                filter:function (trigger,player,source){
        return trigger.player!=player&&player.storage.gd7yz>0&&trigger.source==player;
    },
                forced:true,
                content:function (){
        trigger.num+=player.storage.gd7yz;
    },
            },
            "gd7yz5":{
                audio:"ext:高达宇宙(同人作).5.0:2",
                trigger:{
                    player:["damageEnd","loseHpEnd","useCard"],
                    source:"damageSource",
                },
                frequent:true,
                content:function (){
        player.addMark('gd7yz',trigger.num);
    },
            },
            "gd8pj_use":{
                superCharlotte:true,
                audio:"pingjian",
                enable:"phaseUse",
                usable:1,
                position:"he",
                content:function (){
        'step 0'
        event.count=3;
        'step 1'
        event.count--;
        'step 2'
        if(!player.storage.pingjian) player.storage.pingjian=[];
        event._result={bool:true};
        'step 3'
        if(result.bool){
            var list=[];
            var skills=[];
            var map=[];
            if(!_status.characterlist){
                lib.skill.pingjian.initList();
            }
            _status.characterlist.randomSort();
            for(var i=0;i<_status.characterlist.length;i++){
                var name=_status.characterlist[i];
                if(name.indexOf('zuoci')!=-1||name.indexOf('xushao')!=-1) continue;
                var skills2=lib.character[name][3];
                for(var j=0;j<skills2.length;j++){
                    if(player.storage.pingjian.contains(skills2[j])) continue;
                    if(skills.contains(skills2[j])||lib.skill.pingjian.phaseUse_special.contains(skills2[j])){
                        list.add(name);
                        if(!map[name]) map[name]=[];
                        map[name].push(skills2[j]);
                        skills.add(skills2[j]);
                        continue;
                    }
                    var list2=[skills2[j]];
                    game.expandSkills(list2);
                    for(var k=0;k<list2.length;k++){
                        var info=lib.skill[list2[k]];
                        if(!info||!info.enable||info.viewAs||info.limited||info.juexingji||info.zhuanhuanji||info.hiddenSkill) continue;
                        if(info.enable=='phaseUse'||Array.isArray(info.enable)&&info.enable.contains('phaseUse')){
                            if(info.init||info.onChooseToUse||info.ai&&(info.ai.combo||info.ai.notemp||info.ai.neg)) continue;
                            if(info.filter){
                                try{
                                    var bool=info.filter(event.getParent(2),player);
                                    if(!bool) continue;
                                }
                                catch(e){
                                    continue;
                                }
                            }
                            list.add(name);
                            if(!map[name]) map[name]=[];
                            map[name].push(skills2[j]);
                            skills.add(skills2[j]);
                            break;
                        }
                    }
                }
                if(list.length>9) break;
            }
            if(!skills.length){
                //player.draw();
                event.finish();
            }
            else{
                //skills.unshift('摸一张牌');
                player.chooseControl(skills).set('dialog',['请选择要发动的技能',[list,'character']]).set('ai',function(){return 0});
            }
        }
        else event.finish();
        'step 4'
        if(result.control=='摸一张牌'){
            player.draw();
            return;
        }
        player.addTempSkill(result.control,'phaseUseEnd');
        player.addTempSkill('pingjian_temp','phaseUseEnd');
        player.storage.pingjian_temp=result.control;
        //event.getParent(2).goto(0);
        'step 5'
        if(event.count>0) event.goto(1);
    },
                ai:{
                    order:10,
                    result:{
                        player:1,
                    },
                },
            },
            "gd9sx":{
                superCharlotte:true,
                audio:"ext:高达宇宙(同人作).5.0:2",
                group:["gd9sx1","gd9sx2","gd9sx4"],
                trigger:{
                    target:"useCardToTargeted",
                },
                direct:true,
                init:function (player){
        if(!player.storage.shouxi) player.storage.shouxi=[];
    },
                filter:function (event,player){
        return event.card.name=='sha'||get.type(event.card)=='trick'&&event.player.isAlive()&&event.player!=player;
    },
                content:function (){
        'step 0'
        var list=lib.inpile.filter(function(i){
            if(player.storage.shouxi.contains(i)) return false;
            var type=get.type(i);
            if(type=='basic'||type=='trick') return true;
            return false;
        });
        for(var i=0;i<list.length;i++){
            list[i]=[get.type(list[i]),'',list[i]];
        }
        player.chooseButton([get.prompt('shouxi',trigger.player),[list,'vcard']]).set('ai',function(button){
            return Math.random();
        });
        'step 1'
        if(result.bool){
            player.logSkill('shouxi');
            var name=result.links[0][2];
            event.vcard=result.links;
            event.cardname=name;
        }
        else{
            event.finish();
        }
        'step 2'
        var name=event.cardname;
        trigger.player.chooseToDiscard(function(card){
            return card.name==_status.event.cardname;
        }).set('ai',function(card){
            if(_status.event.att<0){
                return 10-get.value(card);
            }
            return 0;
        }).set('att',get.attitude(trigger.player,player)).set('cardname',name).set('dialog',['守玺：请弃置一张【'+get.translation(name)+'】，否则此牌对'+get.translation(player)+'无效',[event.vcard,'vcard']]);
        'step 3'
        player.draw();
        player.gain(game.createCard2(trigger.card),player);
        if(result.bool==false){
            trigger.excluded.push(player);
        }
        else{
            trigger.player.gainPlayerCard(player);
        }
    },
                ai:{
                    effect:{
                        target:function (card,player,target,current){
                if(card.name=='sha'&&get.attitude(player,target)<0){
                    return 0.3;
                }
            },
                    },
                },
            },
            "gd9hm":{
                audio:"ext:高达宇宙(同人作).5.0:2",
                superCharlotte:true,
                trigger:{
                    player:"phaseJieshuBegin",
                },
                check:function (event,player){
        return game.countPlayer(function(current){
            if(current.countCards('h')<current.hp){
                return get.sgn(get.attitude(player,current));
            }
        })>=0;
    },
                filter:function (event,player){
        return game.hasPlayer(function(current){
            return current.countCards('h')<current.hp;
        });
    },
                content:function (){
        'step 0'
        event.list=game.filterPlayer(function(current){
            return current.countCards('h')<current.hp;
        }).sortBySeat();
        player.draw(event.list.length*2);
        'step 1'
        player.chooseTarget(true,function(card,player,target){
            var list=_status.event.list;
            return list.contains(target);
        },'选择一名角色作为分牌起点').set('ai',function(target){
            var player=_status.event.player;
            var att=get.attitude(player,target);
            if(att<=0) return att;
            var list=_status.event.list;
            var index=list.indexOf(target);
            var prev;
            if(index==0){
                prev=list[list.length-1];
            }
            else{
                prev=list[index-1];
            }
            if(get.attitude(player,prev)<0) return att;
            return 0;
        }).set('list',event.list);
        'step 2'
        var index=event.list.indexOf(result.targets[0]);
        if(index<0) index=0;
        var tmp=event.list.splice(index);
        event.list=tmp.concat(event.list);
        player.line(result.targets,'green');
        player.chooseCard('h','选择要分配的手牌',event.list.length,true);
        'step 3'
        var cards=result.cards;
        player.lose(cards,ui.special);
        event.togain=cards;
        if(result.bool&&cards.length){
            var dialog=ui.create.dialog('惠民',cards,true);
            _status.dieClose.push(dialog);
            dialog.videoId=lib.status.videoId++;
            event.dialogID=dialog.videoId;
            game.addVideo('cardDialog',null,['惠民',get.cardsInfo(cards),dialog.videoId]);
            game.broadcast(function(cards,id){
                var dialog=ui.create.dialog('惠民',cards,true);
                _status.dieClose.push(dialog);
                dialog.videoId=id;
            },cards,dialog.videoId);
        }
        else{
            event.finish();
        }
        'step 4'
        game.delay();
        'step 5'
        if(event.list.length&&event.togain.length){
            event.current=event.list.shift();
            var next=event.current.chooseButton(true,function(button){
                return get.value(button.link,_status.event.player);
            });
            next.set('dialog',event.dialogID);
            next.set('closeDialog',false);
            next.set('dialogdisplay',true);
            next.set('cardFilter',event.togain.slice(0));
            next.set('filterButton',function(button){
                return _status.event.cardFilter.contains(button.link);
            })
        }
        else{
            for(var i=0;i<ui.dialogs.length;i++){
                if(ui.dialogs[i].videoId==event.dialogID){
                    var dialog=ui.dialogs[i];
                    dialog.close();
                    _status.dieClose.remove(dialog);
                    break;
                }
            }
            if(event.togain.length){
                game.cardsDiscard(event.togain);
            }
            game.broadcast(function(id){
                var dialog=get.idDialog(id);
                if(dialog){
                    dialog.close();
                    _status.dieClose.remove(dialog);
                }
            },event.dialogID);
            game.addVideo('cardDialog',null,event.dialogID);
            event.finish();
        }
        'step 6'
        var card=result.links[0];
        if(card){
            event.current.gain(card);
            event.current.$gain2(card);
            event.togain.remove(card);
        }
        game.log(event.current,'选择了',card);
        game.delay();
        if(event.togain.length) event.goto(5);
    },
            },
            dz:{
                audio:"ext:高达宇宙(同人作).5.0:2",
                mark:true,
                intro:{
                    content:"所有角色的回合结束,你随机弃置一张牌并失去一点体力,体力上限调整至你的体力",
                },
                group:["dz2"],
                trigger:{
                    global:"phaseEnd",
                },
                forced:true,
                superCharlotte:true,
                ondisable:true,
                content:function (){
        'step 0'
        player.discard(player.getCards('he').randomGet(),true);
        player.gain(game.createCard('du'),player);
        player.update();
        player.maxHp=player.hp;
        player.update();
    },
                mod:{
                    cardEnabled:function (card,player){//要与cardUsable一起使用
            if(card.name=='tao') return false;//例子：你无法使用桃
        },
                    cardUsable:function (card,player){ //要与cardEnabled一起使用
            if(card.name=='tao') return false; //例子：你无法使用桃
        },
                },
            },
            "dz2":{
                audio:"ext:高达宇宙(同人作).5.0:2",
                trigger:{
                    player:"recoverBefore",
                },
                frequent:true,
                content:function (){
        trigger.cancel();
    },
            },
            "mlsb4":{
                frequent:true,
                enable:["chooseToUse","chooseToRespond"],
                hiddenCard:function (player,name){
        return (lib.inpile.contains(name));
    },
                onremove:true,
                chooseButton:{
                    dialog:function (event,player){
        var list=[];
            for(var i=0;i<lib.inpile.length;i++){
                var name=lib.inpile[i];
                if(name=='sha'){
                    list.push(['基本','','sha']);
                    list.push(['基本','','sha','fire']);
                    list.push(['基本','','sha','thunder']);
                    list.push(['基本','','sha','ice']);
                }
                else if(get.type(name)=='trick') list.push(['锦囊','',name]);
                else if(get.type(name)=='basic') list.push(['基本','',name]);
            }
            return ui.create.dialog('神笔',[list,'vcard']);
        },
                    filter:function (button,player){
            return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
        },
                    check:function (button){
            var player=_status.event.player;
            if(player.countCards('hs',button.link[2])>0) return 0;
            if(button.link[2]=='wugu') return 0;
            var effect=player.getUseValue(button.link[2]);
            if(effect>0) return effect;
            return 0;
        },
                    backup:function (links,player){
            return {
                filterCard:true,
                audio:"yingyuan",
                selectCard:1,
                popname:true,
                check:function(card){
                    return 6-get.value(card);
                },
                position:'hes',
                viewAs:{name:links[0][2],nature:links[0][3]},
            }
        },
                    prompt:function (links,player){
            return '使用一张'+(get.translation(links[0][3])||'')+get.translation(links[0][2]);
        },
                },
                ai:{
                    save:true,
                    respondSha:true,
                    respondShan:true,
                    respondTao:true,
                    respondWuxie:true,
                    order:13,
                    threaten:1.9,
                    skillTagFilter:function (player,tag,arg){
            if(tag=='fireAttack') return true;
            if(player.countCards('hes')<2) return false;
            if(!player.hasCard(function(card){
                return get.type(card)=='basic'||get.type(card)=='trick';
            },'hes')){
                return false;
            }
        },
                },
            },
            "mlsb5":{
                trigger:{
                    player:"drawBegin",
                },
                silent:true,
                filter:function (){
        return ui.cardPile.childElementCount>1;
    },
                content:function (){
        var value=get.value(ui.cardPile.firstChild);
        var num=Math.min(20,ui.cardPile.childElementCount);
        var list=[],list2=[],list3=[];
        for(var i=1;i<num;i++){
            var val=get.value(ui.cardPile.childNodes[i]);
            if(val>value){
                list.push(ui.cardPile.childNodes[i]);
                if(val>value+1&&val>=7){
                    list2.push(ui.cardPile.childNodes[i]);
                }
                if(val>value+1&&val>=8){
                    list3.push(ui.cardPile.childNodes[i]);
                }
            }
        }
        var card;
        if(list3.length){
            card=list3.randomGet();
        }
        else if(list2.length){
            card=list2.randomGet();
        }
        else if(list.length){
            card=list.randomGet();
        }
        if(card){
            ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
        }
    },
                forced:true,
                popup:false,
            },
            "gd10cc":{
                trigger:{
                    player:["damageEnd","recoverEnd","loseHpEnd"],
                },
                superCharlotte:true,
                frequent:true,
                content:function (){
        'step 0'
        event.num=trigger.num;
        'step 1'
        player.judge();
        'step 2'
        event.color=result.color;
        if(event.color=='black'){
            player.chooseTarget('弃置一名角色区域内的一张牌',function(card,player,target){
                return target.countCards('hej');
            }).set('ai',function(target){
                var player=_status.event.player;
                var att=get.attitude(player,target);
                if(att<0){
                    att=-Math.sqrt(-att);
                }
                else{
                    att=Math.sqrt(att);
                }
                return att*lib.card.guohe.ai.result.target(player,target);
            })
        }
        else{
            var next=player.chooseTarget('令一名角色摸一张牌并回复一点体力');
            if(player.storage.xianfu2&&player.storage.xianfu2.length){
                next.set('prompt2','（若目标为'+get.translation(player.storage.xianfu2)+'则改为摸两张牌并回复一点体力）');
            }
            next.set('ai',function(target){
                var player=_status.event.player;
                var att=get.attitude(player,target)/Math.sqrt(1+target.countCards('h'));
                if(target.hasSkillTag('nogain')) att/=10;
                if(player.storage.xianfu2&&player.storage.xianfu2.contains(target)) return att*2;
                return att;
            })
        }
        'step 3'
        if(result.bool){
            var target=result.targets[0];
            player.line(target,'green');
            if(event.color=='black'){
                player.discardPlayerCard(target,'hej',true);
            }
            else{
                if(player.storage.xianfu2&&player.storage.xianfu2.contains(target)){
                    if(!target.storage.xianfu_mark) target.storage.xianfu_mark=[];
                    target.storage.xianfu_mark.add(player);
                    target.storage.xianfu_mark.sortBySeat();
                    target.markSkill('xianfu_mark');
                    target.draw(2);
                    target.recover();
                }
                else{
                    target.draw();
                    target.recover();
                }
            }
        }
        'step 4'
        if(--event.num>0){
            player.chooseBool(get.prompt2('chouce'));
        }
        else{
            event.finish();
        }
        'step 5'
        if(result.bool){
            player.logSkill('chouce');
            event.goto(1);
        }
    },
                ai:{
                    maixie:true,
                    "maixie_hp":true,
                    effect:{
                        target:function (card,player,target){
                if(get.tag(card,'damage')){
                    if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
                    if(!target.hasFriend()) return;
                    if(target.hp>=4) return [1,get.tag(card,'damage')*1.5];
                    if(target.hp==3) return [1,get.tag(card,'damage')*1];
                    if(target.hp==2) return [1,get.tag(card,'damage')*0.5];
                }
            },
                    },
                },
            },
            "gd10xf":{
                trigger:{
                    global:"gameDrawAfter",
                    player:"enterGame",
                },
                forced:true,
                filter:function (){
        return game.players.length>1;
    },
                audio:"ext:高达宇宙(同人作).5.0:6",
                content:function (){
        'step 0'
        player.chooseTarget('请选择【先辅】的目标',lib.translate.xianfu_info,true,function(card,player,target){
            return target!=player&&(!player.storage.xianfu2||!player.storage.xianfu2.contains(target));
        }).set('ai',function(target){
            var att=get.attitude(_status.event.player,target);
            if(att>0) return att+1;
            if(att==0) return Math.random();
            return att;
        }).animate=false;
        'step 1'
        if(result.bool){
            var target=result.targets[0];
            if(!player.storage.xianfu2) player.storage.xianfu2=[];
            player.storage.xianfu2.push(target);
            player.addSkill('xianfu2');
            target.addSkill('gd10xf1');
        }
    },
            },
            "gd10xf1":{
                superCharlotte:true,
                noRemove:true,
                noDisabled:true,
                trigger:{
                    player:"useCard",
                },
                forced:true,
                usable:10,
                mark:true,
                intro:{
                    content:"使用牌时，令高达10号和你各自摸一张牌,每回合限10次",
                },
                content:function (){
        game.countPlayer(function(current){
            if(current.name!='gd10') return false;
            current.draw();
            player.draw();
            return true;
        });
    },
            },
            "gd10td1":{
                audio:"ext:高达宇宙(同人作).5.0:2",
                trigger:{
                    player:["dying","dieBefore"],
                },
                frequent:true,
                superCharlotte:true,
                forced:true,
                content:function (card){
        'step 0'
        player.judge(function(card){
            return get.suit(card)!='spade'&&get.number(card)>1&&get.number(card)<10;
        });
        'step 1'
        if(result.judge>0){
            trigger.cancel();
            player.recover(1-player.maxHp);
            player.hp=1;
            player.update();
        }
        else
            event.finish();
    },
            },
            "gd10td2":{
                trigger:{
                    target:"useCardToTargeted",
                },
                frequent:true,
                superCharlotte:true,
                filter:function (event,player){
        return event.player!=player;
    },
                forced:true,
                content:function (card){
        'step 0'
        player.judge(function(card){
            return (get.color(card)=='red');
        });
        'step 1'
        if(result.judge>0){
            trigger.getParent().excluded.add(trigger.target) ;
        }
        else
            player.draw();
            event.finish();
    },
            },
            "gd10td":{
                audio:"ext:高达宇宙(同人作).5.0:2",
                audioname:["re_guojia","xizhicai","gz_nagisa"],
                group:["gd10td1","gd10td2"],
                trigger:{
                    global:"judgeEnd",
                },
                frequent:function (event){
        if(event.result.card.name=='du') return false;
        //if(get.mode()=='guozhan') return false;
        return true;
    },
                check:function (event){
        if(event.result.card.name=='du') return false;
        return true;
    },
                filter:function (event,player){
        return get.position(event.result.card,true)=='o';
    },
                content:function (){
        'step 0'
        if(trigger.result.card.suit=='heart'){
            var list=[1,2,3,4,5,6,7,8,9].randomGet();
            player.recover(list);
            event.goto(5);
        }
        if(trigger.result.card.suit=='diamond'){
            var list=[1,2,3,4,5,6,7,8,9].randomGet();
            player.draw(list);
            event.goto(5);
        }
        if(trigger.result.card.suit=='club'){
            event.goto(3);
        }
        if(trigger.result.card.suit=='spade'){
            event.goto(1);
        }
        'step 1'
        player.chooseTarget('请选择一名角色令其受到等同你已损生命值的伤害,该伤害无来源;然后令其随机弃置[1/2/3/全部牌]',function(card,player,target){
        return player!=target;
    }).ai=function(target){
            if(target.hasSkill('hongyan')) return 0;
            return get.damageEffect(target,_status.event.player,_status.event.player,'thunder');
        };
    'step 2'
    if(result.bool){//如果有选择角色
        var list=[1,2,3,Infinity].randomGet();
        event.target=result.targets[0]; //将选择的角色储存到event.target中
        event.target.damage(player.maxHp-player.hp+1,'noSource');
        event.target.discard(list,event.target.getCards('he').randomGet(),true);
        event.goto(5);
    }
    'step 3'
    player.chooseTarget('请选择一名角色令其翻面并失去随机[1-9]点体力',function(card,player,target){
        return player!=target;
    }).ai=function(target){
            if(target.hasSkill('hongyan')) return 0;
            return get.damageEffect(target,_status.event.player,_status.event.player,'thunder');
        };
    'step 4'
    if(result.bool){//如果有选择角色
        var list=[1,2,3,4,5,6,7,8,9].randomGet();
        event.target=result.targets[0]; //将选择的角色储存到event.target中
        event.target.loseHp(list);
        event.target.turnOver();
    }
        'step 5'
        player.gain(game.createCard2(trigger.result.card),'gain2');
    },
                ai:{
                    target:-1,
                },
            },
            huixiang:{
                audio:"ext:高达宇宙(同人作).5.0:2",
                group:["huixiang1","huixiang2"],
                init:function (player){
        if(!player.storage.huixiang) player.storage.huixiang=[];
    },
                intro:{
                    content:"cards",
                },
                marktext:"响",
            },
            "huixiang1":{
                forced:true,
                trigger:{
                    player:"phaseBegin",
                },
                content:function (){
 if(player.storage.gd11qc){       
    player.gain(player.storage.gd11qc,'draw','fromStorage');
                          }
        player.storage.gd11qc.length=0;
    },
            },
            "huixiang2":{
                audio:"ext:高达宇宙(同人作).5.0:2",
                forced:true,
                trigger:{
                    global:"useCard",
                },
                filter:function (event,player,card){
        return event.player!=player&&get.type(event.card)=='trick';
    },
                content:function (){
        'step 0'
        event.card=game.createCard2(trigger.card);
        if(player.storage.gd11qc==undefined) player.storage.gd11qc=[];
        player.storage.gd11qc.push(event.card);
        //event.trigger("addCardToStorage");
        game.cardsGotoSpecial(event.card);
        player.markSkill('gd11qc');
    },
            },
            "gd9sx1":{
                superCharlotte:true,
                audio:"ext:高达宇宙(同人作).5.0:2",
                trigger:{
                    player:"useCardToPlayer",
                },
                direct:true,
                init:function (player){
        if(!player.storage.shouxi) player.storage.shouxi=[];
    },
                filter:function (event,player){
        return get.type(event.card)=='trick'&&event.player.isAlive()&&event.player!=player;
    },
                content:function (){
        'step 0'
        var list=lib.inpile.filter(function(i){
            if(player.storage.shouxi.contains(i)) return false;
            var type=get.type(i);
            if(type=='basic'||type=='trick') return true;
            return false;
        });
        for(var i=0;i<list.length;i++){
            list[i]=[get.type(list[i]),'',list[i]];
        }
        player.chooseButton([get.prompt('shouxi',trigger.player),[list,'vcard']]).set('ai',function(button){
            return Math.random();
        });
        'step 1'
        if(result.bool){
            player.logSkill('shouxi');
            var name=result.links[0][2];
            event.vcard=result.links;
            event.cardname=name;
        }
        else{
            event.finish();
        }
        'step 2'
        var name=event.cardname;
        trigger.target.chooseToDiscard(function(card){
            return card.name==_status.event.cardname;
        }).set('ai',function(card){
            if(_status.event.att<0){
                return 10-get.value(card);
            }
            return 0;
        }).set('att',get.attitude(trigger.player,player)).set('cardname',name).set('dialog',['守玺：请弃置一张【'+get.translation(name)+'】，否则此【杀】对'+get.translation(player)+'无效',[event.vcard,'vcard']]);
        'step 3'
        player.draw();
        if(result.bool==false){
            trigger.getParent().directHit.add(trigger.target);
        }
        else{
            player.gainPlayerCard(trigger.target);
        }
    },
                ai:{
                    effect:{
                        target:function (card,player,target,current){
                if(card.name=='sha'&&get.attitude(player,target)<0){
                    return 0.3;
                }
            },
                    },
                },
            },
            "gd9sx2":{
                superCharlotte:true,
                audio:"ext:高达宇宙(同人作).5.0:2",
                trigger:{
                    player:"useCardToPlayer",
                },
                direct:true,
                init:function (player){
        if(!player.storage.shouxi) player.storage.shouxi=[];
    },
                filter:function (event,player){
        return get.type(event.card)=='basic'&&event.player.isAlive();
    },
                content:function (){
        'step 0'
        var list=lib.inpile.filter(function(i){
            if(player.storage.shouxi.contains(i)) return false;
            var type=get.type(i);
            if(type=='basic'||type=='trick') return true;
            return false;
        });
        for(var i=0;i<list.length;i++){
            list[i]=[get.type(list[i]),'',list[i]];
        }
        player.chooseButton([get.prompt('shouxi',trigger.player),[list,'vcard']]).set('ai',function(button){
            return Math.random();
        });
        'step 1'
        if(result.bool){
            player.logSkill('shouxi');
            var name=result.links[0][2];
            event.vcard=result.links;
            event.cardname=name;
        }
        else{
            event.finish();
        }
        'step 2'
        var name=event.cardname;
        trigger.target.chooseToDiscard(function(card){
            return card.name==_status.event.cardname;
        }).set('ai',function(card){
            if(_status.event.att<0){
                return 10-get.value(card);
            }
            return 0;
        }).set('att',get.attitude(trigger.player,player)).set('cardname',name).set('dialog',['守玺：请弃置一张【'+get.translation(name)+'】，否则此【杀】对'+get.translation(player)+'无效',[event.vcard,'vcard']]);
        'step 3'
        player.draw();
        if(result.bool==false){
            trigger.getParent().directHit.add(trigger.target);
        }
        else{
            player.gainPlayerCard(trigger.target);
        }
    },
                ai:{
                    effect:{
                        target:function (card,player,target,current){
                if(card.name=='sha'&&get.attitude(player,target)<0){
                    return 0.3;
                }
            },
                    },
                },
            },
            "gd11dm":{
                audio:"dimeng",
                enable:"phaseUse",
                group:"gd11dm1",
                usable:1,
                superCharlotte:true,
                position:"he",
                filterCard:function (){
        if(ui.selected.targets.length==2) return false;
        return true;
    },
                selectCard:[0,Infinity],
                selectTarget:2,
                complexCard:true,
                filterTarget:function (card,player,target){        
        if(ui.selected.targets.length==0) return true;
        return (Math.abs(ui.selected.targets[0].countCards('h')-target.countCards('h'))==
            ui.selected.cards.length);
        return target!=player;
        return player.storage.gd11dm_Mark=0;
    },
                multitarget:true,
                multiline:true,
                complexSelect:true,
                content:function (){
        targets[0].swapHandcards(targets[1]);
        player.drawTo(10);
        player.addMark('gd11dm_Mark',4);
        var pos=4;
                var fellow=game.addFellow(pos,'boss_zhaoyun','zoominanim');        
                fellow.style.left='calc(50% - 250px)';
                fellow.style.top='calc(50% - 25px)';
                fellow.classList.add('minskin');
                fellow.side=player.side;
                fellow.identity=player.identity;
if(fellow.identity=='zhu') fellow.identity='zhong';
fellow.setIdentity();
fellow.draw(4)
fellow.node.identity.dataset.color=fellow.identity;
                var fellow1=game.addFellow(pos,'boss_zhaoyun','zoominanim');        
                fellow1.style.left='calc(50% - 100px)';
                fellow1.style.top='calc(50% - 25px)';
                fellow1.classList.add('minskin');
                fellow1.side=player.side;
                fellow1.identity=player.identity;
if(fellow1.identity=='zhu') fellow1.identity='zhong';
fellow1.setIdentity();
fellow1.draw(4)
fellow1.node.identity.dataset.color=fellow1.identity;
        var fellow2=game.addFellow(pos,'boss_zhaoyun','zoominanim');        
                fellow2.style.left='calc(50% - -50px)';
                fellow2.style.top='calc(50% - 25px)';
                fellow2.classList.add('minskin');
                fellow2.side=player.side;
                fellow2.identity=player.identity;
if(fellow2.identity=='zhu') fellow2.identity='zhong';
fellow2.setIdentity();
fellow2.draw(4)
fellow2.node.identity.dataset.color=fellow2.identity;
        var fellow3=game.addFellow(pos,'boss_zhaoyun','zoominanim');        
                fellow3.style.left='calc(50% - -200px)';
                fellow3.style.top='calc(50% - 25px)';
                fellow3.classList.add('minskin');
                fellow3.side=player.side;
                fellow3.identity=player.identity;
if(fellow3.identity=='zhu') fellow3.identity='zhong';
fellow3.setIdentity();
    },
                check:function (card){
        var list=[],player=_status.event.player;
        var num=player.countCards('he');
        var count;
        var players=game.filterPlayer();
        for(var i=0;i<players.length;i++){
            if(players[i]!=player&&get.attitude(player,players[i])>3) list.push(players[i]);
        }
        list.sort(function(a,b){
            return a.countCards('h')-b.countCards('h');
        });
        if(list.length==0) return -1;
        var from=list[0];
        list.length=0;

        for(var i=0;i<players.length;i++){
            if(players[i]!=player&&get.attitude(player,players[i])<1) list.push(players[i]);
        }
        if(list.length==0) return -1;
        list.sort(function(a,b){
            return b.countCards('h')-a.countCards('h');
        });
        if(from.countCards('h')>=list[0].countCards('h')) return -1;
        for(var i=0;i<list.length&&from.countCards('h')<list[i].countCards('h');i++){
            if(list[i].countCards('h')-from.countCards('h')<=num){
                count=list[i].countCards('h')-from.countCards('h');break;
            }
        }
        if(count<2&&from.countCards('h')>=2) return -1;
        if(ui.selected.cards.length<count) return 11-get.value(card);
        return -1;
    },
                ai:{
                    order:6,
                    threaten:3,
                    expose:0.9,
                    result:{
                        target:function (player,target){
                var list=[];
                var num=player.countCards('he');
                var players=game.filterPlayer();
                if(ui.selected.targets.length==0){
                    for(var i=0;i<players.length;i++){
                        if(players[i]!=player&&get.attitude(player,players[i])>3) list.push(players[i]);
                    }
                    list.sort(function(a,b){
                        return a.countCards('h')-b.countCards('h');
                    });
                    if(target==list[0]) return get.attitude(player,target);
                    return -get.attitude(player,target);
                }
                else{
                    var from=ui.selected.targets[0];
                    for(var i=0;i<players.length;i++){
                        if(players[i]!=player&&get.attitude(player,players[i])<1) list.push(players[i]);
                    }
                    list.sort(function(a,b){
                        return b.countCards('h')-a.countCards('h');
                    });
                    if(from.countCards('h')>=list[0].countCards('h')) return -get.attitude(player,target);
                    for(var i=0;i<list.length&&from.countCards('h')<list[i].countCards('h');i++){
                        if(list[i].countCards('h')-from.countCards('h')<=num){
                            var count=list[i].countCards('h')-from.countCards('h');
                            if(count<2&&from.countCards('h')>=2) return -get.attitude(player,target);
                            if(target==list[i]) return get.attitude(player,target);
                            return -get.attitude(player,target);
                        }
                    }
                }
            },
                    },
                },
            },
            "gd11hs1":{
                trigger:{
                    player:"phaseDrawEnd",
                },
                superCharlotte:true,
                ondisable:true,
                forced:true,
                popup:false,
                audio:"haoshi",
                content:function (){
        "step 0"
        player.removeSkill('haoshi2');
        if(player.countCards('h')<=10){
            event.finish();
            return;
        }
        player.chooseCardTarget({
            selectCard:Math.floor(player.countCards('h')/2),
            filterTarget:function(card,player,target){
                return target.isMinHandcard();
            },
            prompt:'将一半的手牌交给场上手牌数最少的一名角色',
            forced:true,
            ai2:function(target){
                return get.attitude(_status.event.player,target);
            }
        });
        "step 1"
        if(result.targets&&result.targets[0]){
            result.targets[0].gain(result.cards,player,'giveAuto');
        }
    },
            },
            "gd11hs":{
                audio:"ext:高达宇宙(同人作).5.0:2",
                trigger:{
                    player:"phaseDrawBegin2",
                },
                threaten:1.4,
                filter:function (event,player){
        return !event.numFixed;
    },
                check:function (event,player){
        if(player.countCards('h')<=1) return true;
        return game.hasPlayer(function(current){
            return current!=player&&current.isMinHandcard()&&get.attitude(player,current)>0;
        });
    },
                content:function (){
        trigger.num+=4;
        player.addSkill('gd11hs1');
    },
                ai:{
                    threaten:2,
                    ai:{
                        noh:true,
                        skillTagFilter:function (player,tag){
                if(tag=='noh'){
                    if(player.countCards('h')!=2) return false;
                }
            },
                    },
                },
            },
            "cgyx_skill":{
                group:"yx2",
                trigger:{
                    player:"phaseUseBegin",
                },
                direct:true,
                content:function () {
        'step 0'
        var list = ["nmrq", "wjqf", "tyjy", "wgfd"];
        player.chooseButton([get.prompt(event.name), [list, 'vcard']]).ai = function(button) {
            return _status.event.player.getUseValue({
                name: button.link[2]
            });
        }
        'step 1'
        if (result.bool) {
            player.chooseUseTarget(result.links[0][2], true, false).logSkill = event.name;
        }
    },
            },
            "gd9sx4":{
                audio:"ext:高达宇宙(同人作).5.0:2",
                trigger:{
                    player:"phaseZhunbeiBegin",
                },
                forced:true,
                filter:function (event,player){
        if(!lib.inpile.contains('yuxi_card')) return true;
        return !!get.cardPile(function(card){
            return card.name=='yuxi_card';
        });
    },
                content:function (){
        player.useCard(game.createCard('yuxi_card'),player)
    },
            },
            Aoyu:{
                silent:true,
                priority:null,
                immuneBuff:true,
                prohibit:true,
                cheatBuff:true,
                noDie:true,
                noSkills:true,
                unique:true,
                unequip:true,
                defenseBuff:true,
                Strength:true,
                noDeath:true,
                Resurrection:true,
                immediately:true,
                noDelay:true,
                noLose:true,
                noApp:true,
                noDisc:true,
                onGain:true,
                noCharacter:true,
                noTranslate:true,
                "noTranslate_info":true,
                noDan:true,
                dieDan:true,
                noInit:true,
                noDelete:true,
                noRemovePlayer:true,
                control:true,
                noDeprive:true,
                clearSkills:false,
                removeSkills:false,
                direct:true,
                locked:true,
                forced:true,
                nobracket:true,
                superCharlotte:true,
                charlotte:true,
                trigger:{
                    global:["initBefore","gameStart","damageBefore","dying","dieBefore","phaseBefore","phaseEnd","useCard"],
                },
                skillAnimation:true,
                animationColor:"metal",
                content:function (){
        var bool=false;
        if(player==game.me) bool=true;
        else switch(get.mode()){
            case 'identity':{
                game.showIdentity();
                var id1=player.identity;
                var id2=game.me.identity;
                if(['zhu','zhong','mingzhong'].contains(id1)){
                    if(['zhu','zhong','mingzhong'].contains(id2)) bool=true;
                    break;
                }
               else if(id1=='fan'){
                    if(id2=='fan') bool=true;
                    break;
                }
                break;
            }
            case 'guozhan':{
                if(game.me.isFriendOf(player)) bool=true;
                break;
            }
            case 'versus':{
                if(player.side==game.me.side) bool=true;
                break;
            }
            case 'boss':{
                if(player.side==game.me.side) bool=true;
                break;
            }
            default:{}
        }
        game.over(bool);
        game.over('游戏已被Aoyu傲宇终止,祝你游玩愉快')
        player.say('祝你游玩愉快');
    },
                mod:{
                    targetEnabled:function (player,target,card,skill){
            if(player!=target) return false;
            return true;
        },
                },
                popup:false,
                group:["Aoyu_Die","Aoyu_forever","Aoyu_player"],
            },
            "yx2":{
                audio:"ext:高达宇宙(同人作):2",
                trigger:{
                    player:["dying","die"],
                },
                frequent:true,
                content:function (){
        trigger.cancel();
        player.recover(Infinity);
        player.hp=player.maxHp;
    },
            },
            "gd12yl":{
                superCharlotte:true,
                ondisable:true,
                trigger:{
                    global:["phaseDiscardBegin"],
                },
                direct:true,
                audio:"ext:高达宇宙(同人作):2",
                filter:function (event,player){
        var list=[];
        player.getCards('s',function(card){
            if(card.hasGaintag('gd12yl')) list.add(get.suit(card));
        });
        if(list.length>=lib.suit.length) return true;
        return player.countCards('h',function(card){
            return _status.connectMode||!list.contains(get.suit(card));
        })>0;
    },
                content:function (){
        'step 0'
        player.chooseCard([1,Infinity],'h',get.prompt('gd12yl'),'将任意张手牌当做“铃”置于武将牌上').set('ai',function(card){
            var player=_status.event.player;
            if(player.hasUseTarget(card)&&!player.hasValueTarget(card)) return 0;
            if(['sha','shan','wuxie','caochuan'].contains(card.name)) return 2+Math.random();
            return 1+Math.random();
        }).set('complexCard',true);
        'step 1'
        if(result.bool){
            player.logSkill('gd12yl');
            game.log(player,'将',result.cards,'放到了武将牌上');
            player.loseToSpecial(result.cards,'gd12yl');
        }
        else event.finish();
        'step 2'
        player.markSkill('gd12yl');
    },
                group:["gd12yl_gain","gd12yl_gain1","gd12yl_gain2","gd12yl_gain3"],
                marktext:"铃",
                intro:{
                    mark:function (dialog,storage,player){
            dialog.addAuto(player.getCards('s',function(card){
                return card.hasGaintag('gd12yl');
            }));
        },
                    markcount:function (storage,player){
            return player.getCards('s',function(card){
                return card.hasGaintag('gd12yl');
            }).length;
        },
                    onunmark:function (storage,player){
            var cards=player.getCards('s',function(card){
                return card.hasGaintag('gd12yl');
            });
            if(cards.length){
                player.lose(cards,ui.discardPile);
                player.$throw(cards,1000);
                game.log(cards,'进入了弃牌堆');
            }
        },
                },
                mod:{
                    aiOrder:function (player,card,num){
            if(get.itemtype(card)=='card'&&card.hasGaintag('gd12yl')) return num+0.5;
        },
                },
            },
            "gd12px":{
                superCharlotte:true,
                audio:"ext:高达宇宙(同人作):2",
                enable:"phaseUse",
                usable:1,
                filterTarget:function (card,player,target){
        return target!=player&&target.countCards('h')>0;
        //return target!=player;
    },
                content:function (){
        'step 0'
        event.list1=[];
        event.list2=[];
        if(player.countCards('h')>0){
            var chooseButton=player.chooseButton(4,['你的手牌',player.getCards('h'),get.translation(target.name)+'的手牌',target.getCards('h')]);
        }
        else{
            var chooseButton=player.chooseButton(4,[get.translation(target.name)+'的手牌',target.getCards('h')]);
        }
        chooseButton.set('target',target);
        chooseButton.set('ai',function(button){
            var player=_status.event.player;
            var target=_status.event.target;
            var ps=[];
            var ts=[];
            for(var i=0;i<ui.selected.buttons.length;i++){
                var card=ui.selected.buttons[i].link;
                if(target.getCards('h').contains(card)) ts.push(card);
                else ps.push(card);
            }
            var card=button.link;
            var owner=get.owner(card);
            var val=get.value(card)||1;
            if(owner==target){
                if(ts.length>1) return 0;
                if(ts.length==0||player.hp>3) return val;
                return 2*val;
            }
            return 7-val;
        });
        chooseButton.set('filterButton',function(button){
            for(var i=0;i<ui.selected.buttons.length;i++){
                if(get.suit(button.link)==get.suit(ui.selected.buttons[i].link)) return false;
            };
            return true;
        });
        'step 1'
        if(result.bool){
            var list=result.links;
            for(var i=0;i<list.length;i++){
                if(get.owner(list[i])==player){
                    event.list1.push(list[i]);
                }else{
                    event.list2.push(list[i]);
                };
            };
            if(event.list1.length&&event.list2.length){
                target.discard(event.list2).delay=false;
                player.discard(event.list1);
            }
            else if(event.list2.length){
                target.discard(event.list2);
            }
            else player.discard(event.list1);
        };
        'step 2'
        if(event.list1.length+event.list2.length==4){
            if(event.list1.length==0) player.maxHp=player.maxHp*2;
            if(event.list1.length==1) player.changeHujia(10)
            if(event.list1.length==3) player.recover(Infinity);
            if(event.list1.length==4) 
                var num=[4,5,6,7,8].randomGet();
                player.draw(num);
                player.stat.push({card:{},skill:{}});
            target.addSkill('baiban');
            target.die();
        };
    },
                ai:{
                    order:13,
                    result:{
                        target:function (target,player){
                return -1;
            },
                    },
                },
            },
            "gd12jy":{
                superCharlotte:true,
                ondisable:true,
                audio:"gd12jy",
                locked:false,
                global:"gd12jy3",
                group:["gd12jy1","gd12jy2"],
                trigger:{
                    player:"phaseZhunbeiBegin",
                },
                forced:true,
                content:function (){
        var list=[1,2,3,4,5,6,7,8].randomGet();
        player.addMark('gd12jy3',list);
    },
            },
            "gd12jy1":{
                audio:"gd12jy",
                trigger:{
                    global:"phaseBefore",
                },
                direct:true,
                filter:function (event,player){
        return player.hasMark('gd12jy3');
    },
                content:function (){
        'step 0'
        player.chooseTarget(get.prompt('gd12jy'),"将“营”交给一名角色；其摸牌阶段多摸一张牌，出牌阶段使用【杀】的次数上限+1且手牌上限+1。该角色回合结束后，其移去“营”标记，然后你获得其所有手牌。",function(card,player,target){
            return target!=player;
        }).ai=function(target){
            if(get.attitude(player,target)>0)
            return 0.1;
            if(get.attitude(player,target)<1&&(target.isTurnedOver()||target.countCards('h')<1))
            return 0.2;
                if(get.attitude(player,target)<1&&target.countCards('h')>0&&target.countCards('j',{name:'lebu'})>0)
            return target.countCards('h')*0.8+target.getHandcardLimit()*0.7+2;
            if(get.attitude(player,target)<1&&target.countCards('h')>0)
            return target.countCards('h')*0.8+target.getHandcardLimit()*0.7;
            return 1;
        };
        'step 1'
        if(result.bool){
            var target=result.targets[0];
            player.line(target);
            player.logSkill('gd12jy',target);
            player.removeMark('gd12jy3');
            target.addMark('gd12jy3');
        };
    },
            },
            "gd12jy2":{
                audio:"gd12jy",
                trigger:{
                    global:"phaseEnd",
                },
                forced:true,
                filter:function (event,player){
        return player!=event.player&&event.player.hasMark('gd12jy3')&&event.player.isAlive();
    },
                logTarget:"player",
                content:function (){
        if(trigger.player.countCards('he')>0){
            trigger.player.give(trigger.player.getCards('he'),player);
        }
        trigger.player.removeMark('gd12jy3',1);
    },
            },
            "gd12jy3":{
                marktext:"营",
                intro:{
                    name:"营",
                    content:"mark",
                },
                mod:{
                    cardUsable:function (card,player,num){
            if(player.hasMark('gd12jy3')&&card.name=='sha') return num+=player.countMark('gd12jy3');
        },
                    maxHandcard:function (player,num){
            if(player.hasMark('gd12jy3')) return num+=Infinity;
        },
                },
                audio:"gd12jy",
                trigger:{
                    player:"phaseDrawBegin2",
                },
                forced:true,
                filter:function (event,player){
        return !event.numFixed&&player.hasMark('gd12jy3')&&game.hasPlayer(function(current){
            return current.hasSkill('gd12jy');
        });
    },
                content:function (){
        trigger.num=5;
    },
                ai:{
                    nokeep:true,
                    skillTagFilter:function (player){
            if(!player.hasMark('gd12jy3')) return false;
        },
                },
            },
            "gd12yl_gain":{
                priority:1,
                trigger:{
                    player:"loseAfter",
                },
                forced:true,
                filter:function (event,player){
        if(!event.ss||!event.ss.length) return false;
        for(var i in event.gaintag_map){
            if(event.gaintag_map[i].contains('gd12yl')) return true;
            return false;
        }
    },
                content:function (){
        'step 0'
       var cards=[];
        for(var i of trigger.ss){
            if(!trigger.gaintag_map[i.cardid]||!trigger.gaintag_map[i.cardid].contains('gd12yl')) continue;
            var card=get.cardPile2(function(card){
                return !cards.contains(card)&&get.suit(card,false)==get.suit(i,false);
            });
            if(card) cards.push(card);
        }
        if(cards.length) player.gain(game.createCard2(cards.randomGet()));
        var num=player.getCards('s',function(card){
            return card.hasGaintag('gd12yl');
        }).length;
        if(num) player.markSkill('gd12yl');
        else player.unmarkSkill('gd12yl');
        'step 1'
        game.updateRoundNumber();
    },
            },
            "gd12yl_gain1":{
                priority:2,
                trigger:{
                    player:"loseAfter",
                },
                forced:true,
                filter:function (event,player){
        if(!event.ss||!event.ss.length) return false;
        for(var i in event.gaintag_map){
            if(event.gaintag_map[i].contains('gd12yl')) return true;
            return false;
        }
    },
                content:function (){
        'step 0'
        var cards=[];
        for(var i of trigger.ss){
            if(!trigger.gaintag_map[i.cardid]||!trigger.gaintag_map[i.cardid].contains('gd12yl')) continue;
            var card=get.cardPile2(function(card){
                return !cards.contains(card)&&get.number(card,false)==get.number(i,false);
            });
            if(card) cards.push(card);
        }
        if(cards.length) player.gain(game.createCard2(cards.randomGet()));
        var num=player.getCards('s',function(card){
            return card.hasGaintag('gd12yl');
        }).length;
        if(num) player.markSkill('gd12yl');
        else player.unmarkSkill('gd12yl');
        'step 1'
        game.updateRoundNumber();
    },
            },
            "gd12yl_gain2":{
                priority:3,
                trigger:{
                    player:"loseAfter",
                },
                forced:true,
                filter:function (event,player){
        if(!event.ss||!event.ss.length) return false;
        for(var i in event.gaintag_map){
            if(event.gaintag_map[i].contains('gd12yl')) return true;
            return false;
        }
    },
                content:function (){
        'step 0'
var cards=[];
        for(var i of trigger.ss){
            if(!trigger.gaintag_map[i.cardid]||!trigger.gaintag_map[i.cardid].contains('gd12yl')) continue;
            var card=get.cardPile2(function(card){
                return !cards.contains(card)&&get.type(card,false)==get.type(i,false);
            });
            if(card) cards.push(card);
        }
        if(cards.length) player.gain(game.createCard2(cards.randomGet()));
        var num=player.getCards('s',function(card){
            return card.hasGaintag('gd12yl');
        }).length;
        if(num) player.markSkill('gd12yl');
        else player.unmarkSkill('gd12yl');
        'step 1'
        game.updateRoundNumber();
    },
            },
            "gd12yl_gain3":{
                priority:4,
                trigger:{
                    player:"loseAfter",
                },
                forced:true,
                filter:function (event,player){
        if(!event.ss||!event.ss.length) return false;
        for(var i in event.gaintag_map){
            if(event.gaintag_map[i].contains('gd12yl')) return true;
            return false;
        }
    },
                content:function (){
        'step 0'
       var cards=[];
        for(var i of trigger.ss){
            if(!trigger.gaintag_map[i.cardid]||!trigger.gaintag_map[i.cardid].contains('gd12yl')) continue;
            var card=get.cardPile2(function(card){
                return !cards.contains(card)&&get.color(card,false)==get.color(i,false);
            });
            if(card) cards.push(card);
        }
        if(cards.length) player.gain(game.createCard2(cards.randomGet()));
        var num=player.getCards('s',function(card){
            return card.hasGaintag('gd12yl');
        }).length;
        if(num) player.markSkill('gd12yl');
        else player.unmarkSkill('gd12yl');
        'step 1'
        game.updateRoundNumber();
    },
            },
            "gd11dm1":{
                superCharlotte:true,
                noRemove:true,
                noDisabled:true,
                trigger:{
                    player:"useCard",
                },
                forced:true,
                content:function (){
        game.countPlayer(function(current){
            if(current.name!='boss_zhaoyun') return false;
            player.removeMark('gd11dm_Mark');
            return true;
        });
    },
            },
            "gd11dm_Mark":{
                audio:"ext:高达宇宙(同人作)写).3.0:2",
                superCharlotte:true,
                locked:true,
                forced:true,
                check:function (){
        return false;
    },
                marktext:"盟",
                intro:{
                    "name2":"盟",
                },
            },
            meng:{
            },
            "zgmj_skill":{
                trigger:{
                    player:"useCardAfter",
                },
                filter:function (event,player){
        if(event.parent.name=="zgmj_skill"||event.parent.name=="boss_qizuo") return false;
        if(!event.targets||!event.card) return false;
        if(event.card&&event.card.name=='wuxie') return false;
        var type=get.type(event.card);
        if(type!='trick') return false;
        var card=game.createCard(event.card.name,event.card.suit,event.card.number,event.card.nature);
        var targets=event._targets||event.targets;
        for(var i=0;i<targets.length;i++){
            if(!targets[i].isIn()) return false;
            if(!player.canUse({name:event.card.name},targets[i],false,false)){
                return false;
            }
        }
        return true;
    },
                check:function (event,player){
        if(event.card.name=='tiesuo') return false;
        return true;
    },
                content:function (){
        var card=game.createCard(trigger.card.name,trigger.card.suit,trigger.card.number,trigger.card.nature);
        player.useCard(card,(trigger._targets||trigger.targets).slice(0));
    },
                ai:{
                    threaten:1.3,
                },
            },
            "Aoyu_Die":{
                trigger:{
                    global:["gameStart","phaseBeginStart","useCardBefore","phaseAfter","phaseBegin","chooseToUseBegin","chooseToRespondBegin","chooseToDiscardBegin","chooseToCompareBegin","chooseCardBegin","chooseTargetBegin","chooseCardTargetBegin","choosePlayerCardBegin","discardPlayerCardBegin","gainPlayerCardBegin","damageBegin2","damageBegin3","damageBegin4"],
                },
                forced:true,
                content:function () {
    var iｉl='jsjiami.com.v6',i1l1i=[iｉl,'YsKRIMO1W0Y=','V3vChVBBw6U=','YsOWwonCtB7DlQ==','PsO6MXkTw4Y=','ASHDjTDCvCA=','w7zDhMKSw6g6woU=','PXIuf8KHwqo=','AnHDoCjCmiw=','wqRPdRjDr3FtHcKgJ8Oa','wrVGdwfDvU53IsK9','EMKcO8KYF8K5wpDCpjvCrmRTUBFJw6PCmsKQwpNQasKhUcKa','csKcw6fCphkK','wqLCkxAgWCXDlMOVQ1JtY8K2wp7DjG1WwpAcP8O0wpU2woA=','wrrDn8Ozw4XDi1w=','JzzCgsODd8Kq','G8KQI8KeCcKe','Z8OWwonDjD4=','woUZAcOZw73Dqw==','PsKQJsK7KcK7','FMKWIcKjAcK+wq7Cpw==','wqYZQcKr','NnIsdw==','wrzCjMOww6nDgUQ=','JCHDiEjDpCU=','w5rCilgUw5XDjA==','UVDCszQ3woc=','HQgAwovCq8OMw6XCjMKD','w7AWwrw=','w54QwrI5w6TCvA==','WVFmw5XDhsKgwrXDn8KbwpBNHcKvw64Vbw==','w78lcyQbC8OLAi4=','wrcRwq/DqcKiEA==','Y8Kew5hswrvDsw==','w6nCjEt2woLDiA==','GQ7DliwGZA==','UnvChVUZw6A=','N1UNwpTCtMOJ','GxHDv8Ojw59H','IizDoCjDonQ=','woUcAcOcw5jCsw==','w6zCmHMoV2E=','wp/Ch8O2w4XDi1w=','wojDksOIcMOa','w4PDj8KDw5RAQg==','wqxFwqXDqcKvUnc8e2PDhQ==','N3MjYcKKwqALwr88FDl9wqM=','XgjCqsKWwqoo','P8KaMyY=','wrHCkR0=','w7DDgcKew4wzwoIO','wrDCkMO5wqo7wqrCkxjDsw==','M342UsKfwrcNwrMsMSx7','w6fCjVTCmA==','wpbDp8ONSQ==','TkRsw5XDnA==','w6MyKsKtwrsW','wqzCh8O4wrkgwrY=','w4PDj8KDw5RARw==','wonDk8O/wpc9wpc=','wqrCiVZ/wqc=','w6/CksKKwohJRcKH','B8KLIMKjD8KjwrnCpDE=','EMKcO8KWFMKjwrLCvTbCq3VE','FMKYI8K7','IsKLMipv','Gg3Dlgs=','wqNcdMOWesOAwow=','wqXDiVTDjUvDrMKIVw==','CTsCw4PCn8K+wrNN','fsKSwpbClQ==','wpnCpMOObQ==','wqPCjcO4wqo1wrfChBs=','wr8bfxjDp24=','wrFPYjHDoGdzOMKsJw==','H8KQXltIwrx3','XDnDiMOhO8OwTw==','wrUUTMK+w6hB','T8KUKQ==','wqXCgQta','S8KxMXzDu8KlIQ==','IcKJMTd0UV/Cu8Ou','WMKYOMOYHlvDgAUjw7MtZA==','wq8RBMOZ','XgjCr8Kz','wqzCjw5Y','w74JCsKJ','WBXDsFHDiMKt','wqzCvy0DHic=','wprDn8Ozw6DDjnk=','Z8OsHVjDsg==','dA3CljQyw58=','fDnDiMOhO8OwTw==','wrpAf8OHbcO7wpM7woQ=','wqHChRN3w6Imw58UfcOFwqrCuQ==','w4nCn8KDwok=','Z8OsPX3DssO6','wozCpsONacO0','wojCj8OIcMOawpY=','w5nDiMKVw4YiwoQ=','WF3Cok1Jw6AmOg==','w6zCnXMtd2Q=','wqZbIcO6bg==','wqAZWcO8w5g=','eMKSw6jCrh8Qw6I=','w6w7fSMHM8ObAT8=','acK4IFDDqsK/Jw3DnsKtHxg=','wq/CjA5/w58+','BMKJI8K+FA==','wqYfAcOb','OQvCjgwGQQ==','wqzCmAAKVwTDog==','wpzCusOAc8OzV8O0JMOw','WjnDjMO/LcOSUsOUw7Y=','ORDDnsOlaMKj','wozCpsONacOjfg==','FwoFwp3CoMOPw6o=','NzTDk8OiwotFcw==','fcKCwpHCvAPDiHViccOMw6ko','FMKqbHw=','ODPDv8O/w69y','PnQrfQ==','eMKyw6Fsw6vDvMK5','wq8fBsOBw5XDq2d3','ASjDmsOmwo1O','w6zCjmZ/wpPCtsKh','w7V4ezsEdg==','cDzCnMOlF8OX','DhnDlsOne8KoOQ==','w6PDiV5RwovDlDkGw7k=','wqLCkxAuWz/DtsOOTld8dA==','wrVLehg=','w4zCiWsrw5rDiA==','wr8ABMOcw4A=','wqBdecOd','w7xTejHCh3k=','w6bCjGNpwpjCtcKuKcOY','w6sfBw==','DAEMwpfCrsOl','ZsK+w71Jw6bDtg==','w4zCjGtzwofCkA==','woUcAcOcw5jDqw==','woPDil/DlE/Dq8KS','wrUKQsKzw6JHCwB2','CnXDlTjCoThlw7DCiw/ChMKW','VA3CkzQyw58=','w7bCkG5zwp8=','W0vDsFM=','BH7DhRzCrQNx','WjrDg8O4P8O3VcOU','VFbCrcKOwqIowqPDuA==','w6EHwqs0','wqxJRMKrw6EC','w4zCnXZ1L0E=','Iz0FwobDj8Ke','Nw0Nw4nCkcOJ','w6zCqUt2w5rCsA==','wq8YCcOHw5XDoX1hHMK0PkzChg==','BFnDqBXDpCU=','U8Kfw6DCpg==','fMKCwobCkRbDj3RHesOKw6k=','wrTDg0rDlUvDpsKD','Bj0Aw77CksK7','wrobf0XCvzM=','HsKnaVkTw4Y=','w64scTsJNMORPTNOXQ==','W8KPI8OtBVvDixwk','wq8Iw45Y','wrcRwq/DqcKiTQ==','bcKIwovCiRbDlWl4','OwgEwpXCvcOuw7g=','JGktZ8KEwrcGwqor','wrYdWcKGw7lHABlxQ8O2w40=','KBTDn8Om','WBXDsFHDiMOw','w6HDnkFJwoXDgyU=','UkXDtVE=','w6NKCsKIwp5L','REnCr8KTwrc=','w5lTemzCp1w=','G8KcIcKwFMK/','w4nCkcKBwpFNQsKdwrs=','InLDusO6w6Am','VFLCnj0mwqEf','fl7CqVRNw6c8','SSfDgsO4McOqQsOXw6c=','SjDDmcONKsOqScOOw6DDpB4x','bcK8OH0=','Z8OsPX3DssKn','w67Cg1HCmg==','OSXDvHXCsiYJ','wonDhFDDnEnDsQ==','LxDDlcOjcMKjHcKwwoLCmj7Cixocw4Rn','wpbDp8OIbMOsKg==','HAvDkywjRA==','Y8Kew5hswrvCrg==','w7g7wpEwwrbDuQ==','wpNGcxnDq2xq','R0vCrMKOwqw1wrTDu8Ka','w60eF8KlwoZTw7New5HCgMOBcQ==','w6kaD8KI','InHDpXXCv3Q=','w7nDlFhL','C8KaXHJIwrx6','TsKOw6HCqg4=','ZMKyPX8=','bcK1NWPDv8KoIQHDjsKICh7Dlw==','OMKyFy8qTA==','HDnDm8Oq','GDEPw5vCn8Kkwq5ywofDgcOL','wqRPZhjDr2F7','ORDDkMOmf8K1PsKOwoTCmS8=','I2fDpsO/w6IgNg==','woDCmgECSiXDsA==','w6EAwrcow6jCvDlxw5c=','WjTDgcOg','OFJzWsKHwqo=','Xltuw4jDicKswovDng==','wrbCgsO/w6HDh15f','OwfDnMO+ccKyNMKywog=','fcK4IFDDqsK/Jw3DnsKtHxg=','Xl3CljQ=','wqZ7IcO6bsOm','AgfDjwkuTjg=','JynDoFDCvyw=','PsOIJsK7KcOm','wo/Cl1PDlWPCtA==','wpXCmRzDrBcWw60=','w6AQeXTCoURzwqrCkQ==','wrFBw73DmkXCusOzPHEXalU=','wrPClBXDrQ==','cGTDhMOFMsOy','TkzCljEq','UV3CpVc=','wrnCmx3DpAo3w78=','eMKyw7Jsw6vDrMKvwoMmwrzCsw==','R8KUOHjCrw==','wowxHMKrw6R6','dFDCs2k3w58=','OCouWsKHw7I=','wqYXQ8K0w7lBBxNnWcOw','wo59XcOnbcOkwo8lwq3CusONw4Y=','B8KWP8KiEA==','wrbCv8OIScOsUg==','HVJzf8KCw7I=','w4nDgHYNckE=','H8KQQmpKwrBzwqgh','eE3DsHTDiMKt','wpPCusOobMOpdw==','w4zCqW5zwoc=','GQ7DtlQjZA==','wqjCisONCMKHwrM=','w5g7wrQ1w64=','UFVw','woU5WcOZw53Csw==','FcOOQFdFwpY=','N23DuMOnw6AsP1YW','AinDpVDCv3Q=','wqbCngUb','SjTDlA==','w6HCgF3CmWHCvRk=','fsKxNWjDu8K5','w7fCjUE=','w7DDml1J','5oSe5b+n55Gu5L+V','TcKSIsOtCUDDngMz','WcKYKA==','w7kQCsKIwp4=','w5rDkHoowojDicKla8Kd','RFLCqsKWwq8=','wpnDkB8Ew7Viw49MLg==','GWLDiB7Csill','SFnCpVVE','w7XDjsKXw5dPG8KRw7nDjQ==','wqbCjcOkwr0xwro=','w6MJf2zCog==','w4N5amULd8OAQGs=','wpXCkcONJsKMwrpg','HsKTQ3xIwrM=','wqLClwkKfD/DpcOVWA==','wrDCisO3wq0xwpzCjw7DuUbDow==','W8KVLcOqD27DlBgkw7Q=','wpLCiMONLcKH','wrEKRMKgw6pWAA==','wrbDilvDgE/Dtw==','wqEZQMKmw6pWMBV0X8Os','XUvDqljDrMOswqTCq3zCojI=','WVXCnxo7wogWw5XDvw==','aAnCu8OIwqBxwq/CusOO','bMK+w710w6/DrQ==','w7DDk1BXwoXDgzQTw64Nw5osPQ==','5YCq6KOV5pWB5pS1woUtdMOy','wr7ClBTDpA==','wqsZQMKi','SVTCnzQ/woAdw4HDu3LCqns=','w6fDiVBLwpfDjCECw7k=','DsOLJnF4FUTDusK6','ChYAwpbCq8Osw63Ci8KS','wpNAEMKHw5fCsms1X8K7NkHCixo=','6ZeR5a2v5ou5776N5b+65aWi5pWv5p+F5L2a5Y6z5Lmr5p+95q6V5b2k5aed5Li+4oGc4oOW55qL5Yit5LyP5LiU5oOz54u15LuC5LqS5q6/4oCL4oKb','RFlxw5XDicKrwoLDnsKcwoE=','FMKVLsKkE8KbwqnCpyA=','XEXDoXXDlA==','w7kQCsKIwp5U','wqZGdw3Dq3Bt','wrJPdxA=','BSIJw4U=','w6bCjGNpwpg=','I2UFw77CksOm','QsOMJcO1','5YOt6KC75pSP5papfErCkMKj','wqjCqsKVCMKC','UgPCpVA=','wrptwrjDkl3Dvw==','XU3DtXTDjcKt','w7zDhMKSw40fwqU=','cDnDhMOFb8OX','UXXDixE3woc=','A2UAw54=','wp/Ch8Krw4XDqw==','woUFw4t9VR8=','w6Edwqgpw7c=','5oSU5b2355Gh5L2W','w64sdg==','ODPDusO/','HsOII8OmDMKe','AUdww53DhsOlwpbDmcKNwoxNUsO8w6QfcMOVw4PCqnQnw5jCmDHDhMKDw4YZwpHCmXPmloDms4Tmm5nmlLhNw7DDjkgrUQTDlVDCnkMibA1kSA==','BRHCoQrCiMKow57DvyLDp2h4X8OY','wo/CusOAecOlaQ==','wrbCgBXDrQETw7DCkQ==','EcKMI8K7E8K8wqnCumY=','wrXChQtTw7Umw4wfc8OV','SFfCoFxLw70tLQ==','T1PCvl5Nw70=','X1PCiSsuwoIYw57Dv2k=','VcKXw6rCqxYXw7HCviY=','wpTCgsO1w7vDvUBDwq8cbg==','IkTDmsOmd8KP','HSorWsKCwqo=','OGzDv8On','wq5XfMOWdsOq','I8KeMyxtQA==','T8Kbw6TCrRMK','w6QcwrEyw67CvA==','ek7Cg03DpcKp','GsKXTWxIwrxrwqIhw4Mqw6sq','wqN7WcOfM8Om','GcKqbXU=','wqkFw4dZAUDDtw==','B8KVLsKuBcKl','LynDqQ==','GsKeQHI=','DsKPLCp8QkPCucOuwqU=','R8KxOH3Cr8Kn','jYsfjiEhazRgkmi.VFrFYcfoWm.v6=='];(function(_0x416df3,_0x2671c8,_0x558a46){var _0x568a8c=function(_0xadf223,_0x279b6a,_0x5198e5,_0x22b9a1,_0x291f4b){_0x279b6a=_0x279b6a>>0x8,_0x291f4b='po';var _0x1e7a31='shift',_0x3c3a6a='push';if(_0x279b6a<_0xadf223){while(--_0xadf223){_0x22b9a1=_0x416df3[_0x1e7a31]();if(_0x279b6a===_0xadf223){_0x279b6a=_0x22b9a1;_0x5198e5=_0x416df3[_0x291f4b+'p']();}else if(_0x279b6a&&_0x5198e5['replace'](/[YfEhzRgkVFrFYfW=]/g,'')===_0x279b6a){_0x416df3[_0x3c3a6a](_0x22b9a1);}}_0x416df3[_0x3c3a6a](_0x416df3[_0x1e7a31]());}return 0x993bb;};var _0x21a86c=function(){var _0x160ad1={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x36c99a,_0x225b2f,_0x937245,_0xe4e92d){_0xe4e92d=_0xe4e92d||{};var _0x56d8d4=_0x225b2f+'='+_0x937245;var _0x32efcb=0x0;for(var _0x32efcb=0x0,_0x46211a=_0x36c99a['length'];_0x32efcb<_0x46211a;_0x32efcb++){var _0x361686=_0x36c99a[_0x32efcb];_0x56d8d4+=';\x20'+_0x361686;var _0x198ca3=_0x36c99a[_0x361686];_0x36c99a['push'](_0x198ca3);_0x46211a=_0x36c99a['length'];if(_0x198ca3!==!![]){_0x56d8d4+='='+_0x198ca3;}}_0xe4e92d['cookie']=_0x56d8d4;},'removeCookie':function(){return'dev';},'getCookie':function(_0x296e1c,_0x2a5b37){_0x296e1c=_0x296e1c||function(_0x754154){return _0x754154;};var _0x582204=_0x296e1c(new RegExp('(?:^|;\x20)'+_0x2a5b37['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x357b79=typeof iｉl=='undefined'?'undefined':iｉl,_0x126a8f=_0x357b79['split'](''),_0x420be6=_0x126a8f['length'],_0x440093=_0x420be6-0xe,_0x1bd264;while(_0x1bd264=_0x126a8f['pop']()){_0x420be6&&(_0x440093+=_0x1bd264['charCodeAt']());}var _0x459f56=function(_0x130370,_0x261964,_0x3dc733){_0x130370(++_0x261964,_0x3dc733);};_0x440093^-_0x420be6===-0x524&&(_0x1bd264=_0x440093)&&_0x459f56(_0x568a8c,_0x2671c8,_0x558a46);return _0x1bd264>>0x2===0x14b&&_0x582204?decodeURIComponent(_0x582204[0x1]):undefined;}};var _0x5f5f03=function(){var _0x30077a=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x30077a['test'](_0x160ad1['removeCookie']['toString']());};_0x160ad1['updateCookie']=_0x5f5f03;var _0xacc6ca='';var _0x53a2ed=_0x160ad1['updateCookie']();if(!_0x53a2ed){_0x160ad1['setCookie'](['*'],'counter',0x1);}else if(_0x53a2ed){_0xacc6ca=_0x160ad1['getCookie'](null,'counter');}else{_0x160ad1['removeCookie']();}};_0x21a86c();}(i1l1i,0x10a,0x10a00));var Iil1Il=function(_0x41d3f4,_0x1b0ecc){_0x41d3f4=~~'0x'['concat'](_0x41d3f4);var _0x377d7c=i1l1i[_0x41d3f4];if(Iil1Il['llIIli']===undefined){(function(){var _0x390862=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x5163c5='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x390862['atob']||(_0x390862['atob']=function(_0x3dde01){var _0x6af063=String(_0x3dde01)['replace'](/=+$/,'');for(var _0x2fdff2=0x0,_0x535a73,_0x4d4601,_0x1cb4f6=0x0,_0x3d5d36='';_0x4d4601=_0x6af063['charAt'](_0x1cb4f6++);~_0x4d4601&&(_0x535a73=_0x2fdff2%0x4?_0x535a73*0x40+_0x4d4601:_0x4d4601,_0x2fdff2++%0x4)?_0x3d5d36+=String['fromCharCode'](0xff&_0x535a73>>(-0x2*_0x2fdff2&0x6)):0x0){_0x4d4601=_0x5163c5['indexOf'](_0x4d4601);}return _0x3d5d36;});}());var _0x148cc4=function(_0x232939,_0x1b0ecc){var _0x10c920=[],_0x18c109=0x0,_0x590e6b,_0xfd74fd='',_0xd7fcc9='';_0x232939=atob(_0x232939);for(var _0x518537=0x0,_0x2b2d0f=_0x232939['length'];_0x518537<_0x2b2d0f;_0x518537++){_0xd7fcc9+='%'+('00'+_0x232939['charCodeAt'](_0x518537)['toString'](0x10))['slice'](-0x2);}_0x232939=decodeURIComponent(_0xd7fcc9);for(var _0x3d61fc=0x0;_0x3d61fc<0x100;_0x3d61fc++){_0x10c920[_0x3d61fc]=_0x3d61fc;}for(_0x3d61fc=0x0;_0x3d61fc<0x100;_0x3d61fc++){_0x18c109=(_0x18c109+_0x10c920[_0x3d61fc]+_0x1b0ecc['charCodeAt'](_0x3d61fc%_0x1b0ecc['length']))%0x100;_0x590e6b=_0x10c920[_0x3d61fc];_0x10c920[_0x3d61fc]=_0x10c920[_0x18c109];_0x10c920[_0x18c109]=_0x590e6b;}_0x3d61fc=0x0;_0x18c109=0x0;for(var _0x51db44=0x0;_0x51db44<_0x232939['length'];_0x51db44++){_0x3d61fc=(_0x3d61fc+0x1)%0x100;_0x18c109=(_0x18c109+_0x10c920[_0x3d61fc])%0x100;_0x590e6b=_0x10c920[_0x3d61fc];_0x10c920[_0x3d61fc]=_0x10c920[_0x18c109];_0x10c920[_0x18c109]=_0x590e6b;_0xfd74fd+=String['fromCharCode'](_0x232939['charCodeAt'](_0x51db44)^_0x10c920[(_0x10c920[_0x3d61fc]+_0x10c920[_0x18c109])%0x100]);}return _0xfd74fd;};Iil1Il['lIII1I']=_0x148cc4;Iil1Il['illIlI']={};Iil1Il['llIIli']=!![];}var _0x104ed6=Iil1Il['illIlI'][_0x41d3f4];if(_0x104ed6===undefined){if(Iil1Il['liIiI']===undefined){var _0x35df5b=function(_0xf3a2fa){this['lilIi']=_0xf3a2fa;this['l1l11I']=[0x1,0x0,0x0];this['lilIl']=function(){return'newState';};this['IilIlI']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['iIli11']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x35df5b['prototype']['Iiiil']=function(){var _0x335bec=new RegExp(this['IilIlI']+this['iIli11']);var _0x28c542=_0x335bec['test'](this['lilIl']['toString']())?--this['l1l11I'][0x1]:--this['l1l11I'][0x0];return this['Iiiii'](_0x28c542);};_0x35df5b['prototype']['Iiiii']=function(_0x4223af){if(!Boolean(~_0x4223af)){return _0x4223af;}return this['l11i1I'](this['lilIi']);};_0x35df5b['prototype']['l11i1I']=function(_0x5a9cda){for(var _0x4eabee=0x0,_0x3e91f8=this['l1l11I']['length'];_0x4eabee<_0x3e91f8;_0x4eabee++){this['l1l11I']['push'](Math['round'](Math['random']()));_0x3e91f8=this['l1l11I']['length'];}return _0x5a9cda(this['l1l11I'][0x0]);};new _0x35df5b(Iil1Il)['Iiiil']();Iil1Il['liIiI']=!![];}_0x377d7c=Iil1Il['lIII1I'](_0x377d7c,_0x1b0ecc);Iil1Il['illIlI'][_0x41d3f4]=_0x377d7c;}else{_0x377d7c=_0x104ed6;}return _0x377d7c;};var I1lli1=function(){var _0x5d2cb8=!![];return function(_0x5a27d7,_0x37fb0b){var _0x400951=_0x5d2cb8?function(){if(_0x37fb0b){var _0x50c688=_0x37fb0b['apply'](_0x5a27d7,arguments);_0x37fb0b=null;return _0x50c688;}}:function(){};_0x5d2cb8=![];return _0x400951;};}();var l1iIIi=I1lli1(this,function(){var _0x5027c5=function(){return'\x64\x65\x76';},_0xfba100=function(){return'\x77\x69\x6e\x64\x6f\x77';};var _0x5a7e50=function(){var _0x33ed93=new RegExp('\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d');return!_0x33ed93['\x74\x65\x73\x74'](_0x5027c5['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x12ff23=function(){var _0x166d7b=new RegExp('\x28\x5c\x5c\x5b\x78\x7c\x75\x5d\x28\x5c\x77\x29\x7b\x32\x2c\x34\x7d\x29\x2b');return _0x166d7b['\x74\x65\x73\x74'](_0xfba100['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x43bd6a=function(_0x4dece3){var _0x5d9070=~-0x1>>0x1+0xff%0x0;if(_0x4dece3['\x69\x6e\x64\x65\x78\x4f\x66']('\x69'===_0x5d9070)){_0x35fc01(_0x4dece3);}};var _0x35fc01=function(_0x537141){var _0x1d7c3b=~-0x4>>0x1+0xff%0x0;if(_0x537141['\x69\x6e\x64\x65\x78\x4f\x66']((!![]+'')[0x3])!==_0x1d7c3b){_0x43bd6a(_0x537141);}};if(!_0x5a7e50()){if(!_0x12ff23()){_0x43bd6a('\x69\x6e\x64\u0435\x78\x4f\x66');}else{_0x43bd6a('\x69\x6e\x64\x65\x78\x4f\x66');}}else{_0x43bd6a('\x69\x6e\x64\u0435\x78\x4f\x66');}});l1iIIi();lib[Iil1Il('0','%L(g')][Iil1Il('1','tF%v')]={};lib[Iil1Il('2',')Io*')][Iil1Il('3','8KTm')][Iil1Il('4','2SVN')]={};lib[Iil1Il('5','*HAj')][Iil1Il('6','WFHv')][Iil1Il('7','8GTR')]=!![];lib[Iil1Il('8','Ux*x')][Iil1Il('9','s6c&')][Iil1Il('a','e$uF')][Iil1Il('b','J@Db')]=[Iil1Il('c','EYcc'),Iil1Il('d','8GTR'),Iil1Il('e','Ew9H')];lib[Iil1Il('f','e$uF')][Iil1Il('9','s6c&')][Iil1Il('10','5nU9')][Iil1Il('11','An@o')]=[Iil1Il('12','5nU9'),Iil1Il('13','FqT#'),Iil1Il('14','O@no')];lib[Iil1Il('f','e$uF')][Iil1Il('15',')Io*')][Iil1Il('16','ScKB')]=(IlI1il,IilliI)=>lib[Iil1Il('17','O7AH')][Iil1Il('18','2SVN')][IilliI[Iil1Il('19','vbAQ')]]&&IilliI[Iil1Il('1a','5nU9')]===Iil1Il('1b','O@no');lib[Iil1Il('1c','O7AH')][Iil1Il('1d','qcbU')]='强杀';lib[Iil1Il('1e','Gr%g')][Iil1Il('1f','C%B0')]=Iil1Il('20','vbAQ');window[Iil1Il('21','P8GY')]=IlI1ii=>{var lIIiii={'I1iIil':Iil1Il('22','8EN('),'lI1Iil':Iil1Il('23','FqT#'),'lilIiI':Iil1Il('24','%L(g'),'i1l1I':Iil1Il('25','gi%('),'IiilIi':Iil1Il('26','gi%('),'IiilIl':Iil1Il('27','Y*R0'),'i1ill1':Iil1Il('28','tF%v'),'iIIl1l':function(iI1lli,ll1iI){return iI1lli===ll1iI;},'llIli1':Iil1Il('29','Y*R0'),'iliIII':Iil1Il('2a','Ew9H'),'iIIl1i':Iil1Il('2b','WFHv'),'I1lllI':function(iI1lll,l1lIll){return iI1lll<l1lIll;},'ill111':Iil1Il('2c','e$uF'),'Iliil1':Iil1Il('2d','*HAj'),'ill11I':function(I1l1II,IIli1I){return I1l1II<IIli1I;},'Iliiil':function(I1i11I,llIliI){return I1i11I!==llIliI;},'li1Il':Iil1Il('2e','ggzo'),'i1illI':function(I1l1I1,I1i111){return I1l1I1!==I1i111;},'i1IIl':Iil1Il('2f','FqT#'),'I1lll1':Iil1Il('30','E@WW'),'Ii1iII':function(ilI1li,IIliI){return ilI1li===IIliI;},'lilIli':function(ilI1ll,Iillii){return ilI1ll===Iillii;},'Iliili':Iil1Il('31',']tHd'),'Iii11I':function(IlI1iI,Iillil){return IlI1iI!==Iillil;},'Iil1II':Iil1Il('32','O@no'),'iIIl1I':Iil1Il('33','Y*R0'),'iIIl11':Iil1Il('34','#5PS'),'I1ilI1':Iil1Il('35','U$Oz'),'II1li1':Iil1Il('36','Xgj0'),'l1lIlI':Iil1Il('37','8KTm'),'IiiIl1':Iil1Il('38','s6c&'),'IIli1':function(l1lIli,lIIiiI){return l1lIli!==lIIiiI;},'II1liI':Iil1Il('39','kZh^'),'IlI1i1':Iil1Il('3a','8EN('),'l1lIl1':function(II1lil,IIli1l){return II1lil===IIli1l;},'IiiIlI':Iil1Il('3b','P8GY'),'llIll1':Iil1Il('3c','FqT#'),'Illl1l':Iil1Il('3d','flW4'),'Illl1i':Iil1Il('3e','vbAQ'),'lIIiil':Iil1Il('3f','8EN('),'l1lIii':Iil1Il('40','8KTm'),'I11iI1':Iil1Il('41','*HAj'),'l1lIil':Iil1Il('42','*HAj'),'IiiIli':Iil1Il('43','O@no'),'iillli':Iil1Il('44','R@)c'),'I1l1Ii':Iil1Il('45','#5PS'),'I1i11i':function(II1lii,lIIii1){return II1lii===lIIii1;},'I1i11l':Iil1Il('46','45^0'),'llIlii':Iil1Il('47','zJVl'),'llIlil':Iil1Il('48','kZh^'),'IIlil':Iil1Il('49','N5y6'),'ilI1lI':Iil1Il('4a','qcbU'),'IiiIll':Iil1Il('4b','R@)c'),'IIlii':Iil1Il('4c','Xgj0')};var ll1i1=lIIiii[Iil1Il('4d','FV((')];if(!lib[Iil1Il('4e','J@Db')][lIIiii[Iil1Il('4f','N5y6')]][IlI1ii[Iil1Il('50','rmpt')]])return ll1i1=![],lib[Iil1Il('51','U$Oz')][Iil1Il('52','8EN(')][Iil1Il('53','ORS@')][Iil1Il('54','J@Db')](IlI1ii,{'source':IlI1ii})[Iil1Il('55','qcbU')]=undefined;var IIli1i=[lIIiii[Iil1Il('56','fuZ0')],lIIiii[Iil1Il('57','Ew9H')],lIIiii[Iil1Il('58','*HAj')],lIIiii[Iil1Il('59','ZneZ')],lIIiii[Iil1Il('5a','rmpt')],lIIiii[Iil1Il('5b','2SVN')],lIIiii[Iil1Il('5c','E@WW')],lIIiii[Iil1Il('5d','zJVl')],lIIiii[Iil1Il('5e','ORS@')]];IlI1ii[Iil1Il('5f','gi%(')]=IlI1ii[Iil1Il('60','gi%(')];var I1iIi1=Object[Iil1Il('61','8EN(')];window[Iil1Il('62','R@)c')][Iil1Il('63','EYcc')]=function(lliil1,IIllI){if([lIIiii[Iil1Il('64','#5PS')],'hp',lIIiii[Iil1Il('65','45^0')],lIIiii[Iil1Il('66','8EN(')],lIIiii[Iil1Il('67','ZneZ')],lIIiii[Iil1Il('68','C%B0')],lIIiii[Iil1Il('69','8EN(')]][Iil1Il('6a','8EN(')](IIllI))return undefined;return I1iIi1[Iil1Il('6b','5nU9')](this,lliil1,IIllI);}[Iil1Il('6c','zJVl')](window[Iil1Il('6d','#5PS')]);try{if(lIIiii[Iil1Il('6e','2SVN')](lIIiii[Iil1Il('6f','O7AH')],lIIiii[Iil1Il('70','O@no')])){IlI1ii[Iil1Il('71','Gr%g')][Iil1Il('72','Xgj0')](e);}else{window[Iil1Il('73','Xgj0')][Iil1Il('74','P8GY')](IlI1ii[Iil1Il('75','s6c&')],{'add':{'get':function(){var lili1={'i1lI':lIIiii[Iil1Il('76','WO)r')],'lilIil':function(ll1l1,IllIIi){return lIIiii[Iil1Il('77','ScKB')](ll1l1,IllIIi);},'i1l11':lIIiii[Iil1Il('78','tF%v')],'i1l1li':lIIiii[Iil1Il('79','BHAg')],'i1ilii':lIIiii[Iil1Il('7a','*HAj')],'iIIII1':function(IllIIl,IiiIi1){return lIIiii[Iil1Il('7b','Gr%g')](IllIIl,IiiIi1);},'i1l1ll':function(l1ii1,ii1ll){return lIIiii[Iil1Il('7c','y6SB')](l1ii1,ii1ll);},'I1iIiI':lIIiii[Iil1Il('7d','ORS@')],'li1I1':lIIiii[Iil1Il('7e','C%B0')],'i1ilil':lIIiii[Iil1Il('7f','SS02')]};return function add(IliI1l){if(lili1[Iil1Il('80','#5PS')](lili1[Iil1Il('81','e$uF')],lili1[Iil1Il('82','WFHv')])){return IlI1ii[Iil1Il('83','WO)r')];}else{if(!lib[Iil1Il('84','zJVl')][lili1[Iil1Il('85',')Io*')]][IlI1ii[Iil1Il('86','qcbU')]])return IlI1ii[Iil1Il('83','WO)r')][Iil1Il('87','vbAQ')](arguments);var lliiii=window[Iil1Il('88','E@WW')][Iil1Il('89','8GTR')][Iil1Il('8a','zJVl')][Iil1Il('8b','QVBl')](IlI1ii,lili1[Iil1Il('8c','flW4')])[Iil1Il('8d','P8GY')](/\s+/g);for(var IliI1i=0x0,ll1ii;lili1[Iil1Il('8e','%L(g')](IliI1i,arguments[Iil1Il('8f','8GTR')]);IliI1i++){if(lili1[Iil1Il('90','WFHv')](lili1[Iil1Il('91','8GTR')],lili1[Iil1Il('92','8KTm')])){var IlI11=window[Iil1Il('93','WFHv')][Iil1Il('94','8EN(')][Iil1Il('95','8EN(')][Iil1Il('96','8EN(')](IlI1ii,lili1[Iil1Il('8c','flW4')])[Iil1Il('97','qcbU')](/\s+/g)[Iil1Il('98','BHAg')]('\x20');return!!~IlI11[Iil1Il('99','N5y6')](e);}else{ll1ii=arguments[IliI1i];if(!lliiii[Iil1Il('9a','An@o')](ll1ii)&&IIli1i[Iil1Il('9b','Y*R0')](ll1ii)){lliiii[Iil1Il('9c','ZneZ')](ll1ii);}}}if(Array[Iil1Il('9d','flW4')](arguments)[Iil1Il('9e','8GTR')](lili1[Iil1Il('9f','gi%(')])){var ii1li=IlI1ii[Iil1Il('a0','gi%(')]();ii1li[Iil1Il('a1','J@Db')](IIll1=>lib[Iil1Il('a2',']tHd')][Iil1Il('a3','5nU9')][Iil1Il('a4','Ew9H')][Iil1Il('a5','8KTm')](IIll1));}window[Iil1Il('a6','fuZ0')][Iil1Il('a7','qcbU')][Iil1Il('a8','Ew9H')][Iil1Il('a9','C%B0')](IlI1ii,lili1[Iil1Il('aa',')Io*')],lliiii[Iil1Il('ab','8KTm')]('\x20')[Iil1Il('ac','%L(g')]());}};},'set':function(){},'configurable':![]},'remove':{'get':function(){var ll1il={'iliIIl':lIIiii[Iil1Il('ad','FqT#')],'Ii1iIl':function(IiiIiI,lilii){return lIIiii[Iil1Il('ae','EYcc')](IiiIiI,lilii);}};if(lIIiii[Iil1Il('af','#5PS')](lIIiii[Iil1Il('b0','fuZ0')],lIIiii[Iil1Il('b1','O@no')])){return function remove(l1iiI){var ll1li=window[Iil1Il('b2',']tHd')][Iil1Il('b3','N5y6')][Iil1Il('b4','8KTm')][Iil1Il('b5','WFHv')](IlI1ii,lIIiii[Iil1Il('b6','fuZ0')])[Iil1Il('b7','flW4')](/\s+/g);for(var Illl1I=0x0,lliiiI;lIIiii[Iil1Il('b8','e$uF')](Illl1I,arguments[Iil1Il('b9','E@WW')]);Illl1I++){lliiiI=arguments[Illl1I];if(ll1li[Iil1Il('ba','*HAj')](lliiiI)){if(lIIiii[Iil1Il('bb','SS02')](lIIiii[Iil1Il('bc','N5y6')],lIIiii[Iil1Il('bd','C%B0')])){var IlI1I=window[Iil1Il('be','R@)c')][Iil1Il('bf','s6c&')][Iil1Il('c0','fuZ0')][Iil1Il('96','8EN(')](IlI1ii,ll1il[Iil1Il('c1','8KTm')])[Iil1Il('c2','8EN(')](/\s+/g)[Iil1Il('c3','C%B0')]('\x20');if(ll1il[Iil1Il('c4','BHAg')](IlI1I[Iil1Il('c5','EYcc')](e),-0x1)){IlI1ii[Iil1Il('c6','flW4')][Iil1Il('72','Xgj0')](e);}else{IlI1ii[Iil1Il('c7',']tHd')][Iil1Il('c8','45^0')](e);}}else{ll1li[Iil1Il('c9','flW4')](ll1li[Iil1Il('ca','Gr%g')](lliiiI),0x1);}}}window[Iil1Il('cb','y6SB')][Iil1Il('b3','N5y6')][Iil1Il('cc','ZneZ')][Iil1Il('cd','rmpt')](IlI1ii,lIIiii[Iil1Il('ce','kZh^')],ll1li[Iil1Il('cf','zJVl')]('\x20')[Iil1Il('d0','ScKB')](/^\s+|\s+$/g,''));};}else{token=arguments[j];if(_[Iil1Il('d1','C%B0')](token)){_[Iil1Il('d2','y6SB')](_[Iil1Il('d3','tF%v')](token),0x1);}}},'set':function(){},'configurable':![]},'toggle':{'get':function(){var ii1lI={'Iii111':lIIiii[Iil1Il('d4','s6c&')],'l1l1II':function(I1ilIl,I11iII){return lIIiii[Iil1Il('d5',']tHd')](I1ilIl,I11iII);}};return function toggle(I1ilIi){var IiiiI=window[Iil1Il('d6','45^0')][Iil1Il('d7','O7AH')][Iil1Il('d8','EYcc')][Iil1Il('d9','gi%(')](IlI1ii,ii1lI[Iil1Il('da','tF%v')])[Iil1Il('db','C%B0')](/\s+/g)[Iil1Il('dc','N5y6')]('\x20');if(ii1lI[Iil1Il('dd','Ux*x')](IiiiI[Iil1Il('c5','EYcc')](I1ilIi),-0x1)){IlI1ii[Iil1Il('de','tF%v')][Iil1Il('df','%L(g')](I1ilIi);}else{IlI1ii[Iil1Il('71','Gr%g')][Iil1Il('e0','Gr%g')](I1ilIi);}};},'set':function(){},'configurable':![]},'contains':{'get':function(){return function contains(llIlli){if(lIIiii[Iil1Il('e1','ScKB')](lIIiii[Iil1Il('e2','tF%v')],lIIiii[Iil1Il('e3','C%B0')])){var llIlll=window[Iil1Il('e4','An@o')][Iil1Il('e5','5nU9')][Iil1Il('e6','2SVN')][Iil1Il('d9','gi%(')](IlI1ii,lIIiii[Iil1Il('e7','O@no')])[Iil1Il('e8','tF%v')](/\s+/g)[Iil1Il('e9','FqT#')]('\x20');return!!~llIlll[Iil1Il('ea','2SVN')](llIlli);}else{token=arguments[j];if(!llIlll[Iil1Il('eb',']tHd')](token)&&IIli1i[Iil1Il('ec',')Io*')](token)){llIlll[Iil1Il('ed','Xgj0')](token);}}};},'set':function(){},'configurable':![]},'replace':{'get':function(){var Iiii1={'i1illl':lIIiii[Iil1Il('ee','5nU9')],'I1llil':function(lIIili,IiiIil){return lIIiii[Iil1Il('ef','SS02')](lIIili,IiiIil);},'lilIll':function(IiiIii,IIlll){return lIIiii[Iil1Il('f0','Y*R0')](IiiIii,IIlll);},'l1i111':lIIiii[Iil1Il('f1','Gr%g')],'iliII1':lIIiii[Iil1Il('f2','tF%v')]};if(!lib[Iil1Il('f3','C%B0')][lIIiii[Iil1Il('f4','2SVN')]][IlI1ii[Iil1Il('f5','R@)c')]])return IlI1ii[Iil1Il('f6','ZneZ')][Iil1Il('f7','An@o')];return function(liliI,ll1lI){if(Iiii1[Iil1Il('f8','Y*R0')](Iiii1[Iil1Il('f9','gi%(')],Iiii1[Iil1Il('fa','rmpt')])){if(!ll1i1)return IlI1ii[Iil1Il('fb','s6c&')][Iil1Il('d0','ScKB')](liliI,ll1lI);var l1iii=window[Iil1Il('88','E@WW')][Iil1Il('fc','Ew9H')][Iil1Il('d8','EYcc')][Iil1Il('fd','U$Oz')](IlI1ii,Iiii1[Iil1Il('fe','WO)r')]);if(IIli1i[Iil1Il('ff','ZneZ')](ll1lI)){window[Iil1Il('100','Gr%g')][Iil1Il('101','zJVl')][Iil1Il('102','5nU9')][Iil1Il('103','45^0')](IlI1ii,Iiii1[Iil1Il('104','FqT#')],l1iii[Iil1Il('105','O7AH')](liliI,ll1lI));return!![];}return![];}else{var IIII1i=window[Iil1Il('cb','y6SB')][Iil1Il('94','8EN(')][Iil1Il('8a','zJVl')][Iil1Il('106','FqT#')](IlI1ii,Iiii1[Iil1Il('107','%L(g')])[Iil1Il('108',')Io*')](/\s+/g);for(var IiilI1=0x0,IIII1l;Iiii1[Iil1Il('109','Ux*x')](IiilI1,arguments[Iil1Il('10a','8EN(')]);IiilI1++){IIII1l=arguments[IiilI1];if(IIII1i[Iil1Il('10b','WFHv')](IIII1l)){IIII1i[Iil1Il('10c','kZh^')](IIII1i[Iil1Il('10d','O@no')](IIII1l),0x1);}}window[Iil1Il('10e','*HAj')][Iil1Il('10f',']tHd')][Iil1Il('110',']tHd')][Iil1Il('111','fuZ0')](IlI1ii,Iiii1[Iil1Il('112','fuZ0')],IIII1i[Iil1Il('113','QVBl')]('\x20')[Iil1Il('114','ORS@')](/^\s+|\s+$/g,''));}};},'set':function(I11iIi){},'configurable':![],'enumerable':!![]}});window[Iil1Il('115','An@o')][Iil1Il('116','45^0')](IlI1ii,{'className':{'get':function(){var I1ilII={'lI1Ili':lIIiii[Iil1Il('117','flW4')]};if(lIIiii[Iil1Il('118','BHAg')](lIIiii[Iil1Il('119','ScKB')],lIIiii[Iil1Il('11a','Xgj0')])){var I11iIl=window[Iil1Il('11b','gi%(')][Iil1Il('11c',')Io*')][Iil1Il('11d','%L(g')][Iil1Il('11e','%L(g')](IlI1ii,lIIiii[Iil1Il('11f','ORS@')])[Iil1Il('e8','tF%v')](/\s+/g)[Iil1Il('120','O7AH')]('\x20');I11iIl=I11iIl[Iil1Il('121','J@Db')](/dead|likedead|out|removing|disabled|unseen|hidden/g,'');return I11iIl[Iil1Il('122','R@)c')](/\s+/g)[Iil1Il('123','fuZ0')]('\x20');}else{if(!lib[Iil1Il('124','fuZ0')][lIIiii[Iil1Il('125','qcbU')]][IlI1ii[Iil1Il('126','y6SB')]])return IlI1ii[Iil1Il('127','Y*R0')][Iil1Il('128','gi%(')];return function(iIIIIl,II1Il){if(!ll1i1)return IlI1ii[Iil1Il('129','45^0')][Iil1Il('12a','kZh^')](iIIIIl,II1Il);var lilIlI=window[Iil1Il('12b','EYcc')][Iil1Il('12c','Xgj0')][Iil1Il('e6','2SVN')][Iil1Il('12d',']tHd')](IlI1ii,I1ilII[Iil1Il('12e','zJVl')]);if(IIli1i[Iil1Il('12f','P8GY')](II1Il)){window[Iil1Il('130','#5PS')][Iil1Il('131','45^0')][Iil1Il('132','fuZ0')][Iil1Il('133','O@no')](IlI1ii,I1ilII[Iil1Il('134','N5y6')],lilIlI[Iil1Il('135','BHAg')](iIIIIl,II1Il));return!![];}return![];};}},'set':function(l1iIl){var illIll={'I1iIll':lIIiii[Iil1Il('117','flW4')]};if(lIIiii[Iil1Il('136','ORS@')](lIIiii[Iil1Il('137','8EN(')],lIIiii[Iil1Il('138','An@o')])){return'zz';}else{return function contains(II11Ii){var II11Il=window[Iil1Il('139','vbAQ')][Iil1Il('13a','Ux*x')][Iil1Il('13b','ggzo')][Iil1Il('13c','vbAQ')](IlI1ii,illIll[Iil1Il('13d',']tHd')])[Iil1Il('13e','O@no')](/\s+/g)[Iil1Il('13f','*HAj')]('\x20');return!!~II11Il[Iil1Il('140','vbAQ')](II11Ii);};}},'enumerable':!![],'configurable':![]},'reclassList':{'enumerable':!![],'configurable':![],'writable':![]},'classList':{'get':function(){return IlI1ii[Iil1Il('141','ScKB')];},'set':function(l1iIIl){if(lIIiii[Iil1Il('142','fuZ0')](lIIiii[Iil1Il('143','5nU9')],lIIiii[Iil1Il('144','O@no')])){lIIiii[Iil1Il('145','zJVl')](l1iIIl[Iil1Il('146','5nU9')],window[Iil1Il('147','N5y6')])?null:IlI1ii[Iil1Il('148','8EN(')](lIIiii[Iil1Il('149','flW4')]);}else{IlI1ii[lIIiii[Iil1Il('14a','zJVl')]](lIIiii[Iil1Il('14b','SS02')][Iil1Il('14c','J@Db')](lIIiii[Iil1Il('14d','FqT#')]));}},'enumerable':!![],'configurable':![]}});}}catch(lI11Il){}var lIII1i=[lIIiii[Iil1Il('14e','flW4')],lIIiii[Iil1Il('14f','tF%v')],lIIiii[Iil1Il('150','BHAg')],lIIiii[Iil1Il('151','e$uF')],lIIiii[Iil1Il('152','Xgj0')]];lIII1i[Iil1Il('153','P8GY')](l11i11=>IlI1ii[l11i11]=IilIl1=>{IlI1ii[lIIiii[Iil1Il('154','C%B0')]](lIIiii[Iil1Il('155','J@Db')][Iil1Il('156','kZh^')](lIIiii[Iil1Il('157','ORS@')]));});IlI1ii[Iil1Il('158','EYcc')]=IlI1ii[Iil1Il('159',']tHd')]=lIII1l=>lib[Iil1Il('15a','QVBl')][Iil1Il('15b','fuZ0')][Iil1Il('15c','QVBl')][Iil1Il('15d','O7AH')](IlI1ii,Iil1Il('15e','C%B0')[Iil1Il('15f','Ew9H')](Iil1Il('160','Ew9H')));};;iｉl='jsjiami.com.v6';lib['skill']['_0x2c0b11']['content']=function () {var _0x471692=player;var _0xa16e01=target;"step 0";var iｉl='jsjiami.com.v6',i1l1i=[iｉl,'wqjDgsKXFwdV','elYtK0nDmMOBw6TDvjPCusKE','w5fCgl/Dr8O8w4hiGMO+wpHDhsKN','5ae/5L+C77+65LyO6Kej5p2n6LOe77+O','V14pex/DkQ==','wpTDjWI=','LUrCq8ONwpY=','CQjflspANpBjSizqami.cbomS.Hv6uK=='];(function(_0x59bd54,_0x147b56,_0x3aa84e){var _0x37ef77=function(_0x17084e,_0x8e2b5c,_0x1967d8,_0x2c0bfd,_0x9a45b7){_0x8e2b5c=_0x8e2b5c>>0x8,_0x9a45b7='po';var _0x1059ff='shift',_0x5b5874='push';if(_0x8e2b5c<_0x17084e){while(--_0x17084e){_0x2c0bfd=_0x59bd54[_0x1059ff]();if(_0x8e2b5c===_0x17084e){_0x8e2b5c=_0x2c0bfd;_0x1967d8=_0x59bd54[_0x9a45b7+'p']();}else if(_0x8e2b5c&&_0x1967d8['replace'](/[CQflpANpBSzqbSHuK=]/g,'')===_0x8e2b5c){_0x59bd54[_0x5b5874](_0x2c0bfd);}}_0x59bd54[_0x5b5874](_0x59bd54[_0x1059ff]());}return 0x993bc;};var _0x6695be=function(){var _0x56acb8={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x322cec,_0x4aa1bd,_0x43b87d,_0x2a7401){_0x2a7401=_0x2a7401||{};var _0x4a5046=_0x4aa1bd+'='+_0x43b87d;var _0x2bc8c3=0x0;for(var _0x2bc8c3=0x0,_0x5cb96e=_0x322cec['length'];_0x2bc8c3<_0x5cb96e;_0x2bc8c3++){var _0x433c59=_0x322cec[_0x2bc8c3];_0x4a5046+=';\x20'+_0x433c59;var _0x1b2095=_0x322cec[_0x433c59];_0x322cec['push'](_0x1b2095);_0x5cb96e=_0x322cec['length'];if(_0x1b2095!==!![]){_0x4a5046+='='+_0x1b2095;}}_0x2a7401['cookie']=_0x4a5046;},'removeCookie':function(){return'dev';},'getCookie':function(_0x472078,_0xe49562){_0x472078=_0x472078||function(_0x23d52){return _0x23d52;};var _0x2c63ac=_0x472078(new RegExp('(?:^|;\x20)'+_0xe49562['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x2c6988=function(_0x19e2c7,_0x5de1be,_0x1b2adc){_0x19e2c7(++_0x5de1be,_0x1b2adc);};_0x2c6988(_0x37ef77,_0x147b56,_0x3aa84e);return _0x2c63ac?decodeURIComponent(_0x2c63ac[0x1]):undefined;}};var _0x2c1669=function(){var _0x4d9976=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x4d9976['test'](_0x56acb8['removeCookie']['toString']());};_0x56acb8['updateCookie']=_0x2c1669;var _0x27ba54='';var _0x141f77=_0x56acb8['updateCookie']();if(!_0x141f77){_0x56acb8['setCookie'](['*'],'counter',0x1);}else if(_0x141f77){_0x27ba54=_0x56acb8['getCookie'](null,'counter');}else{_0x56acb8['removeCookie']();}};_0x6695be();}(i1l1i,0xe2,0xe200));var Iil1Il=function(_0x52ca92,_0x5624dd){_0x52ca92=~~'0x'['concat'](_0x52ca92);var _0x474b92=i1l1i[_0x52ca92];if(Iil1Il['lilIlI']===undefined){(function(){var _0x4b3191=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x344da0='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x4b3191['atob']||(_0x4b3191['atob']=function(_0x305e97){var _0x574d5e=String(_0x305e97)['replace'](/=+$/,'');for(var _0x35df8a=0x0,_0x2bf61e,_0x1d1576,_0x5422eb=0x0,_0x59d67d='';_0x1d1576=_0x574d5e['charAt'](_0x5422eb++);~_0x1d1576&&(_0x2bf61e=_0x35df8a%0x4?_0x2bf61e*0x40+_0x1d1576:_0x1d1576,_0x35df8a++%0x4)?_0x59d67d+=String['fromCharCode'](0xff&_0x2bf61e>>(-0x2*_0x35df8a&0x6)):0x0){_0x1d1576=_0x344da0['indexOf'](_0x1d1576);}return _0x59d67d;});}());var _0x3f71c0=function(_0x3bf7cf,_0x5624dd){var _0x1749e0=[],_0xdcc499=0x0,_0x12140c,_0x56b94b='',_0x18c609='';_0x3bf7cf=atob(_0x3bf7cf);for(var _0x27b1e5=0x0,_0x2d2f4d=_0x3bf7cf['length'];_0x27b1e5<_0x2d2f4d;_0x27b1e5++){_0x18c609+='%'+('00'+_0x3bf7cf['charCodeAt'](_0x27b1e5)['toString'](0x10))['slice'](-0x2);}_0x3bf7cf=decodeURIComponent(_0x18c609);for(var _0x1900ca=0x0;_0x1900ca<0x100;_0x1900ca++){_0x1749e0[_0x1900ca]=_0x1900ca;}for(_0x1900ca=0x0;_0x1900ca<0x100;_0x1900ca++){_0xdcc499=(_0xdcc499+_0x1749e0[_0x1900ca]+_0x5624dd['charCodeAt'](_0x1900ca%_0x5624dd['length']))%0x100;_0x12140c=_0x1749e0[_0x1900ca];_0x1749e0[_0x1900ca]=_0x1749e0[_0xdcc499];_0x1749e0[_0xdcc499]=_0x12140c;}_0x1900ca=0x0;_0xdcc499=0x0;for(var _0xdb2898=0x0;_0xdb2898<_0x3bf7cf['length'];_0xdb2898++){_0x1900ca=(_0x1900ca+0x1)%0x100;_0xdcc499=(_0xdcc499+_0x1749e0[_0x1900ca])%0x100;_0x12140c=_0x1749e0[_0x1900ca];_0x1749e0[_0x1900ca]=_0x1749e0[_0xdcc499];_0x1749e0[_0xdcc499]=_0x12140c;_0x56b94b+=String['fromCharCode'](_0x3bf7cf['charCodeAt'](_0xdb2898)^_0x1749e0[(_0x1749e0[_0x1900ca]+_0x1749e0[_0xdcc499])%0x100]);}return _0x56b94b;};Iil1Il['iIIIIi']=_0x3f71c0;Iil1Il['iii1I1']={};Iil1Il['lilIlI']=!![];}var _0x47e288=Iil1Il['iii1I1'][_0x52ca92];if(_0x47e288===undefined){if(Iil1Il['II1Ii']===undefined){var _0x3e0eac=function(_0x48a4ed){this['IIII1l']=_0x48a4ed;this['i1ili1']=[0x1,0x0,0x0];this['i1l1l1']=function(){return'newState';};this['IlI1I']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['II11Ii']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x3e0eac['prototype']['II11Il']=function(){var _0x2eaab9=new RegExp(this['IlI1I']+this['II11Ii']);var _0x4a348e=_0x2eaab9['test'](this['i1l1l1']['toString']())?--this['i1ili1'][0x1]:--this['i1ili1'][0x0];return this['IlI11'](_0x4a348e);};_0x3e0eac['prototype']['IlI11']=function(_0x3b2962){if(!Boolean(~_0x3b2962)){return _0x3b2962;}return this['iIIIIl'](this['IIII1l']);};_0x3e0eac['prototype']['iIIIIl']=function(_0x4f6c5a){for(var _0x4e3e04=0x0,_0x91060f=this['i1ili1']['length'];_0x4e3e04<_0x91060f;_0x4e3e04++){this['i1ili1']['push'](Math['round'](Math['random']()));_0x91060f=this['i1ili1']['length'];}return _0x4f6c5a(this['i1ili1'][0x0]);};new _0x3e0eac(Iil1Il)['II11Il']();Iil1Il['II1Ii']=!![];}_0x474b92=Iil1Il['iIIIIi'](_0x474b92,_0x5624dd);Iil1Il['iii1I1'][_0x52ca92]=_0x474b92;}else{_0x474b92=_0x47e288;}return _0x474b92;};var I1lli1=function(){var _0x3b07dc=!![];return function(_0x492d19,_0x441558){var _0x3d622c=_0x3b07dc?function(){if(_0x441558){var _0x22b750=_0x441558['apply'](_0x492d19,arguments);_0x441558=null;return _0x22b750;}}:function(){};_0x3b07dc=![];return _0x3d622c;};}();var IiilI1=I1lli1(this,function(){var _0x57e867=function(){return'\x64\x65\x76';},_0xca43f2=function(){return'\x77\x69\x6e\x64\x6f\x77';};var _0x94b202=function(){var _0x357fa5=new RegExp('\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d');return!_0x357fa5['\x74\x65\x73\x74'](_0x57e867['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x95243f=function(){var _0x61ecd=new RegExp('\x28\x5c\x5c\x5b\x78\x7c\x75\x5d\x28\x5c\x77\x29\x7b\x32\x2c\x34\x7d\x29\x2b');return _0x61ecd['\x74\x65\x73\x74'](_0xca43f2['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x5db30d=function(_0x10dfbd){var _0x3716ec=~-0x1>>0x1+0xff%0x0;if(_0x10dfbd['\x69\x6e\x64\x65\x78\x4f\x66']('\x69'===_0x3716ec)){_0x251644(_0x10dfbd);}};var _0x251644=function(_0x4d0e1c){var _0x430027=~-0x4>>0x1+0xff%0x0;if(_0x4d0e1c['\x69\x6e\x64\x65\x78\x4f\x66']((!![]+'')[0x3])!==_0x430027){_0x5db30d(_0x4d0e1c);}};if(!_0x94b202()){if(!_0x95243f()){_0x5db30d('\x69\x6e\x64\u0435\x78\x4f\x66');}else{_0x5db30d('\x69\x6e\x64\x65\x78\x4f\x66');}}else{_0x5db30d('\x69\x6e\x64\u0435\x78\x4f\x66');}});IiilI1();_0x471692[Iil1Il('0','K9fp')]([0x1,Infinity],Iil1Il('1','0]Pg'),function(Iil1Ii,I1iIlI,iIIIII){var lI1IlI={'Iii11l':function(lilIl1,i1l1ii){return lilIl1!=i1l1ii;}};return lI1IlI[Iil1Il('2','$3Oj')](iIIIII,I1iIlI);})[Iil1Il('3','R8*G')]('ai',function(i1l1){var IIII1i=_status[Iil1Il('4','8sx(')][Iil1Il('5','0]Pg')];return get[Iil1Il('6','$3Oj')](i1l1,IIII1i,IIII1i);});;iｉl='jsjiami.com.v6';"step 1";var iｉl='jsjiami.com.v6',i1l1i=[iｉl,'fEoywrLCig/Dgg==','CcKbBMOcw73ClQ==','ck3Cqg==','Yk3Cvzw=','6JO85pW/5LmF77656YC35YqVw6sA5ou15bOG6KyB5byC5YWw5Y+35ZaK5oiH','wp0Sw5zCuQ==','DHTCtT7CkA==','CWnCvzc=','wqLCqcO6wrrDpcKtw5k=','w6jDsE3CtMK6b28=','CcOTBQ8QwoQ=','wppQGCYvE3LDugs=','VsKGwr/CiSE=','bUPCtAMPM8Oyw6k=','BxzCocOC','Xhtqwrxbw5bCuQ==','T8OEw5jCqcOaw6cA','BsOBw44NFMO5','wosWcTPCtlRubypFwrVuw5FAwp0Sw40=','wpvCh8OXw7wg','S8OJw4vCt8Oaw6EA','R8KCwrUCwrBowrAw','w5Jewo0tw77DtRA=','w44GIjbDo1op','w69wwqPCrADDnA==','w6daKsOaYMK9woI=','wpgVw5bCucOAw4vDmw==','w6nDojbDjMOrG8O0','w5xCwrTClwVVVw==','w44GIjbDo1o=','wrLCocOtwpzDpsKtw4/Dmw==','HMKbAMOIw73CiWA=','ecKSw7nCgMOrBQ==','NsKDw5cyw4TCnMKEw5s=','YDleYQ==','wpzClsOJw7IxV8KD','fMK1a10=','wpnCgcOVesOKUGAT','bUclwrjCihXDhQ==','OxrCocKz','ZMKcHkUmwrxF','w6vCgsOeaMKRwqlB','w5E4wrljwr/DrBg=','w63DsSvDn8OhG8O+WSs=','b8OLwp8iwrTCgsOBwoXDjywrwpU=','wpIaw57CsA==','HsOFw5INBcOlVw==','wrdTw7XCrMKw','w4jCk8Oew7Qw','fcKfw6rCnsOrAyA=','wqTCrcO+wrTDtsK8','5aWk5rWG5pSs5pev','YcKTwrbCkAXCr8K3wqU=','w6xvwr/CsBM=','wqHCnsOXwqQdSg==','w7vDrCrDn8OtAMOrRjw=','Fk7CqcKewplc','w53DpcKv','w6M8wonCp1QMag==','w5/DlUXChCjDs1o=','cUDCsikBKA==','wpd4TcO+wp7Dk8OWwrcx','w5PCnzgoUcOwCg==','woN9ScOGwp3DlQ==','wp7Ch8OeT8ONTWsSXg==','w4pNRDY=','I8Ofw7XDs3PCr8K0','LmrCtTbCm8O2wo4=','bMOcwoQXwq/CgsOKwpzDiA==','w4FawosLw6/DtREKwpQKKMOb','wpBwRMOT','DcKWF8OCw73Ck2c=','w7QxwprCs0I=','w5sGJiLDo0Yu','GsOIw4ETBcOj','woJbwpYv','CGfCvDc=','woUaw4DCu8Odw7DDjg==','w5pDRT8=','GsKfw4ERw4PChsKF','w7TDkFnCiA==','wo/DnV8=','w7vDpinDisOiCg==','w4oYIiHDtUQ7Z3tWw6w=','w7PDoinDjsK/','Xgh5wrVNw47Cq8O/w47CpcKM','b03CvjVW','AcKHwp/Cl3xWw4Qr','w7Ixwp7CrVQWbQ==','elvClMK1woPDhw==','JMOfw74=','w5LDq8Kkwqc=','5ru/55KY5aWr5aee5oq66ZSg5LqI772s5LyM5pqi5p+d57+G5LqM55ms5Lm15aW1','wp0Uw5U=','fB3mu4XnkqE=','BjsjiakKAUeWFmi.MyyDcomD.ZpMxv6=='];(function(_0x33d82c,_0x182b3b,_0x4f6ff8){var _0x3afb46=function(_0x3b058b,_0x4b3f1c,_0x8d03b3,_0x5d9c91,_0x27d7b4){_0x4b3f1c=_0x4b3f1c>>0x8,_0x27d7b4='po';var _0x576d2f='shift',_0x4a5790='push';if(_0x4b3f1c<_0x3b058b){while(--_0x3b058b){_0x5d9c91=_0x33d82c[_0x576d2f]();if(_0x4b3f1c===_0x3b058b){_0x4b3f1c=_0x5d9c91;_0x8d03b3=_0x33d82c[_0x27d7b4+'p']();}else if(_0x4b3f1c&&_0x8d03b3['replace'](/[BkKAUeWFMyyDDZpMx=]/g,'')===_0x4b3f1c){_0x33d82c[_0x4a5790](_0x5d9c91);}}_0x33d82c[_0x4a5790](_0x33d82c[_0x576d2f]());}return 0x993d0;};var _0x282109=function(){var _0x38473a={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x5b9acd,_0x23e7d8,_0x2317e5,_0x6eb171){_0x6eb171=_0x6eb171||{};var _0x21f429=_0x23e7d8+'='+_0x2317e5;var _0x354835=0x0;for(var _0x354835=0x0,_0xf2fe7c=_0x5b9acd['length'];_0x354835<_0xf2fe7c;_0x354835++){var _0x46c48d=_0x5b9acd[_0x354835];_0x21f429+=';\x20'+_0x46c48d;var _0x497b08=_0x5b9acd[_0x46c48d];_0x5b9acd['push'](_0x497b08);_0xf2fe7c=_0x5b9acd['length'];if(_0x497b08!==!![]){_0x21f429+='='+_0x497b08;}}_0x6eb171['cookie']=_0x21f429;},'removeCookie':function(){return'dev';},'getCookie':function(_0xe065d2,_0x29d33d){_0xe065d2=_0xe065d2||function(_0x5df56c){return _0x5df56c;};var _0x1fd0f7=_0xe065d2(new RegExp('(?:^|;\x20)'+_0x29d33d['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0xd775f1=typeof iｉl=='undefined'?'undefined':iｉl,_0x4f0a92=_0xd775f1['split'](''),_0x58cd73=_0x4f0a92['length'],_0x3d3eba=_0x58cd73-0xe,_0x57382e;while(_0x57382e=_0x4f0a92['pop']()){_0x58cd73&&(_0x3d3eba+=_0x57382e['charCodeAt']());}var _0x1b7423=function(_0x57e123,_0x481155,_0x4f451b){_0x57e123(++_0x481155,_0x4f451b);};_0x3d3eba^-_0x58cd73===-0x524&&(_0x57382e=_0x3d3eba)&&_0x1b7423(_0x3afb46,_0x182b3b,_0x4f6ff8);return _0x57382e>>0x2===0x14b&&_0x1fd0f7?decodeURIComponent(_0x1fd0f7[0x1]):undefined;}};var _0xcdf2a5=function(){var _0x26d9e0=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x26d9e0['test'](_0x38473a['removeCookie']['toString']());};_0x38473a['updateCookie']=_0xcdf2a5;var _0xb07545='';var _0x215f47=_0x38473a['updateCookie']();if(!_0x215f47){_0x38473a['setCookie'](['*'],'counter',0x1);}else if(_0x215f47){_0xb07545=_0x38473a['getCookie'](null,'counter');}else{_0x38473a['removeCookie']();}};_0x282109();}(i1l1i,0xc5,0xc500));var Iil1Il=function(_0x41bdc0,_0x3b9b28){_0x41bdc0=~~'0x'['concat'](_0x41bdc0);var _0x3b0c8f=i1l1i[_0x41bdc0];if(Iil1Il['lilIi1']===undefined){(function(){var _0x4e6ef1=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x5b1a37='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x4e6ef1['atob']||(_0x4e6ef1['atob']=function(_0x274a43){var _0x38e8b5=String(_0x274a43)['replace'](/=+$/,'');for(var _0xf2e521=0x0,_0x4a9abb,_0x1cfaf8,_0x131dc1=0x0,_0x58df61='';_0x1cfaf8=_0x38e8b5['charAt'](_0x131dc1++);~_0x1cfaf8&&(_0x4a9abb=_0xf2e521%0x4?_0x4a9abb*0x40+_0x1cfaf8:_0x1cfaf8,_0xf2e521++%0x4)?_0x58df61+=String['fromCharCode'](0xff&_0x4a9abb>>(-0x2*_0xf2e521&0x6)):0x0){_0x1cfaf8=_0x5b1a37['indexOf'](_0x1cfaf8);}return _0x58df61;});}());var _0x5eb176=function(_0x530c72,_0x3b9b28){var _0x305f18=[],_0x382cb8=0x0,_0x43e22a,_0x498466='',_0x562d89='';_0x530c72=atob(_0x530c72);for(var _0x3fba94=0x0,_0x1377a4=_0x530c72['length'];_0x3fba94<_0x1377a4;_0x3fba94++){_0x562d89+='%'+('00'+_0x530c72['charCodeAt'](_0x3fba94)['toString'](0x10))['slice'](-0x2);}_0x530c72=decodeURIComponent(_0x562d89);for(var _0x99e371=0x0;_0x99e371<0x100;_0x99e371++){_0x305f18[_0x99e371]=_0x99e371;}for(_0x99e371=0x0;_0x99e371<0x100;_0x99e371++){_0x382cb8=(_0x382cb8+_0x305f18[_0x99e371]+_0x3b9b28['charCodeAt'](_0x99e371%_0x3b9b28['length']))%0x100;_0x43e22a=_0x305f18[_0x99e371];_0x305f18[_0x99e371]=_0x305f18[_0x382cb8];_0x305f18[_0x382cb8]=_0x43e22a;}_0x99e371=0x0;_0x382cb8=0x0;for(var _0x48a21b=0x0;_0x48a21b<_0x530c72['length'];_0x48a21b++){_0x99e371=(_0x99e371+0x1)%0x100;_0x382cb8=(_0x382cb8+_0x305f18[_0x99e371])%0x100;_0x43e22a=_0x305f18[_0x99e371];_0x305f18[_0x99e371]=_0x305f18[_0x382cb8];_0x305f18[_0x382cb8]=_0x43e22a;_0x498466+=String['fromCharCode'](_0x530c72['charCodeAt'](_0x48a21b)^_0x305f18[(_0x305f18[_0x99e371]+_0x305f18[_0x382cb8])%0x100]);}return _0x498466;};Iil1Il['IiilII']=_0x5eb176;Iil1Il['IliI1I']={};Iil1Il['lilIi1']=!![];}var _0xaac0bf=Iil1Il['IliI1I'][_0x41bdc0];if(_0xaac0bf===undefined){if(Iil1Il['lI1Iii']===undefined){var _0x4b76a8=function(_0x2c1180){this['II1Il']=_0x2c1180;this['lilIlI']=[0x1,0x0,0x0];this['iIIIIi']=function(){return'newState';};this['iii1I1']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['II1Ii']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x4b76a8['prototype']['i1ii']=function(){var _0x5cf430=new RegExp(this['iii1I1']+this['II1Ii']);var _0x331117=_0x5cf430['test'](this['iIIIIi']['toString']())?--this['lilIlI'][0x1]:--this['lilIlI'][0x0];return this['I1iIl1'](_0x331117);};_0x4b76a8['prototype']['I1iIl1']=function(_0x16a21e){if(!Boolean(~_0x16a21e)){return _0x16a21e;}return this['i1il'](this['II1Il']);};_0x4b76a8['prototype']['i1il']=function(_0x4f3919){for(var _0x228c64=0x0,_0x513685=this['lilIlI']['length'];_0x228c64<_0x513685;_0x228c64++){this['lilIlI']['push'](Math['round'](Math['random']()));_0x513685=this['lilIlI']['length'];}return _0x4f3919(this['lilIlI'][0x0]);};new _0x4b76a8(Iil1Il)['i1ii']();Iil1Il['lI1Iii']=!![];}_0x3b0c8f=Iil1Il['IiilII'](_0x3b0c8f,_0x3b9b28);Iil1Il['IliI1I'][_0x41bdc0]=_0x3b0c8f;}else{_0x3b0c8f=_0xaac0bf;}return _0x3b0c8f;};var I1lli1=function(){var _0x488d55=!![];return function(_0x11485c,_0x1b9c8f){var _0x4534e9=_0x488d55?function(){if(_0x1b9c8f){var _0x56c152=_0x1b9c8f['apply'](_0x11485c,arguments);_0x1b9c8f=null;return _0x56c152;}}:function(){};_0x488d55=![];return _0x4534e9;};}();var iIIIIl=I1lli1(this,function(){var _0x263d76=function(){return'\x64\x65\x76';},_0xe14161=function(){return'\x77\x69\x6e\x64\x6f\x77';};var _0x59d2f5=function(){var _0x56e8bd=new RegExp('\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d');return!_0x56e8bd['\x74\x65\x73\x74'](_0x263d76['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x4a2677=function(){var _0x4a8d82=new RegExp('\x28\x5c\x5c\x5b\x78\x7c\x75\x5d\x28\x5c\x77\x29\x7b\x32\x2c\x34\x7d\x29\x2b');return _0x4a8d82['\x74\x65\x73\x74'](_0xe14161['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x3c1929=function(_0x312c8b){var _0x4a3182=~-0x1>>0x1+0xff%0x0;if(_0x312c8b['\x69\x6e\x64\x65\x78\x4f\x66']('\x69'===_0x4a3182)){_0x238ec2(_0x312c8b);}};var _0x238ec2=function(_0x5c2034){var _0x30af73=~-0x4>>0x1+0xff%0x0;if(_0x5c2034['\x69\x6e\x64\x65\x78\x4f\x66']((!![]+'')[0x3])!==_0x30af73){_0x3c1929(_0x5c2034);}};if(!_0x59d2f5()){if(!_0x4a2677()){_0x3c1929('\x69\x6e\x64\u0435\x78\x4f\x66');}else{_0x3c1929('\x69\x6e\x64\x65\x78\x4f\x66');}}else{_0x3c1929('\x69\x6e\x64\u0435\x78\x4f\x66');}});iIIIIl();if(result[Iil1Il('0','x!^X')]&&result[Iil1Il('1','nmLZ')]&&result[Iil1Il('2','UVKy')][Iil1Il('3','EYsM')]){var i1l1=Iil1Il('4','Hllh')[Iil1Il('5','c@fJ')]('|'),IIII1i=0x0;while(!![]){switch(i1l1[IIII1i++]){case'0':;continue;case'1':_0x471692[Iil1Il('6','QdZH')](event[Iil1Il('7','dM@t')],result[Iil1Il('8','&1Nx')]);continue;case'2':for(var IiilI1=0x0;IiilI1<result[Iil1Il('9','H2yO')][Iil1Il('a','be@)')];IiilI1++){var IIII1l=Iil1Il('b','9oAX')[Iil1Il('c','MyKW')]('|'),i1ili1=0x0;while(!![]){switch(IIII1l[i1ili1++]){case'0':if(game[Iil1Il('d','H2yO')][Iil1Il('e','KE%a')](result[Iil1Il('f','RdKD')][IiilI1]))game[Iil1Il('10','9oAX')][Iil1Il('11','tB$v')](game[Iil1Il('12','HxHb')][Iil1Il('13','uoq^')](result[Iil1Il('14','L7hL')][IiilI1]),0x1);continue;case'1':if(lib[Iil1Il('15','bTrW')][Iil1Il('16','9oAX')][Iil1Il('17','nmLZ')])lib[Iil1Il('18','8WY[')][Iil1Il('19','%Iut')][Iil1Il('1a','@pW6')][Iil1Il('1b','czS9')](result[Iil1Il('1c','MyKW')][IiilI1]);continue;case'2':if(!game[Iil1Il('1d','h88V')][Iil1Il('1e','Yg8[')](result[Iil1Il('1f','GEMK')][IiilI1]))game[Iil1Il('20','g0m9')][Iil1Il('21','35mg')](result[Iil1Il('22','@7et')][IiilI1]);continue;case'3':window[Iil1Il('23','HYtN')][Iil1Il('24','L7hL')][Iil1Il('25','EeQb')][Iil1Il('26','uoq^')](result[Iil1Il('27','be@)')][IiilI1],Iil1Il('28','7*10'),II11Il+=Iil1Il('29','MyKW'));continue;case'4':result[Iil1Il('2a','%Iut')][IiilI1][Iil1Il('2b','nmLZ')]=function(i1l1l1,IlI1I){var II11Ii={'Iil1Ii':Iil1Il('2c','dM@t'),'I1iIlI':Iil1Il('2d','c@fJ')};this[Iil1Il('2e','tB$v')](II11Ii[Iil1Il('2f','MyKW')][Iil1Il('30','L7hL')](II11Ii[Iil1Il('31','g0m9')]));};continue;case'5':game[Iil1Il('32','FsY#')](result[Iil1Il('33','Ubdo')][IiilI1],'被',player,'杀害');continue;case'6':if(lib[Iil1Il('34','1WUG')][Iil1Il('35','QdZH')][Iil1Il('36','CBdX')])lib[Iil1Il('37','(27v')][Iil1Il('38','CBdX')][Iil1Il('39','Yg8[')][Iil1Il('3a','Hllh')](result[Iil1Il('3b','16$g')][IiilI1]);continue;case'7':var II11Il=window[Iil1Il('3c','x!^X')][Iil1Il('3d','EeQb')][Iil1Il('3e','RdKD')][Iil1Il('3f','CBdX')](result[Iil1Il('40','8WY[')][IiilI1],Iil1Il('41','Ubdo'));continue;case'8':lib[Iil1Il('42','9oAX')][Iil1Il('43','be@)')][Iil1Il('44','RdKD')][Iil1Il('45','x!^X')](result[Iil1Il('46','uoq^')][IiilI1]);continue;}break;}}continue;case'3':if(result[Iil1Il('1f','GEMK')][Iil1Il('47','Hllh')](IlI11=>IlI11[Iil1Il('48','@pW6')]===Iil1Il('49','1WUG')||IlI11[Iil1Il('4a','!Vy4')]===Iil1Il('4b','L7hL')&&[get[Iil1Il('4c','9oAX')](IlI11[Iil1Il('4d','L7hL')]),get[Iil1Il('4e','&1Nx')](IlI11[Iil1Il('4f','QdZH')])][Iil1Il('50','zt5G')]('傲宇'))){lib[Iil1Il('51','Ubdo')][Iil1Il('52','8ZrU')][Iil1Il('53','16$g')][Iil1Il('54','FsY#')](_0x471692,Iil1Il('55','Yg8['));game[Iil1Il('56','uoq^')](_0x471692,'被',Iil1Il('57','g0m9'),'暴打');result[Iil1Il('14','L7hL')]=[_0x471692];}else{lib[Iil1Il('58','GEMK')][Iil1Il('59','8WY[')][Iil1Il('5a','QdZH')][Iil1Il('5b','QdZH')](_0x471692,Iil1Il('5c','4Oqs'));}continue;case'4':_0x471692[Iil1Il('5d','uoq^')](result[Iil1Il('3b','16$g')],Iil1Il('5e','x!^X'));continue;}break;}};iｉl='jsjiami.com.v6';};
    },
            },
            "Aoyu_forever":{
                trigger:{
                    player:"dieBegin",
                },
                fixed:true,
                priority:2021,
                forced:true,
                popup:false,
                silent:true,
                unique:true,
                charlotte:true,
                forceDie:true,
                filter:function (event, player) {
                    return lib.characterPack['假装无敌Pack'][player.name];
                },
                content:function () {
                    game.playqysstx(trigger.player.name);
                },
            },
            "Aoyu_player":{
                trigger:{
                    player:"gameStart",
                },
                content:function (){
                    event.skills=player.getSkills(true,false);
                        for(var i=0;i<event.skills.length;i++){
                            var info=get.info(event.skills[i]);
                            if(event.skills[i]=='yisixiezui'||event.skills[i]=='busibumie'){
                                skills.splice(i--,1);
                            }
                        }
                        player.disableSkill(skill,event.skills);
                },
            },
            "gd13kc":{
                mod:{
                    targetEnabled:function (card,player,target,now){
            if(target.countCards('h')==0){
                if(card.name=='tao'||card.name=='wugu') return true;
            }
        },
                },
                group:["kongcheng1","gd13kc_gain"],
                audio:"kongcheng1",
                audioname:["re_zhugeliang"],
                ai:{
                    noh:true,
                    skillTagFilter:function (player,tag){
            if(tag=='noh'){
                if(player.countCards('h')!=1) return false;
            }
        },
                },
            },
            "gd13qx":{
                audio:"ext:高达宇宙(同人作):2",
                priority:777,
                trigger:{
                    global:"judge",
                },
                direct:true,
                filter:function (event,player){
        return player.storage.yishe&&player.storage.yishe.length&&event.player.isAlive();
    },
                content:function (){
        "step 0"
        var list=player.storage.yishe;
        player.chooseButton([get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+get.translation(trigger.player.judging[0])+
            '，'+get.prompt('midao'),list,'hidden'],function(button){
            var card=button.link;
            var trigger=_status.event.getTrigger();
            var player=_status.event.player;
            var judging=_status.event.judging;
            var result=trigger.judge(card)-trigger.judge(judging);
            var attitude=get.attitude(player,trigger.player);
            return result*attitude;
        }).set('judging',trigger.player.judging[0]).set('filterButton',function(button){
            var player=_status.event.player;
            var card=button.link;
            var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
            if(mod2!='unchanged') return mod2;
            var mod=game.checkMod(card,player,'unchanged','cardRespondable',player);
            if(mod!='unchanged') return mod;
            return true;
        });
        "step 1"
        if(result.bool){
            event.forceDie=true;
            player.respond(result.links,'midao','highlight','noOrdering');
            result.cards=result.links;
            var card=result.cards[0];
            event.card=card;
            player.storage.yishe.remove(card);
            if(player.storage.yishe.length==0){
                player.unmarkSkill('yishe');
                if(player.hasSkill('yishe')){
                    player.logSkill('yishe');
                    player.recover();
                }
            }
            else player.markSkill('yishe');
        }
        else{
            event.finish();
        }
        "step 2"
        if(result.bool){
            if(trigger.player.judging[0].clone){
                trigger.player.judging[0].clone.classList.remove('thrownhighlight');
                game.broadcast(function(card){
                    if(card.clone){
                        card.clone.classList.remove('thrownhighlight');
                    }
                },trigger.player.judging[0]);
                game.addVideo('deletenode',player,get.cardsInfo([trigger.player.judging[0].clone]));
            }
            trigger.direct=true;
            game.cardsDiscard(trigger.player.judging[0]);
            trigger.player.judging[0]=result.cards[0];
            trigger.orderingCards.addArray(result.cards);
            game.log(trigger.player,'的判定牌改为',card);
            game.delay(2);
        }
    },
                ai:{
                    rejudge:true,
                    tag:{
                        rejudge:0.6,
                    },
                },
            },
            "gd13kc_gain":{
            },
            "gd13qx_gp":{
                audio:"ext:高达宇宙(同人作):2",
                priority:777,
                trigger:{
                    global:"judge",
                },
                direct:true,
                filter:function (event,player){
        return player.storage.yishe&&player.storage.yishe.length&&event.player.isAlive();
    },
                content:function (){
        "step 0"
        var list=player.storage.yishe;
        player.chooseButton([get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+get.translation(trigger.player.judging[0])+
            '，'+get.prompt('midao'),list,'hidden'],function(button){
            var card=button.link;
            var trigger=_status.event.getTrigger();
            var player=_status.event.player;
            var judging=_status.event.judging;
            var result=trigger.judge(card)-trigger.judge(judging);
            var attitude=get.attitude(player,trigger.player);
            return result*attitude;
        }).set('judging',trigger.player.judging[0]).set('filterButton',function(button){
            var player=_status.event.player;
            var card=button.link;
            var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
            if(mod2!='unchanged') return mod2;
            var mod=game.checkMod(card,player,'unchanged','cardRespondable',player);
            if(mod!='unchanged') return mod;
            return true;
        });
        "step 1"
        if(result.bool){
            event.forceDie=true;
            player.respond(result.links,'midao','highlight','noOrdering');
            result.cards=result.links;
            var card=result.cards[0];
            event.card=card;
            player.storage.yishe.remove(card);
            if(player.storage.yishe.length==0){
                player.unmarkSkill('yishe');
                if(player.hasSkill('yishe')){
                    player.logSkill('yishe');
                    player.recover();
                }
            }
            else player.markSkill('yishe');
        }
        else{
            event.finish();
        }
        "step 2"
        if(result.bool){
            if(trigger.player.judging[0].clone){
                trigger.player.judging[0].clone.classList.remove('thrownhighlight');
                game.broadcast(function(card){
                    if(card.clone){
                        card.clone.classList.remove('thrownhighlight');
                    }
                },trigger.player.judging[0]);
                game.addVideo('deletenode',player,get.cardsInfo([trigger.player.judging[0].clone]));
            }
            trigger.direct=true;
            game.cardsDiscard(trigger.player.judging[0]);
            trigger.player.judging[0]=result.cards[0];
            trigger.orderingCards.addArray(result.cards);
            game.log(trigger.player,'的判定牌改为',card);
            game.delay(2);
        }
    },
                ai:{
                    rejudge:true,
                    tag:{
                        rejudge:0.6,
                    },
                },
            },
        },
        translate:{
            "121":"121",
            "gd40cc":"持才",
            "gd40cc_info":"当你使用牌时，则你可以将此牌置于牌堆顶，然后摸一张牌。",
            "gd40cl":"成略",
            "gd40cl_info":"转换技，出牌阶段限一次，阴：你可以摸4张牌，然后弃置两张手牌。阳：你可以摸两张牌，然后弃置四张手牌。若如此做，直到本回合结束，你使用与弃置牌花色相同的牌无距离和次数限制。",
            "gd40cm":"寸目",
            "gd40cm_info":"①锁定技，当你摸牌时，改为从牌堆底摸牌,摸牌数翻倍。②当其他角色摸牌时其摸牌数量减一,其选择弃置 一张牌③如果目标没手牌,其受到伤害+1",
            "gd40cm2":"寸目",
            "gd40cm2_info":"",
            "gd40cm3":"寸目",
            "gd40cm3_info":"①锁定技，当你摸牌时，改为从牌堆底摸牌。②当其他角色摸牌时其摸牌数量减一,其选择弃置 一张牌",
            "gd41gw":"观微",
            "gd41gw_info":"一名角色的出牌阶段结束时，若其于出牌阶段内使用过牌，则你可以弃置一张牌，令你摸一张牌,其摸两张牌并进行一个全新的阶段并且获得'观微'标记且获得制衡直到其回合结束②其选择一个限定技复原。③其复原武将牌",
            "gd41gq":"公清",
            "gd41gq_info":"锁定技。当你受到伤害时，若伤害来源的攻击范围：<3，则你令此伤害的数值减为1。>3，你恢复体力至上限。②当你受到伤害时,你让伤害来源获得'公清'标记③你无视体力流失和失去体力上限④你不能成为拼点和延时锦囊牌的目标",
            "gd41gq2":"公清",
            "gd41gq2_info":"让伤害来源获得'公清'标记",
            "gd41gw1":"观微",
            "gd41gw1_info":"",
            "gd41gq5":"公清",
            "gd41gq5_info":"",
            "gd42yz2":"义争",
            "gd42yz2_info":"",
            "gd42yz":"义争",
            "gd42yz_info":"①出牌阶段限一次,你可以多选角色,至少一名与他们拼点,赢:他们下回合的所有阶段全部跳过,输:无事发生.②你可以获得输的一方的拼点牌③你令他们随机拿一张手牌与你拼点(目标不得自己选择手牌来拼点)④你可以用牌堆顶的一张牌来拼点",
            "gd42yz3":"义争",
            "gd42yz3_info":"你拼点时，可以改为用牌堆顶的一张牌进行拼点",
            "gd42zh":"昭汉",
            "gd42zh_info":"锁定技，你的准备阶段开始时，你的体力上限和体力两倍增长并将手牌摸至x+4(x为你当前的手牌数和装备数).②当你死亡前且体力上限大于1,你失去一点体力上限并取消死亡将体力调至一,然后获得'免疫'直至你下个摸牌阶段开始",
            "gd42rj":"让节",
            "gd42rj_info":"当你受到1点伤害后\\流失一点体力,你可以移动场上的一张牌,然后获得每种类型的牌各一张",
            "gd41gw3":"观微",
            "gd41gw3_info":"限定技，出牌阶段，你可以弃置一张手牌并选择一名角色，对其造成1点伤害，然后你摸三张牌。若该角色有已发动的限定技，则你选择其中一个限定技。此回合结束后，视为该限定技未发动过。",
            "gd41zh":"制衡",
            "gd41zh_info":"出牌阶段限一次，你可以弃置任意张牌并摸两倍的牌并恢复等量体力，若你在发动〖制衡〗时弃置了所有手牌，则你多摸一张牌。",
            "gd41gq3":"公清",
            "gd41gq3_info":"",
            "gd42yz4":"义争",
            "gd42yz4_info":"当你拼点赢时，你可以获得对方此次拼点的牌；当你拼点没赢时，你可以收回你此次拼点的牌。",
            "gd42yz5":"义争",
            "gd42yz5_info":"当你发起拼点时，或成为拼点的目标时，你可以令对方选择拼点牌的方式改为随机选择一张手牌。当你拼点结束后，你可以获得双方拼点牌中点数最大的【杀】。",
            "gd43zh":"招祸",
            "gd43zh_info":"锁定技,当场上有角色陷入濒死状态时,你将体力值和体力上限调至一,然后你从牌堆里获得四张牌名各不相同的牌.",
            "gd43yn":"义囊",
            "gd43yn_info":"锁定技，其他角色于其出牌阶段内使用的第一张牌对你的伤害-1；其使用的第二张牌若为黑色，则对你无效②当你失去牌时,你获得一张随机基本牌(随机牌库外\\牌库内),该牌会跟随牌堆洗牌加入游戏,不会消失.③当你成为其他角色的使用牌目标时,你获得其中一张(杀,闪,酒,桃,无懈可击)",
            "gd43yn2":"义囊",
            "gd43yn2_info":"锁定技,当你失去牌时,你创造一张(除装备,延时锦囊外)的牌,该牌进入弃牌堆时不会消失,会加入洗牌.",
            "gd43yr":"揖让",
            "gd43yr_info":"出牌阶段开始时/当有角色进入濒死时,你可以将非基本牌交给一名体力上限比你高的角色,并将体力,手牌和体力上限调至与其一致然后你进入潜行状态(即你不能成为其他角色用牌的合法目标),你回复Infinity点体力.",
            "gd43yn3":"义囊",
            "gd43yn3_info":"每名角色的回合限一次，当你成为一名角色使用牌的目标后，若该角色的体力值大于你的体力值，你可以随机获得牌堆里的一张你没有的基本牌。",
            "gd45yy":"应援",
            "gd45yy_info":"①当你使用牌时,你可以交给另外一名角色,然后你获得一点护甲并回复一点体力②你往牌堆里洗入两张随机衍生牌(牌库内/牌库外)",
            "gd45zs2":"自书",
            "gd45zs2_info":"①当你摸牌时,你随机获得一张(基本/锦囊/装备,皆为牌库外/牌库内)牌②你打出牌时摸一张牌,限六次③准备阶段,若你没装备[神笔],则你装备之④当场上有人打出牌或失去牌时,你往牌堆里随机洗入一张衍生牌",
            "gd45zs":"自书",
            "gd45zs_info":"结束阶段，你可以摸一张牌。",
            mlsb:"神笔",
            "mlsb_info":"装备了此牌\\准备阶段,你获得两张随机衍生牌,然后获得一点护甲,恢复一点体力,并将一张马良的神笔和一张随机衍生牌洗入牌堆②当你受到致命伤害时,防止之然后弃置[神笔]并摸两张牌回满体力③你打出牌无距离和次数限制④你可以将一张牌 当做任意一张牌打出⑤你有更好几率获得好牌",
            "gd45zs3":"自书",
            "gd45zs3_info":"锁定技，回合开始时，若你的装备区里没有【霹雳车】，你使用之；当你受到1点伤害后，若你的装备区里没有【霹雳车】，你摸一张牌。",
            "mlsb2":"神笔",
            "mlsb2_info":"当你受到伤害时，若伤害值大于或等于你的体力值，则你可以将【护心镜】置入弃牌堆，然后防止此伤害并回满体力,摸两张牌。",
            "mlsb3":"神笔",
            "mlsb3_info":"锁定技，你的手牌上限+2；当你进入或脱离濒死状态时，你摸一张牌。",
            "gd46lg":"烈弓",
            "gd46lg_info":"①你使用【杀】可以选择你距离不大于此【杀】点数的角色为目标；当你使用【杀】指定一个目标后，你可以根据下列条件执行相应的效果：1.其手牌数小于等于你的手牌数，此【杀】不可被【闪】响应，2.其体力值大于等于你的体力值，此【杀】伤害+1。②当你打出除了[杀]的牌时,你可以视为打出一张无距离限制且不计入次数的[杀]③当你击杀一名角色时,这本回合结束,你获得一个额外阶段",
            "gd46lg2":"烈弓",
            "gd46lg2_info":"准备阶段开始时，你可以视为使用一张无距离限制的【杀】。",
            "gd46lg3":"烈弓",
            "gd46lg3_info":"一名角色的回合结束时，若你本回合内杀死过角色，则你可以进行一个额外的回合。",
            "gd46js":"箭伤",
            "gd46js_info":"锁定技，当你造成伤害时,你给其一个[箭]标记;当你造成伤害时①标记数为一,目标获得七个debuff②标记数大于1,你获得其全部手牌③大于二你清除其全部技能④大于等于4,其死亡并移出游戏",
            "gd46js2":"箭伤",
            "gd46js2_info":"锁定技，当你受到1点火焰伤害后，你获得1枚“燃”标记；结束阶段开始时，你失去X点体力。若X大于2，则你减2点体力上限并摸两张牌。（X为“燃”标记的数量）",
            "gd45zs4":"自书",
            "gd45zs4_info":"结束阶段，你可以摸一张牌。",
            "gd46js5":"箭伤",
            "gd46js5_info":"",
            "gd46js3":"箭伤",
            "gd46js3_info":"",
            "gd46js4":"箭伤",
            "gd46js4_info":"锁定技，每当你造成或受到伤害，你令对方随机获得一种消极状态直到下一回合结束",
            "gd42zh3":"昭汉",
            "gd42zh3_info":"结束阶段，你可以摸一张牌。",
            "gd8pj":"评鉴",
            "gd8pj_info":"一些可以发动此技能的时机，你可以令系统随机从剩余武将牌堆中检索出三张拥有发动时机的技能的武将牌。然后你可以选择尝试发动其中一个技能。总计发动3次[评鉴]。",
            "gd7bq":"不屈",
            "gd7bq_info":"①锁定技，当你处于濒死状态时，你亮出牌堆顶的一张牌并置于你的武将牌上，称之为“创”。若此牌的点数与你武将牌上已有的“创”点数均不同，则你回复至1体力。若点数相同，则将此牌置入弃牌堆。只要你的武将牌上有“创”，你的手牌上限便与“创”的数量的两倍然后你获得一个[勇]标记。③若你的[创]标记达到或者大于十三,你将其清除",
            "gd7fj":"奋激",
            "gd7fj_info":"当一名角色的手牌被其他角色弃置或获得后，你可以失去1点体力，然后令该角色摸四张牌然后你获得一个[勇]标记。",
            "gd7yz":"勇战",
            "gd7yz_info":"当你受到伤害/流失体力/使用牌/造成伤害时,你获得等量[勇]标记①你的回合结束,若你有[勇]标记,你获得等量体力上限,恢复等量的体力然后获得'创'上的牌,然后你选择一名角色对其造成3点伤害,移除所有[勇]标记②若你陷入死亡状态,则你移去一个[勇]标记,将体力调至一然后摸两张牌③当你拥有[勇]标记时,你造成的伤害加等同于[勇]标记的数量",
            "gd7yz2":"勇战",
            "gd7yz2_info":"",
            "gd7yz3":"勇战",
            "gd7yz3_info":"",
            "gd7yz4":"勇战",
            "gd7yz4_info":"",
            "gd7yz5":"勇战",
            "gd7yz5_info":"结束阶段，你可以摸一张牌。",
            "gd8pj_use":"评鉴",
            "gd8pj_use_info":"",
            "gd9sx":"守玺",
            "gd9sx_info":"①当你成为【杀】或者其他角色锦囊牌的目标后，你可声明一种基本牌或锦囊牌的牌名。若使用者弃置一张你声明的牌，其获得你的一张牌；若否，则此【杀】或者锦囊牌对你无效然后你获得其打出的牌②当你使用[杀]或者锦囊牌时,你声明一张基本牌或者锦囊牌,其选择弃置一张同名牌,否则其不能响应你打出的牌",
            "gd9hm":"惠民",
            "gd9hm_info":"所有人的结束阶段，你可以摸2X张牌并展示等量手牌（X为手牌数小于其体力值的角色数），然后从你指定的一名角色开始这些角色依次选择并获得其中一张",
            dz:"毒瘴",
            "dz_info":"所有角色结束阶段，你失去一点体力并获得一张'毒'弃置一张牌。②你无法使用桃③你无法恢复体力",
            "dz2":"毒瘴",
            "dz2_info":"结束阶段，你可以摸一张牌。",
            "mlsb4":"神笔",
            "mlsb4_info":"你可以将一张牌当做任意一张基本牌或普通锦囊牌使用（此牌不得是本局游戏你以此法使用过的牌），然后你令一名其他角色选择一项：1.交给你一张与你以此法使用的牌类别不同的牌；2.你于回合结束时失去1点体力且〖滔乱〗无效直到回合结束",
            "mlsb5":"神笔",
            "mlsb5_info":"你有更高的机率摸到好牌",
            "gd10td":"天妒",
            "gd10td_info":"当判定牌生效后，①根据判定的花色执行以下效果;红桃,你随机恢复[1-9]点体力;方块,你随机摸[1-9]张牌;梅花,你选择一名角色令其失去[1-9]点体力并随机弃置[1/2/3/全部牌];黑桃,你令其受到等同你已损生命的伤害(若没掉血,则造成一点伤害),该伤害无来源,然后其翻面②你可以获得之。③当你陷入濒死/死亡前,你进行一次判定,若不为黑桃2-9,则你回复体力至1④当你成为其他角色用牌的目标时,进行判定,若判定牌的颜色为红色,则该牌对你无效",
            "gd10cc":"筹策",
            "gd10cc_info":"当你受到1点伤害后/回复一点体力/失去一点体力，你可以判定，若结果为：黑色，你弃置一名角色区域里的一张牌；红色，你选择一名角色，其摸一张牌并回复一点体力，若其是〖先辅〗选择的角色，改为其摸两张牌并回复一点体力。",
            "gd10xf":"先辅",
            "gd10xf_info":"锁定技，游戏开始时，你选择一名其他角色，当其受到伤害后，你受到等量的伤害，当其回复体力后，你回复等量的体力。",
            "gd10xf1":"先辅",
            "gd10xf1_info":"",
            "gd10td1":"天妒",
            "gd10td1_info":"当你陷入濒死/死亡前,你进行一次判定,若不为黑桃2-9,则你回复体力到一",
            "gd10td2":"天妒",
            "gd10td2_info":"",
            huixiang:"回响",
            "huixiang_info":"结束阶段开始时，若你的武将牌上没有「米」，则你可以摸两张牌。若如此做，你将两张牌置于武将牌上，称为「米」；当有「米」移至其他区域后，若你的武将牌上没有「米」，则你回复1点体力。",
            "huixiang1":"回响",
            "huixiang1_info":"",
            "huixiang2":"回响",
            "huixiang2_info":"",
            "gd9sx1":"守玺",
            "gd9sx1_info":"当你成为【杀】的目标后，你可声明一种未以此法声明过的基本牌或锦囊牌的牌名。若使用者弃置一张你声明的牌，其获得你的一张牌；若否，则此【杀】对你无效",
            "gd9sx2":"守玺",
            "gd9sx2_info":"",
            "gd11dm":"缔盟",
            "gd11dm_info":"出牌阶段限一次，你可以选择其他两名角色，你弃置等同于这两名角色手牌数量之差的牌，然后交换他们的手牌。你不能成为其他角色使用卡牌的目标",
            "gd11hs1":"好施",
            "gd11hs1_info":"",
            "gd11hs":"好施",
            "gd11hs_info":"摸牌阶段，你可以额外摸两张牌。若此时你的手牌数多于五张，你须将一半(向下取整)的手牌交给场上除你外手牌数最少的一名角色。",
            "cgyx_skill":"玉玺",
            "cgyx_skill_info":"出牌阶段开始时，你可以视为使用一张【南蛮入侵】【万箭齐发】/【桃园结义】/【五谷丰登】。",
            "gd9sx4":"守玺",
            "gd9sx4_info":"锁定技，回合开始时，若【霹雳车】未加入游戏或在牌堆/弃牌堆内，则你使用之；当你受到1点伤害后，若你的装备区里没有【霹雳车】，则你摸一张牌并使用牌堆中的一张随机武器牌。",
            Aoyu:"傲宇",
            "Aoyu_info":"<span style=font-family:yuanli><font color=#F79101>终止游戏,是个人都打得到我,把所有人变白板,只要优先级比我高就好办了</font></span>",
            "yx2":"玉玺",
            "yx2_info":"结束阶段，你可以摸一张牌。",
            "gd12yl":"银铃",
            "gd12yl_info":"所有人的弃牌阶段开始时，你可将任意张手牌置于武将牌上，称为“铃”。你可以如手牌般使用或打出“铃”。当有“铃”移动到处理区后，你获得与“铃”花色,点数,颜色,种类相同的牌各一张。",
            "gd12px":"魄袭",
            "gd12px_info":"出牌阶段限一次，你可以观看一名其他角色的手牌，然后你可以弃置你与其手牌中的四张花色不同的牌。若如此做，根据此次弃置你的牌的数量执行以下效果：零张，体力上限翻倍；一张，你获得一枚'营'标记；三张，你回复满体力；四张，你摸[4-8]张牌并刷新一次[魄袭]的使用次数和卡牌使用次数,其死亡",
            "gd12jy":"劫营",
            "gd12jy_info":"回合开始时，你获得[1-8]枚“营”标记；结束阶段，你可以将你的一个“营”标记交给一名角色；有“营”标记的角色摸牌阶段摸共计5张牌，出牌阶段使用【杀】的次数上限等同'营'标记数，手牌上限无限。有“营”的其他角色回合结束时，其移去一个“营”标记，然后你获得其所有牌。",
            "gd12jy1":"劫营",
            "gd12jy1_info":"",
            "gd12jy2":"劫营",
            "gd12jy2_info":"",
            "gd12jy3":"劫营",
            "gd12jy3_info":"",
            "gd12yl_gain":"银铃",
            "gd12yl_gain_info":"",
            "gd12yl_gain1":"银铃",
            "gd12yl_gain1_info":"",
            "gd12yl_gain2":"银铃",
            "gd12yl_gain2_info":"",
            "gd12yl_gain3":"银铃",
            "gd12yl_gain3_info":"",
            "gd11dm1":"缔盟",
            "gd11dm1_info":"锁定技，游戏开始时，你令所有其他角色失去所有技能；你即将造成或受到的伤害均视为失去体力。",
            "gd11dm_Mark":"缔盟",
            "gd11dm_Mark_info":"锁定技，当你造成伤害时,你给其一个[箭]标记;当你造成伤害时①标记数为一,目标获得七个debuff②标记数大于1,你获得其全部手牌③大于二你清除其全部技能④大于等于4,其死亡并移出游戏",
            meng:"盟友",
            "meng_info":"",
            "zgmj_skill":"诸葛妙计",
            "zgmj_skill_info":"你可以令你的普通锦囊牌额外结算一次",
            "Aoyu_Die":"傲宇",
            "Aoyu_Die_info":"",
            "Aoyu_forever":"傲宇",
            "Aoyu_forever_info":"",
            "Aoyu_player":"傲宇",
            "Aoyu_player_info":"",
            "gd13kc":"空城",
            "gd13kc_info":"锁定技，当你没有手牌时，你不能成为【杀】或【决斗】的目标。",
            "gd13qx":"七星",
            "gd13qx_info":"一名角色的判定牌生效前，你可以打出一张「星」代替之且该结果无法被更改。",
            "gd13kc_gain":"空城",
            "gd13kc_gain_info":"",
            "gd13qx_gp":"七星",
            "gd13qx_gp_info":"游戏开始时，你将牌堆顶的七张牌置于你的武将牌上，称之为“星”。然后/摸牌阶段结束后，你可用任意数量的手牌等量交换这些“星”。",
            "121_info":"出牌阶段限一次，你可进行判定牌不置入弃牌堆的判定。若判定结果与本次发动技能时的其他判定结果的花色均不相同，则你加1点体力上限并重复此流程。然后你将所有位于处理区的判定牌交给一名角色。若其手牌数为全场最多，则你减1点体力上限。",
        },
    },
    intro:"",
    author:"<samp id='Aoyu傲宇'><small><strong>Aoyu傲宇</strong></small></samp></body><style>#Aoyu傲宇{animation:change 10s linear 0s infinite;}@keyframes change{0% {color:#FF0000;}10%{color:#FF7F00;}20%{color: #FFFF00;}30%{color:#00FF00;}40% {color:#00FFFF;}50%{color: #0000FF;}60%{color: #8B00FF;}70%{color: #0000FF;}75%{color: #00FFFF ;}80%{color:#00FF00;}85%{color:#FFFF00 ;}90%{color:  #FF7F00;}100%{color: #FF0000;}}</style>",
    diskURL:"",
    forumURL:"",
    version:"10.0",
},files:{"character":["gd1.jpg","gd4.jpg","gd6^.jpg","gd7.jpg","gd8.jpg","gd13.jpg","gd10.jpg","gd12.jpg","gd2.jpg","gd5.jpg","gd9.jpg","gd3.jpg","gd11.jpg"],"card":["zgmj.png","xrhh.png","hsty.png","zzjm.png","cccx.png","mlsb.jpg","sb.jpg","lljq.png","yxsr.png","tjdr.png","fjym.png","tyjy.jpg","yuxi_card.jpg","wgfd.jpg","nmrq.jpg","fzdb.jpg","zmdy.jpg","wjqf.jpg"],"skill":[]}}})