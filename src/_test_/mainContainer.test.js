import { act, renderHook, render, fireEvent, cleanup, waitForElement } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import AppContainer from '../components/mainContainer';

const mockSetState = jest.fn();

describe('Testoing for Main Container', () => {
    it("test Cases for state", () => {
        const { result } = renderHook(AppContainer);
        act(() => {
            console.log(result.current.useEffect);
        })
    })
})

