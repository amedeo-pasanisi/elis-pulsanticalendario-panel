import { PanelPlugin } from '@grafana/data';
import { PulsantiCalendarioOptions } from './types';
import { PulsantiCalendarioPanel } from './components/pulsantiCalendarioPanel';

export const plugin = new PanelPlugin<PulsantiCalendarioOptions>(PulsantiCalendarioPanel).setPanelOptions((builder) => {
  return builder
    .addMultiSelect({
      path: 'selectedButtons',
      name: 'Seleziona i pulsanti da visualizzare',
      settings: {
        options: [
          { value: 'settimana', label: 'settimana' },
          { value: 'mese', label: 'mese' },
          { value: 'anno', label: 'anno' },
          { value: 'periodo', label: 'periodo' },
        ],
      },
    })
    .addTextInput({
      path: 'periodoInizio',
      name: 'Data di inizio periodo',
      description: 'Date format YY-MM-DD',
      showIf(currentOptions) {
        return currentOptions.selectedButtons?.includes('periodo')
      },
    })
    .addTextInput({
      path: 'periodoFine',
      name: 'Data di fine periodo',
      description: 'Date format YY-MM-DD',
      defaultValue: new Date().toISOString().split('T')[0],
      showIf(currentOptions) {
        return currentOptions.selectedButtons?.includes('periodo')
      },
    })
    .addTextInput({
      path: 'variable_data_inizio',
      name: 'Variabile inizio',
      description: 'Variabile della data di inizio da modificare al click dei pulsanti'
    })
    .addTextInput({
      path: 'variable_data_fine',
      name: 'Variabile fine',
      description: 'Variabile della data di fine da modificare al click dei pulsanti'
    })
});
