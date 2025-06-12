import http from 'k6/http'
import { check } from 'k6'

export const options = {
  vus: 20, // usuários simultâneos
  duration: '10s', // tempo de execução
}

const BASE_URL = 'http://localhost:3000/process'
const CLIENT_URL = 'http://localhost:3000/clients'
const TOKEN = 'Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlIjp7ImFjY291bnRJZCI6Ijg5NzYwZjJlLWExZmMtNDViZS1iZDFjLTk0ZjYwNDdiNzI0NSIsIm5hbWUiOiJMYWVyY2lvIiwiZW1haWwiOiJsYWVyY2lvQGRldnRyYWNrLmNvbS5iciIsImF2YXRhciI6ImxhZXJjaW9AZGV2dHJhY2suY29tLmJyIiwicm9sZSI6eyJpZCI6ImIyNDU0ZGE0LTcyMTMtNGZlYi1hMmExLWMyYWYwNGVkYWI2YSIsImNyZWF0ZWRBdCI6IjIwMjUtMDUtMjlUMTM6MjA6MjMuMTEzWiIsInVwZGF0ZWRBdCI6IjIwMjUtMDYtMTJUMjA6MDY6MDIuMjM0WiIsImRlbGV0ZWRBdCI6bnVsbCwiaXNBY3RpdmUiOnRydWUsImxhc3RVcGRhdGVkQnlVc2VyIjpudWxsLCJjcmVhdGVkQnlVc2VyIjpudWxsLCJwcmV2aW91c0VuYWJsZSI6dHJ1ZSwibmFtZSI6IkFETUlOSVNUUkFUT1IiLCJkZXNjcmlwdGlvbiI6IkZ1bGwgYWNjZXNzIHRvIGNsaWVudHMgYW5kIHByb2Nlc3NlcyIsImxldmVsIjo5LCJwZXJtaXNzaW9ucyI6WyJFRElUX1BFUk1JU1NJT04iLCJSRU1PVkVfUEVSTUlTU0lPTiIsIkxJU1RfUEVSTUlTU0lPTiIsIk5FV19QRVJNSVNTSU9OIiwiRURJVF9ST0xFIiwiUkVNT1ZFX1JPTEUiLCJMSVNUX1JPTEUiLCJORVdfUk9MRSIsIkVESVRfUFJPQ0VTUyIsIlJFTU9WRV9QUk9DRVNTIiwiTElTVF9QUk9DRVNTIiwiTkVXX1BST0NFU1MiLCJFRElUX0NMSUVOVCIsIlJFTU9WRV9DTElFTlQiLCJMSVNUX0NMSUVOVCIsIk5FV19DTElFTlQiXX0sInByZWZlcmVuY2VzIjpbXX0sImlhdCI6MTc0OTc2NDAzOSwiZXhwIjoxNzQ5NzY3NjM5fQ.w7wW8n0hGA5RCeoEoqwflER0oTSp-r0ao8pI0J1jWkslNhij5cPdrL-agoWmlzi-ucfupUTqQMOHdxbdT7KhLqgNj2iLtriaRRj5fTXqE3IGNbsShhe2fYLLsaipj4krKzpiunV0tjI7cD6SMllBlLGOWuJV2QQ_CRerHI1OGnu2MPO4c8xnQ01zWmsUhJpqC7-WkhS7Pd0cCDizrciq34YgkuvPBbnIq9kag-WwGPRDg11HsCxELGoc8YgbNmpeeCEeG7f0hMRtw4yDYoWCqovd41O-hl-aNUl9DWmLld6QH25ztlOrdRoynY7XFABGi04YFzaBE6OrBzq5Amww6Q'

const HEADERS = {
  headers: {
    Authorization: TOKEN,
  },
}

// Todos os endpoints para simular
const endpoints = [
  `${BASE_URL}/subjects?isActive=true&limit=100&offset=0`,
  `${BASE_URL}/responsible?isActive=true&limit=100&offset=0`,
  `${BASE_URL}/prognosis?isActive=true&limit=100&offset=0`,
  `${BASE_URL}/procedural-status?isActive=true&limit=100&offset=0`,
  `${BASE_URL}/practice-areas?isActive=true&limit=100&offset=0`,
  `${BASE_URL}/phases?isActive=true&limit=100&offset=0`,
  `${BASE_URL}/partner?isActive=true&limit=100&offset=0`,
  `${BASE_URL}/origins?isActive=true&limit=100&offset=0`,
  `${BASE_URL}/locators?isActive=true&limit=100&offset=0`,
  `${BASE_URL}/local-procedure-names?isActive=true&limit=100&offset=0`,
  `${CLIENT_URL}/individual?isActive=true&limit=100&offset=0`,
  `${BASE_URL}/group-process?isActive=true&limit=100&offset=0`,
  `${BASE_URL}/free-field-6?isActive=true&limit=100&offset=0`,
  `${BASE_URL}/free-field-2?isActive=true&limit=100&offset=0`,
  `${BASE_URL}/free-field-1?isActive=true&limit=100&offset=0`,
  `${BASE_URL}/details?isActive=true&limit=100&offset=0`,
  `${BASE_URL}/counties?isActive=true&limit=100&offset=0`,
  `${BASE_URL}/action-objects?isActive=true&limit=100&offset=0`,
]

export default function () {
  for (const url of endpoints) {
    const res = http.get(url, HEADERS)

    check(res, {
      'status 200': (r) => r.status === 200,
    })
  }
}
