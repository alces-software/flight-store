/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Store.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

export const NAME = 'store';
export const PRODUCTS_URL_PREFIX = process.env.REACT_APP_PRODUCTS_URL_PREFIX;
export const DEFAULT_PRODUCTS_FILE = process.env.REACT_APP_DEFAULT_PRODUCTS_FILE;
export const DEFAULT_PRODUCTS_URL = `${PRODUCTS_URL_PREFIX}${DEFAULT_PRODUCTS_FILE}`;
