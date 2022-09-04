const Writer = (sequelize, DataTypes) => {
    return sequelize.define('Writer', {
        name: DataTypes.STRING,
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: sequelize.define('User', { name: DataTypes.STRING }),
                key: 'id'
            },
        },
    });
};

module.exports = Writer;