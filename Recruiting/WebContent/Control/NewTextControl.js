jQuery.sap.require("sap.m.Text");
jQuery.sap.require("sap.m.TextRenderer");
//jQuery.sap.declare("sap.ui.demo.myFiori.control.NewTextControl");

sap.m.Text.extend("sap.ui.demo.myFiori.control.NewTextControl",{
	metadata : {
			properties:{
				text:{type:"string", defaultValue:"«"}
		//		"left":{type:"string", defaultValue:"«"},
			//	"right":{type:"string", defaultValue:"»"}
			 },
		        aggregations : {
		        },
		        associations: {
		        },
		        events : {
		        }
		    },
		renderer : {
		}
	});
sap.ui.demo.myFiori.control.NewTextControl.prototype.getText = function(){
 	var original = sap.m.Text.prototype.getText.apply(this, arguments);
	
	return original + '«';
};