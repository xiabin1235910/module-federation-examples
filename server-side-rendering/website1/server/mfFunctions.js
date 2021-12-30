import axios from "axios";

const mfAppNames = ["website2"].join("|");
const mfAppNamesRegex = RegExp(`(${mfAppNames})-.*`);
const mfStatsUrlMap = {
  website2: "http://localhost:3002/static/federation-stats.json",
};
const isMfComponent = (component) => mfAppNamesRegex.test(component);

/**
 * @param {Object} extractor - loadable-components extractor
 * @return {string[]} chunk ids of the rendered components.
 */
const getLoadableRequiredComponents = (extractor) => {
  const loadableElement = extractor
    .getScriptElements()
    .find((el) => el.key === "__LOADABLE_REQUIRED_CHUNKS___ext");
  const { namedChunks } = JSON.parse(
    loadableElement.props.dangerouslySetInnerHTML.__html
  );
  return namedChunks;
};

const getMfRenderedComponents = (loadableRequiredComponents) => {
  return loadableRequiredComponents.reduce((result, component) => {
    if (isMfComponent(component)) result.push(component.split("-"));
    return result;
  }, []);
};

const getMFStats = async () => {
  const promises = Object.values(mfStatsUrlMap).map((url) => axios.get(url));
  return Promise.all(promises).then((responses) =>
    responses.map((response) => response.data)
  );
};

export const getMfChunks = async (extractor) => {
  const loadableRequiredComponents = getLoadableRequiredComponents(extractor);
  const mfRenderedComponents = getMfRenderedComponents(
    loadableRequiredComponents
  );

  const mfChunks = await getMFStats();

  const scriptsArr = [];
  const stylesArr = [];
  mfRenderedComponents.forEach(([appName, component]) => {
    const remoteStats = mfChunks.find((remote) => remote.name === appName);
    remoteStats.exposes[component].forEach((chunk) => {
      const url = "http://localhost:3002/buildClient/static/" + chunk;
      url.endsWith(".css") ? stylesArr.push(url) : scriptsArr.push(url);
    });
  });
  return [scriptsArr, stylesArr];
};

export const createScriptTag = (chunk) =>
  `<script defer src="${chunk}"></script>`;

export const createStyleTag = (chunk) =>
  `<link href="${chunk}" type="text/css" rel="stylesheet">`;
