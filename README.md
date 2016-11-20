es-grid-kiss
---

[postcss-grid-kiss](https://github.com/sylvainpolletvillard/postcss-grid-kiss), but in your js 

```jsx
import { grid } from 'es-grid-kiss'

const App = () => grid`
        "+------------------------------------+      "
        "|           ${<Header/>} ↑           | 120px"
        "+------------------------------------+      "
        "                                            "
        "+-- 30% --------+  +--- auto --------+      "
        "| ${<Sidebar/>} |  |   ${<Main/>}    | auto "
        "+---------------+  +-----------------+      "
        "                                            "
        "+------------------------------------+      "
        "|              ↓                     | 60px "
        "|         → ${<Footer/>} ←           |      "
        "+------------------------------------+      "
`
```

usage
---

add 'es-grid-kiss/lib/babel' to the `plugins` field of your babel config

nb:
---
css grids are behind flags on major browsers, and the [polyfill](https://github.com/FremyCompany/css-grid-polyfill/) gives mixed results. ymmv.