
module.exports = function (sequelize, DataTypes) {
    var Course = sequelize.define('Course', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: { type: DataTypes.STRING },
        featured: { type: DataTypes.BOOLEAN },
        published: { type: DataTypes.DATE }
    },{
        associate: function(models) {
            Course.hasMany(models.Topic, {foreignKey: 'course_id'})
}
    });

    return Course;

};