import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchInput from "./SearchInput";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as weatherApi from "../api/weather";

// Mock debounce to trigger immediately
jest.mock("../hooks/useDebounce", () => ({
    useDebounce: (value: string) => value
}));

// Mock API function
jest.spyOn(weatherApi, "searchCity").mockImplementation(async (query: string) => ({
    results: [
        { id: 1, name: "London", country: "UK", lat: 51.5074, lon: -0.1278 },
        { id: 2, name: "Los Angeles", country: "USA", lat: 34.0522, lon: -118.2437 }
    ]
}));

const queryClient = new QueryClient();

function renderWithClient(ui: React.ReactElement) {
    return render(
        <QueryClientProvider client={queryClient}>
            {ui}
        </QueryClientProvider>
    );
}

describe("SearchInput", () => {
    it("renders input", () => {
        renderWithClient(<SearchInput onSelect={jest.fn()} />);
        expect(screen.getByPlaceholderText(/enter city/i)).toBeInTheDocument();
    });

    it("shows search results after typing", async () => {
        renderWithClient(<SearchInput onSelect={jest.fn()} />);

        fireEvent.change(screen.getByPlaceholderText(/enter city/i), {
            target: { value: "Lo" }
        });

        await waitFor(() => {
            expect(screen.getByText(/London/)).toBeInTheDocument();
            expect(screen.getByText(/Los Angeles/)).toBeInTheDocument();
        });
    });

    it("calls onSelect when result clicked", async () => {
        const onSelectMock = jest.fn();
        renderWithClient(<SearchInput onSelect={onSelectMock} />);

        fireEvent.change(screen.getByPlaceholderText(/enter city/i), {
            target: { value: "Lo" }
        });

        await waitFor(() => {
            expect(screen.getByText(/London/)).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText(/London/));
        expect(onSelectMock).toHaveBeenCalledWith(51.5074, -0.1278);
    });
});
