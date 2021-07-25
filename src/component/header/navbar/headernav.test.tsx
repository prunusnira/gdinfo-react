import React from 'react'
import {render, RenderResult} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import "@testing-library/jest-dom/extend-expect"
import SinHeader from '../sinHeader'

let headerDom: RenderResult

beforeEach(() => {
    headerDom = render(
        <MemoryRouter>
            <SinHeader />
        </MemoryRouter>
    )
})

describe('헤더 링크 테스트', () => {
    it('index', () => {
        expect(headerDom.getByTestId('header-index').closest('a')).toHaveAttribute('href', '/index')
    })
    it('mydata-profile', () => {
        expect(headerDom.getByTestId('header-/profile').closest('a')).toHaveAttribute('href', '/profile')
    })
    it('mydata-gfskill', () => {
        expect(headerDom.getByTestId('header-/myskill/gf').closest('a')).toHaveAttribute('href', '/myskill/gf')
    })
    it('mydata-dmskill', () => {
        expect(headerDom.getByTestId('header-/myskill/dm').closest('a')).toHaveAttribute('href', '/myskill/dm')
    })
    it('mydata-mybest', () => {
        expect(headerDom.getByTestId('header-/mybest').closest('a')).toHaveAttribute('href', '/mybest')
    })
    it('mydata-snapshot', () => {
        expect(headerDom.getByTestId('header-/snapshot').closest('a')).toHaveAttribute('href', '/snapshot')
    })
    it('skill-recent', () => {
        expect(headerDom.getByTestId('header-/recent').closest('a')).toHaveAttribute('href', '/recent')
    })
    it('skill-ranking', () => {
        expect(headerDom.getByTestId('header-/rank/gf/1').closest('a')).toHaveAttribute('href', '/rank/gf/1')
    })
    it('skill-exc', () => {
        expect(headerDom.getByTestId('header-/exc/gf').closest('a')).toHaveAttribute('href', '/exc/gf')
    })
    it('skill-playcount', () => {
        expect(headerDom.getByTestId('header-/cntrank/1').closest('a')).toHaveAttribute('href', '/cntrank/1')
    })
    it('ptn-list', () => {
        expect(headerDom.getByTestId('header-/pattern/00/titleasc/1?hot=h').closest('a')).toHaveAttribute('href', '/pattern/00/titleasc/1?hot=h')
    })
    it('ptn-nonplay', () => {
        expect(headerDom.getByTestId('header-/notplayed').closest('a')).toHaveAttribute('href', '/notplayed')
    })
    it('ptn-cleartable', () => {
        expect(headerDom.getByTestId('header-/cleartable').closest('a')).toHaveAttribute('href', '/cleartable')
    })
    it('tower', () => {
        expect(headerDom.getByTestId('header-tower').closest('a')).toHaveAttribute('href', '/tower/index')
    })
    it('login', () => {
        expect(headerDom.getByTestId('header-login').closest('a')).toHaveAttribute('href', '/login')
    })
})