import * as actionTypes from './actionTypes';
import * as selectors from './selectors';

function registerStoreName(storeName) {
  return {
    type: actionTypes.REGISTER_STORE_NAME,
    meta: {
      storeName,
    },
  };
}

export function buildConfig(filenameOverride, defaults, getState, storeName) {
  const { defaultFilename, defaultUrl, prefix } = defaults;
  filenameOverride = determineFilenameOverride(filenameOverride, getState, storeName);
  if (filenameOverride != null && !filenameOverride.endsWith('.json')) {
    filenameOverride = `${filenameOverride}.json`;
  }
  return {
    url: filenameOverride ? `${prefix}${filenameOverride}` : defaultUrl,
    filename: filenameOverride ? filenameOverride : defaultFilename,
  };
}

function useDevContent(devContent, storeName) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LOADING,
      payload: {
        filename: 'dev',
      },
      meta: {
        loadingState: {
          key: 'dev',
        },
        storeName,
      },
    });
    setTimeout(
      () => dispatch({
        type: actionTypes.LOADED,
        payload: devContent,
        meta: {
          loadingState: {
            key: 'dev',
          },
          storeName,
        },
      }),
      500,
    );
  };
}

function loading(config, storeName) {
  return {
    type: actionTypes.LOADING,
    payload: config,
    meta: {
      loadingState: {
        key: config.filename,
      },
      storeName,
    }
  };
}

function loaded(contents, config, storeName) {
  return {
    type: actionTypes.LOADED,
    payload: contents,
    meta: {
      loadingState: {
        key: config.filename,
      },
      storeName,
    }
  };
}

function failedToLoad(error, config, storeName) {
  return {
    type: actionTypes.FAILED,
    error: true,
    payload: {
      error,
    },
    meta: {
      loadingState: {
        key: config.filename,
      },
      storeName,
    }
  };
}

function fetchFile(config) {
  return fetch(config.url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then(j => Promise.reject(j));
      }
    });
}

function determineFilenameOverride(filenameOverride, getState, storeName) {
  // If the redux store contains a filename override we continue to use
  // it.  Otherwise, we can end up showing inconsistent objects when
  // navigating between tabs.
  const storedFilename = selectors.filename(getState(), { storeName });
  if (storedFilename != null) {
    return storedFilename;
  }
  return filenameOverride;
}

export function loadFile(storeName, filenameOverride, defaults, devContent) {
  return (dispatch, getState) => {
    dispatch(registerStoreName(storeName));
    const config = buildConfig(filenameOverride, defaults, getState, storeName);
    if (process.env.NODE_ENV === 'development' && config.filename === 'dev') {
      dispatch(useDevContent(devContent, storeName));
    } else {
      dispatch(loading(config, storeName));
      fetchFile(config)
        .then(contents => dispatch(loaded(contents, config, storeName)))
        .catch(error => dispatch(failedToLoad(error, config, storeName)));
    };
  };
}
