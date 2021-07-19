import React from 'react'
import {render, RenderResult} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import "@testing-library/jest-dom/extend-expect"
import SinHeader from './sinHeader'

let headerDom: RenderResult

beforeEach(() => {
    headerDom = render(
        <MemoryRouter>
            <SinHeader />
        </MemoryRouter>
    )
})

describe('header rending test', () => {
    it('render', () => {
        expect(headerDom.getByText('Music')).toBeInTheDocument()
    })
})

describe('head link test', () => {
    it('index', () => {
        expect(headerDom.getByTestId('header-index').closest('a')).toHaveAttribute('href', '/index')
    })
    it('mydata-profile', () => {
        headerDom.getByTestId('header-/profile')
    })
    it('mydata-gfskill', () => {
        headerDom.getByTestId('header-/myskill/gf')
    })
    it('mydata-dmskill', () => {
        headerDom.getByTestId('header-/myskill/dm')
    })
    it('mydata-mybest', () => {
        headerDom.getByTestId('header-/mybest')
    })
    it('mydata-snapshot', () => {
        headerDom.getByTestId('header-/snapshot')
    })
    it('skill-recent', () => {
        headerDom.getByTestId('header-/recent')
    })
    it('skill-ranking', () => {
        headerDom.getByTestId('header-/rank/gf/1')
    })
    it('skill-exc', () => {
        headerDom.getByTestId('header-/exc/gf')
    })
    it('skill-playcount', () => {
        headerDom.getByTestId('header-/cntrank/1')
    })
    it('ptn-list', () => {
        headerDom.getByTestId('header-/pattern/00/titleasc/1?hot=h')
    })
    it('ptn-nonplay', () => {
        headerDom.getByTestId('header-/notplayed')
    })
    it('ptn-cleartable', () => {
        headerDom.getByTestId('header-/cleartable')
    })
    it('tower', () => {
        headerDom.getByTestId('header-tower')
    })
    it('login', () => {
        headerDom.getByTestId('header-login')
    })
})