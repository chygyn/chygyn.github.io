sap.ui.controller("evola.recruiting.view.App", {
	 //навигации на страницы

	to : function (pageId, context, modelName) {
		
		var app = this.getView().byId("idApp");
		
		// грузим страничку
		var master = ("Master" === pageId);
		if (app.getPage(pageId, master) === null) {
			var page = sap.ui.xmlview({
				id : pageId,
				viewName : "evola.recruiting.view." + pageId,
				type : "XML"
			});
			page.getController().nav = this;
			app.addPage(page, master);
			console.log("app controller > loaded page: " + pageId);
		};
				
		// показываем страничку приложения
		app.to(pageId);
		
		// определяем контекст на странице
		if (context) {
			var page = app.getPage(pageId);
			if(modelName){
				page.setBindingContext(context, modelName);
			}else{
				page.setBindingContext(context);
			};
		}
	},
	
	back : function (pageId) {
		this.getView().byId("idApp").backToPage(pageId);
	}
});