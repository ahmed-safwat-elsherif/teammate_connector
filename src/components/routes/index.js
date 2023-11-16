/**
 * @typedef {| 'invoices'
 *   | 'orders'
 *   | 'profile'
 *   | 'deliveries'
 *   | 'requests'
 *   | 'campaigns'
 *   | 'claims'
 *   | 'warranties'
 *   | 'faqs'
 *   | 'priceLists'
 *   | 'productCatalog'} ModuleRoute
 */

/**
 * @typedef {import('react-router-dom').RouteProps & {
 *   childrenRouteProps: RoutePropsExtended[];
 * } & { allowedPermissions: import('../utils/authPermissions').AuthPermissions[] }} RoutePropsExtended
 */

/** @typedef {{ [key in ModuleRoute]: RoutePropsExtended[] }} AppRoutes */

// Exported for letting other files to import the type definitions:
export default {};
