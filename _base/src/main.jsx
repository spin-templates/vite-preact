import { render } from 'preact'
import './index.css'
import { initTheme } from './theme.js'
import { App } from './app.jsx'

initTheme()

render(<App />, document.getElementById('app'))