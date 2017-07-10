import { connect } from 'react-redux';
import Feed from '../components/feed';


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


const FarmDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Feed);

export default FarmDetailContainer;
