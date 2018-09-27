import { ContextLink, NavItem } from 'flight-reactware';

const { makeItem } = NavItem;
const { makeLink } = ContextLink;

const currentSite = process.env.REACT_APP_SITE;

export default function() {
  return [
    makeItem('Overview', 'home', makeLink(currentSite, '/')),
    makeItem('Store', 'briefcase', makeLink(currentSite, '/store')),
    makeItem('Products', 'briefcase', makeLink(currentSite, '/products/clusterPack')),
  ];
}
