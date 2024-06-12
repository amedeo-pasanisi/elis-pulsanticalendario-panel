import { PanelPlugin } from '@grafana/data';
import { PulsantiCalendarioOptions } from './types';
import { PulsantiCalendarioPanel } from './components/pulsantiCalendarioPanel';

export const plugin = new PanelPlugin<PulsantiCalendarioOptions>(PulsantiCalendarioPanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'periodoInizio',
      name: 'Data di inizio periodo',
      description: 'Date format YY-MM-DD'
    })
    .addTextInput({
      path: 'periodoFine',
      name: 'Data di fine periodo',
      description: 'Date format YY-MM-DD',
      defaultValue: new Date().toISOString().split('T')[0]
    })
    .addTextInput({
      path: 'variable_data_inizio',
      name: 'Variabile della data di inizio',
    })
    .addTextInput({
      path: 'variable_data_fine',
      name: 'Variabile della data di fine',
    })
});
