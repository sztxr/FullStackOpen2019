import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, DashedContainer } from './styles/styles'

const Togglable = React.forwardRef((props, ref) => {
  const { buttonLabel, children } = props

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => { setVisible(!visible) }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <DashedContainer>
      <div style={hideWhenVisible}>
        <Button primary onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button secondary onClick={toggleVisibility}>Cancel</Button>
      </div>
    </DashedContainer>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable