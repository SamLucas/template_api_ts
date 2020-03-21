import Sequelize from 'sequelize'
import dbconfig from '@/config/conection'

const connection = new Sequelize(dbconfig)

export default connection
