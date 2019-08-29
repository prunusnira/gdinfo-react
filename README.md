# GITADORA Info React Frontend Project

## 개요

GITADORA Info의 프론트엔드를 React로 변경하는 프로젝트입니다.

이 프로젝트는 [Create React App](https://github.com/facebook/create-react-app) 으로 시작했습니다.

## 구성

### 기존의 GITADORA Info의 프론트엔드

Thymeleaf (템플릿엔진) + Vue.js + jQuery + 기타 JS 라이브러리

### 변경된 프론트엔드

1) create-react-app으로 앱 베이스 구성
2) react-router로 라우터 구성
3) bootstrap / reactstrap으로 UI 구성 (기존의 UI를 그대로 계승)
4) axios로 AJAX 사용
5) jQuery는 사용하지 않음
6) raphael.js로 표시하던 그래프를 Recharts로 변경
* 개발 상황에 따라 추가 예정

## 현황

현재는 jQuery가 사용된 js 파일들이 많이 포함되어 있으나 이는 개발중에 점차적으로 jQuery를 없애면서 React SPA 앱으로 변경될 예정

## 개발 및 테스트 완료 이후

gdinfo-public repo에서 프론트엔드 관련 코드를 모두 제거할 예정