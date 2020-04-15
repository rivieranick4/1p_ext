class AsyncCore{
    inicializar(){
        this.id = 0;
        this.temp = null;
        this.tasks_Plantilla=[
            function(nucleo,param){
                
            }
        ];
        this.cons = [];
        this.locales = [];
        this.morevalue = 0;
    }

    constructor(task,rate = 1){
        this.tasks = task;
        this.rate = rate;
        this.inits = [];
        this.inicializar();
        var d = new Date();
        this._time = d.getTime(); 
    }

    init() {
        try{
            var loca = this;
            if(this.tasks.length===0) return;
            if(this._end) return;
            
            if(!this.cons[this.id])this.cons[this.id] = 0;
            if(this.tasks.length>this.id) this.tasks[this.id](this,this.temp);
            //this.cons[this.id]++;

            setTimeout( function(){
                loca.init();
            }, this.rate + this.morevalue);
            this.morevalue = 0;
        }catch(e){
            console.error("ERROR: "+e);
            setTimeout( function(){
                loca.init();
            }, 5000);
        }
    }
    //Sigiente parte
    next(param){
        this.id++; 
        this.temp = param;
        var d = new Date();
        this._time = d.getTime();  
    }

    get time(){  
        var d = new Date();
        return d.getTime() - this._time;
    }

    reload(more = 0){
        this.inicializar();
        this.morevalue = more;
    }

    end(){
        this._end =true;
    }

    get one() {
        var re = this.cons[this.id] == 0;
        this.cons[this.id]++;
        return re;
    }
    get load() {
        var ini = this.inits[this.id]==null;
        this.inits[this.id] = "init";
        return  ini;
    }
    set(name,value){
        if(!this.locales[this.id]) this.locales[this.id] = [];
        this.locales[this.id][name] = value;
    }

    get(name,clear=false){
        if(!this.locales[this.id])return null;
        if(!this.locales[this.id][name])return null;
        var value = this.locales[this.id][name];
        if(clear) this.locales[this.id][name]=null;
        return value;
    }
    more(time){
        this.morevalue = time;
    }
}

class DomComment{
    constructor(li, IsReply = false){
        this.dom = li;
        this.id = this.dom.getAttribute("id");
        this.IsLoad = false;
        this.IsReply = IsReply;
    }
    load = ()=>{
        if(this.IsLoad) return;

        this.url = this.dom.querySelector("img").src;
        this.name = this.dom.querySelector("cite.user").textContent;
        this.content = this.dom.querySelector(".comment-block .comment-content");
        this.contentWidth = this.dom.querySelector(".comment-block .comment-header").scrollWidth;
        this.replys = [];

        var list = this.dom.querySelectorAll("li.comment");
        for (let index = 0; index < list.length; index++) {
            this.replys.push(new DomComment(list[index]));
        }

        this.IsLoad = true;
    }

}


class DomManager{

    constructor(){
        this.IsHome = document.querySelector(".blog-posts")==null? true: false;

        this._ForComments = [];

        this.EventLoadPage = new Delegate();
        this.EventForComments = new Delegate();

        this.Init();
    }

    Init = ()=>{
        window.addEventListener("load", ()=>{
            this.EventLoadPage.run(this);
        });


    };


    GetPostContent=()=>{
        document.querySelector(".post-body");
    };
    
    GetAllComments=(fun=null)=>{
        var array = [];
        var list = document.querySelectorAll("li.comment");
        for (let index = 0; index < list.length; index++) {
            var ite = new DomComment(list[index]);
            array.push(ite);
            if(fun!==null) fun(ite); 
        }
        return array; 
    }


}

(()=>{
    var YMagic = window.YMagic;
    var version = 0.14;
    var _1PNews_Setting_Setting =  YMagic.GetInfo("1PNews");
    var _path = YMagic.GetValueInConfig("path");

    if(_1PNews_Setting_Setting == null || _1PNews_Setting_Setting.version != version){
        YMagic.UpdateInfo(_path+"/1PNews.js", {
            version : version,
            name: "1Peluchinga News",
            key: "_1PNews",
            autor: "nickriviera26"
        });
    }

    const Mantenimiento = ()=>{

        YMagic.DeleteHTML(document.querySelector(".centered-top-container"));
        YMagic.DeleteHTML(document.querySelector(".status-msg-body"));
        YMagic.DeleteHTML(document.querySelector("footer"));
        var css = `

        `;
        var html = `
            <div class="post-outer clear-page">
                <div class="post">
                
                
                <h3 class="post-title entry-title">
                    Mantenimiento...
                </h3>
                
                
                <div class="post-body entry-content float-container">
                    Debido a un desafortunado inconveniente,<b> nuestra servidor principal a quedado totalmente fuera de servicio</b>, les rogamos paciencia que estamos haciendo lo posible para volver al servicio.
                </div>
                
                </div>
            </div>
        `;

        YMagic.AddHTML(document.querySelector(".post-outer-container"), html);
    };

    var blacklist = [
        {
            ip: 588665600,
            msg: "Te encontre!"
        }
    ];

    class _1PNews {

        constructor(){
            YMagic.store.load("_1PNews");
            
            this.DomManager = new DomManager();

            if(YMagic.store._1PNews.hasOwnProperty("RicardoMode")) this.RicardoMode(true);
            
            //this.GoogleDetected();
            this.BlackList();
            
        }

        GoogleDetected=()=>{
            const regex = /\/publicacion\/.+/;
            const result = regex.exec(location.pathname);
            if(result!=null){
                window.locationf="http://www.cristalab.com";
                Mantenimiento();
            }
        }

        BlackList = ()=>{
            (async()=>{
                var css = `
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                .b2342 {
                    margin: 10px;
                    background: #2f4a94;
                    padding: 15px 15px;
                    border-radius: 10px;
                }
                
                .b2342 span {
                    font-weight: 100;
                    font-size: 32px;
                }
                `;
                const result = await YMagic.Request("https://www.cloudflare.com/cdn-cgi/trace");
                var ip = /ip\=([\d]{0,3})\.([\d]{0,3})\.([\d]{0,3})\.([\d]{0,3})/g.exec(result);
                if(ip!=null){
                    ip = parseInt(ip[1]) * parseInt(ip[2]) * parseInt(ip[3]) * parseInt(ip[4]);
                    for (let index = 0; index < blacklist.length; index++) {
                        if(ip === blacklist[index].ip){
                            YMagic.AddCSS(css);
                            document.body.innerHTML = `<div class="b2342"><span>`+blacklist[index].msg+`<span><div>`;
                        }
                    }
                }
            })();
        }


        RicardoMode=(state = false)=>{
            var store = YMagic.store;
            if(state){
                if(this._RicardoMode!==undefined) return;
                this._RicardoMode = 1;

                if(!store._1PNews.RicardoMode){
                    store._1PNews.RicardoMode = true;
                    store._1PNews.save();
                }
                
                var getRicardo = ()=>{
                    var n = parseInt (Math.random()*8);
                    switch(n){
                        case 0: return "https://media1.tenor.com/images/f780da69888ee37094de8347a83e9cd0/tenor.gif?itemid=14551719";
                        case 1: return "https://steamuserimages-a.akamaihd.net/ugc/960853363633424461/4C0E46016EE7ABF8440FCA7B9B5AB60EF55AA969/";
                        case 2: return "https://media1.tenor.com/images/e21ad8d79e93bf291cd16ae6ab276e3f/tenor.gif?itemid=14164395";
                        case 3: return "http://pa1.narvii.com/7093/cd9c47bdeb36f5b6757876b76fa1c68849c3a4b5r1-320-240_00.gif";
                        case 4: return "https://media.giphy.com/media/kD6WDs6oYVkuHo4g4O/giphy.gif";
                        case 5: return "https://steamuserimages-a.akamaihd.net/ugc/964230781514942065/FE9F791B98D34567011D0C1682325EE5B2CF7574/";
                        case 6: return "https://photos1.iorbix.com/00/00/00/00/03/20/27/63/Ricardo-Milos---8lJuAy0pn-b.gif";
                        case 7: return "https://i.ppy.sh/6c164f1889fb5314b42379fe528b64b3b0795337/68747470733a2f2f6a2e676966732e636f6d2f794e725756372e676966";
                        case 8: return "https://steamuserimages-a.akamaihd.net/ugc/965357309292292959/A60A8305C54B4262AB3515566BA58F239E18805A/";
                    }
                }
                var apply_all_images = (fun)=>{
                    var list = document.querySelectorAll("img");
                    list.forEach(fun);
                }

                var task = [
                    (n,p)=>{
                        var list = document.querySelectorAll("img");
                        apply_all_images(i=>{
                            if(!i.getAttribute("old_src")){
                                i.setAttribute("old_src",i.src);
                                i.src = getRicardo();
                            }
                        });

                        if(this._RicardoMode === 2){
                            delete this._RicardoMode;
                            apply_all_images(i=>{
                                if(i.getAttribute("old_src")){
                                    i.src = i.getAttribute("old_src");
                                    i.removeAttribute("old_src");
                                }
                            });

                            n.end();
                        }
                    }
                ];
                new AsyncCore(task,500).init();
            }else{
                this._RicardoMode = 2;
                delete store._1PNews.RicardoMode;
                store._1PNews.save();
            }
            return state?"(NO HOMO)":false;
        }
    }

    window._1PNews = new _1PNews();

    YMagic.NotifyLoaded("_1PNews");
})();