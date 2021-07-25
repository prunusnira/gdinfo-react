import { render, RenderResult, waitFor } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import IndexPage from './index'
import "@testing-library/jest-dom/extend-expect"
import store from '@/mobx/store'
import { act } from 'react-dom/test-utils'

let dom: RenderResult
const {language, loginUser, loginStatus} = store
/*
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

describe('메인 페이지 렌더링 테스트', () => {
    it('render', () => {
        dom.getByText('How to use')
    })
})

describe('각 버튼의 링크 테스트', () => {
    it('profile', () => {
        act(() => {
            expect(dom.getByText('Profile').closest('a')).toHaveAttribute('href', '/profile')
        })
    })
    it('gfskill', () => {
        act(() => {
            expect(dom.getByText('GF Skill').closest('a')).toHaveAttribute('href', '/myskill/gf')
        })
    })
    it('dmskill', () => {
        act(() => {
            expect(dom.getByText('DM Skill').closest('a')).toHaveAttribute('href', '/myskill/dm')
        })
    })
    it('mybest', () => {
        act(() => {
            expect(dom.getByText('My Best').closest('a')).toHaveAttribute('href', '/mybest')
        })
    })
    it('tower', () => {
        act(() => {
            expect(dom.getByText('Tower').closest('a')).toHaveAttribute('href', '/tower/index')
        })
    })
})*/