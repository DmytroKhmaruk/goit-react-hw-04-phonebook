import PropTypes from 'prop-types';
import FilterStyles from './FilterStyles';

function Filter ({ value, handleOnChangeFilter }) {
  return (
    <>
      <h3>Find contacts by name</h3>
      <FilterStyles
       type="text"
       value={value}
       onChange={handleOnChangeFilter} />
    </>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  handleOnChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
