import './textStyles.css'

import React from 'react'

export const LargeText: React.FC<{text: string | null }> = ({text}) => {
  return (
    <h1 className='largeText'>{text}</h1>
  )
}

export const MediumText: React.FC<{text: string | null }> = ({text}) => {
  return (
    <h1 className='mediumText'>{text}</h1>
  )
}
