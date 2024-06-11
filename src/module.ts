import { PanelPlugin } from '@grafana/data';
import { PulsantiCalendarioOptions } from './types';
import { PulsantiCalendarioPanel } from './components/pulsantiCalendarioPanel';

export const plugin = new PanelPlugin<PulsantiCalendarioOptions>(PulsantiCalendarioPanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'periodoInizio',
      name: 'Data di inizio periodo',
    })
    .addTextInput({
      path: 'periodoFine',
      name: 'Data di fine periodo',
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
