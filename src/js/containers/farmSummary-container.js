import { connect } from 'react-redux';
import FarmSummary from '../components/farmSummary';


const mapStateToProps = ({ feed, user, network }) => {

    const data = feed.data;

    return {

    };
};

const mapDispatchToProps = (dispatch, props) => {
    const { navigation } = props;
    return {

    };
};


const FarmSummaryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FarmSummary);

export default FarmSummaryContainer;
