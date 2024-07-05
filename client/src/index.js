import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/app'
import reportWebVitals from './reportWebVitals'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

const client = new ApolloClient({
  uri: 'http://localhost:8000',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          my: { merge: (existing, incoming) => incoming },
        },
      },
    },
  }),
})

loadDevMessages()
loadErrorMessages()

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
