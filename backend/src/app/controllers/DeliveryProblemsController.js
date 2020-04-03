import * as Yup from 'yup';
import { Op } from 'sequelize';
import DeliveryProblem from '../models/DeliveryProblem';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import Order from '../models/Order';
import File from '../models/File';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DeliveryProblemsController {
  async index(req, res) {
    console.log('chegou aqui');
    const { q: productName, page = 1 } = req.query;

    const findOptions = {
      order: [['id', 'ASC']],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'street_number',
            'complement',
            'state',
            'city',
            'neighborhood',
            'zip_code',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email', 'avatar_id'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
        {
          where: { [Op.not]: { description: null } },
          attributes: ['id', 'description'],
          association: 'problems',
        },
      ],
    };

    const problems = productName
      ? await Order.findAll({
          where: { product: { [Op.like]: `%${productName}%` } },
          ...findOptions,
        })
      : await Order.findAll({
          limit: 5,
          offset: (page - 1) * 5,
          ...findOptions,
        });

    return res.json(problems);
  }

  async indexProblem(req, res) {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          attributes: ['id', 'description', 'created_at'],
          association: 'problems',
        },
      ],
    });

    return res.json(order);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const orderExists = await Order.findByPk(id);

    if (!orderExists) {
      return res.status(400).json({ error: 'Order not found' });
    }

    const { description } = req.body;

    const problem = await DeliveryProblem.create({ description, order_id: id });

    return res.json(problem);
  }

  async delete(req, res) {
    const { id } = req.params;

    const problem = await DeliveryProblem.findByPk(id);

    if (!problem) {
      return res.status(400).json({ error: 'Problem not found' });
    }

    const order = await Order.findByPk(problem.order_id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name'],
        },
      ],
    });

    order.canceled_at = new Date();

    await order.save();

    await Queue.add(CancellationMail.key, {
      order,
    });

    return res.json(problem);
  }
}

export default new DeliveryProblemsController();
