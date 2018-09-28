import { ContextLink, NavItem } from 'flight-reactware';

const { makeItem } = NavItem;
const { makeLink } = ContextLink;

const currentSite = process.env.REACT_APP_SITE;

export default function(productTypeDef) {
  const items = [
    makeItem('Overview', 'home', makeLink(currentSite, '/')),
    makeItem('Store', 'briefcase', makeLink(currentSite, '/store')),
  ];
  if (productTypeDef) {
    const link = makeLink(currentSite, `/products/${productTypeDef.type}`);
    const item = makeItem(productTypeDef.name, 'briefcase', link, null, link.location);
    items.push(item);
  }
  return items;
}
