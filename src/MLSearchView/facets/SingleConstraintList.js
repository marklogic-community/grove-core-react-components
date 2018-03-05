import React from 'react';
import PropTypes from 'prop-types';

const SingleConstraintList = ({values, addConstraint}) => (
  <div>{
    values.map((value) => (
      <div key={value.name}>
        <i
          className="glyphicon glyphicon-plus-sign ml-facet-add-pos"
          onClick={addConstraint.bind(null, value.name)}
        />
        <span title={value.name}> {value.name}</span>
        <span> ({value.count})</span>
        {
          // TODO: negation as an option
          // <i class="fa fa-minus-circle facet-add-neg"
          // ng-if="shouldNegate"
          // ng-click="negate({facet: facet.__key, value: value.name})"
          // title="{{ value.name }}"></i>
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
    ))
  }</div>
);

SingleConstraintList.propTypes = {
  values: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    count: PropTypes.number
  })).isRequired,
  addConstraint: PropTypes.func.isRequired
};

export default SingleConstraintList;
