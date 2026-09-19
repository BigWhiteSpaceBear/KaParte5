sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
    "use strict";

    return Controller.extend(
        "student00i.com.sap.training.ux402.fullscreen.fullscreen.controller.Flights",
        {
            onInit() {
                var oRouter = this.getRouter();

                oRouter.getRoute("flights").attachMatched(this._onObjectMatched, this);
            },
            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },
            _onObjectMatched: function (oEvent) {
                var oArgs = oEvent.getParameter("arguments");
                this._sCarrierId = oArgs.carrid;
                var oView = this.getView();

                oView.bindElement({
                    path: "/UX_C_Carrier_TP('" + this._sCarrierId + "')",
                    events: {
                        change: this._onBindingChange.bind(this),
                        dataRequested: function () {
                            oView.setBusy(true);
                        },
                        dataReceived: function () {
                            oView.setBusy(false);
                        }
                    }
                });
            },
            _onBindingChange: function () {
                var oElementbinding = this.getView().getElementBinding();

                if (oElementbinding && oElementbinding.getBoundContext() === null) {
                    this.getRouter().getTargets().display("notFound");
                }
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
        },
    );
});
