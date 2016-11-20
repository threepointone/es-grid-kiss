import { parse } from 'postcss-grid-kiss/src/parse'
import { getAlignContent } from 'postcss-grid-kiss/src/align-content'
import { getJustifyContent } from 'postcss-grid-kiss/src/justify-content'
import { getAlignSelf } from 'postcss-grid-kiss/src/align-self'
import { getJustifySelf } from 'postcss-grid-kiss/src/justify-self'
import { getGridRows } from 'postcss-grid-kiss/src/grid-template-rows'
import { getGridCols } from 'postcss-grid-kiss/src/grid-template-columns'
import { getGridAreas } from 'postcss-grid-kiss/src/grid-template-areas'

import * as babylon from 'babylon'

function padTill(str, len) {
  while(str.length < len) {
    str+= ' '
  }
  return str
}

module.exports = {
  visitor: {
    TaggedTemplateExpression(path) {
      
      let code = path.hub.file.code 
      if(path.node.tag.name === 'grid') {
        let stubs = path.node.quasi.expressions.map(x => code.substring(x.start, x.end))          
        let stubCtx = stubs.reduce((o, stub, i) => (o['x' + i] = stub, o), {})
        let ctr = 0
        let strs = path.node.quasi.quasis.map(x => x.value.cooked)
        let src = strs.reduce((arr, str, i) => {
          arr.push(str)
          if(i !== stubs.length) {
            arr.push(padTill('.x' + ctr++, stubs[i].length + 3))
          }
          return arr
        }, []).join('')
        let input =  parse({ value: src })
        
        let ret = {
          display: 'grid',
          alignContent: getAlignContent(input),
          justifyContent: getJustifyContent(input),
          gridTemplateRows: getGridRows(input),
          gridTemplateColumns: getGridCols(input),
          gridTemplateAreas: '\n' + getGridAreas(input).join('\n') + '\n',
          ...input.zones.filter(zone => zone.selector != null).reduce((o, zone) => {
            o[`& > .${zone.name}`] = {
              gridArea: zone.name,
              justifySelf: getJustifySelf(zone),
              alignSelf: getAlignSelf(zone)
            }
            return o
          }, {})
        }

        let newSrc = `grid(${JSON.stringify(ret, null, '  ')}, {
          ${Object.keys(stubCtx).map(x => `'${x}': ${stubCtx[x]}`).join(',\n')}
        })`

        let transformed = babylon.parse(newSrc, { plugins: [
          'jsx', 'flow', 'doExpressions', 'objectRestSpread', 'decorators', 'classProperties',
          'exportExtensions', 'asyncGenerators', 'functionBind', 'functionSent', 'dynamicImport' ]
        })


        path.replaceWith(transformed.program.body[0])
      }
    }    
  }
}

