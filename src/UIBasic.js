

(()=>{
    var YMagic = window.YMagic;
    var version = 0.33;
    var UIBasic_Setting =  YMagic.GetInfo("UIBasic");

    if(UIBasic_Setting == null || UIBasic_Setting.version != version){
        YMagic.UpdateInfo("https://rivieranick4.github.io/1p_ext/src/UIBasic.js", {
            version : version,
            name: "Administrador de UI",
            key: "UIBasic",
            requiered: ["LibBasic"],
            autor: "nickriviera26",
            descripcion: "Motor de la interfaz gráfica (Sí borran esto no podran volver a entrar a este menu)."
        });
    }

    
    (()=>{
        var h1 = document.querySelector(".header-titulo h1");
        var FistDown = 0;
     
        h1.addEventListener("mousedown", ()=>{
            var d = new Date();
            FistDown = d.getTime();
        });
        h1.addEventListener("mouseup", ()=>{
            var d = new Date();
            if(d.getTime()-FistDown>500) YMagic.get("UIBasic").Show();
        });
        h1.addEventListener("touchstart", ()=>{
            var d = new Date();
            FistDown = d.getTime();
        });
        h1.addEventListener("touchend", ()=>{
            var d = new Date();
            if(d.getTime()-FistDown>500) YMagic.get("UIBasic").Show();
        });
    })();

    var UIBasicHTML = `
        <div class="UIBasicFondo">
        </div>
        <div class="UIBasic-Content">
            <div class="UIBasic">
                <div>
                    <span class="boton cerrar">x</span>
                    <h3>1Peluchinga News</h3>
                </div>
                <div page="main">
                    <div>
                    Desde este lugar van a poder instalar complementos a la pagina, los básicos ya vienen pre instalados, además los pueden ver y editar a gusto y en caso de que no les guste alguno, lo borran o lo desactivan y listo.
                    </div>
                    <br>
                    <div >
                        <span class="botontext h4 pr10 btn_agregar">Agregar</span>
                        <span class="botontext h4 pr10 btn_deleteall">Eliminar todos</span>
                        <span class="botontext h4 pr10 btn_factoryreset">FactoryReset</span>
                    </div>
                    <ul class="list">
                    </ul>
                    <br>
                </div>
                <div page="add" hidden>
                    <span class="autor">Agreguen tantos enlaces a scripts como quieran y que estén separados con un enter, ya que lo peor que les pueda pasar con esto es que alguien se robe su cuenta de blogger y se ponga comentar por ahi, pero cierran sesión y listo.</span>
                    <textarea  class="mt10" id="UIBasic_adds" type="text"></textarea>
                    <div class="mt10">
                        <span class="botontext h4 pr10 btn_add_add">Agregar</span>
                        <span class="botontext h4 pr10 btn_add_cancelar">Cancelar</span>
                    </div>
                    <br>
                </div>
            </div>
        </div>
    `;

    var UIBasicCSS = `
    .UIBasicFondo {
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        z-index: 100;
        background: #000000e8;
    }
    .UIBasic-Content {
        top: 0px;
        position: absolute;
        width: 100%;
        text-align: center;
        z-index: 100;
    }
    
    .UIBasic{
        /* position: absolute; */
        /* left: 50%; */
        /* top: 0px; */
        /* right: 0px; */
        /* bottom: 0px; */
        /* margin: 0px auto;*/
        z-index: 10000;
        background: #000;
        padding: 5px 40px;
        border: 1px solid #f74343;
        margin: 5px; 
        max-width: 600px;
        display: inline-block;
        text-align: left;
    }
    .UIBasic .cerrar {
        float: right;
    }
    .UIBasic .boton {
        background: #333;
        width: 20px;
        height: 20px;
        display: block;
        text-align: center;
    }
    .UIBasic span.autor {
        color: #de7373;
        /* font-size: 14px; */
        font-style: italic;
    }
    .UIBasic span.sel {
        color: #AAA;
    }
    .UIBasic span.key {
        font-style: italic;
        color: #826cdc;
    }
    .UIBasic li {
        padding: 10px;
    }
    /*.UIBasic li:hover {
        background: #333;
    }*/
    .UIBasic .options {
        margin-top: 5px;
    }
    .UIBasic .botontext{
        color: #578afd;
        cursor: pointer;
    }
    
    .UIBasic .mt5{
        margin-top: 5px;
    }
    .UIBasic .mt10{
        margin-top: 10px;
    }
    .UIBasic .mt15{
        margin-top: 15px;
    }
    .UIBasic .mr5{
        margin-right: 5px;
    }
    .UIBasic .mr10{
        margin-right: 10px;
    }
    .UIBasic .mr15{
        margin-right: 15px;
    }
    .UIBasic .pr5{
        padding-right: 5px;
    }
    .UIBasic .pr10{
        padding-right: 10px;
    }
    .UIBasic .pr15{
        padding-right: 15px;
    }

    .UIBasic .h4{
        margin-block-start: 1.33em;
        margin-block-end: 1.33em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
    }
    .UIBasic .center{
        text-align: center;
    }
    .UIBasic ul.list {
        padding-left: 30px;
    }
    .UIBasic *[hidden]{
        display: none;
    }
    #UIBasic_adds {
        width: 100%;
        height: 100px;
    }
    .UIBasic span.active {
        color: #3be27e;
    }
    .UIBasic span.disabled {
        color: #ff3a3a;
    }
    .UIBasic span.refress {
        color: #ec63bc;
    }
    @media only screen and (max-width: 600px) {
        .UIBasic li {
            display: initial;
        }
        .UIBasic ul.list {
            padding-left: 0px;
        }
        .UIBasic {
            padding: 5px 15px;
        }
    }
    `;



    class UIBasic{
        constructor(){

        }
        Click = (d)=>{
            if(d.srcElement.classList.contains("cerrar")) this.Close(); 
            if(d.srcElement.classList.contains("UIBasicFondo")) this.Close(); 
            if(d.srcElement.classList.contains("btn_agregar")){
                document.querySelector('.UIBasic *[page="main"]').setAttribute("hidden","");
                document.querySelector('.UIBasic *[page="add"]').removeAttribute("hidden");
                document.querySelector('#UIBasic_adds').value = '';
            }
            if(d.srcElement.classList.contains("btn_deleteall")){
                var all = YMagic.GetInfoAll();
                for (let index = 0; index != all.length; ) {
                    YMagic.DeleteModulo(all[index].path);
                }
                this.UpdateList();
            }
            if(d.srcElement.classList.contains("btn_factoryreset")){
                YMagic.FactoryReset();
            }
            if(d.srcElement.classList.contains("btn_add_add")){
                document.querySelector('.UIBasic *[page="main"]').removeAttribute("hidden");
                document.querySelector('.UIBasic *[page="add"]').setAttribute("hidden","");
                var urls =  document.querySelector('#UIBasic_adds').value.replace(" ", "").split('\n');
                for (let index = 0; index < urls.length; index++) {
                    const element = urls[index];
                    YMagic.AddModulo(element);
                }
                this.UpdateList();
            }
            if(d.srcElement.classList.contains("btn_add_cancelar")){
                document.querySelector('.UIBasic *[page="main"]').removeAttribute("hidden");
                document.querySelector('.UIBasic *[page="add"]').setAttribute("hidden","");
            }
            if(d.srcElement.classList.contains("btn_item_desactivar")){
                var url = d.srcElement.getAttribute("path");
                YMagic.UpdateInfo(url,{enabled: false});
                this.UpdateList();
            }
            if(d.srcElement.classList.contains("btn_item_activar")){
                var url = d.srcElement.getAttribute("path");
                YMagic.UpdateInfo(url,{enabled: true});
                this.UpdateList();
            }

            if(d.srcElement.classList.contains("btn_item_eliminar")){
                var url = d.srcElement.getAttribute("path");
                YMagic.DeleteModulo(url);
                this.UpdateList();
                
            }
            if(d.srcElement.classList.contains("btn_item_arriva")){
                var url = d.srcElement.getAttribute("path");
                var all = YMagic.GetInfoAll();
                var startindex = -1;
                var endindex = -1;
                for (let index = 0; index < all.length; index++) {
                    if( all[index].path != url ) continue;
                    startindex = index;
                }
                endindex = startindex-1;
                if(endindex > -1 )  YMagic.MoveModulo(startindex,endindex);
                this.UpdateList();
            }
            if(d.srcElement.classList.contains("btn_item_abajo")){
                var url = d.srcElement.getAttribute("path");
                var all = YMagic.GetInfoAll();
                var startindex = -1;
                var endindex = -1;
                for (let index = 0; index < all.length; index++) {
                    if( all[index].path != url ) continue;
                    startindex = index;
                }
                endindex = startindex+1;
                if(endindex < all.length )  YMagic.MoveModulo(startindex,endindex);
                this.UpdateList();
            }
            
        };

        Close = ()=>{
            document.body.removeChild(document.querySelector(".UIBasic-Content "));
            document.body.removeChild(document.querySelector(".UIBasicFondo"));
            this.dom = null;
        };


        Show=()=>{
            this.CrearElementos();
            this.AgregarEventos();
            this.UpdateList();
        }

        CrearElementos=()=>{
            YMagic.AddHTML(document.body,UIBasicHTML);
            YMagic.AddCSS(UIBasicCSS);
        }

        AgregarEventos = ()=>{
            document.querySelector(".UIBasicFondo").addEventListener("click", this.Click);
            
            document.querySelector(".UIBasic .boton.cerrar").addEventListener("click", this.Click);

            document.querySelector(".UIBasic .btn_agregar").addEventListener("click", this.Click);
            document.querySelector(".UIBasic .btn_deleteall").addEventListener("click", this.Click);

            document.querySelector(".UIBasic .btn_add_add").addEventListener("click", this.Click);
            document.querySelector(".UIBasic .btn_add_cancelar").addEventListener("click", this.Click);
            document.querySelector(".UIBasic .btn_factoryreset").addEventListener("click", this.Click);
        };

        UpdateList = ()=>{
            var list = document.querySelector(".UIBasic .list");
            var vitems = YMagic.GetInfoAll();
            
            list.innerHTML = "";
            
            for (let index = 0; index < vitems.length; index++) {
                const element = vitems[index];
                var disabled = element.inits!==0 &&  element.enabled;
                var ele = document.createElement("li");
                var name = element.name.length>0? element.name:"Script";
                if(element.inits == 0 && element.enabled) name = '<span class="refress">Actualiza la pagina</span>';
                var state = disabled? "(Active) ": "(Disabled) ";

                var descripcion = element.descripcion.length>0? `<br><span class="sel">Descripcion:</span> <span class="description"> `+element.descripcion+`</span>`: "";
                var autor = element.autor.length>0? `<br><span class="sel">Autor:</span> <span class="autor">`+element.autor+`</span>`: "";
                var separador = element.key.length>0? `<span class="sel">-</span>`:"";
                var requiered = "";
                if(element.requiered.length>0 && autor.length>0){
                    requiered+= `<br><span class="sel">Requiere: </span>`;
                    var coma = "";
                    for (let index = 0; index < element.requiered.length; index++) {
                        requiered+= `<span class="requiered">`+coma+` `+element.requiered[index]+`</span>`;
                        coma = ",";
                    }
                }
                var html = `
                    <div>
                        <span class="`+(disabled?"active":"disabled")+`">`+state+`</span>`+name+`  `+separador+`  <span class="key">window.`+element.key+`</span>
                        `+descripcion+`
                        <br>
                        <span class="sel">URL:</span> <a class="description" href=`+element.path+`>`+element.path+`</a>
                        `+requiered+`
                        `+autor+`
                        <div class="options">
                            <span class="botontext mr5 btn_item_`+(element.enabled?"desactivar":"activar")+`" path=`+element.path+`>`+(element.enabled?"Desactivar":"Activar")+`</span>
                            <span class="botontext mr5 btn_item_eliminar" path=`+element.path+`>Eliminar</span>
                            <span class="botontext mr5 btn_item_arriva" path=`+element.path+`>Arriva</span>
                            <span class="botontext mr5 btn_item_abajo" path=`+element.path+`>Abajo</span>
                        </div>
                    </div>
                `;

                
                list.appendChild(ele);
                ele.innerHTML = html;

                setTimeout(() => {
                    var buttons =  document.querySelectorAll(".UIBasic .options span");
                    for (let index = 0; index < buttons.length; index++) {
                        const element = buttons[index];
                        element.addEventListener("click", this.Click);
                        
                    }
                },0);
            }
        };

    }

    window.UIBasic = new UIBasic();
    YMagic.NotifyLoaded("UIBasic");

})();