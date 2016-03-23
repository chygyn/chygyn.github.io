//библиотека плагинов
//jQuery.sap.declare("sap.ui.demo.myFiori.Component");

sap.ui.core.UIComponent.extend("Leave.Component", {
  getController: function () {
    return "Leave.view.App";
  },
  
  createContent : function() {
    // скрол бар
//    this.setDisplayBlock(false);
    // корневая вьюха
    var oView = sap.ui.view({
      id : "app",
      viewName : "Leave.view.App",
      type : "XML",
      viewData : { component : this }
    });
    // создаем сплит апп
    // скрол барkjkjk


    this.app = oView.byId("idApp");
    var oModel = new sap.ui.model.json.JSONModel("model/requests.json");
    oView.setModel(oModel,"requests");
    // мастерs
    //var master = sap.ui.xmlview("Master", "sap.ui.demo.myFiori.view.Master");

    
    return oView;
  } 
});