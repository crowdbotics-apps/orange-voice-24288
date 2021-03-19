import React, { memo } from 'react';
import PropTypes from 'prop-types';
const PanelHeader = memo(({ size, content }) => {
  return (
    <div
      className={
        'panel-header ' +
        (size !== undefined
          ? 'panel-header-' + size
          : '')
      }
    >
      {content}
    </div>
  );

}
);
PanelHeader.displayName = 'PanelHeader';
PanelHeader.propTypes = {
  size: PropTypes.string,
  content: PropTypes.func
};
export default PanelHeader;
