jQuery.sap.declare("evola.recruiting.utilits.Formatter");

evola.recruiting.utilits.Formatter = {
		
		tabRows : function(Rows){
			
//			if (Rows=undefined||){
//				var aRows="1";
//				return(aRows);
//			}else{
				return(Rows&&Rows.length)?Rows.length:1;
//			}
}

//		        var sPath = this.getBindingContext().getPath();
//		        var oBindings = this.getModel().bindList(sPath);
//		        return oBindings.getLength();
//		    }
}