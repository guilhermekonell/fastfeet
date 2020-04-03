import * as Yup from 'yup';
import { Op } from 'sequelize';
import { parseISO, isAfter, isBefore, setHours } from 'date-fns';
import Deliveryman from '../models/Deliveryman';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliveryController {
  async index(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id, {
      attributes: ['id', 'name', 'email', 'avatar_id', 'created_at'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveryman);
  }

  async indexPendencies(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;

    const pendencies = await Order.findAndCountAll({
      where: { deliveryman_id: id, canceled_at: null, end_date: null },
      order: [['id', 'ASC']],
      limit: 5,
      offset: (page - 1) * 5,
      attributes: [
        'id',
        'product',
        'start_date',
        'recipient_id',
        'status',
        'created_at',
      ],
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
      ],
    });

    return res.json(pendencies);
  }

  async indexDeliveries(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;

    const pendencies = await Order.findAndCountAll({
      where: {
        deliveryman_id: id,
        end_date: {
          [Op.not]: null,
        },
      },
      order: [['id', 'ASC']],
      limit: 5,
      offset: (page - 1) * 1,
      attributes: [
        'id',
        'product',
        'start_date',
        'end_date',
        'recipient_id',
        'status',
        'created_at',
      ],
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
      ],
    });

    return res.json(pendencies);
  }

  async updateStart(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { start_date } = req.body;

    const hourStart = parseISO(start_date);

    const initHour = setHours(new Date(hourStart), 8);
    const finishHour = setHours(new Date(hourStart), 18);

    if (isBefore(hourStart, initHour) || isAfter(hourStart, finishHour)) {
      return res
        .status(400)
        .json({ error: 'Você está fora do horário de retida de produtos' });
    }

    const { count } = await Order.findAndCountAll({
      where: {
        start_date: { [Op.not]: null },
        end_date: null,
      },
    });

    if (count === 5) {
      return res.status(400).json({
        error: 'Você atingiu o limite máximo de entregas retiradas',
      });
    }

    const delivery = await Order.findByPk(req.params.id, {
      attributes: [
        'id',
        'recipient_id',
        'deliveryman_id',
        'product',
        'start_date',
        'end_date',
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const {
      id,
      recipient_id,
      deliveryman_id,
      product,
      end_date,
    } = await delivery.update(req.body);

    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      product,
      start_date,
      end_date,
    });
  }

  async updateEnd(req, res) {
    const { originalname: name, filename: path } = req.file;

    const { id: signature_id } = await File.create({
      name,
      path,
    });

    const end_date = new Date();

    const delivery = await Order.findByPk(req.params.id, {
      attributes: [
        'id',
        'recipient_id',
        'deliveryman_id',
        'signature_id',
        'product',
        'start_date',
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const {
      id,
      recipient_id,
      deliveryman_id,
      start_date,
      product,
    } = await delivery.update({ ...req.body, signature_id, end_date });

    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
      start_date,
      end_date,
    });
  }
}

export default new DeliveryController();
