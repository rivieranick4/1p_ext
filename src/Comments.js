(()=>{

    var YMagic = window.YMagic;
    var version = 0.15;
    var CommentBasic_Setting =  YMagic.GetInfo("_Comments");

    if(CommentBasic_Setting == null || CommentBasic_Setting.version != version){
        YMagic.UpdateInfo("https://raw.githubusercontent.com/rivieranick4/1p_ext/master/Comments.js", {
            version : version,
            name: "Comentarios",
            key: "_Comments",
            requiered: ["_1PNews"],
            autor: "nickriviera26",
            descripcion: "Permite elementos incrustados en los comentarios."
        });
    }


    var css = `
        .comment-imagen-container {
            /* min-width: 100%; */
            max-height: 3000px;
            overflow: hidden;
            margin: 10px 0px;
        }
        .comment-youtube-container {
            margin: 10px 0px;
        }
        img.comment-imagen {
            max-width: 100%;
            min-width: 100%;
        }
    `;

    var DomBasic = null;

    var Regex_image = /\[img\](https?\:\/\/[A-z\d\!\*\'\(\)\;\:\@\=\$\,\/\?\#\-\_\.\~]{5,256})\[\/img\]/g;

    var AddImage = (comment)=>{
        var img = `<div class="comment-imagen-container"><img class="comment-imagen" src="//images.weserv.nl/?url=$1&fit=inside&we&output=gif&n=-1&w=`+comment.contentWidth+`"/></div>`;
        comment.content.innerHTML = comment.content.innerHTML.replace(Regex_image,img);
    };

    var Regex_youtube = /\[youtube\]([0-9A-Za-z_-]{10}[048AEIMQUYcgkosw])\[\/youtube\]/g;

    var AddYouTube = (comment)=>{
        var iframe = `<iframe class="comment-youtube-container" width="`+comment.contentWidth+`" height="`+(comment.contentWidth*0.5625)+`" 
        src="https://www.youtube.com/embed/$1" 
        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

        //svar iframe = `<iframe class="comment-iframe" src="$1" width="`+comment.contentWidth+`" height="`+(comment.contentWidth*0.5625)+`"/>`;
        comment.content.innerHTML = comment.content.innerHTML.replace(Regex_youtube,iframe);
    };

    class _Comments{
        constructor(){
            YMagic.AddCSS(css);

            DomBasic = window._1PNews.DomManager;
            this.Init();
        }
        Init =  ()=>{
            DomBasic.GetAllComments((comment)=>{
                comment.load();
                AddImage(comment);
                AddYouTube(comment);
            });
        };
    }

    var start = ()=>{
        window._Comments = new _Comments();
        YMagic.NotifyLoaded("_Comments");
    };

    if(YMagic.IsLoaded("_1PNews")){
        start();
    }else{
        YMagic.LoadedModulo.add((key)=>{
            if(key=="_1PNews") start();
        });
    }


})();