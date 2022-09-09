const Book = (sequelize, DataTypes) => {
    return sequelize.define('Book', {
        title: DataTypes.STRING,
        cover: DataTypes.STRING,
        writer_id: {
            type: DataTypes.INTEGER,
            references: {
                model: sequelize.define('Writer', { name: DataTypes.STRING }),
                key: 'id'
            }
        }
    })
}

module.exports = Book