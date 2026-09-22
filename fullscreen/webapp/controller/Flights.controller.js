sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], (Controller, MessageToast, MessageBox) => {
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
            },
            onHoverPress: function (oEvent) {
                var carrid = oEvent.getSource().data("id");
                var fldate = oEvent.getSource().data("fldate");
                var connid = oEvent.getSource().data("connid");

                MessageBox.confirm("Are you sure you want to book this flight?", function (oAction) {
                    if (oAction === MessageBox.Action.OK) {
                        var oEntry = {};
                        oEntry.Carrid = carrid;
                        oEntry.Fldate = fldate;
                        oEntry.Connid = connid;
                        oEntry.Counter = "1";
                        oEntry.Bookid = "43535432";
                        oEntry.Customid = "00003406";
                        oEntry.Passname = "John Doe";


                    }
                    var oModel = this.getOwnerComponent().getModel();
                    var customerHeader = { "Content-Type": "application/json" };
                    oModel.setHeaders(customerHeader);

                }.bind(this));

            },

            _createBookingEntry: function (oModel, oEntry) {
                return new Promise((resolve, reject) => {
                    oModel.create("/UX_C_Booking_TP", oEntry, {
                        success: function (oData, response) {
                            resolve(oData.Bookid, response);
                        },
                        error: function (oError) {
                            reject(oError);
                        }
                    });
                });
            },

            _handleBookingSuccess: function (sBookid, oResponse) {
                MessageBox.alert("Flight booked. Booking reference number: " + sBookid );
            },

            _handleBookingError: function (oError) {
                if (oError) {
                    if (oError.responseText) {
                        var oErrorResponse = JSON.parse(oError.responseText);
                        MessageBox.error("Error booking flight: " + oErrorResponse.error.message.value);
                    }
                }
            }
        }
    );
});
