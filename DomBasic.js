(()=>{



    var YMagic = window.YMagic;
    var version = 0.12;
    var DomBasic_Setting =  YMagic.GetInfo("DomBasic");

    if(DomBasic_Setting == null || DomBasic_Setting.version != version){
        YMagic.UpdateInfo("https://machinga22fawgawg.000webhostapp.com/ext/DomBasic.js", {
            version : version,
            name: "DomBasic",
            key: "DomBasic",
            requiered: ["LibBasic"],
            autor: "nickriviera26",
            descripcion: "Motor para facilitar el manejo de elementos."
        });
    }
    

    window.DomBasic = new DomBasic();

    YMagic.NotifyLoaded("DomBasic");

})();