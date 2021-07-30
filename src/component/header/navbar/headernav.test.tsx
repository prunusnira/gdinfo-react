import SinHeader from "../sinHeader"
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import React from "react"
import { MemoryRouter } from "react-router-dom"

describe('헤더 링크 테스트', () => {
    it('링크 테스트', () => {
        const dom = render(
            <MemoryRouter>
                <SinHeader/>
            </MemoryRouter>
        )

        expect(dom.getByTestId('header-index').closest('a')).toHaveAttribute('href', '/index')

        expect(dom.getByText('Profile').closest('a')).toHaveAttribute('href', '/profile')
        expect(dom.getByText('GF skill').closest('a')).toHaveAttribute('href', '/myskill/gf')
        expect(dom.getByText('DM skill').closest('a')).toHaveAttribute('href', '/myskill/dm')
        expect(dom.getByText('Most played').closest('a')).toHaveAttribute('href', '/mybest')
        expect(dom.getByText('Skill Table Snapshot').closest('a')).toHaveAttribute('href', '/snapshot')
        
        expect(dom.getByText('Recent updated users').closest('a')).toHaveAttribute('href', '/recent')
        expect(dom.getByText('Skill ranking').closest('a')).toHaveAttribute('href', '/rank/gf/1')
        expect(dom.getByText('Theoretical Skill').closest('a')).toHaveAttribute('href', '/exc/gf')
        expect(dom.getByText('Play count ranking').closest('a')).toHaveAttribute('href', '/cntrank/1')
        
        expect(dom.getByText('Pattern List').closest('a')).toHaveAttribute('href', '/pattern/00/titleasc/1?hot=h')
        expect(dom.getByText('Patterns not played').closest('a')).toHaveAttribute('href', '/notplayed')
        expect(dom.getByText('Clear table').closest('a')).toHaveAttribute('href', '/cleartable')
        
        expect(dom.getByTestId('header-tower').closest('a')).toHaveAttribute('href', '/tower/index')
        expect(dom.getByTestId('header-login').closest('a')).toHaveAttribute('href', '/login')
    })
})