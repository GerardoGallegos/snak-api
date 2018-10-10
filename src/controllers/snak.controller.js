import Snak from '../models/snak.model'
import config from '../../config/api.json'
import { NotFound } from '../errors'

const PAGINATE_MAX = config.paginate.max
const PAGINATE_DEF = config.paginate.default

export const getAll = async (req, res, next) => {
  try {
    let error = null
    let limit = req.query.limit <= PAGINATE_MAX
      ? parseInt(req.query.limit)
      : PAGINATE_DEF

    let skip = req.query.skip
      ? parseInt(req.query.skip)
      : 0

    const snaks = await Snak
      .find({})
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })

    const total = await Snak.estimatedDocumentCount()

    res.json({
      total,
      limit,
      skip,
      error,
      items: snaks
    })
  } catch (error) {
    next(error)
  }
}

export const get = async (req, res, next) => {
  try {
    const snak = await Snak.findById(req.params.id)

    if (!snak) return next(NotFound())

    res.json({ snak })
  } catch (error) {
    next(error)
  }
}

export const create = async (req, res, next) => {
  const snak = await Snak.create(req.body.snak)
  res.json({ snak })
  try {
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const update = async (req, res, next) => {
  try {
    const snak = await Snak.findById(req.params.id)
    if (!snak) return next(NotFound())
    const legalUpdates = [
      'title',
      'description',
      'version',
      'tech',
      'techVersion',
      'tags',
      'duration',
      'data'
    ]

    legalUpdates.forEach(key => {
      if (typeof req.body.snak[key] !== 'undefined') {
        snak[key] = req.body.snak[key]
      }
    })

    await snak.save()
    res.json({ snak })
  } catch (error) {
    next(error)
  }
}

export const remove = async (req, res, next) => {
  try {
    const snak = await Snak.findById(req.params.id)
    if (!snak) return next(NotFound())
    await snak.remove()
    res.json({ snak })
  } catch (error) {
    next(error)
  }
}
