import React, { useState } from 'react'
import { PanelProps } from '@grafana/data'
import { PulsantiCalendarioOptions } from 'types'
import { css, cx } from '@emotion/css'
import { PanelDataErrorView, locationService } from '@grafana/runtime'
import './pulsantiCalendarioPanelStyle.css'

interface PulsantiCalendarioPanelProps extends PanelProps<PulsantiCalendarioOptions> {}

export const PulsantiCalendarioPanel: React.FC<PulsantiCalendarioPanelProps> = ({ options, data, width, height, fieldConfig, id }) => {
  const [clickedButton, setClickedButton] = useState<string>('')

  function parseUserInput(userInput: string): string | undefined {
    if (userInput) {
      const date = new Date(userInput)
      if (isNaN(date.getTime())) {
        console.error("Invalid date format")
        return
      }
      const year = String(date.getFullYear())
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }
    return
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const currentDate = new Date()
    let dataInizio: string | undefined
    let dataFine: string | undefined = currentDate.toISOString().split('T')[0]
    switch (e.currentTarget.innerText) {
      case 'Ultima Settimana':
        dataInizio = new Date(new Date().setDate(new Date().getDate()-7)).toISOString().split('T')[0]
        setClickedButton('week')
        break
      case 'Ultimo Mese':
        dataInizio = new Date(currentDate.setMonth(currentDate.getMonth() - 1)).toISOString().split('T')[0]
        setClickedButton('month')
        break
      case 'Ultimo Anno':
        let currentYear = currentDate.getFullYear()
        dataInizio = new Date(currentYear, 0, 1).toISOString().split('T')[0]
        setClickedButton('year')
        break
      case 'Tutto il periodo':
        const userDataInizioPeriodo = parseUserInput(options.periodoInizio)
        const userDataFinePeriodo = parseUserInput(options.periodoFine)
        if (userDataInizioPeriodo && userDataFinePeriodo) {
          dataInizio = userDataInizioPeriodo
          dataFine = userDataFinePeriodo
        } else {
          console.error("Insert Data inizio and Data fine options")
          dataInizio = undefined
          dataFine = undefined
        }
        break
    }
    console.log(dataInizio, dataFine)
    locationService.partial({
      [`var-${options.variable_data_inizio}`]: dataInizio && `"${dataInizio}"`,
      [`var-${options.variable_data_fine}`]: dataFine && `"${dataFine}"`
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
      <button className={`calendarioButton ${clickedButton === 'week' && 'clicked'}`} onClick={e => handleButtonClick(e)}>
        Ultima Settimana
      </button>
      <button className={`calendarioButton ${clickedButton === 'month' && 'clicked'}`} onClick={e => handleButtonClick(e)}>
        Ultimo Mese
      </button>
      <button className={`calendarioButton ${clickedButton === 'year' && 'clicked'}`} onClick={e => handleButtonClick(e)}>
        Ultimo Anno
      </button>
      <button className={`calendarioButton ${clickedButton === 'period' && 'clicked'}`} onClick={e => handleButtonClick(e)}>
        Tutto il periodo
      </button>
    </div>
  )
}
