import { Highlight, themes } from 'prism-react-renderer'

import React from 'react'

export interface CodeProps {
  children: string
}

export const Code: React.FC<CodeProps> = ({ children }) => {
  return (
    <Highlight theme={themes.github} code={children} language="python">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
