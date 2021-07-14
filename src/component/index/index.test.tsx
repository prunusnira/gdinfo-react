import { render, RenderResult } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import IndexPage from '.'
import "@testing-library/jest-dom/extend-expect"
import store from '../../mobx/store'

let dom: RenderResult
const {language, loginUser, loginStatus} = store

beforeEach(() => {
    // mobx setting for test
    loginStatus.setSignStatus(true)
    loginUser.setUserData({
        id: 'userid',
        token: 'usertoken'
    })
    language.setLang('en')

    dom = render(<MemoryRouter><IndexPage /></MemoryRouter>)
})

describe('index render test', () => {
    it('render', () => {
        dom.getByText('How to use')
    })
})

describe('button link test', () => {
    it('profile', () => {
        expect(dom.getByText('Profile').closest('a')).toHaveAttribute('href', '/profile')
    })
    it('gfskill', () => {
        expect(dom.getByText('GF Skill').closest('a')).toHaveAttribute('href', '/myskill/gf')
    })
    it('dmskill', () => {
        expect(dom.getByText('DM Skill').closest('a')).toHaveAttribute('href', '/myskill/dm')
    })
    it('mybest', () => {
        expect(dom.getByText('My Best').closest('a')).toHaveAttribute('href', '/mybest')
    })
    it('tower', () => {
        expect(dom.getByText('Tower').closest('a')).toHaveAttribute('href', '/tower/index')
        dom.debug()
    })
})