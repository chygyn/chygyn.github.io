//sap.ui.localResources("Control");
jQuery.sap.require("evola.recruiting.utilits.Formatter");

sap.ui.controller(
				"evola.recruiting.view.Detail",
				{
					
				//вызов аксессуаров для выбранной продукции
				showAcc : function(evt) {
					var oView = this.getView();
					var oTable = oView.byId("ProductsOdata");
					var SelIndex = oTable.getSelectedIndex();
					//проверка выбранной строки
					if (SelIndex != -1) {
						var oSelIdProd = oTable.getContextByIndex(SelIndex).getProperty("Id");
							//проверка существования модели
							//if (!oView.getModel("oData2")) {
//								var oModelAcc = new sap.ui.model.json.JSONModel("model/Acc.json");
//								oView.setModel(oModelAcc, "Acc");
//								var sODataURL = "/sap/opu/odata/sap/ZPAVLOVEU_TESTUI5_2_SRV";
//								//проверка на адрес
//								if (window.location.hostname === 'localhost')
//									sODataURL += 'http://evolasrv02.evola.ru:8006';
//								var oModelODATA2 = new sap.ui.model.odata.ODataModel(sODataURL);
//								oView.setModel(oModelODATA2, "oData2");
//								oModelODATA2.attachMetadataLoaded(function() {
//									oView.oAccDeferred = jQuery.Deferred();
//									oView.oAccGroupDeferred = jQuery.Deferred();
//									oModelODATA2.read("/accessoriesSet",
//										{
//											async : false,
//											success : function(data,response) {
//												console.log("accessoriesSet OK");
//												oModelAcc.setProperty("/accessories",data.results);
//												oView.oAccDeferred.resolve();},
//											error : function(error) {
//												console.log("accessoriesSet FAIL");
//												}
//										});
//									});
							//}
							var oModelProduct=oView.getModel("products");
							var oModel=oView.getModel("oData");
							var aAcc = oModelProduct.getProperty("/accessories/");							
							oModel.read("/accessoriesSet?$filter=IdProd eq'" + oSelIdProd + "'", {
								async: false,
								success: function(data,response){
									console.log("accessoriesSet OK");
									oModelProduct.setProperty("/accessories",data.results);
								},
								error: function(error){
									console.log("accessoriesSet FAIL");						
								}
							});
							//открываем фрагмент с табличкой аксессуаров
							var accDialog = new sap.m.Dialog({
								content: [ sap.ui.xmlfragment("sap.ui.demo.myFiori.view.Frag", this) ],
								beginButton : new sap.m.Button({
									text : 'Ok',
									press : function() {
										accDialog.close();
									}
								}),
								afterClose: function(){
									accDialog.destroy();
								}
							});
							accDialog.setModel( oModelProduct );
							oView.addDependent(accDialog);
							accDialog.open();
								} else {
							//если строка продукции в табличке не выделена, то выдаем ошибку
									var erDialog = new sap.m.Dialog(
									{
										title : 'Ошибка',
										type : 'Message',
										state : 'Error',
										content : new sap.m.Text(
												{
													text : "Не выбрана ни одна запись в таблице!"
												}),
										beginButton : new sap.m.Button({
											text : 'Ok',
											press : function() {
												erDialog.close();
											}
										}),
										afterClose : function() {
											erDialog.destroy();
										}
									});
							erDialog.open();
						}
					},
					//создание нового аксессуара
					onPressCreate : function(evt){
						console.log("CreateAcc");
						var oView = this.getView();
						var oModelProduct=oView.getModel("products")
						var ProdT=oView.byId("ProductsOdata");
						var selIdProd=ProdT.getContextByIndex(ProdT.getSelectedIndex()).getProperty("Id");
						var newAccDialog = new sap.m.Dialog({
							title:'Создание нового аксессуара',
							content: [ sap.ui.xmlfragment("sap.ui.demo.myFiori.view.FragNewAcc", this) ],
							beginButton : new sap.m.Button({
								text : 'Ok',
								press : function() {
									erDialog.close()}
							}),
							afterClose: function(){
								newAccDialog.destroy();
							}
						});
						newAccDialog.setModel( oModelProduct );
						oView.addDependent(newAccDialog);
						newAccDialog.open();
						
					},
					//Save
					Save : function(evt){
						console.log("Save");
						var oView = this.getView();
						var oModelProduct=oView.getModel("products")
						var ProdT=oView.byId("ProductsOdata");
						var newEntity={};
						newEntity.IdProd=ProdT.getContextByIndex(ProdT.getSelectedIndex()).getProperty("Id");
						newEntity.Name=evt.getSource().getParent().getItems()[0].getValue();
						
						
					},
					//удаление выбранного аксессуара
					onPressDelete : function(evt) {
						console.log("DeleteAcc");
						var oTableAcc = evt.getSource().getParent().getParent();
						var SelIndexAcc = oTableAcc.getSelectedIndex();
						var oSelIdAcc = oTableAcc.getContextByIndex(SelIndexAcc).getProperty("Id");
						var oSelIdProdAcc = oTableAcc.getContextByIndex(SelIndexAcc).getProperty("IdProd");
						var oSelNameAcc = oTableAcc.getContextByIndex(SelIndexAcc).getProperty("Name");
						var oView=this.getView();
						var oData=oView.getModel("oData");
						oData.remove("/accessoriesSet(Id='" + oSelIdAcc + "',IdProd='" + oSelIdProdAcc + "')",{
							async:false,
							success:function(data,response){
								oView.getModel("products").getProperty("/accessories").splice(Id=oSelIdAcc);
							}
						});
				//		oView.getModel("products").refreshRows;
					},

					onSearch : function(evt) {
						var sCurValue = evt.getSource().getValue();
						var table = this.getView().byId("ProductsOdata");
						var filter1 = new sap.ui.model.Filter({
							path : "Id",
							operator : sap.ui.model.FilterOperator.Contains,
							value1 : sCurValue
						});
						var filter2 = new sap.ui.model.Filter({
							path : "Name",
							operator : sap.ui.model.FilterOperator.Contains,
							value1 : sCurValue
						});
						filters = [ filter1, filter2 ];
						var filterForTab = new sap.ui.model.Filter({
							filters : filters,
							and : false
						});
						table.getBinding("rows").filter(filterForTab,
								sap.ui.model.FilterType.Application);
						var curVisRow = table.getBinding("rows")._getLength();
						if (curVisRow == 0) {
							curVisRow = 1;
						}
						table.setVisibleRowCount(curVisRow);

					},

					handleListItemPress : function(evt) {
						var modelName = "products"; // передаем модель
						var oSrc = evt.getSource();// считываем источник
						// события
						// модель - ищем контекст по пути из источника события
						var context = oSrc.getModel(modelName).getContext(
								oSrc.getBindingContextPath());
						this.nav.to("DetailProdReq", context, modelName);
					},
					handleListSelect : function(evt) {
						var modelName = "requests"; // передаем модель
						// ищем контекст для передачи в детейл вью
						var context = evt.getParameter("listItem")
								.getBindingContext(modelName);
						if (!context) {
							// in case of simple mode
							context = evt.getParameter("listItem")
									.getBindingContext(
											evt.getSource()
													.getBindingContextPath());
						}
					}
				});