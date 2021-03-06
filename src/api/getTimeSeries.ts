import { callJsonApi } from './callApi';
import { Variable } from '../model/variable';
import { TimeSeries } from '../model/timeSeries';

export function getTimeSeriesForPoint(apiServerUrl: string,
                                      datasetId: string,
                                      variable: Variable,
                                      coordinate: [number, number]): Promise<TimeSeries | null> {
    const url = apiServerUrl + `/ts/${datasetId}/${variable.name}/point?lon=${coordinate[0]}&lat=${coordinate[1]}`;
    return callJsonApi<TimeSeries>(url)
        .then(result => {
            const results = result['results'];
            if (!results || results.length === 0) {
                return null;
            }
            const data = results.map((item: any) => {
                return {time: new Date(item.date).getTime(), ...item.result};
            });
            const source = {
                datasetId,
                variableName: variable.name,
                variableUnits: variable.units || undefined,
                coordinate
            };
            return {source, data};
        });
}