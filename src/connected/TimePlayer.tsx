import { connect } from 'react-redux';

import { AppState } from '../states/appState';
import TimePlayer from '../components/TimePlayer';
import { selectTime, selectTimeRange, updateTimeAnimation } from '../actions/controlActions';
import { UNIT } from "../model/timeSeries";


const mapStateToProps = (state: AppState) => {
    return {
        selectedTime: state.controlState.selectedTime,
        selectedTimeRange: state.controlState.selectedTimeRange,
        step: UNIT.days,
        timeAnimationActive: state.controlState.timeAnimationActive,
        timeAnimationInterval: state.controlState.timeAnimationInterval,
    };
};

const mapDispatchToProps = {
    selectTime,
    selectTimeRange,
    updateTimeAnimation,
};

export default connect(mapStateToProps, mapDispatchToProps)(TimePlayer);
