import QueryBuilder from '../../builder/QueryBuilder'
import { serviceSearchableFields } from './service.constant'
import { TService } from './service.interface'
import Service from './service.model'

const createService = async (payload: TService) => {
  const result = await Service.create(payload)
  return result
}
const getAllService = async (query: Record<string, unknown>) => {
  const serviceQuery = new QueryBuilder(Service.find(), {
    ...query,
    sort: `${query.sort} isDeleted`,
  })
    .searchQuery(serviceSearchableFields)
    .filterQuery()
    .sortQuery()
    .paginateQuery()
    .fieldFilteringQuery()

  const result = await serviceQuery?.queryModel
  const total = await Service.countDocuments(
    serviceQuery.queryModel.getFilter(),
  )
  return { data: result, total }
}
const getServiceById = async (id: string) => {
  const result = await Service.findById(id)
  return result
}
const deleteServiceById = async (id: string) => {
  const result = await Service.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}
const updateServiceById = async (id: string, payload: TService) => {
  const result = await Service.findByIdAndUpdate(id, payload, { new: true })
  return result
}

export const serviceServices = {
  createService,
  getAllService,
  getServiceById,
  deleteServiceById,
  updateServiceById,
}
