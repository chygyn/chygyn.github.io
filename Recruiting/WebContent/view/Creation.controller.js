sap.ui.controller("evola.recruiting.view.Creation",{
	
	//переход к подробностям продукции
	handleListItemPress : function(evt){
		var modelProd = "products"; //передаем модель
		var oSrc = evt.getSource();//считываем источник события
	//модель - ищем контекст по пути из источника события
		var context = oSrc.getModel(modelProd).getContext( oSrc.getBindingContextPath() );
		this.nav.to("DetailProd", context, modelProd);
	},

	handleCancel:function(evt){
		this.getView().destroy();
	},
	
	
	//Сохранение заявки
	SaveItem : function(evt){
		var oView = this.getView();
		var sName = oView.byId("Name").getValue();		
		var Position = oView.byId("positions").getSelectedItem();
		var sPosition="";
		if (Position!==null){sPosition=Position.getText();}
		var Sphere = oView.byId("Sphere").getSelectedItem();
		var sSphere="";
		if (Sphere!==null){sSphere=Sphere.getText();}
		var sType = oView.byId("type").getValue();
		var DateP= oView.byId("date").getDateValue();
		var sDate="";
		if (DateP!==null){sDate=(DateP.getDate()+"/"+(+DateP.getMonth()+1)+"/"+DateP.getUTCFullYear());}
		var Branch = oView.byId("Branch").getSelectedItem();
		var sBranch = "";
		if (Branch!==null){sBranch=Branch.getText();}
		var sFio= oView.byId("fio").getValue();
		var sWhy= oView.byId("why").getValue();
		var sFunc= oView.byId("func").getValue();
		var Educ= oView.byId("TypeEduc").getSelectedItem();
		var sEduc = "";
		if (Educ!==null){sEduc=Educ.getText();}
		var NaprEduc= oView.byId("NaprEduc").getSelectedItem();
		var sNaprEduc = "";
		if (NaprEduc!==null){sNaprEduc=NaprEduc.getText();}
		var sSpec= oView.byId("spec").getValue();
		var sExp= oView.byId("exp").getValue();
		var sMust_k= oView.byId("must_k").getValue();
		var sMust_do= oView.byId("must_do").getValue();
		var Mode= oView.byId("mode").getSelectedItem();
		var sMode="";
		if (Mode!==null){sMode=Mode.getText();}
		var sMin= oView.byId("min");
		var sMax= oView.byId("max");
		var sComment= oView.byId("comment");
		var oModel=oView.getModel("requests");
		var curReq=oModel.getProperty("/Requests");
		var curId=+curReq.length +1;
		var curData = new Date();
		var scurData=(curData.getDate()+"/"+(+curData.getMonth()+1)+"/"+curData.getUTCFullYear());
		if ((sName!=="")&(sPosition!=="")&(sDate!=="")){
			var oNewReq={
					"ReqId": curId,
					"Data":scurData,
					"Status": "В работе",
					"State": "Success",
					"Lin_leader":"Семёнов Игорь Викторович",
					"Leader":"Афансьев Андрей Фёдорович",
					"NameReq": "Заявка",
					"Name":sName,
					"Position":sPosition,
					"Sphere":sSphere,
					"Type":sType,
					"Date": sDate,
					"Branch":sBranch,
					"Fio":sFio,
					"Why":sWhy,
					"Func":sFunc,
					"Educ":sEduc,
					"NaprEduc":sNaprEduc,
					"Spec":sSpec,
					"Exp":sExp,
					"Must_k":sMust_k,
					"Must_do":sMust_do,
					"Mode":sMode,
					"Min":sMin,
					"Max":sMax,
					"Comment":sComment
			};
			curReq.push(oNewReq);
			oModel.refresh();
			this.getView().destroy();
		}else{
			sap.m.MessageToast.show("Вы не заполнили обязательные поля, отмеченные *");
		}
		
		
	}
//	function(MessageToast, Controller, Filter, JSONModel){
//	var CController = Controller.extend("sap.ui.demo.myFiori.view.Creation",{
		
//		onInit:function(){
//			var oModel = new JSONModel("model/Products.json");
//			this.getView().setModel(oModel);
//		},
//		handleSearch:function(oEvent){
//			var sValue = oEvent.getParameter("value");
//			var oFilter = new Filter("Имя" , sap.ui.model.FilterOperator.Contains,sValue);
//			var oBinding = oEvent.getSource().getBinding("items");
//			oBinding.filter([oFilter]);
//		},
	//	handleClose: function (oEvent){
//			var aContexts=oEvent.getParameter("selectedContexts");
//			if (aContexts.length) {
//				MessageToast.show("Вы выбрали" + aContexts.map(function(oContext){return oContext.getObject().Name;}).join(","));
//			}
//			oEvent.getSource().getBinding("items").filter([]);
//		}
//	});
//		return CController;
//});
});