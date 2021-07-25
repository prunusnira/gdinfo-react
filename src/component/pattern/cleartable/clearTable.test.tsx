import React from 'react'
import {render, RenderResult} from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router-dom'
import "@testing-library/jest-dom/extend-expect"
import ClearTable from './clearTable'
import { ReactElement } from 'react'

let dom: RenderResult

const renderWithRouter = (children: ReactElement, init: string) => (
    render(
        <MemoryRouter initialEntries={[init]}>
            <Route path='/cleartable/:userid'>
                {children}
            </Route>
        </MemoryRouter>
    )
)

beforeEach(() => {
    dom = renderWithRouter(
        <ClearTable />, '/cleartable/18'
    )
})

describe('check clear table render', () => {
    it('page render check', () => {
        dom.getByText('Clear Status Table')
    })
})