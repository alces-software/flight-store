import React from 'react';
import styled, { css } from 'styled-components';
import { Table } from 'reactstrap';

// Our current versions of bootstrap and reactstrap don't support borderless
// tables.  Let's add support here.
export default styled(({ borderless, ...rest }) => <Table {...rest} />)`
  ${({ borderless }) => borderless ?
      css`
        th,
        td,
        thead th,
        tbody + tbody {
          border: 0;
        }
      ` :
      null
  }
`;
