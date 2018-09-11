import { ContextLink, NavItem } from 'flight-reactware';

const { makeItem } = NavItem;
const { makeLink } = ContextLink;

const currentSite = process.env.REACT_APP_SITE;

function overviewItem() {
  return makeItem('Overview', 'home', makeLink(currentSite, '/'));
}

export default function() {
  return [overviewItem()];
}
