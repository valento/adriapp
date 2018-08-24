import React from 'react'
import { Grid } from 'semantic-ui-react'

export default function NextEvent(props) {
  let dd = new Date(props.date)
  const lan = {
    es: {
        week: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        mon: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
      },
    en:
      {
        week: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        mon: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Dicember']
      }
  }
  const { mon, week } = lan[props.lan]
  return (
    <Grid padded className='day_page v-center'>
      <Grid.Row centered className='month'>{mon[dd.getMonth()]}</Grid.Row>
      <Grid.Row centered className='date'><span>{dd.getDate()}</span></Grid.Row>
      <Grid.Row centered className='day'>{week[dd.getDay()]}</Grid.Row>
    </Grid>
  )
}
