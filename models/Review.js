const Review = (sequelize, DataTypes) => {
    return sequelize.define('Review', {
        text: DataTypes.STRING(500),
        book_id: {
            type: DataTypes.INTEGER,
            references: {
                model: sequelize.define('Book', { name: DataTypes.STRING }),
                key: 'id'
            }
        }
    })
}

module.exports = Review