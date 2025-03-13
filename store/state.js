import { atom } from 'recoil';

// 로그인 전역 상태
const log = atom({
  key: 'log',
  default: false,
});

// 아바타 전역 상태 (라라, 푸푸, 우비, 소예)
const avarta = atom({
  key: 'avarta',
  default: 'default',
});

// 계정 전역 상태
const uid = atom({
  key: 'uid',
  default: 'default',
});

// 모바일 상태 여부
const mobile = atom({
  key: 'mobile',
  default: false,
});

// 유저 유형
const userClass = atom({
  key: 'userClass',
  default: '',
});

// 기관 유형
const agencyClass = atom({
  key: 'agencyClass',
  default: '',
});

// 모달 상태
const modal = atom({
  key: 'modal',
  default: false,
});

const isNavOpenState = atom({
  key: 'isNavOpenState',
  default: false,
});

export {
  log,
  avarta,
  uid,
  mobile,
  userClass,
  agencyClass,
  modal,
  isNavOpenState,
};
