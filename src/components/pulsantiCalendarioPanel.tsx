import React from 'react'
import { PanelProps } from '@grafana/data'
import { PulsantiCalendarioOptions } from 'types'
import { css, cx } from '@emotion/css'
import { PanelDataErrorView, locationService } from '@grafana/runtime'
import './pulsantiCalendarioPanelStyle.css'

interface PulsantiCalendarioPanelProps extends PanelProps<PulsantiCalendarioOptions> {}

export const PulsantiCalendarioPanel: React.FC<PulsantiCalendarioPanelProps> = ({ options, data, width, height, fieldConfig, id }) => {

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const currentDate = new Date()
    let dataInizio
    let dataFine = currentDate.toLocaleDateString()
    switch (e.currentTarget.innerText) {
      case 'Ultima Settimana':
        dataInizio = new Date(new Date().setDate(new Date().getDate()-7)).toLocaleDateString()
        break
      case 'Ultimo Mese':
        dataInizio = new Date(currentDate.setMonth(currentDate.getMonth() - 1)).toLocaleDateString()
        break
      case 'Ultimo Anno':
        let currentYear = currentDate.getFullYear()
        dataInizio = new Date(currentYear, 0, 1).toLocaleDateString()
        break
      case 'Tutto il periodo':
        dataInizio = options.periodoInizio
        dataFine = options.periodoFine 
        break
    }
    console.log('inizio', `"${dataInizio ?? ''}"`)
    console.log('fine', `"${dataFine ?? ''}"`)
    locationService.partial({
      [`var-${options.variable_data_inizio}`]: `"${dataInizio ?? ''}"`,
      [`var-${options.variable_data_fine}`]: `"${dataFine ?? ''}"`
    }, true)
  }

  if (data.series.length === 0) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />
  }

  return (
    <div className={cx(
      css`
        width: ${width}px;
        height: ${height}px;
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
      `
    )}>
      <button className='calendarioButton' onClick={e => handleButtonClick(e)}>
        Ultima Settimana
      </button>
      <button className='calendarioButton' onClick={e => handleButtonClick(e)}>
        Ultimo Mese
      </button>
      <button className='calendarioButton' onClick={e => handleButtonClick(e)}>
        Ultimo Anno
      </button>
      <button className='calendarioButton' onClick={e => handleButtonClick(e)}>
        Tutto il periodo
      </button>
    </div>
  )
}
