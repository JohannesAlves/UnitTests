import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App Component", () => {
    it("should render list items", async () => {
        const { getByText } = render(<App />);

        expect(getByText("Joh")).toBeInTheDocument();
        expect(getByText("Ok")).toBeInTheDocument();
        expect(getByText("Sim")).toBeInTheDocument();
    });

    it("should be able to add new item list", async () => {
        const { getByText, debug } = render(<App />);

        const addButton = getByText("Adicionar");

        debug();
        await userEvent.setup().click(addButton);
        debug();

        expect(getByText("Novo")).toBeInTheDocument();
    });
});
