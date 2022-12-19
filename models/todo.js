"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE

      const overdues = await this.overdue();
      for (let i = 0; i < overdues.length; i++) {
        console.log(overdues[i].displayableString());
      }
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      const itemsDueToday = await this.dueToday();
      for (let i = 0; i < itemsDueToday.length; i++) {
        console.log(itemsDueToday[i].displayableString());
      }
      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      const itemsDueLater = await this.dueLater();
      for (let i = 0; i < itemsDueLater.length; i++) {
        console.log(itemsDueLater[i].displayableString());
      }
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date().toLocaleDateString("en-CA"),
          },
        },
      });
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: new Date().toLocaleDateString("en-CA"),
          },
        },
      });
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date().toLocaleDateString("en-CA"),
          },
        },
      });
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      await Todo.update(
        { completed: true },
        {
          where: {
            id
          },
        }
      );
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      let formattedDate = "" 
      if(this.dueDate!= new Date().toLocaleDateString("en-CA")){
        formattedDate = ' '+this.dueDate
      }
      return `${this.id}. ${checkbox.trim()} ${this.title}${this.formattedDate}`;
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};