import React from 'react'
import { Icon, Grid } from 'semantic-ui-react'

function Unlock(props) {
  return (
    <Grid.Column textAlign='center'>
      <Icon
        onClick={
          (e) =>{
            e.stopPropagation()
            props.onClick()
          }
        }
        name='arrow alternate circle down'
        size='huge'
      />
    </Grid.Column>
  )
}

//<FaDown onClick={props.onClick} color='#ffffff' size='64px' />

export default Unlock
