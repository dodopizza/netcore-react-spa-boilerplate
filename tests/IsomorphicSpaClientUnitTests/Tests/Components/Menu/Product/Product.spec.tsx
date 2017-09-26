import * as React from "react";
import { shallow } from "enzyme";
import { expect, assert } from "chai";
import Product from "../../../../../../src/IsomorphicSpa/Client/Components/Menu/Product/Product";

const setup = () => {
    const props = {
        product: {
            id: 1,
            name: "Name",
            description: "Description"
        },
        onClick: () => { }
    }

    const enzymeWrapper = shallow(<Product {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe("Components", () => {
    describe("Menu", () => {
        describe("Product", () => {
            it("should contain name", () => {
                const { props, enzymeWrapper } = setup();
                expect(enzymeWrapper.find(".product__name").length).to.be.equal(1);
            });

            it("should contain description", () => {
                const { props, enzymeWrapper } = setup();
                expect(enzymeWrapper.find(".product__description").length).to.be.equal(1);
            });
        });
    });
});