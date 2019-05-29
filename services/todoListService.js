const db = require('./dbConnect');

const create = (name, trip_id) => {
    const sql = `
    INSERT INTO todolist (name, trip_id)
    VALUES ($[name], $[trip_id])
    RETURNING id;
    `;
    return db.one(sql, { name, trip_id });
};

const update = (data, id) => {
    const keys = Object.keys(data);
    let sql = 'UPDATE todolist SET ';

    for (let i = 0; i < keys.length; i++) {
        if (keys[i] === 'id') continue;
        if (i === keys.length - 1) {
            sql += `${keys[i]}=` + '$' + `[${keys[i]}] `
        } else {
            sql += `${keys[i]}=` + '$' + `[${keys[i]}], `
        };
    };
    sql += 'WHERE id = $[id];';
    return db.none(sql, { ...data, id });
};

const deleteTodoList = (id) => {
    const sql = `
    DELETE FROM todolist t
    WHERE t.id = $[id]
    `;
    return db.none(sql, { id });

};

module.exports = {
    create,
    update,
    deleteTodoList
};