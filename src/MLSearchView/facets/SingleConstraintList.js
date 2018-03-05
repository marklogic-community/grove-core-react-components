import React from 'react';
import PropTypes from 'prop-types';

const SingleConstraintList = ({
  values,
  selectedValues,
  addConstraint,
  removeConstraint
}) => (
  <div>
    {selectedValues && (
      <div className="selectedConstraintValues">
        {values.map(
          value =>
            selectedValues.map(v => v.value).includes(value.value) && (
              <div key={value.value}>
                {removeConstraint && (
                  <span
                    className="glyphicon glyphicon-remove-circle icon-white"
                    onClick={removeConstraint.bind(null, value.value)}
                  />
                )}
                <span title={value.value}> {value.value}</span>
                <span> ({value.count})</span>
              </div>
            )
        )}
      </div>
    )}
    <div className="nonSelectedConstraintValues">
      {values.map(
        value =>
          (!selectedValues ||
            !selectedValues.map(v => v.value).includes(value.value)) && (
            <div key={value.value}>
              <i
                className="glyphicon glyphicon-plus-sign ml-facet-add-pos"
                onClick={addConstraint.bind(null, value.value)}
              />
              <span title={value.value}> {value.value}</span>
              <span> ({value.count})</span>
              {
                // TODO: negation as an option
                // <i class="fa fa-minus-circle facet-add-neg"
                // ng-if="shouldNegate"
                // ng-click="negate({facet: facet.__key, value: value.value})"
                // title="{{ value.value }}"></i>
              }
              {
                // TODO: show more
                // <div ng-if="shouldShowMore &amp;&amp; !facet.displayingAll">
                //   <a href
                //   ng-click="showMore({facet: facet, facetName: facet.__key})">
                //   see more ...
                //   </a>
                // </div>
              }
            </div>
          )
      )}
    </div>
  </div>
);

SingleConstraintList.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      count: PropTypes.number
    })
  ).isRequired,
  selectedValues: PropTypes.array,
  addConstraint: PropTypes.func.isRequired,
  removeConstraint: PropTypes.func
};

export default SingleConstraintList;
