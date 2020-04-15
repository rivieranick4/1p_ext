
//Simula los delegates de C#
class Delegate{
    constructor(){
        this.list=[];
    }
    add(fun){
        this.list.push(fun);
    }
    run(value=null,value2=null,value3=null){
        for (let index = 0; index < this.list.length; index++) {
            this.list[index](value,value2,value3);
        }
    }
    clear(){
        this.list = [];
    }
    remove(fun){
        for( var i = 0; i < this.list.length; i++){ 
            if ( this.list[i] === fun) {
                this.list.splice(i, 1);
                return;
            }
        }

    }
}

(()=>{
    var YMagic = null;
    
    
    class Store {

        constructor(params) {
            this.ModelVercion = 1;

    
            this.data = {};
            if (!this.Storagekey) this.Storagekey = "defauld";
    
            this.loaded = false;
        }
    
        load(key) {
            var exist = true;
            if(this[key]) this[key] = {};
            if (!localStorage.getItem(key)) {
                localStorage.setItem(key, JSON.stringify({}));
                exist = false;
            }
            this.loaded = true;
    
            var Temp = JSON.parse(localStorage.getItem(key));
            this[key] = Temp;
            this[key].save = ()=>{this.save(key);};
            return exist;
        }
    
        save(key) {
            try {
                localStorage.setItem(key, JSON.stringify(this[key]));
            } catch (error) {
                console.log(error);
                localStorage.setItem(key, "{}");
            }
        }
        clearAll(){
            localStorage.clear();
        }
    
        isExist(key){
            return localStorage.hasOwnProperty(key);
        }
    }

    class YuscuMagic{
        constructor(){
            var ols;
            this.version = 1;
            this.forceclear = 18;
            this.lastforce = 3;
            this.LoadedModulo = new Delegate();
            this.ModulosIniciados = [];
            this.ModulosCargados = [];
            this.InitStore();
            this.LoadModulos();

        }

        InitStore = ()=>{
            this.store = new Store();

            if(this.store.load("YuscuMagic") === false){
                this.store["YuscuMagic"].grupos = [];
                this.store["YuscuMagic"].last = 0;
                this.store["YuscuMagic"].active = 0;
                this.store["YuscuMagic"].lastclear = this.forceclear;
                this.store["YuscuMagic"].lastforce = this.lastforce;
                this.AddGrupo("defauld");

            }
            if(this.store["YuscuMagic"].lastclear != this.forceclear){
                this.FactoryReset();
            }

            this.storekey = this.GetGrupo(this.store["YuscuMagic"].active).storekey;

            if(this.store.load(this.storekey) === false){
                this.store[this.storekey].modulos = [];
                this.store[this.storekey].save();

                // var code = document.querySelector("*[ymagic]")?.getAttribute("ymagic");
                // code = code!= undefined? code: "https://rivieranick4.github.io/1p_ext/src";
                var code = this.GetValueInConfig("path");
                this.AddModulo(code+"/UIBasic.js"); 
                this.UpdateInfo(code+"/UIBasic.js",{enabled: true}); 
                
                this.AddModulo(code+"/1PNews.js"); 
                this.UpdateInfo(code+"/1PNews.js",{enabled: true}); 

                this.AddModulo(code+"/Comments.js"); 
                this.UpdateInfo(code+"/Comments.js",{enabled: true}); 
            }

            if(this.store["YuscuMagic"].lastforce != this.lastforce){
                this.ForceScript();
                this.store["YuscuMagic"].lastforce = this.lastforce;
                this.store["YuscuMagic"].save();
            }
        }
        ForceScript=()=>{
        };

        IsLoaded=(key)=>{ 
            for (let index = 0; index < this.ModulosCargados.length; index++) {
                const element = this.ModulosCargados[index];
                if(element == key) return true; 
            }  
            return false; 
        };
        NotifyLoaded = (key)=>{
            this.LoadedModulo.run(key);
            this.ModulosCargados.push(key);
        };
        
        GetValueInConfig=(attr)=>{
            return document.querySelector("*[ymagic]")?.getAttribute(attr);
        }

        Request = (url,fun=null)=>{
            return new Promise((c,e)=>{
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open( "GET", url, false ); // false for synchronous request
                xmlHttp.send( null );
                if(fun!=null)fun(xmlHttp.responseText);
                c(xmlHttp.responseText);
            });y
        };

        LoadModulos = async ()=>{
            var code = document.querySelector("*[ymagic]")?.getAttribute("ymagic");
            code = code!= undefined? code: "";
            for (let index = 0; index < this.store[this.storekey].modulos.length; index++) {
                var m = this.store[this.storekey].modulos[index];
                if(m.enabled){
                    var path = m.path + code;

                    // var script = document.createElement("script");
                    // script.src = path;
                    // document.head.appendChild(script);

                    var body = await Request(path); 
                    this.AddSCRIPT(body);  

                    this.ModulosIniciados.push(m); 
                    m.inits++; 
                }
            }
            this.store[this.storekey].save();
        };
        GetGrupo=(id = null)=>{
            for (let index = 0; index < this.store["YuscuMagic"].grupos.length; index++) {
                const element = this.store["YuscuMagic"].grupos[index];
                if(id === element.id) return element;
            }
        }
        GetGrupos=(id)=>{
            return this.store["YuscuMagic"].grupos;
        }
        AddGrupo=(name,copy = false)=>{
            this.store["YuscuMagic"].grupos.push({
                storekey: "S"+parseInt(Math.random() * 999999999999),
                name: name,
                id: this.store["YuscuMagic"].last,
                version: this.version
            });
            this.store["YuscuMagic"].last++;
            

            this.store["YuscuMagic"].save();
        };
        SetGrupo=(id)=>{
            this.store["YuscuMagic"].id = id;
            this.store["YuscuMagic"].save();
        };

        
        UpdateInfo = (path, obj)=>{
            if(path=="") return null;
            for (let index = 0; index < this.store[this.storekey].modulos.length; index++) {
                const m = this.store[this.storekey].modulos[index];
                if(path === m.path){
                    m.key = obj.key != undefined ? obj.key: "";
                    m.name =  obj.name != undefined ? obj.name: "";
                    m.autor = obj.autor != undefined ?  obj.autor: "";
                    m.version =  obj.version != undefined ? obj.version: "";
                    m.descripcion = obj.descripcion != undefined ?  obj.descripcion: "";
                    if(obj.enabled != undefined) m.enabled = obj.enabled;
                    if(obj.requiered != undefined) m.requiered = obj.requiered;

                    this.store[this.storekey].save();
                    return "Se modifico con exito";
                }
            }
            return "No se encontro esa url en los scripts.";
        };



        GetInfo = (key)=>{

            for (let index = 0; index < this.store[this.storekey].modulos.length; index++) {
                const m = this.store[this.storekey].modulos[index];
                if(key== m.key) return m;
            }
            return null;
        };

        GetInfoAll = ()=>{
            return this.store[this.storekey].modulos;
        };

        AddHTML=(obj, html)=>{
            var d = document.createElement("div");
            obj.appendChild(d);
            d.outerHTML = html;
            return d;
        };
        DeleteHTML=(obj)=>{
            obj.parentElement.removeChild(obj);;
        };
        AddCSS=(css)=>{
            var d = document.createElement("style");
            document.head.appendChild(d);
            d.innerHTML = css;
            return d;
        };
        AddSCRIPT=(code)=>{
            var d = document.createElement("script");
            d.setAttribute("asyn","async");
            d.innerHTML = code;
            document.head.appendChild(d);
            return d;
        };

        get = (name)=>{
            return window[name];
        };

        
        AddModulo = (url)=>{
            for (let index = 0; index < this.store[this.storekey].modulos.length; index++) {
                const element = this.store[this.storekey].modulos[index];
                if(element.path == url) return "Esa URL ya existe!";
                
            }

            this.store[this.storekey].modulos.push({
                path : url,
                enabled: false,
                autor: "",
                version: "",
                requiered: [],
                name:"",
                descripcion:"",
                key: "",
                inits: 0
            });
            this.store[this.storekey].save();
            return "YuscuMagic: Modulo añadido!";
        };
        MoveModulo = (old_index, new_index)=>{
            if (new_index >= this.store[this.storekey].modulos.length) {
                var k = new_index - this.store[this.storekey].modulos.length + 1;
                while (k--) {
                    this.store[this.storekey].modulos.push(undefined);
                }
            }
            this.store[this.storekey].modulos.splice(new_index, 0, this.store[this.storekey].modulos.splice(old_index, 1)[0]);
        }
        
        DeleteModulo = (url)=>{
            for (let index = 0; index < this.store[this.storekey].modulos.length; index++) {
                const element = this.store[this.storekey].modulos[index];
                if(element.path == url){
                    this.store[this.storekey].modulos.splice(index, 1);
                }
            }
            this.store[this.storekey].save();
            return "YuscuMagic: Modulo eliminado.";
        };

        FactoryReset = ()=>{
            this.store.clearAll();
            location.reload();
        }

        Info = ()=>{
            console.log(this.ModulosCargados);
        };

    }
    
    

    YMagic = new YuscuMagic();
    window.YMagic = YMagic;
})();


