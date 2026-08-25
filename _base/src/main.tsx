import { render } from 'preact'
import './index.css'
import { initTheme } from './theme.ts'
import { App } from './app.tsx'

initTheme()

render(<App />, document.getElementById('app')!)