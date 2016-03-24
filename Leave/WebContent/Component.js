
sap.ui.core.UIComponent.extend("Leave.Component", {
  getController: function () {
    return "Leave.view.App";
  },
  
  createContent : function() {

    var oView = sap.ui.view({
      id : "app",
      viewName : "Leave.view.App",
      type : "XML",
      viewData : { component : this }
    });

    this.app = oView.byId("idApp");
    var oModel = new sap.ui.model.json.JSONModel("model/requests.json");
    oView.setModel(oModel,"requests");
   
    return oView;
  } 
});