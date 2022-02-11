import { client } from './api-client';

interface IProps {
  apiUrlPrefix?: string;
  overrideListUrlPrefix?: string;
}
const CrudApi = (props: IProps) => {
  const { overrideListUrlPrefix } = props;
  let { apiUrlPrefix } = props;
  if (!apiUrlPrefix || apiUrlPrefix.indexOf('/') < 0) {
    apiUrlPrefix = `general/crud/${apiUrlPrefix}`;
  }
  return {
    getObjects: (params = {}) => client().post(overrideListUrlPrefix || `general/crud/${apiUrlPrefix}/list`, params),
    lookup: (v) =>
      client().get(
        `${overrideListUrlPrefix || apiUrlPrefix}${
          (overrideListUrlPrefix || apiUrlPrefix || '').indexOf('?') >= 0 ? '&' : '?'
        }search=${v}`
      ),
    getObject: (id) => client().get(`${apiUrlPrefix}/${id}`),
    save: (id, data) => client().put(`${apiUrlPrefix}/${id}`, data),
    create: (data) => client().post(`${apiUrlPrefix}`, data),
    delete: (id) => client().delete(`${apiUrlPrefix}/${id}`),
  };
};

export { CrudApi };
