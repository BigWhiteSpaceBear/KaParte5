sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("student00i.com.sap.training.ux402.fullscreen.fullscreen.controller.NotFound", {

        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },
        
        onNavBack: function () {
            var oHistory = sap.ui.core.routing.History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getRouter().navTo("overview", {}, true);
            }
        }
    });
});