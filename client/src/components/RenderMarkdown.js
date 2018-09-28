// Based on code taken from https://github.com/Vincent-P/react-marked-markdown/blob/master/src/components/MarkdownPreview.jsx
//
// Copyright (c) 2015 Kadira Inc. <hello@kadira.io>
// Licenced under The MIT License (MIT)

import React from 'react';
import marked from 'marked';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

export default class RenderMarkdown extends React.Component {
  constructor(props) {
    super(props);

    let options = {};
    if (this.props.markedOptions) {
      options = this.props.markedOptions;
    }

    options = {
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
      ...options,
    };

    marked.setOptions(options);
  }
  render() {
    const { value, className } = this.props;
    const renderer = new marked.Renderer();
    renderer.link = (href, title, text) => (
      `<a target="_blank" rel="noopener noreferrer" href="${href}" title="${title || ''}">${text}</a>`
    );
    const html = DOMPurify.sanitize(
      marked(value || '', { renderer, sanitize: false }),
      {
        ADD_ATTR: ['target'],
        ADD_TAGS: [],
      }
    );

    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
}

RenderMarkdown.propTypes = {
  className: PropTypes.string,
  markedOptions: PropTypes.object,
  value: PropTypes.string.isRequired,
};

RenderMarkdown.defaultProps = {
  value: '',
};
