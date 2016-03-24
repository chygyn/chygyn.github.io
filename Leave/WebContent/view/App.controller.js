jQuery.sap.require("Leave.utilits.Formatter");
sap.ui.define(['sap/ui/core/mvc/Controller','sap/ui/unified/DateRange','sap/m/MessageToast'],
	function(Controller, DateRange) {
	"use strict";

	var calendar = Controller.extend("Leave.view.App", {
		oFormatYyyymmdd: null,
		
		onAfterRendering : function(){
			var oPage = this.getView().byId("myPage");
			var oCal = this.getView().byId("Calendar");
			var oBlock=this.getView().byId("blockInput");
			if(oPage.$().width() < 500){
				oCal.setMonths(1);
				oBlock.setWidth("275px");
			}
		},
		
		handleHistory : function(evt){
			var oView = this.getView();
			var oModel=oView.getModel("requests");
			var historyDialog = new sap.m.Dialog({
				title:"История заявок",
				content: [ sap.ui.xmlfragment("Leave.view.Frag", this) ],
				beginButton : new sap.m.Button({
					text : 'ОК',
					press : function() {
						historyDialog.close();
					}
				}),
				afterClose: function(){
					historyDialog.destroy();
				}
			});
			historyDialog.setModel( oModel );
			oView.addDependent(historyDialog);
			historyDialog.open();
		},
		
		addLeave : function(evt) {
			var oView = this.getView();
			var oModel=oView.getModel("requests");
			var curReq=oModel.getProperty("/Requests");
			var curId=+(curReq.length) + 1;
			var sDateSt= this.getView().byId("selectedDateFrom").getText();
			var sDateEn= this.getView().byId("selectedDateTo").getText();
			var sLimit = +this.getView().byId("res").getText();
			var sSelectedRange=+this.getView().byId("select").getText();
			var sApprover = this.getView().byId("approver").getSelectedItem();
			if((sDateSt!=="Выберите значение на календаре")&(sDateEn!=="Выберите значение на календаре")&(sDateEn!=="Дата не выбрана")&(sApprover!==null))
			{
				if (sLimit<sSelectedRange){
					sap.m.MessageToast.show("Количество выбранных дней превышает лимит, отправление заявки невозможно");
				}else{
				sap.m.MessageToast.show("Заявка отправлена на утверждение");
				var oReq={
						"ReqId": curId,
						"DataSt": sDateSt,
						"DataEn": sDateEn,
						"Status": "На утверждении",
						"Approver": sApprover.getProperty("text")
				};
				curReq.push(oReq);
				var newLimit=+sLimit - +sSelectedRange;
				oModel.setProperty("/Limit",newLimit);
				oModel.refresh();
				oView.byId("Calendar").removeSelectedDate();}
			}else{
				sap.m.MessageToast.show("Вы не выбрали дату и утверждающего");
			}
		},
		
		onInit: function() {
			this.oFormatYyyymmdd = sap.ui.core.format.DateFormat.getInstance({pattern: "yyyy-MM-dd"});
		},

		handleCalendarSelect: function(oEvent) {
			var oCalendar = oEvent.oSource;
			this._updateText(oCalendar);
		},

		_updateText: function(oCalendar) {
			var oSelectedDateFrom = this.getView().byId("selectedDateFrom");
			var oSelectedDateTo = this.getView().byId("selectedDateTo");
			var aSelectedDates = oCalendar.getSelectedDates();
			var aSelectedRange = this.getView().byId("select");
			var oDateSt;
			var oDateEn;
			if (aSelectedDates.length > 0 ) {
				oDateSt = aSelectedDates[0].getStartDate();
				if (oDateSt) {
					oSelectedDateFrom.setText(this.oFormatYyyymmdd.format(oDateSt));
				} else {
					oSelectedDateTo.setText("Дата не выбрана");
				}
				oDateEn = aSelectedDates[0].getEndDate();
				if (oDateEn) {
					oSelectedDateTo.setText(this.oFormatYyyymmdd.format(oDateEn));
				} else {
					oSelectedDateTo.setText("Дата не выбрана");
				}
			} else {
				oSelectedDateFrom.setText("Дата не выбрана");
				oSelectedDateTo.setText("Дата не выбрана");
			}
			if ((oDateSt!==null) & (oDateEn!==null)){
					var resRange= ((oDateEn.getTime() - oDateSt.getTime() ) / (1000 * 3600 * 24));
					if (resRange=="0"){
						aSelectedRange.setText("1");
					}else{aSelectedRange.setText(resRange);}
					
//					var iLimit=this.getView().getModel("requests").getProperty("/Limit");
					
//					var resLimit=+iLimit - +resRange;
//					if(resLimit!==28){
//						aCurLimit.setText(resLimit);
//						this.getView().getModel("requests").setProperty("/Limit",resLimit);
//					}else{
//						aCurLimit.setText("27");
//						this.getView().getModel("requests").setProperty("/Limit","27");
//					}
				}else{
					aSelectedRange.setText("0");
			}
		},

		handleSelectThisWeek: function(oEvent) {
			this._selectWeekInterval(6);
		},

		handleSelectWorkWeek: function(oEvent) {
			this._selectWeekInterval(4);
		},

		_selectWeekInterval: function(iDays) {
			var oCurrent = new Date();     // get current date
			var iWeekstart = oCurrent.getDate() - oCurrent.getDay() +1;
			var iWeekend = iWeekstart + iDays;       // end day is the first day + 6
			var oMonday = new Date(oCurrent.setDate(iWeekstart));
			var oSunday = new Date(oCurrent.setDate(iWeekend));

			var oCalendar = this.getView().byId("Сalendar");

			oCalendar.removeAllSelectedDates();
			oCalendar.addSelectedDate(new DateRange({startDate: oMonday, endDate: oSunday}));

			this._updateText(oCalendar);
		}
	});

	return calendar;

});
