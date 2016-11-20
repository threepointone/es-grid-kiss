import React from 'react'
import { style, plugins } from 'glamor'

plugins.clear()

export function grid(spec, elements) {
  return <div className={style(spec)}>{
    Object.keys(elements)
      .map(x => React.cloneElement(elements[x], { 
        key: elements[x].props.key || x,
        className: ((elements[x].props.className || '') + ' ' + x).trim() 
      }))
  }</div>
}
