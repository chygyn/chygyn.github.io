//библиотека плагинов
//jQuery.sap.declare("sap.ui.demo.myFiori.Component");

sap.ui.core.UIComponent.extend("evola.recruiting.Component", {
  getController: function () {
    return "evola.recruiting.view.App";
  },
  
  createContent : function() {
    // скрол бар
//    this.setDisplayBlock(false);
    // корневая вьюха
    var oView = sap.ui.view({
      id : "app",
      viewName : "evola.recruiting.view.App",
      type : "XML",
      viewData : { component : this }
    });
    // создаем сплит апп
    // скрол барkjkjk


    this.app = oView.byId("idApp");
    // мастерs
    //var master = sap.ui.xmlview("Master", "sap.ui.demo.myFiori.view.Master");

    var master = this.app.getMasterPage("app--idViewMaster");
    master.getController().nav = oView.getController();


    //this.app.getMasterPage("idViewMaster").getController().nav = oView.getController();


    // в мастер контроллер дописываем переменную nav, через которую мы можем
    // обращаться к контроллеру арр
  //  this.oView.addPage(master, true);
    // пустая
//    var empty = sap.ui.xmlview("Empty" , "sap.ui.demo.myFiori.view.Empty");
    var empty = this.app.getDetailPage("app--idViewEmpty");
  //  empty.getController().nav = oView.getController();
//подключаем модель с текстами к вьюхе
    var i18nModel = new sap.ui.model.resource.ResourceModel({
      bundleUrl : "i18n/messageBundle.properties"
    });
    oView.setModel(i18nModel, "i18n");//биндим модель на вьюху
//    // Using OData model to connect against a real service
//    var url = "/proxy/http/<server>:<port>/sap/opu/odata/sap/ZGWSAMPLE_SRV/";
//    var oModel = new sap.ui.model.odata.ODataModel(url, true, "<user>", "<password>");
//    oView.setModel(oModel);

    // указываем модель с заявками
    var oModel = new sap.ui.model.json.JSONModel("model/requests.json");
    oView.setModel(oModel,"requests");//биндим модель на вьюху
    //используем хранилище
//    jQuery.sap.require("jquery.sap.storage");  
//    oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local); 
    //проверяем есть ли что в хранилище
//    if (oStorage.get("myStorData")) {  
//        console.log("Данные из хранилища");  
//        var oData = oStorage.get("myStorData");  
//        oModel.setData(oData);  
  //  }
    // указываем модель для продукции
    var oModelProduct = new sap.ui.model.json.JSONModel("model/Products.json");
    oView.setModel(oModelProduct,"products");
    
    var sODataURL = "/sap/opu/odata/sap/ZPAVLOVEU_TESTUI5_SRV";
    if(window.location.hostname === 'localhost')
    	sODataURL += 'http://evolasrv02.evola.ru:8006';
    
    var oModelODATA = new sap.ui.model.odata.ODataModel(sODataURL);
    this.setModel(oModelODATA,"oData");
    var aForAcc={};
    oModelProduct.setProperty("/accessories", aForAcc);
    oModelODATA.attachMetadataLoaded(function(){
	var that = this;
	this.oProdDeferred = jQuery.Deferred();
	this.oProdGroupDeferred = jQuery.Deferred();
		oModelODATA.read("/ProductSet", {
			async: true,
			success: function(data,response){
				console.log("ProductSet OK");
				oModelProduct.setProperty("/Product", data.results);
				that.oProdDeferred.resolve();
			},
			error: function(error){
				console.log("ProductSet FAIL");						
			}
		});
		
    });
    // done
    return oView;
  } 
});