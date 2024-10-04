import { DataTypes, Model } from "sequelize";
import util from 'util'
import connectToDB from "./db.js";

export const db = await connectToDB('postgresql:///deck')


export class User extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}


User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    loggedIn: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    userToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tokenExperation: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    modelName: 'user',
    sequelize: db,
})


// Come back to this latter


export class Decks extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}


Decks.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    deckName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    colors: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    format: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    modelName: 'decks',
    sequelize: db
})



export class CardList extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}


CardList.init({
    deckId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cardName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cardCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    modelName: 'cardList',
    sequelize: db
})


export class CardStore extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}

CardStore.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imageUris: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    manaCost: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cmc: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    typeLine: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    colors: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    colorIdentity: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    prices: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // count: {
    //     type: DataTypes.INTEGER,
    // }
}, {
    modelName: 'cardStore',
    sequelize: db
})

console.log("Testing!!! Start of linking: ")

User.hasMany(Decks, { foreignKey: 'userId' })
Decks.belongsTo(User, { foreignKey: 'userId' })

Decks.hasMany(CardList, { foreignKey: 'deckId' })
CardList.belongsTo(Decks, { foreignKey: 'deckId' })

CardStore.hasMany(CardList, { foreignKey: 'cardId'})
CardList.belongsTo(CardStore, { foreignKey: 'cardId' })



