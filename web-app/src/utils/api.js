export const getApiUrl = (endpoint) => {
  const clean = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const base = window.location.pathname.startsWith('/digital-id-workshop') ? '/digital-id-workshop' : '';
  return `${base}${clean}`;
};
