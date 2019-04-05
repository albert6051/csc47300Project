/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import Auth from '@aws-amplify/auth'
import { setUser } from './src/utils/auth'

export const onRouteUpdate = (state, page, pages) => {
  Auth.currentAuthenticatedUser()
    .then(user => {
      const userInfo = {
        ...user.attributes,
        username: user.username
      }
      setUser(userInfo)
    })
    .catch(err => {
      window.sessionStorage.setItem('gatsbyUser', null)
    })
}