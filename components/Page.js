// Module imports
import React from 'react'
import { bindActionCreators } from 'redux'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'





// Component imports
import {
  actions,
  initStore,
} from '../store'
import ReduxDevTools from './ReduxDevTools'
import Dialog from './Dialog'
import LoginDialog from './LoginDialog'
import Head from './Head'
import Header from './Header'
import Reminders from './Reminders'
import UserMenu from './UserMenu'





// Component constants
const store = initStore()





export default (Component, title = 'Untitled', reduxOptions = {}) => {
  class Page extends React.Component {
    static async getInitialProps(ctx) {
      let {
        asPath,
        isServer,
        query,
      } = ctx
      let props = {}

      if (typeof Component.getInitialProps === 'function') {
        props = await Component.getInitialProps(ctx)
      }

      return {
        asPath,
        isServer,
        query,
        ...props
      }
    }

    render() {
      let {
        isServer,
        path,
      } = this.props
      let mainClasses = ['fade-in', 'page', title.toLowerCase().replace(' ', '-')].join(' ')

      return (
        <Provider store={store}>
          <div role="application">
            <Head title={title} />

            <Header
              isServer={isServer}
              path={path} />

            <UserMenu />

            <Reminders />

            <main className={mainClasses}>
              <Component {...this.props} />
            </main>

            <Dialog />

            <ReduxDevTools />
          </div>
        </Provider>
      )
    }
  }

  if (reduxOptions.mapStateToProps || reduxOptions.mapDispatchToProps) {
    return withRedux(initStore, reduxOptions.mapStateToProps, reduxOptions.mapDispatchToProps)(Page)
  }

  return Page
}
