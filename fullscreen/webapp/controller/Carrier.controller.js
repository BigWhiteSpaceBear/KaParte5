sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("student00i.com.sap.training.ux402.fullscreen.fullscreen.controller.Carrier", {
      
      getRouter: function () {
        return sap.ui.core.UIComponent.getRouterFor(this);
      },
      onPress: function (oEvent) {
        const oItem = oEvent.getSource();
        const oCtx = oItem.getBindingContext();
        const sCarrid = oCtx.getProperty("Carrid");

        this.getRouter().navTo("flights", {
          carrid: sCarrid
        });
      }
    });
});