import { client } from './api-client';

const ResolveApi = ({ entity }) => {
  return {
    getName: (id) => client().get(`lookups/resolver/${entity}/${id}`),
  };
};

export { ResolveApi };
