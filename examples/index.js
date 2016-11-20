import React from 'react'
import { render } from 'react-dom'

import { grid } from '../src' // so the linter won't complain

const App = () => grid`
        "+---------------------------------+      "
        "|        ${<Header/>}             | 120px"
        "+---------------------------------+      "
        "                                         "
        "+-- 30% -----+  +--- auto --------+      "
        "| ${<Side/>} |  | ${<Main/>}      | auto "
        "+------------+  +-----------------+      "
        "                                         "
        "+---------------------------------+      "
        "|              ↓                  | 60px "
        "|         → ${<Footer/>} ←       |      "
        "+---------------------------------+      "
`

const Header = ({ className }) => 
  <header className={className}> 
    this is the header 
  </header>

const Side = ({ className }) => 
  <div className={className}> 
    this is the sidebar
  </div>

const Main = ({ className }) => 
  <div className={className}> 
    main area
  </div>

const Footer = ({ className }) => 
  <footer className={className}> 
    footer area
  </footer>


render(<App/>, window.app)

