import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import { store } from './Redux/store.js';
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <GoogleOAuthProvider clientId='182703700557-7tet1legaapbobrc24vfkl7pfdefv2ca.apps.googleusercontent.com'>
        {/* <StrictMode> */}
          <App />
        {/* </StrictMode> */}
      </GoogleOAuthProvider>
    </BrowserRouter>
  </Provider>
)
