import { Sequelize } from "sequelize";

async function connectToDB(dbURI) {
    console.log(`Connecting to Data Base: ${dbURI}`)    

    const sequelize = new Sequelize(dbURI, {
        logging: console.log,
        define: {
            underscored: true,
            timestamps: false, 
        },
    })

    try {
        await sequelize.authenticate()
        console.log('Successfully connected to the Data Base')
    } catch (error) {
        console.log('Unable to conncet error:', error)
    }

    return sequelize
}

export default connectToDB