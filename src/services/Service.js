import { Op } from 'sequelize';

/**
 * @class Service
 * @description Defines standard operations to be performed on model objects
 * @exports Service
 */
class Service {
  /**
   * @description Create a Service
   * @param {Object} Model - The model object to operate on
   */
  constructor(Model) {
    this.Model = Model;
    this.findById = this.findById.bind(this);
    this.findAll = this.findAll.bind(this);
    this.create = this.create.bind(this);
    this.destroy = this.destroy.bind(this);
    this.exists = this.exists.bind(this);
  }

  /**
   * @method create
   * @description Creates a new resource of the given model
   * @param {Object} data - The details of the resource to create
   * @param {Object} uniqueAttributes - An object containing the key (name) and value of the unique paramter
   * @returns {Object} Returns the newly created resource
   */
  async create(data, uniqueAttributes) {
    if (await this.exists(uniqueAttributes)) throw new Error('Resource already exists');
    return this.Model.create(data);
  }

  /**
   * @method findById
   * @description Returns a resource of the given id
   * @param {Number} id - The ID of the resource to return
   * @returns {Object} Returns the found resource
   */
  findById(id) {
    return this.Model.findByPk(id);
  }

  /**
   * @method findAll
   * @description Returns all resources of a given model
   * @returns {Object} Returns all resources found
   */
  findAll() {
    return this.Model.findAll();
  }

  /**
   * @method destroy
   * @description deletes a specific resource
   * @param {Number} id - The ID of the resource to delete
   * @returns {undefined}
   */
  destroy(id) {
    this.Model.destroy({
      where: { id },
    });
  }

  /**
   * @method exists
   * @description Checks if an entity exists
   * @param {Object} uniqueAttributes - An object containing the key (name) and value of parameters that should be unique
   * @returns {Object} Returns a boolean indicating if the entity exists
   */
  async exists(uniqueAttributes) {
    const data = await this.Model.findOne({
      where: {
        [Op.or]: Object.keys(uniqueAttributes).map((attribute) => ({
          [attribute]: uniqueAttributes[attribute],
        })),
      },
    });
    return data !== null;
  }
}

export default Service;