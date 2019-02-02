import React from 'react';
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SimilarPanel.css';

const SimilarPanel = ({ ids }) => {
  let similarList = [];
  if (ids) {
    ids.forEach(function(id) {
      similarList.push(
        <Link
          key={id.id}
          to={{
            pathname: '/detail',
            state: {
              id: id.id
            },
            search: `?id=${id.id}`
          }}
        >
          <li>{id.uri}</li>
        </Link>
      );
    });
  }

  return (
    <Panel bsStyle="primary" header="Similar documents">
      {similarList.length > 0 ? (
        <ul className="property-list">{similarList}</ul>
      ) : (
        <div>None found</div>
      )}
    </Panel>
  );
};

export default SimilarPanel;
