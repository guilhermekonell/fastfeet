import * as Yup from 'yup';
import { Op } from 'sequelize';
import DeliveryProblem from '../models/DeliveryProblem';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import Order from '../models/Order';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DeliveryProblemsController {
  async index(req, res) {
    const { page = 1 } = req.params;

    const findOptions = {
      order: [['id', 'ASC']],
      include: [
        {
          where: { [Op.not]: { description: null } },
          attributes: ['id', 'description'],
          association: 'problems',
        },
      ],
    };

    const problems = await Order.findAll({
      limit: 5,
      offset: (page - 1) * 5,
      ...findOptions,
    });

    return res.json(problems);
  }

  async indexProblem(req, res) {
    const order = await Order.findAll({
      where: { id: req.params.id },
      order: [['id', 'ASC']],
      include: [
        {
          attributes: ['id', 'description'],
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
