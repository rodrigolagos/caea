
module.exports = function (sequelize, DataTypes) {
    var Topic = sequelize.define('Topic', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: { type: DataTypes.STRING }
    },{
        associate: function(models) {
            Topic.belongsTo(models.Course, {foreignKey: 'course_id'});
            Topic.hasMany(models.Material, {foreignKey: 'topic_id'})
        }
    });

    return Topic;

};