/**
 * Set cache in localstorage with an expiration data.
 *
 * @param {string} key   The name of the cache to store.
 * @param {string} value String value to store.
 * @param {int}    ttl   Time to live value (ms).
 */
export const setCacheWithExpiry = ( key, value, ttl ) => {
  const now = new Date();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  }

  localStorage.setItem( key, JSON.stringify( item ) );
}

/**
 * Retreive localstorage cache.
 *
 * If the cache has expired, delete the cache and return null.
 *
 * @param {string} key The name of the cache to store.
 */
export const getCacheWithExpiry = ( key ) => {
  const itemStr = localStorage.getItem( key );

  // if the item doesn't exist, return null
  if ( ! itemStr ) {
    return null;
  }

  const item = JSON.parse( itemStr );
  const now = new Date();

  // compare the expiry time of the item with the current time
  if ( now.getTime() > item.expiry ) {
    // If the item is expired, delete the item from storage and return null
    localStorage.removeItem( key );
    return null;
  }

  return JSON.parse( item.value );
}
