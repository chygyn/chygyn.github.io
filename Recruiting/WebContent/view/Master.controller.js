sap.ui.controller("evola.recruiting.view.Master",
		{

			handleListItemPress : function(evt) {
				var modelName = "requests"; // передаем модель
				var oSrc = evt.getSource();// считываем источник события
				// модель - ищем контекст по пути из источника события
				var context = oSrc.getModel(modelName).getContext(
						oSrc.getBindingContextPath());
				this.nav.to("Detail", context, modelName);
			},

			// кнопка Добавить
			addItem : function(evt) {
				var modelName = "requests"; // передаем модель
				// var oSrc = evt.getSource();//считываем источник события
				// модель - ищем контекст по пути из источника события
				// var context = oSrc.getModel(modelName).getContext(
				// oSrc.getBindingContextPath() );

				// TODO добавить временную модель с одним дополнительным
				// атрибутом
				// под количество. эта модель есть копия продуктов. эту модель
				// забиндить на криейшн вью, после чего в контроллере работать
				// уже с ней
				this.nav.to("Creation", modelName);

			},
			handleListSelect : function(evt) {
				var modelName = "requests"; // передаем модель
				// finding context to pass it to detail page
				var context = evt.getParameter("listItem").getBindingContext(
						modelName);
				if (!context) {
					// in case of simple mode
					context = evt.getParameter("listItem").getBindingContext(
							evt.getSource().getBindingContextPath());
				}
				// perform navigation
				this.nav.to("Detail", context, modelName);
			}
		});