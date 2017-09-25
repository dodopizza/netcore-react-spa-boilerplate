"use strict";
exports.__esModule = true;
var React = require("react");
var enzyme_1 = require("enzyme");
var chai_1 = require("chai");
var Product_1 = require("../../../../../../src/Client/Components/Menu/Product/Product");
var setup = function () {
    var props = {
        product: {
            id: 1,
            name: "Name",
            description: "Description"
        },
        onClick: function () { }
    };
    var enzymeWrapper = enzyme_1.shallow(<Product_1["default"] {...props}/>);
    return {
        props: props,
        enzymeWrapper: enzymeWrapper
    };
};
describe("Components", function () {
    describe("Menu", function () {
        describe("Product", function () {
            it("should contain name", function () {
                var _a = setup(), props = _a.props, enzymeWrapper = _a.enzymeWrapper;
                chai_1.expect(enzymeWrapper.find(".product__name").length).to.be.equal(1);
            });
            it("should contain description", function () {
                var _a = setup(), props = _a.props, enzymeWrapper = _a.enzymeWrapper;
                chai_1.expect(enzymeWrapper.find(".product__description").length).to.be.equal(1);
            });
        });
    });
});
