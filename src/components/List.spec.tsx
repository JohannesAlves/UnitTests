import { queryByText, render, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import List from "./List";

describe("App Component", () => {
    it("should render list items", async () => {
        const { getByText } = render(<List initialItems={["Joh", "Ok", "Sim"]} />);

        expect(getByText("Joh")).toBeInTheDocument();
        expect(getByText("Ok")).toBeInTheDocument();
        expect(getByText("Sim")).toBeInTheDocument();
    });

    it("should be able to add new item list", async () => {
        const { getByText, getByPlaceholderText, findByText } = render(<List initialItems={[]} />);

        const inputElement = getByPlaceholderText("Novo Item");
        const addButton = getByText("Adicionar");

        await userEvent.setup().type(inputElement, "Novo");
        await userEvent.setup().click(addButton);

        expect(await findByText("Novo")).toBeInTheDocument;
    });

    it("should be able to remove item list", async () => {
        const { getByText, getAllByText, queryByText } = render(<List initialItems={["Joh"]} />);

        const addButton = getByText("Adicionar");
        const removeButtons = getAllByText("Remover");

        await userEvent.setup().click(removeButtons[0]);

        await waitForElementToBeRemoved(() => {
            return queryByText("Joh");
        });
    });
});
